import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Snackbar,
  Stack,
} from "@mui/material";
import { Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import FileUpload, { FileUploadProps } from "../../components/FileUpload";
import {
  getAllCompanyInfo,
  updateCompanyInfo,
} from "../../../../api/apiAdminCompany";
import { userInfo } from "../../../../utils/auth";
import { ICompany } from "./data";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.number().required("Phone Number is required").positive().integer(),
  address: Yup.string()
    .min(3)
    .max(2000)
    .required("Company address is required"),
  short_description: Yup.string().min(3).max(2000),
});

export type FormValues = {
  history_image_name: string;
  history_image_link: string;
  history_description: string;
  history_title: string;
  history_short_description: string;
};

const History = () => {
  const [success, setSuccess] = React.useState<string>("");
  const [companyId, setCompanyId] = React.useState<number>(0);
  const [error, setError] = React.useState<string>("");
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File>();
  const [companyDetails, setCompanyDetails] = React.useState<ICompany | null>(
    null
  );

  const getFormData = (object: FormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  React.useEffect(() => {
    setIsLoading(true);
    getAllCompanyInfo()
      .then((res) => {
        if (res.data.data.id === null) {
          setError("No data");
        } else {
          setCompanyDetails(res.data.data);
          setCompanyId(res.data.data.id);
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (values: FormValues) => {
    setIsLoading(true);
    const token = userInfo().token as string;
    const finalValues = getFormData(values);
    if (file) finalValues.append("history_image_link", file);
    updateCompanyInfo(finalValues, companyId, token)
      .then((res) => {
        setIsLoading(false);
        setSuccess("Company info updated successfully");
      })
      .catch((err: any) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <Box className="w-full p-4 ">
          {success && (
            <div
              className="my-4 text-green-800 bg-green-100 alert"
              role="alert"
            >
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

          {!loading && companyId ? (
            <Formik
              initialValues={{
                history_title: companyDetails?.history_title
                  ? companyDetails?.history_title
                  : "",
                history_description: companyDetails?.history_description
                  ? companyDetails?.history_description
                  : "",
                history_short_description:
                  companyDetails?.history_short_description
                    ? companyDetails?.history_short_description
                    : "",
                history_image_name: "",
                history_image_link: companyDetails?.history_image_link
                  ? companyDetails?.history_image_link
                  : "",
              }}
              onSubmit={(
                values: FormValues,
                { setSubmitting, resetForm }: FormikHelpers<FormValues>
              ) => {
                handleSubmit(values);
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
              }) => {
                const fileUploadProp: FileUploadProps = {
                  accept: "image/*",
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    if (
                      event.target.files !== null &&
                      event.target?.files?.length > 0
                    ) {
                      setFieldValue(
                        "history_image_name",
                        event.target.files[0].name
                      );
                      setFile(event.target.files[0]);
                    }
                  },
                  onDrop: (event: React.DragEvent<HTMLElement>) => {
                    setFile(event.dataTransfer.files[0]);
                  },
                };

                return (
                  <Box className="w-full p-4 ">
                    <Stack spacing={2}>
                      {console.log(values)}
                      <TextField
                        label="Title"
                        name="history_title"
                        value={values.history_title}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            history_title: e.target.value,
                          })
                        }
                        error={touched.history_title && !!errors.history_title}
                        helperText={errors.history_title}
                      />
                      <TextField
                        label="Description"
                        name="history_description"
                        multiline
                        rows={8}
                        value={values.history_description}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            history_description: e.target.value,
                          })
                        }
                        error={
                          touched.history_description &&
                          !!errors.history_description
                        }
                        helperText={errors.history_description}
                      />
                      <TextField
                        label="Short Description"
                        name="history_short_description"
                        multiline
                        rows={8}
                        value={values.history_short_description}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            history_short_description: e.target.value,
                          })
                        }
                        error={
                          touched.history_short_description &&
                          !!errors.history_short_description
                        }
                        helperText={errors.history_short_description}
                      />

                      <Box className="flex items-center justify-center w-full border-2 border-black rounded-md">
                        {companyDetails?.history_image_link ? (
                          <FileUpload
                          {...fileUploadProp}
                          imageButton
                          height="100px"
                          width="750px"
                          image={{url:`${companyDetails?.history_image_link}`}}
                        />) : (
                          <FileUpload
                          {...fileUploadProp}
                          imageButton
                          height="100px"
                          width="750px"
                        />
                        )}
                      </Box>
                    </Stack>
                    <Box className="flex items-center justify-start w-full mt-4">
                      <Button
                        className="h-12 py-4 w-28"
                        type="submit"
                        variant="contained"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                );
              }}
            </Formik>
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-8">
              <CircularProgress />
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default History;
