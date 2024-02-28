import React, { useState, useEffect } from "react";
import { Select, Input, Textarea, Option } from "@material-tailwind/react";
import { getSDModelList } from "../../api";
import { useForm } from "react-hook-form";
import SettingsTabControls from "./SettingsTabControls";
import { useSelector, useDispatch } from "react-redux";
import { sdSlice } from "../../store/sdSlice";

const ImageGeneratorSettingsTab = () => {
  const dispatch = useDispatch();
  const [sdModels, setSdModels] = useState([]);
  const { register, getValues, reset, setValue } = useForm();

  const settings = useSelector((state) => state.sd);

  useEffect(() => {
    const fetchModelList = async () => {
      const models = await getSDModelList();
      setSdModels(models);
    };

    if (sdModels.length === 0) {
      fetchModelList();
    }
  }, [sdModels, setSdModels]);

  useEffect(() => {
    reset({ ...settings.promptSettings });
  }, []);

  const handleModelSelect = () => {
    // setValue("modelName")
  };

  const resetToDefault = () => {
    reset({ ...settings.promptSettings });
  };

  const applyChanges = () => {
    const formValues = getValues();
    dispatch(
      sdSlice.actions.setPromptSettings({
        height: parseInt(formValues.height),
        width: parseInt(formValues.width),
        numImages: parseInt(formValues.numImages),
        negativePrompt: formValues.negativePrompt,
      })
    );
  };

  console.log(settings);

  return (
    <>
      <form>
        <div className="flex flex-col gap-4 overflow-y-auto pt-2">
          <Select
            label="Model"
            {...register("model")}
            onChange={handleModelSelect}
          >
            {sdModels.map((model, index) => {
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
    </>
  );
};

export default ImageGeneratorSettingsTab;
