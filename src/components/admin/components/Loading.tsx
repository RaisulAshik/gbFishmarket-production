import React from "react";
import { Refresh } from "@mui/icons-material";
import { Box } from "@mui/material";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: " center",
  margin: " 48px 24px",
};

const Loading: React.FC = () => {
  return (
    <Box sx={style}>
      <Refresh />
    </Box>
  );
};

export default Loading;
