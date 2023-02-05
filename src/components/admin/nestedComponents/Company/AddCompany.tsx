import React from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  addCompanyInfo,
  getAllCompanyInfo,
  updateCompanyInfo,
} from "../../../../api/apiAdminCompany";
import { userInfo } from "../../../../utils/auth";
import { ICompany } from "./data";

export type FormValues = {
  short_description: string;
  address: string;
  email: string;
  phone: string;
};

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

const AddCompany = () => {
  const [loading, setIsLoading] = React.useState<boolean>(false);
  
  const [companyId, setCompanyId] = React.useState<number>(0);
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const getFormData = (object: FormValues): FormData =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key as keyof object]);
      return formData;
    }, new FormData());

  React.useEffect(() => {
    setIsLoading(true);
    getAllCompanyInfo()
      .then((res) => res.data)
      .then((res) => {
        formik.setValues({
          short_description: res.data.short_description,
          address: res.data.address,
          email: res.data.email,
          phone: res.data.phone,
        });
        setCompanyId(res.data.id);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [companyId]);


  const formik = useFormik({
    initialValues: {
      phone:  "",
      address: "",
      email:  "",
      short_description: "",
    },
    onSubmit: (values: FormValues, { resetForm }) => {
      console.log(values);
      const finalValues = getFormData(values);
      const token = userInfo().token as string;
      if (companyId) {
        updateCompanyInfo(finalValues, companyId, token)
          .then((res) => {
            setIsLoading(false);
            setSuccess("Company info updated successfully");
          })
          .catch((err: any) => {
            setIsLoading(false);
            setError(err.response.data.error);
          });
      } else {
        addCompanyInfo(finalValues, token)
          .then((res) => {
            console.log(res);
            resetForm();
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    },
    validationSchema: schema,
  });


  return (
    <Box>
      <Box className="w-full p-4 ">
        {/* {companyId ? ( */}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Company Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              fullWidth
              id="short_description"
              name="short_description"
              label="Company Short Description"
              multiline
              rows={4}
              value={formik.values.short_description}
              onChange={formik.handleChange}
              error={
                formik.touched.short_description &&
                Boolean(formik.errors.short_description)
              }
              helperText={
                formik.touched.short_description &&
                formik.errors.short_description
              }
            />

            <Box className="flex items-center justify-start w-full mt-4">
              <Button
                className="h-12 py-4 w-28"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
        {/* // ):(
        //   <div className="flex flex-col items-center justify-center w-full py-8">
        //   <CircularProgress />
        // </div>
        // )} */}
        
      </Box>
    </Box>
  );
};

export default AddCompany;
