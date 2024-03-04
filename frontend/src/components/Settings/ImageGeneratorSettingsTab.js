import React, { useEffect, useState } from "react";
import { Select, Input, Textarea, Option } from "@material-tailwind/react";
import { getSDModelList, getSDSettings, updateSdSettings } from "api";
import { useForm } from "react-hook-form";
import SettingsTabControls from "./SettingsTabControls";
import { useSelector, useDispatch } from "react-redux";
import { sdSlice } from "store/sdSlice";
import { sendImageGenSettings } from "socketConnection";

const ImageGeneratorSettingsTab = () => {
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const { register, getValues, reset, setValue } = useForm();

  const settings = useSelector((state) => state.sd);

  useEffect(() => {
    const fetchSDData = async () => {
      const models = await getSDModelList();
      dispatch(sdSlice.actions.setAvailableModels(models));
      const options = await getSDSettings();
      dispatch(sdSlice.actions.setModelName(options.modelName));
      setDataLoaded(true);
    };

    fetchSDData();
  }, [dispatch]);

  useEffect(() => {
    reset({
      ...settings.promptSettings,
      modelName: settings.modelName,
    });
  }, [settings, reset]);

  const handleModelSelect = (value) => {
    setValue("modelName", value);
  };

  const resetToDefault = () => {
    reset({ ...settings.promptSettings });
  };

  const applyChanges = async () => {
    const values = getValues();

    const imageGenPromptSettings = {
      height: parseInt(values.height),
      width: parseInt(values.width),
      numImages: parseInt(values.numImages),
      negativePrompt: values.negativePrompt,
    };

    sendImageGenSettings(imageGenPromptSettings);
    dispatch(sdSlice.actions.setPromptSettings(imageGenPromptSettings));

    if (values.modelName !== settings.modelName) {
      const response = await updateSdSettings({ modelName: values.modelName });
      if (response.status === 200) {
        dispatch(sdSlice.actions.setModelName(values.modelName));
      } else {
        console.log("Couldn't update modelName.");
      }
    }
  };

  return (
    <>
      {dataLoaded && (
        <form>
          <div className="flex flex-col gap-4 overflow-y-auto pt-2">
            <Select
              label="Model"
              {...register("modelName")}
              onChange={handleModelSelect}
              value={settings.modelName}
            >
              {settings.availableModels.map((model, index) => {
                return (
                  <Option key={index} value={model}>
                    {model}
                  </Option>
                );
              })}
            </Select>
            <Input label="Height" {...register("height")} size="md" />
            <Input label="Width" {...register("width")} size="md" />
            <Input label="Num images" {...register("numImages")} size="md" />
            <Textarea
              label="Negative prompt"
              {...register("negativePrompt")}
            ></Textarea>
            <SettingsTabControls
              onApply={applyChanges}
              onReset={resetToDefault}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default ImageGeneratorSettingsTab;
