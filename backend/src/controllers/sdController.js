/**
 * SD module
 * @module SD
 */

import {
  getImage,
  getProgress,
  getModelList,
  postOptions,
  getOptions,
  interruptCurrentRequest,
} from "../services/sdService.js";
import { removeFileExtension } from "../utils/utils.js";

/**
 * Handle generating images based on the provided request body.
 * Sends back the images as an array of base64 encoded strings.
 * Doesnt use request handler, not involved in backend's queue.
 * SD has it's own queue though... probably shouldn't be accessible to user
 * @param {Object} req - The request object containing the image data.
 * @param {Object} res - The response object to send back the generated images.
 * @note
 */
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

//
/**
 * Retrieve image generation progress information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the image generation progress.
 * @note todo: handle progress using socket server or sth else
 */
const handleGetImageGenProgress = async (req, res) => {
  try {
    const result = await getProgress();
    res.json({ progress: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Handle the retrieval of available SD models.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the list of available SD models.
 */
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

/**
 * Handle posting options for SD model.
 * @param {Object} req - The request object containing the options data.
 * @param {Object} res - The response object to send back the status of options posting.
 */
const handlePostOptions = async (req, res) => {
  try {
    const options = req.body.data;
    await postOptions(options);
    console.log(options);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(err.status);
  }
};

/**
 * Handle the retrieval of SD model options.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the SD model options.
 */
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

/**
 * Handle interrupting current SD request.
 * @param {Object} req - The request object.
 */
const handleInterrupt = async (req, res) => {
  try {
    await interruptCurrentRequest();
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
  handleInterrupt,
};
