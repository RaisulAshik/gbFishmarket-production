import { CircularProgress } from "@mui/material";
import React from "react";
import { getAllCompanyInfo } from "../../../api/apiAdminCompany";

const MessageFromCEO = () => {
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
        <>
          <div className="flex flex-col items-center w-full max-w-screen-xl p-6 pt-0 justify-items-center md:flex-row md:items-start md:justify-center md:mx-auto">
            {/* history image */}
            <div className="w-5/6 h-full py-6 pt-0 mx-auto md:w-1/2">
              <div className="flex justify-start">
                <img
                  src={companyDetails && companyDetails.ceo_message_image_link}
                  className="w-full"
                  alt="aboutimg"
                />
              </div>
            </div>
            <div className="w-full bg-cyan-300 pl-2 pr-4 pt-0 md:w-1/2">
              <p className="p-4 text-xl text-center text-gray-800 md:text-2xl font-montserrat  font-semibold">
                {companyDetails && companyDetails.ceo_message_title}
              </p>
              <div className="text-left">
                <p className="p-6 pt-0 mb-4 leading-normal text-md leading-8 text-left text-gray-600 font-montserrat">
                  {companyDetails && companyDetails.ceo_message_description}
                </p>
              </div>
            </div>
            {/* end of history bok bok */}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-8">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default MessageFromCEO;
