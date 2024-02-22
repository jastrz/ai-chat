import React, { useState, useEffect } from "react";
import { Select, Input, Textarea, Option } from "@material-tailwind/react";
import { getSDModelList } from "../../api";

const ImageGeneratorSettingsTab = () => {
  const [sdModels, setSdModels] = useState([]);

  useEffect(() => {
    const fetchModelList = async () => {
      const models = await getSDModelList();
      setSdModels(models);
    };

    if (sdModels.length === 0) {
      fetchModelList();
    }
  }, [sdModels, setSdModels]);

  return (
    <>
      <div className="flex flex-col gap-4 overflow-y-auto">
        <Select label="Model">
          {sdModels.map((model, index) => {
            return (
              <Option key={index} value={model}>
                {model}
              </Option>
            );
          })}
        </Select>
        <Input label="Height" size="md" />
        <Input label="Width" size="md" />
        <Input label="Num images" size="md" />
        <Textarea label="Negative prompt"></Textarea>
      </div>
    </>
  );
};

export default ImageGeneratorSettingsTab;
