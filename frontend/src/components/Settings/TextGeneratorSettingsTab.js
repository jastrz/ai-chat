import React, { useEffect, useState } from "react";
import { Select, Input, Option, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { llamaSlice } from "../../store/llamaSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getLlamaModelList,
  updateLlamaSettings,
  getCurrentLlamaSettings,
} from "../../api";
import { useForm } from "react-hook-form";

const TextGeneratorSettingsTab = () => {
  const { register, getValues, reset, setValue } = useForm();
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  let settings = useSelector((state) => state.llama);

  useEffect(() => {
    const fetchLlamaModelList = async () => {
      const models = await getLlamaModelList();
      dispatch(llamaSlice.actions.setAvailableModels(models));

      const settings = await getCurrentLlamaSettings();
      dispatch(llamaSlice.actions.setLlamaSettings(settings));
      setDataLoaded(true);
      reset({ ...settings });
    };

    fetchLlamaModelList();
  }, [dispatch, reset]);

  const handleLlamaModelSelect = (value) => {
    setValue("modelName", value);
  };

  const applyChanges = async () => {
    const values = getValues();
    dispatch(
      llamaSlice.actions.setLlamaSettings({
        modelName: values.modelName,
        contextSize: values.contextSize,
        batchSize: values.batchSize,
      })
    );

    const response = await updateLlamaSettings(values);
    if (response.status === 200) {
      console.log("updated settings");
    }
  };

  const resetDefault = () => {
    let defaultValues = {
      modelName: settings.modelName,
      contextSize: settings.contextSize,
      batchSize: settings.batchSize,
    };
    setValue("modelName", defaultValues.modelName);
    reset({ ...defaultValues });
  };

  return (
    <>
      {dataLoaded && (
        <form>
          <div className="flex flex-col gap-4 overflow-y-auto">
            <Select
              label="Model"
              {...register("modelName")}
              onChange={handleLlamaModelSelect}
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
            <Input
              label="Context size"
              size="md"
              {...register("contextSize")}
            />
            <Input label="Batch size" size="md" {...register("batchSize")} />
            <div className="space-x-4 self-end">
              <Button size="sm" onClick={resetDefault}>
                Reset
              </Button>
              <Button size="sm" onClick={applyChanges}>
                Apply
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default TextGeneratorSettingsTab;
