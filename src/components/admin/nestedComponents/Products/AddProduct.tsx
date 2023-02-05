import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FileUpload, { FileUploadProps } from "../../components/FileUpload";
import { addProduct } from "../../../../api/apiAdminProducts";
import { userInfo } from "../../../../utils/auth";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getProductCategories } from "../../../../api/apiAdminProducts";
import { Editor } from "@tinymce/tinymce-react";

export type FormValues = {
  title: string;
  subtitle: string;
  long_description: string;
  short_description: string;
  image_name: string;
  show_on_home: boolean;
  category_id?: string | undefined;
};
/*
 @ todo :
  1. Add validation brfore submit to server
 2. Success and error message on submit or failed on submit respectively(done)()
*/
const AddProduct = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File>();
  const [success, setSuccess] = useState<string>("");
  const [productCategory, setProductCategory] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getProductCategories()
      .then((res) => res.data)
      .then((data) => {
        let categoeyData = data.categoryProducts.map(
          (c: { id: any; title: any }) => ({ id: c.id, title: c.title })
        );
        setProductCategory(categoeyData);
      })
      .catch((err) => console.log(err));
  }, []);

  const getFormData = (object: FormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  const handleProductSubmit = (values: FormValues) => {
    setIsLoading(true);
    const token = userInfo().token as string;
    const productFile = getFormData(values);
    if (file) productFile.append("file", file);
    addProduct(productFile, token)
      .then((res) => res.data)
      .then((data) => {
        setIsLoading(false);
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/products");
        }, 2500);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <Container maxWidth="lg">
      {/* Note: it would be nice to have this section modularized and reused */}
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

      <Formik
        initialValues={{
          title: "",
          subtitle: "",
          long_description: "",
          short_description: "",
          image_name: "",
          show_on_home: false,
          category_id: "",
        }}
        onSubmit={(values: FormValues, { setSubmitting, resetForm }) => {
          handleProductSubmit(values);
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
            <Box className="w-full p-4 ">
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={(e) =>
                    setValues({ ...values, title: e.target.value })
                  }
                  error={touched.title && !!errors.title}
                  helperText={errors.title}
                />
                <TextField
                  label="Subtitle"
                  name="subtitle"
                  value={values.subtitle}
                  onChange={(e) =>
                    setValues({ ...values, subtitle: e.target.value })
                  }
                  error={touched.subtitle && !!errors.subtitle}
                  helperText={errors.subtitle}
                />
                {/* <TextField
                  label="Long Description"
                  name="long_description"
                  multiline
                  rows={4}
                  value={values.long_description}
                  onChange={(e) =>
                    setValues({ ...values, long_description: e.target.value })
                  }
                  error={touched.long_description && !!errors.long_description}
                  helperText={errors.long_description}
                /> */}

                <Editor
                  initialValue={values.long_description}
                  init={{
                    plugins: "link image code",
                    toolbar:
                      "undo redo | bold italic | alignleft aligncenter alignright | code",
                  }}
                  onChange={(event) => {
                    setValues({
                      ...values,
                      long_description: event.target.getContent(),
                    });
                  }}
                />
                <TextField
                  label="Short Description"
                  name="short_description"
                  multiline
                  rows={2}
                  value={values.short_description}
                  onChange={(e) =>
                    setValues({ ...values, short_description: e.target.value })
                  }
                  error={
                    touched.short_description && !!errors.short_description
                  }
                  helperText={errors.short_description}
                />
                <Stack direction="row" justifyContent="space-between">
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
                  {!loading && (
                    <FormControl className="w-1/2">
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Category"
                        value={values.category_id}
                        onChange={(event: SelectChangeEvent<string>) => {
                          setValues({
                            ...values,
                            category_id: event.target.value,
                          });
                        }}
                      >
                        <MenuItem value="">No category</MenuItem>
                        {productCategory.length > 0 &&
                          productCategory.map((c) => (
                            <MenuItem value={c.id} key={c.id}>
                              {c.title}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </Stack>
                <Box className="flex items-center justify-center w-full border-2 border-black rounded-md">
                  <FileUpload
                    {...fileUploadProp}
                    imageButton
                    height="550px"
                    width="750px"
                  />
                </Box>
              </Stack>
              <Box className="flex items-center justify-start w-full mt-4">
                <Button
                  className="h-12 py-4 w-28"
                  // type="submit"
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
    </Container>
  );
};

export default AddProduct;
