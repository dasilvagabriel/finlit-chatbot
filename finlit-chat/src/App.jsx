import React, { useState } from "react";
import "./App.css";
import sendIcon from "./assets/send.png";

function App() {
  const [userAPIKey, setUserAPIKey] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const [output, setOutput] = useState("");

  const saveAPIKey = () => {
    setUserAPIKey(document.getElementById('apiKeyInput').value);
    alert("API Key saved. You can now use the chatbot.");
  };

  const getGeneratedText = async () => {
    if (!userAPIKey) {
      alert("Please enter and save your OpenAI API key first.");
      return;
    }
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userAPIKey}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [
            { "role": "system", "content": "Hi, I'm your financial literacy chatbot. How can I help you today? Things that I am good at:- Explaining and translating complicated financial language into simple terms. - Explaining considerations that you should take in your financial life.Things I am not good at:- Giving financial advice of what you should do." },
            { "role": "user", "content": promptInput }
          ],
          "stream": true
        })
      });

      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      const outputArea = document.getElementById('outputArea');
      outputArea.innerText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // Massage and parse the chunk of data
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        console.log("lines")
        console.log(lines)
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
          .filter((line) => line !== "" && line !== "[DONE]"); // Remove empty lines and "[DONE]"
        for (const parsedLine of parsedLines) {
          const content = JSON.parse(parsedLine).choices[0].delta.content
          if (content) {
            outputArea.innerText += content;
          }
        }
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      const outputArea = document.getElementById('outputArea');
      outputArea.innerText = 'An error occurred while processing the response.';
    }
  }

  const checkSubmit = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      getGeneratedText(); // Call the function directly
    }
  };

  return (
    <div className="main">
      <h3>Alf AI</h3>
      <p class="main--subtitles"> Hi, I'm your financial literacy chatbot. How can I help you today?</p>
        <p class="main--subtitles"> Things I am good at:</p>
        <ul>
            <li>Explaining and translating complicated financial language into simple terms.</li>
            <li>Explaining considerations that you should take in your financial life.</li>
        </ul>
        <p class="main--subtitles">Things I am not good at:</p>
        <ul>
            <li>Giving financial advice of what you should do.</li>
        </ul>
      <div className="api-field">
        <label htmlFor="apiKeyInput">OpenAI API Key:</label>
        <input type="password" id="apiKeyInput" placeholder="Enter your OpenAI API key" />
        <button onClick={saveAPIKey} id="api-button">Save API Key</button>
      </div>
      <div className="chat-window">
        <textarea
          id="promptInput"
          placeholder="Ask me about personal finance"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={checkSubmit}
        ></textarea>
        <button onClick={getGeneratedText} id="prompt-submit-button">
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
      <div id="outputArea">{output}</div>
    </div>
  );
}

export default App;
