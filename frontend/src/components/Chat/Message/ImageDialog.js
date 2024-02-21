import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import SaveButton from "./SaveButton";

export const ImageDialog = ({ data, open, toggle }) => {
  return (
    <>
      <Dialog
        open={open}
        handler={toggle}
        className="bg-transparent shadow-none"
        size="xl"
      >
        <DialogHeader className="justify-end">
          <div className="space-x-4">
            <SaveButton
              size="lg"
              imageSrc={data}
              imageName={new Date().toUTCString()}
            />
            <IconButton size="lg" className="rounded=full" onClick={toggle}>
              <i className="fas fa-circle-xmark" />
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="w-[48rem] h-full rounded-lg object-cover object-center"
            src={`data:image/png;base64, ${data}`}
          />
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </>
  );
};
