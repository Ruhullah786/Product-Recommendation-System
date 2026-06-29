import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
console.log(JSON.stringify(apiKey));
console.log("API KEY:", apiKey);
console.log("API KEY LENGTH:", apiKey?.length);

let genAI = null;

// Initialize the Gemini client if the API key is present
if (apiKey && apiKey.trim() !== "") {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.error("Failed to initialize GoogleGenerativeAI client:", err);
  }
}

/**
 * Calls the Gemini API to recommend products based on user input.
 * 
 * @param {string} userQuery - The natural language search query.
 * @param {Array} productsList - The complete list of available products in the catalog.
 * @returns {Promise<Array<{id: number, reason: string}>>} - Recommended product IDs and reason statements.
 */
export async function getRecommendations(userQuery, productsList) {
  // Check if API key is configured
  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "Gemini API key is not configured. Please create a '.env' file in the project root " +
      "and define your key as: VITE_GEMINI_API_KEY=your_actual_key_here."
    );
  }

  if (!genAI) {
    // If the API key is present but initialization failed, retry initialization
    try {
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (err) {
      throw new Error("Could not initialize the Gemini AI client: " + err.message);
    }
  }

  // 1. Instantiate the model. We use gemini-1.5-flash for fast and cost-efficient structured output.
  // We provide a system instruction to ground the AI and prevent hallucinations.
 const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are a professional AI Product Recommender. Analyze the user's request and match it against the provided product list. " +
    "Recommend products ONLY from the provided product list. Do not generate imaginary products. " +
    "Return your response strictly in the JSON format requested. Do not wrap the JSON output in markdown formatting like ```json."
});

  // 2. Set up the schema to enforce the JSON structure.
  // This guarantees that the response is a JSON array matching the format: [{id: number, reason: string}]
  const generationConfig = {
    responseMimeType: "application/json",
    responseSchema: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { 
            type: "INTEGER",
            description: "The unique integer ID of the product from the provided list." 
          },
          reason: { 
            type: "STRING", 
            description: "Concise description of why this product fits the user's request, referencing price, category, or specifications if applicable."
          }
        },
        required: ["id", "reason"]
      }
    }
  };

  // 3. Prepare clean catalog data to send in the prompt (minimizing token usage)
  const slimCatalog = productsList.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    description: p.description,
    specs: p.specs
  }));

  // 4. Formulate the prompt
  const prompt = `
    User Search Request: "${userQuery}"

    Available Product Catalog (JSON format):
    ${JSON.stringify(slimCatalog, null, 2)}

    Instructions:
    1. Filter the available product catalog and select the products that best match the User Search Request.
    2. Recommend products ONLY from this list. Do NOT invent new products.
    3. If multiple products match, return all matches in the JSON array.
    4. If no products match the user's requirements (e.g. they ask for something completely unrelated or outside the parameters), return an empty array [].
    
    Format requirements:
    Return only a JSON array of objects. Each object MUST contain:
    - "id" (the exact integer matching the product's ID)
    - "reason" (a short, helpful explanation of why it fits their search)
  `;

  try {
    // 5. Generate content
   const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim() === "") {
      throw new Error("Received empty response from Gemini API.");
    }

    // 6. Parse and validate JSON
    let parsedRecommendations;
    try {
      parsedRecommendations = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse Gemini response text:", text);
      throw new Error("Invalid response format received from AI server. Please try again.");
    }

    if (!Array.isArray(parsedRecommendations)) {
      throw new Error("AI returned malformed data structure (expected an array).");
    }

    // Ensure all items have the required fields
    const validatedRecommendations = parsedRecommendations.filter(item => {
      return (
        item && 
        typeof item.id === "number" && 
        typeof item.reason === "string"
      );
    });

    return validatedRecommendations;
  } catch (error) {
    console.error("Gemini service error:", error);
    // Throw a cleaner, readable error message for the UI
    throw new Error(error.message || "An unexpected error occurred while communicating with Gemini.");
  }
}
