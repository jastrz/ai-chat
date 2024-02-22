import { getImage, getProgress, getModelList } from "../services/sdService.js";

// sends back the images as an array of base64 encoded strings
const handleImagePrompt = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Missing or invalid request body!" });
    }

    const images = await getImage(req.body);

    res.send(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetImageGenProgress = async (req, res) => {
  try {
    const result = await getProgress();
    res.json({ progress: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetSDModels = async (req, res) => {
  try {
    const result = await getModelList();

    const models = result.data.map((model) => model.model_name);
    // console.log(models);
    res.send(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { handleImagePrompt, handleGetImageGenProgress, handleGetSDModels };
