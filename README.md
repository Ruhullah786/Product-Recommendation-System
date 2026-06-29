# Product Recommendation System

A React application that recommends products based on user preferences using the Google Gemini API.

## Features

- Browse all available products
- Search products using natural language
- AI-based product recommendations
- Recommendation reason for each product
- Loading and error handling
- Responsive user interface

## Tech Stack

- React
- JavaScript
- CSS
- Google Gemini API
- Vite

## Project Structure

```
src/
│── components/
│── data/
│── services/
│── App.jsx
│── main.jsx
│── index.css
```

## Installation

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file and add your Gemini API key

```env
VITE_GEMINI_API_KEY=your_api_key
```

3. Start the project

```bash
npm run dev
```

4. Build the project

```bash
npm run build
```

## How It Works

1. The user enters a product requirement.
2. The query is sent to the Gemini API.
3. Gemini compares the query with the available product catalog.
4. Matching products are displayed along with the recommendation reason.

## Author

Rahul Ansari