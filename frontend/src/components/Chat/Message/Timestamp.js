import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export const TimeStamp = ({ timestamp }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const msgDate = new Date(timestamp);
    const diff = now - msgDate;
    const diffInHours = diff / 1000 / 60 / 60;
    if (diffInHours >= 1) {
      const dateString = msgDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const timeString = msgDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDateTime = `${dateString}, ${timeString}`;
      setDate(formattedDateTime);
    } else {
      setDate(
        msgDate.toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    }
  }, []);

  return (
    <>
      <div className="mb-2">
        <Typography color="white" style={{ fontSize: "0.6rem" }}>
          {date}
        </Typography>
      </div>
    </>
  );
};
