import React, { useEffect, useState } from "react";
import { Select, Input, Option, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { llamaSlice } from "../../store/llamaSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getLlamaModelList,
  updateLlamaSettings,
  getCurrentLlamaSettings,
} from "../../api";
import { useForm } from "react-hook-form";
import SettingsTabControls from "./SettingsTabControls";

const TextGeneratorSettingsTab = () => {
  const { register, getValues, reset, setValue } = useForm();
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const { availableModels, contextSettings, promptSettings } = useSelector(
    (state) => state.llama
  );

  // Getting llama settings and models data from api
  useEffect(() => {
    const fetchLlamaModelList = async () => {
      const models = await getLlamaModelList();
      dispatch(llamaSlice.actions.setAvailableModels(models));

      const settings = await getCurrentLlamaSettings();
      dispatch(llamaSlice.actions.setContextSettings(settings));
      setDataLoaded(true);
      reset({ ...settings, ...promptSettings });
    };

    fetchLlamaModelList();
  }, [dispatch, reset, promptSettings]);

  const handleLlamaModelSelect = (value) => {
    setValue("modelName", value);
  };

  // Updating llama context settings from form to store and sending settings to backend
  const applyChanges = async () => {
    const values = getValues();

    dispatch(
      llamaSlice.actions.setContextSettings({
        modelName: values.modelName,
        contextSize: values.contextSize,
        batchSize: values.batchSize,
      })
    );

    dispatch(
      llamaSlice.actions.setPromptSettings({
        temperature: values.temperature,
        topP: values.topP,
        topK: values.topK,
      })
    );

    const response = await updateLlamaSettings(values);
    if (response.status === 200) {
    }
  };

  const resetToDefault = () => {
    let defaultValues = {
      ...contextSettings,
      ...promptSettings,
    };
    setValue("modelName", defaultValues.modelName);
    reset({ ...defaultValues });
  };

  return (
    <>
      {dataLoaded && (
        <form>
          <div className="flex flex-col gap-4 overflow-y-auto pt-2">
            <Typography variant="small">Context settings</Typography>
            <Select
              label="Model"
              {...register("modelName")}
              onChange={handleLlamaModelSelect}
              value={contextSettings.modelName}
            >
              {availableModels.map((model, index) => {
                return (
                  <Option key={index} value={model}>
                    {model}
                  </Option>
                );
              })}
            </Select>
            <Input
              label="Context size"
              size="md"
              {...register("contextSize")}
            />
            <Input label="Batch size" size="md" {...register("batchSize")} />

            <Typography className="mt-2" variant="small">
              Prompt settings
            </Typography>
            <Input label="Temperature" size="md" {...register("temperature")} />
            <Input label="TopP" size="md" {...register("topP")} />
            <Input label="TopK" size="md" {...register("topK")} />

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

export default TextGeneratorSettingsTab;
