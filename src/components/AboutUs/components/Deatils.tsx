import { CircularProgress } from "@mui/material";
import React from "react";
import { getAllCompanyInfo } from "../../../api/apiAdminCompany";
const AboutDetails = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = React.useState<any>(null);
  const [companyId, setCompanyId] = React.useState<number>(0);

  React.useEffect(() => {
    setIsLoading(true);
    getAllCompanyInfo()
      .then((res) => {
        setCompanyDetails(res.data.data);
        setCompanyId(res.data.data.id);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [companyId]);
  return (
    <>
      {!isLoading ? (
        <div className="flex flex-wrap max-w-screen-xl pl-1 md:flex-row md:px-8">
          <div className="w-full  md:w-1/2 bg-cyan-300">
            <p className="p-4 text-xl text-center  text-gray-800 md:text-2xl font-montserrat font-semibold">
              {companyDetails && companyDetails.title}
            </p>
            <div className="text-left">
              <p className="p-6 pt-0 mb-4 leading-normal text-md leading-8 text-left text-gray-600 font-montserrat">
                {companyDetails && companyDetails.description}
              </p>
            </div>
          </div>
          {/* about image */}
          <div className="w-full h-full md:w-1/2">
            <div className="flex justify-end">
              <img
                src={companyDetails && companyDetails.image_link}
                className="w-full"
                alt="aboutimg"
              />
            </div>
          </div>
          {/* end of about image */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-8">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default AboutDetails;
