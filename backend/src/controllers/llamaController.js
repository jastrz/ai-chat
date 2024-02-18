import { llamaService } from "../services/llamaService.js";

const handleChatPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .json({ error: "Missing 'prompt' property in the request body!" });
    }

    await llamaService.start();
    const answer = await llamaService.prompt(prompt);

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { handleChatPrompt };
