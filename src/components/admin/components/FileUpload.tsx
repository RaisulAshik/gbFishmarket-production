import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import clsx from "clsx"; // fro conditional rendering of elements classes
import { createUseStyles } from "react-jss";

export type FileUploadProps = {
  accept: string;
  imageButton?: boolean;
  hoverLabel?: string;
  dropLable?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  image?: {
    url: string;
    imageStyle?: {
      width?: string;
      height?: string;
    };
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};

// styles for FileUpload component

const useStyles = createUseStyles({
  root: {
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    "&:hover p,&:hover svg,& img": {
      opacity: 1,
    },
    "& p, svg": {
      opacity: 0.4,
    },
    "&:hover img": {
      opacity: 0.3,
    },
  },
  noMouseEvent: {
    pointerEvents: "none",
  },
  iconText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },
  hidden: {
    display: "none",
  },
  onDragOver: {
    "& img": {
      opacity: 0.3,
    },
    "& p, svg": {
      opacity: 1,
    },
  },
});

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  imageButton = false,
  hoverLabel = "Click or drag to upload file",
  dropLable = "Drop file here",
  width = "600px",
  height = "100px",
  backgroundColor = "#fff",
  image: {
    url = require("../../../assets/img/gbicon.PNG"),
    imageStyle = {
      height: "inherit",
    },
  } = {},
  onChange,
  onDrop,
}) => {
  // console.log(url);
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState<string>(url);
  const [labelText, setLabelText] = useState<string>(hoverLabel);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  useEffect(() => {
    setImageUrl(url);
  }, [url]);
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLable);
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      }
      onDrop(e);
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (imageButton && e.target.files[0]) {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
      }
    }
    onChange(e);
  };

  return (
    <>
      <input
        accept={accept}
        className={classes.hidden}
        id="file-upload"
        type="file"
        onChange={handleChange}
      />
      <label
        htmlFor="file-upload"
        className={clsx(classes.root, isDragOver && classes.onDragOver)}
        {...dragEvents}
      >
        <Box
          width={width}
          height={height}
          bgcolor={backgroundColor}
          className={classes.noMouseEvent}
        >
          {imageButton && imageUrl && (
            <Box position="absolute" height={height} width={width}>
              <img alt="file upload" src={imageUrl} style={imageStyle} />
            </Box>
          )}
          {(!imageButton || isDragOver || isMouseOver) && (
            <>
              <Box height={height} width={width} className={classes.iconText}>
                <CloudUploadIcon fontSize="large" />
                <Typography>{labelText}</Typography>
              </Box>
            </>
          )}
        </Box>
      </label>
    </>
  );
};

export default FileUpload;
