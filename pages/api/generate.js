import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { inputText } = req.body;

    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: inputText,
          model: "gpt-3.5-turbo",
          max_tokens: 250, // Adjust as needed
          temperature: 0, // Adjust as needed
          stop: "", // Stop generation at a newline
        }),
      }
    );

    const data = await response.json();
    const outputText = data.choices[0].text;

    res.status(200).json({ outputText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
