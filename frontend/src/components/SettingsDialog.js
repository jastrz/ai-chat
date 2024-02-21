import {
  Dialog,
  Typography,
  Button,
  Card,
  CardBody,
  Input,
  CardFooter,
  IconButton,
  Textarea,
  Select,
  Option,
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react";
import React from "react";

const SettingsDialog = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const data = [
    {
      label: "Image",
      value: "image",
      content: (
        <div className="flex flex-col gap-4 overflow-y-auto">
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          ></Typography>
          <Select label="Model">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
          <Input label="Height" size="sm" />
          <Input label="Width" size="sm" />

          <Input label="Num images" size="sm" />
          <Textarea label="Negative prompt"></Textarea>
        </div>
      ),
    },
    {
      label: "Text",
      value: "text",
      content: (
        <div className="flex flex-col gap-4 overflow-y-auto">
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          ></Typography>
          <Select label="Model">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
          <Input label="Context size" size="sm" />
          <Input label="Batch size" size="sm" />
        </div>
      ),
    },
  ];

  return (
    <>
      <IconButton onClick={handleOpen}>
        <i class="fa-solid fa-gear"></i>
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
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, content }) => (
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
