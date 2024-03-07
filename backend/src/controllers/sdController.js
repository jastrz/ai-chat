import {
  getImage,
  getProgress,
  getModelList,
  postOptions,
  getOptions,
} from "../services/sdService.js";
import { removeFileExtension } from "../utils/utils.js";

// sends back the images as an array of base64 encoded strings
// doesnt use request handler, not involved in backend's queue
// sd has it's own queue though... probably shouldn't be accessible to user
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

// same as above
// todo: handle progress using socket server or sth else
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
    res.send(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handlePostOptions = async (req, res) => {
  try {
    const options = req.body.data;
    await postOptions(options);
    console.log(req.body);
    res.status(200);
  } catch (err) {
    console.log(error);
    res.status(err.status);
  }
};

const handleGetOptions = async (req, res) => {
  try {
    const options = await getOptions();
    const modelName = removeFileExtension(options.sd_model_checkpoint);
    console.log(modelName);
    res.send({ modelName: modelName });
  } catch (err) {
    console.log(err);
    res.status(err.status);
  }
};

export {
  handleImagePrompt,
  handleGetImageGenProgress,
  handleGetSDModels,
  handlePostOptions,
  handleGetOptions,
};
