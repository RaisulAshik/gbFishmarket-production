import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import FileUpload, { FileUploadProps } from "../../components/FileUpload";
import {
  getClientById,
  updateClientById,
} from "../../../../api/apiAdminClient";
import { userInfo } from "../../../../utils/auth";
import { IClient } from "./AllClients";
import { IClientFormValues } from "./AddClient";

const EditClients: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<IClient>({} as IClient);
  const [file, setFile] = useState<File>();
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    name,
    company_name,
    company_description,
    location_address,
    location_lat,
    location_long,
    logo_image_link,
    logo_image_name,
  } = client;

  const getFormData = (object: IClientFormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  const handleClientSubmit = (values: IClientFormValues) => {
    const token: string = userInfo().token;
    const clientFile = getFormData(values);
    if (file) clientFile.append("file", file);
    id &&
      updateClientById(parseInt(id), clientFile, token)
        .then((res) => res.data)
        .then((data) => {
          // setIsLoading(false);
          setSuccess("Client updated successfully");
          setTimeout(() => {
            setSuccess("");
            navigate("/admin/clients");
          }, 3000);
        })
        .catch((err) => {
          // console.log(err);
          // setIsLoading(false);
          setError(err.response.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
  };

  useEffect((): void => {
    setIsLoading(true);
    id &&
      getClientById(parseInt(id))
        .then((res) => res.data)
        .then((data) => {
          setClient(data.client);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
  }, []);
  return (
    <Container maxWidth="lg">
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
      <Snackbar open={!!success} autoHideDuration={6000}>
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      {!isLoading && (
        <Formik
          initialValues={{
            name: name,
            company_name: company_name,
            location_lat: location_lat ? location_lat.toString() : "",
            location_long: location_long ? location_long.toString() : "",
            location_address: location_address,
            company_description: company_description,
            logo_image_name: logo_image_name,
          }}
          onSubmit={(values: IClientFormValues, { resetForm }) => {
            handleClientSubmit(values);
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
                  setFieldValue("logo_image_name", event.target.files[0].name);
                  setFile(event.target.files[0]);
                }
              },
              onDrop: (event: React.DragEvent<HTMLElement>) => {
                setFieldValue(
                  "logo_image_name",
                  event.dataTransfer.files[0].name
                );
                setFile(event.dataTransfer.files[0]);
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
                      image={{ url: `${logo_image_link}` }}
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
      )}
    </Container>
  );
};

export default EditClients;
