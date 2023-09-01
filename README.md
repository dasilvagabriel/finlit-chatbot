# Financial Literacy Chatbot using OpenAI

This project consists of a JavaScript function named `getGeneratedText` that integrates with the OpenAI API, specifically the `gpt-3.5-turbo` model, to simulate a financial literacy chatbot. The chatbot excels at translating complicated financial terms into layman language.

## Features

- **Translate Financial Jargon**: Converts complicated financial language into more straightforward terms.
- **Financial Information**: Offers explanations regarding various financial aspects.
  
🚫 **Note**: This bot is not designed to give specific financial advice.

## Prerequisites

1. You must have an API key from OpenAI.
2. This function assumes you have two HTML elements:
   - An input element with `id="promptInput"` for users to type their queries.
   - A display area with `id="outputArea"` to show the bot's responses.

## How to Use

1. **Set Up API Key**:

Replace the empty `apiKey` variable in the function with your actual OpenAI API key:
```javascript
const apiKey = 'YOUR_OPENAI_API_KEY';
