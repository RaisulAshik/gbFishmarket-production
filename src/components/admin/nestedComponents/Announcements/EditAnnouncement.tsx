import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import FileUpload, { FileUploadProps } from "../../components/FileUpload";
import {
  getAnnouncementsById,
  updateAnnouncementsById,
} from "../../../../api/apiAdminDashboard";
import { IAnnouncement } from "../../AdminAnnouncement";
import { userInfo } from "../../../../utils/auth";
import { Formik, FormikHelpers } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { IAnnouncementFormValues } from "./AddAnnouncement";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { getAnnouncementCategories } from "../../../../api/apiAdminAnnouncement";
import { Editor } from "@tinymce/tinymce-react";

interface ICategory {
  id: number;
  title: string;
  image_name: string;
  image_link: string;
  show_on_home: boolean;
}
const EditAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //states
  const [announcement, setAnnouncement] = useState<IAnnouncement>(
    {} as IAnnouncement
  );
  const [file, setFile] = useState<File>();
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState<string>("");

  //effects
  useEffect(() => {
    setIsLoading(true);
    id &&
      getAnnouncementsById(parseInt(id))
        .then((res) => res.data)
        .then((data) => {
          setAnnouncement(data.result);
          setCategory(data.result.category.id);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setTimeout(() => {
            setError("");
          }, 2500);
        });
    return () => {
      setAnnouncement({} as IAnnouncement);
      setIsLoading(false);
    };
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    getAnnouncementCategories()
      .then((res) => {
        setAllCategories(res.data.categoryAnnouncements);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
    return () => {
      setAllCategories([]);
      setIsLoading(false);
    };
  }, []);

  const getFormData = (object: IAnnouncementFormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  const handleAnnouncementUpdate = (values: IAnnouncementFormValues) => {
    setIsLoading(true);
    const token = userInfo().token as string;
    const announcementFile = getFormData(values);
    if (file) announcementFile.append("file", file);
    id &&
      updateAnnouncementsById(parseInt(id), announcementFile, token)
        .then((res) => res.data)
        .then((data) => {
          setIsLoading(false);
          setAnnouncement(data.result);
          setSuccess(data.message);
          setTimeout(() => {
            setSuccess("");
            navigate("/admin/announcement");
          }, 2500);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data.message);
          setTimeout(() => {
            setError("");
          }, 2500);
        });
  };
  const { title, short_description, image_link } = announcement;
  return (
    <Container maxWidth="lg">
      <div className="flex flex-row my-4 text-indigo-500 ">
        <button
          className="btn btn-light-secondary btn-sm mr-28"
          onClick={() => navigate("/admin/announcement")}
        >
          <ArrowBackIosNewOutlinedIcon /> Go back
        </button>
        <Typography variant="h6" className="" gutterBottom>
          Edit Announcement
        </Typography>
      </div>
      <Divider />
      <>
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
      </>
      {console.log("announcement", category)}

      {/* formik form  */}
      {!isLoading ? (
        <Formik
          initialValues={{
            title: title,
            short_description: short_description,
            announcementCategory_id: category,
            image_name: "",
          }}
          onSubmit={(
            values,
            { setSubmitting, resetForm }: FormikHelpers<IAnnouncementFormValues>
          ) => {
            handleAnnouncementUpdate(values);
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
                <Box className="w-full p-4">
                  <Stack spacing={3}>
                    <Select
                      labelId="demo-simple-select-label"
                      name="announcementCategory_id"
                      label="Announcement Category"
                      value={values.announcementCategory_id}
                      onChange={(event) => {
                        setValues({
                          ...values,
                          announcementCategory_id: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {allCategories.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      label="Title"
                      name="title"
                      value={values.title}
                      onChange={(event) => {
                        setValues({ ...values, title: event.target.value });
                      }}
                      error={touched.title && !!errors.title}
                      helperText={touched.title && errors.title}
                      variant="outlined"
                      fullWidth
                    />
                    <Editor
                      initialValue={values.short_description}
                      init={{
                        plugins: "link image code",
                        toolbar:
                          "undo redo | bold italic | alignleft aligncenter alignright | code",
                      }}
                      onChange={(event) => {
                        setValues({
                          ...values,
                          short_description: event.target.getContent(),
                        });
                      }}
                    />
                    {/* <TextField
                      label="Short Description"
                      name="short_description"
                      multiline
                      rows={8}
                      value={values.short_description}
                      onChange={(event) => {
                        setValues({
                          ...values,
                          short_description: event.target.value,
                        });
                      }}
                      error={
                        touched.short_description && !!errors.short_description
                      }
                      helperText={
                        touched.short_description && errors.short_description
                      }
                      variant="outlined"
                      fullWidth
                    /> */}

                    <div>hover over the image and click to upload</div>
                    <Box className="flex items-center justify-center w-full border-2 border-black rounded-md">
                      {image_link && (
                        <FileUpload
                          {...fileUploadProp}
                          imageButton
                          height="450px"
                          width="750px"
                          image={{ url: `${image_link}` }}
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
                      update
                    </Button>
                  </Box>
                </Box>
              </>
            );
          }}
        </Formik>
      ) : (
        // loading spinner
        <div className="flex flex-col items-center justify-center w-full py-8">
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default EditAnnouncement;
