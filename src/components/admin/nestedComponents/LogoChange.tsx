import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FileUpload, { FileUploadProps } from "../components/FileUpload";
import { getLogo, addLogo, updateLogo } from "../../../api/apiAdminDashboard";
import { userInfo } from "../../../utils/auth";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export interface ILogoData {
  id: number;
  file_link: string;
  file_name: string;
}

const LogoChange = () => {
  const classes = useStyles();
  const [logoData, setLogoData] = useState<ILogoData>();
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    getLogo()
      .then((res) => res.data)
      .then((data) => {
        setLogoUrl(`${data.data.file_link}`);
        setLogoData(data.data);
      })
      .catch((err) => setErrorMessage("no logo found"));
    const user = userInfo();
    setToken(user.token);
    return () => {
      setLogoUrl("");
      setToken("");
    };
  }, []);

  const fileUploadProp: FileUploadProps = {
    accept: "image/*",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files !== null && event.target?.files?.length > 0) {
        setFile(event.target.files[0]);
        setIsButtonDisable(false);
      }
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      setFile(event.dataTransfer.files[0]);

      setIsButtonDisable(false);
    },
  };

  const handleSubmit = async (file: File | null) => {
    const fileData = new FormData();
    if (file !== null) {
      fileData.append("file", file, file.name);
      fileData.append("name", file.name);
    }

    if (logoData) {
      setIsLoading(true);
      updateLogo(fileData, logoData.id, token)
        .then((res) => res.data)
        .then((data) => {
          setSuccessMessage(data.message);
          setIsButtonDisable(true);
          setIsLoading(false);
          setLogoData(data.result);
          // console.log(data.result);
          // console.log(data.message);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
          setIsButtonDisable(true);
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      addLogo(fileData, token)
        .then((res) => res.data)
        .then((data) => {
          setSuccessMessage(data.message);
          setIsButtonDisable(true);
          setIsLoading(false);
          setLogoData(data.result);
          // console.log(data.result);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
          setIsButtonDisable(true);
          setIsLoading(false);
        });
    }
  };

  const renderFileUploadComponent = () => {
    if (logoData !== undefined) {
      return (
        <FileUpload {...fileUploadProp} imageButton image={{ url: logoUrl }} />
      );
    } else {
      return <FileUpload {...fileUploadProp} imageButton />;
    }
  };

  return (
    <Box className={classes.root}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // height: "50px",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
          marginY: "20px",
          marginX: "20px",
          // border: "1px solid #ccc",
        }}
      >
        <Typography variant="h5" className="py-4 montserratBold">
          Change Your Logo here{" "}
        </Typography>
        <Typography variant="body1" className="py-4 montserratRegular">
          Drag and drop your logo here or click to upload
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          marginBottom: "16px",
        }}
      >
        {successMessage !== "" ? (
          <Alert severity="success">{successMessage}</Alert>
        ) : null}
        {errorMessage !== "" ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : null}
      </Box>
      {renderFileUploadComponent()}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          // alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {!isLoading ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              handleSubmit(file);
            }}
            disabled={isButtonDisable}
          >
            Update
          </button>
        ) : (
          <button className="btn btn-outline-dark btn-loading">
            <span
              className="w-4 h-4 spinner"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="pl-1">Loading...</span>
          </button>
        )}
      </Box>
    </Box>
  );
};

export default LogoChange;
