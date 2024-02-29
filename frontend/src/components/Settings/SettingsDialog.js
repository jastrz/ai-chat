import {
  Dialog,
  Typography,
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react";
import React, { useState } from "react";

import TextGeneratorSettingsTab from "./TextGeneratorSettingsTab";
import ImageGeneratorSettingsTab from "./ImageGeneratorSettingsTab";

const SettingsDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const tabs = [
    {
      label: "Image",
      value: "image",
      content: <ImageGeneratorSettingsTab />,
    },
    {
      label: "Text",
      value: "text",
      content: <TextGeneratorSettingsTab />,
    },
  ];

  return (
    <>
      <IconButton onClick={handleOpen}>
        <i className="fa-solid fa-gear"></i>
      </IconButton>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody>
            <Typography
              variant="h4"
              color="blue-gray"
              align="center"
              className="mb-4"
            >
              Settings
            </Typography>

            <Tabs value="image">
              <TabsHeader>
                {tabs.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {tabs.map(({ value, content }) => (
                  <TabPanel key={value} value={value}>
                    {content}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </CardBody>

          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Close
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default SettingsDialog;
