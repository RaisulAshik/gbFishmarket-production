import { CircularProgress } from "@mui/material";
import React from "react";
import { getAllCompanyInfo } from "../../../api/apiAdminCompany";

const CompanyPhilosophy = () => {
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
        <div className="max-w-screen-xl  md:px-8 bg-cyan-300">
          <h5 className="p-4 text-xl font-montserrat font-semibold text-center">
            {" "}
            Company Philosophy
          </h5>
          <div className="w-full px-4 ">
            <div className="text-left">
              <p className="mb-4 text-lg leading-8 text-left text-gray-600 font-montserrat">
                {/* {companyDetails && companyDetails.mission_description} */}
                1) The Older, The Wiser With our 30years of experience as a
                leading importer, exporter and distributor of seafood products.
                Our experience in the industry and vast distribution network
                built over decades of business operations allow us to procure
                products of the highest quaity for our customers.
              </p>
              <p className="mb-4 text-lg leading-8 text-left text-gray-600 font-montserrat">
                2) SimplyPremium Lam Kee Fisheries’s products are sourced
                internationally across the globe offering a curated range of
                premium seafood products such as Chilean Sea Bass, Black Cod,
                Russian King Crabs and Hokkaido Scallops; just to name a few. We
                strive to serve with the best sourcing practices and highly
                sustainable quality products for our customers.
              </p>
              <p className="mb-4 text-lg leading-8 text-left text-gray-600 font-montserrat">
                3) Cutting Edge Constantly challenging ourselves to be at the
                forefront of the seafood industry, Lam Kee Fisheries with its
                strong belief, continually invests in its people, business
                processes and infrastructure. Emphasis on human capital
                development and infrastructure facilities ensure that we have
                what it takes to meet our customers’ needs.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-8">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default CompanyPhilosophy;
