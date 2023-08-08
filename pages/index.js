import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleSubmit = async () => {
    try {
      console.log("submitting to openai");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText }),
      });
      console.log("finished fetching response");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setOutputText(data.outputText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Text Translation App</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Enter text to translate"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Translate</button>
      <div>
        <h2>Translated Text:</h2>
        <p>{outputText}</p>
      </div>
    </div>
  );
}
