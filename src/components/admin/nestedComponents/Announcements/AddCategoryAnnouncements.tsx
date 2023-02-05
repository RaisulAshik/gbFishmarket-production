import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Formik, FormikHelpers } from "formik";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as Yup from "yup";
import FileUpload, { FileUploadProps } from "../../components/FileUpload";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../../../utils/auth";
import { Checkbox, FormControlLabel } from "@mui/material";
import { createAnnouncementCategory } from "../../../../api/apiAdminAnnouncement";

export interface ICategoryFormValues {
  title: string;
  image_name: string;
  show_on_home: boolean;
}

export default function AddAnnouncementCategory() {
  const [file, setFile] = useState<File>();
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const getFormData = (object: ICategoryFormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  const handleCategorySubmit = (
    values: ICategoryFormValues,
    resetForm: () => void
  ): void => {
    const token: string = userInfo().token;
    const categoryFile = getFormData(values);
    if (file) categoryFile.append("file", file);
    createAnnouncementCategory(categoryFile, token)
      .then((res) => res.data)
      .then((data) => {
        setSuccess(data.message);
        resetForm();
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/announcement/category");
        }, 3000);
      })
      .catch((err) => {
        // setError(err.response.data.message);
        console.log(err);
        // settimeout to clear the error message
        // setTimeout(() => {
        //   setError("");
        // }, 3000);
      });
  };
  return (
    <Box className="p-4 mt-4 border-2 border-gray-400 rounded-md">
      <div className="flex flex-row items-center justify-start p-2 ml-8 text-indigo-500">
        <button
          className="btn btn-light-secondary btn-sm mr-28"
          onClick={() => navigate("/admin/announcement/category")}
        >
          Go back
        </button>
        <Typography variant="h6" className="" gutterBottom>
          Add New Announcement Category
        </Typography>
      </div>
      <Divider />
      <hr className="mt-4" />
      {success && (
        <div className="my-4 text-green-800 bg-green-100 alert" role="alert">
          {success}
        </div>
      )}
      {error && (
        <div className="my-4 text-red-700 bg-red-100 alert " role="alert">
          {error}
        </div>
      )}
      <Snackbar open={!!success} autoHideDuration={3000}>
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={3000}>
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Box>
        <Formik
          initialValues={{
            title: "",
            image_name: "",
            show_on_home: false,
          }}
          // validationSchema={validationSchema}
          onSubmit={(
            values: ICategoryFormValues,
            { setSubmitting, resetForm }: FormikHelpers<ICategoryFormValues>
          ) => {
            handleCategorySubmit(values, resetForm);
            setSubmitting(false);
          }}
        >
          {({
            values,
            setValues,
            setFieldValue,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => {
            const fileUploadProp: FileUploadProps = {
              accept: "image/*",
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                if (
                  event.target.files !== null &&
                  event.target?.files?.length > 0
                ) {
                  setFieldValue("image_name", event.target.files[0].name);
                  setFile(event.target.files[0]);
                }
              },
              onDrop: (event: React.DragEvent<HTMLElement>) => {
                setFieldValue("image_name", event.dataTransfer.files[0].name);
                setFile(event.dataTransfer.files[0]);
              },
            };
            return (
              <>
                <Stack className="w-full" spacing={2}>
                  <TextField
                    label="Name"
                    name="name"
                    value={values.title}
                    onChange={(e) =>
                      setValues({ ...values, title: e.target.value })
                    }
                  />
                  <hr className="mt-4" />
                  <FormControlLabel
                    label="Show on Home"
                    control={
                      <Checkbox
                        checked={values.show_on_home}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setValues({
                            ...values,
                            show_on_home: e.target.checked,
                          });
                        }}
                      />
                    }
                  />
                  <hr className="mt-4" />
                </Stack>
                <Stack spacing={2}>
                  <Box className="flex items-center justify-center border-2 border-gray-300 rounded-md">
                    <FileUpload
                      {...fileUploadProp}
                      imageButton
                      height="150px"
                      width="600px"
                    />
                  </Box>
                </Stack>
                <div className="m-4">
                  <button
                    type="submit"
                    className="btn btn-outline-dark"
                    onClick={() => handleSubmit()}
                  >
                    Create
                  </button>
                </div>
              </>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
}
