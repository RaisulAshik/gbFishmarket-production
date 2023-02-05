import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getBannerById, updateBanner } from "../../../../api/apiAdminDashboard";
import { IBanner } from "./data";
import { Formik, FormikHelpers } from "formik";
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
  editBannerShow: boolean;
  editBannerClose: any;
  editRecord: IBanner | null | undefined;
}

export type FormValues = {
  id: number;
  name: string;
  title: string;
  description: string;
  file_link: string;
  show_on_home: boolean;
};

const EditBannerModal: React.FC<ModalProps> = (props) => {
  const { editBannerShow, editBannerClose, editRecord } = props;

  const [bannerDetails, setBannerDetails] = React.useState<IBanner>();
  const [notify, setNotify] = React.useState(false);
  const [closeModal, setClose] = React.useState(false);
  const [file, setFile] = React.useState<File>();
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setIsLoading] = React.useState<boolean>(false);
  //   const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (editRecord) {
      getBannerById(editRecord?.id).then((res) => {
        setBannerDetails(res.data);
      });
    }
  }, [editRecord, editRecord?.id]);

  const getFormData = (object: FormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  const handleSubmit = (values: FormValues) => {
    setIsLoading(true);
    const productFile = getFormData(values);
    if (file) productFile.append("file", file);
    updateBanner(productFile, values?.id)
      .then((res) => res.data)
      .then((data) => {
        setIsLoading(false);
        setNotify(true);
        setSuccess(data.message);
        // settimeout to clear the success message
        setTimeout(() => {
          //   close;
          setSuccess("");
          setClose(editBannerClose);
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <Modal
      open={editBannerShow}
      onClose={editBannerClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card>
          <CardActions style={{ justifyContent: "end" }}>
            <Button onClick={editBannerClose}>X</Button>
          </CardActions>
          {success?.length > 0 && (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={notify}
              autoHideDuration={6000}
              onClose={editBannerClose}
            >
              <Alert
                onClose={editBannerClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Banner is successfully Updated
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
                  id: editRecord?.id!,
                  name: editRecord?.name!,
                  title: editRecord?.title!,
                  description: editRecord?.description!,
                  file_link: editRecord?.file_link!,
                  show_on_home: editRecord?.show_on_home!,
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
                    image: {
                      url: editRecord?.file_link
                        ? `${editRecord.file_link}`
                        : values.file_link,
                    },
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
export default EditBannerModal;
