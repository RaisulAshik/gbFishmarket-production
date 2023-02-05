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
import { createClient } from "../../../../api/apiAdminClient";
import { userInfo } from "../../../../utils/auth";
const useStyles = createUseStyles({
  modal: {
    position: "absolute" as "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "1px solid #ccc",
    boxShadow: 24,
  },
});

export interface IClientFormValues {
  name: string;
  company_name: string;
  location_lat: string;
  location_long: string;
  location_address: string;
  company_description: string;
  logo_image_name: string;
}

const AddClient: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const getFormData = (object: IClientFormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  //
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "must be atleast four")
      .required("Name is required"),
    company_name: Yup.string()
      .min(4, "must be atleast four")
      .required("Company name is required"),
    location_lat: Yup.number().required("Location latitude is required"),
    location_long: Yup.number().required("Location longitude is required"),
    location_address: Yup.string()
      .min(4, "must be atleast four")
      .required("Location address is required"),
    company_description: Yup.string()
      .min(4, "must be atleast four")
      .required("Company description is required"),
  });

  //
  const handleClientSubmit = (values: IClientFormValues) => {
    const token: string = userInfo().token;
    const clientFile = getFormData(values);
    if (file) clientFile.append("file", file);
    createClient(clientFile, token)
      .then((res) => res.data)
      .then((data) => {
        // settimeout to clear the success message
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/clients");
        }, 3000);
      })
      .catch((err) => {
        setError(err.response.data.message);
        // settimeout to clear the error message
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <Box className="p-4 mt-4 border-2 border-gray-400 rounded-md">
      <div className="flex flex-row items-center justify-start p-2 ml-8 text-indigo-500">
        <button
          className="btn btn-light-secondary btn-sm mr-28"
          onClick={() => navigate("/admin/clients")}
        >
          Go back
        </button>
        <Typography variant="h6" className="" gutterBottom>
          Add New Client
        </Typography>
      </div>
      <Divider />
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
            name: "",
            company_name: "",
            location_lat: "",
            location_long: "",
            location_address: "",
            company_description: "",
            logo_image_name: "",
          }}
          // validationSchema={validationSchema}
          onSubmit={(
            values: IClientFormValues,
            { setSubmitting, resetForm }: FormikHelpers<IClientFormValues>
          ) => {
            handleClientSubmit(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({
            values,
            setValues,
            isSubmitting,
            touched,
            errors,
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
                  // console.log(event.target.files[0]);
                  // console.log(`Saving ${event.target.value}`);
                  setFieldValue("logo_image_name", event.target.files[0].name);
                  setFile(event.target.files[0]);
                  // console.log(file);
                  // setIsButtonDisable(false);
                }
              },
              onDrop: (event: React.DragEvent<HTMLElement>) => {
                // console.log(`Drop ${event.dataTransfer.files[0].name}`);
                // console.log(event.dataTransfer.files);
                // file = event.dataTransfer.files[0];
                setFieldValue(
                  "logo_image_name",
                  event.dataTransfer.files[0].name
                );
                setFile(event.dataTransfer.files[0]);
                // setIsButtonDisable(false);
              },
            };
            return (
              <>
                <Stack className="w-full" spacing={2}>
                  <TextField
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                  <TextField
                    label="Company Name"
                    name="company_name"
                    value={values.company_name}
                    onChange={(e) =>
                      setValues({ ...values, company_name: e.target.value })
                    }
                  />
                </Stack>
                <Box className="flex flex-row justify-start w-full py-4">
                  <TextField
                    label="Location Latitude"
                    name="location_lat"
                    type="number"
                    value={values.location_lat}
                    onChange={(e) =>
                      setValues({ ...values, location_lat: e.target.value })
                    }
                  />
                  <div className="w-1/6"></div>
                  <TextField
                    label="Location Longitude"
                    type="number"
                    name="location_long"
                    value={values.location_long}
                    onChange={(e) =>
                      setValues({ ...values, location_long: e.target.value })
                    }
                  />
                </Box>
                <Stack spacing={2}>
                  <TextField
                    label="Location Address"
                    name="location_address"
                    value={values.location_address}
                    onChange={(e) =>
                      setValues({ ...values, location_address: e.target.value })
                    }
                  />
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
};

export default AddClient;
