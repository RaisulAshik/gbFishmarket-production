import * as React from "react";
import { Formik, FormikHelpers } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { addBanner } from "../../../../api/apiAdminDashboard";
import FileUpload, { FileUploadProps } from "../../components/FileUpload";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  // p: 4,
};

interface ModalProps {
  show: boolean;
  close: any;
}

export type FormValues = {
  name: string;
  title: string;
  description: string;
  file_link: string;
  show_on_home: boolean;
};

const AddBannerModal: React.FC<ModalProps> = (props) => {
  const { show, close } = props;

  const [notify, setNotify] = React.useState(false);
  const [closeModal, setClose] = React.useState(false);
  const [file, setFile] = React.useState<File>();
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setIsLoading] = React.useState<boolean>(false);
  //   const handleClose = () => setOpen(false);

  const getFormData = (object: FormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  const handleSubmit = (values: FormValues) => {
    setIsLoading(true);
    const productFile = getFormData(values);
    if (file) productFile.append("file", file);
    addBanner(productFile)
      .then((res) => res.data)
      .then((data) => {
        setIsLoading(false);
        setNotify(true);
        setSuccess(data.message);
        // settimeout to clear the success message
        setTimeout(() => {
          //   close;
          setSuccess("");
          setClose(close);
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
        // settimeout to clear the error message
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <Modal
      open={show}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card>
          <CardActions style={{ justifyContent: "end" }}>
            <Button onClick={close}>X</Button>
          </CardActions>
          {success?.length > 0 && (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={notify} autoHideDuration={6000} onClose={close}>
              <Alert
                onClose={close}
                severity="success"
                sx={{ width: "100%" }}
              >
                Banner is successfully added
              </Alert>
            </Snackbar>
          )}
          {error?.length > 0 && <Alert severity="error">{error}</Alert>}
          <CardContent>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ pl: 2 }}
            >
              Add New Banner
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Formik
                initialValues={{
                  name: "",
                  title: "",
                  description: "",
                  file_link: "",
                  show_on_home: false,
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
                        setFieldValue("file_link", event.target.files[0].name);
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
                        <TextField
                          label="Title"
                          name="title"
                          value={values.title}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              title: e.target.value,
                            })
                          }
                          error={touched.title && !!errors.title}
                          helperText={errors.title}
                        />
                        <TextField
                          label="name"
                          name="name"
                          value={values.name}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              name: e.target.value,
                            })
                          }
                          error={touched.name && !!errors.name}
                          helperText={errors.name}
                        />
                        <TextField
                          label="Description"
                          name="description"
                          multiline
                          rows={4}
                          value={values.description}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              description: e.target.value,
                            })
                          }
                          error={touched.description && !!errors.description}
                          helperText={errors.description}
                        />
                        <FormControlLabel
                          label="Show on Home"
                          control={
                            <Checkbox
                              checked={values.show_on_home}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setValues({
                                  ...values,
                                  show_on_home: e.target.checked,
                                });
                              }}
                            />
                          }
                        />
                        <Box className="flex items-center justify-center w-full border-2 border-black rounded-md">
                          <FileUpload
                            {...fileUploadProp}
                            imageButton
                            height="100px"
                            width="750px"
                          />
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
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default AddBannerModal;
