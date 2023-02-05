import { Link } from "react-router-dom";

// a footer component with a copyright notice and links to the privacy policy and terms of use  and site map in tailwind css
// Language: typescript
// Path: src\components\Footer\Footer.tsx

/*
Todo:
break the footer into multiple components

*/

const Footer = () => {
  const yearDate = new Date();
  return (
    <div className="bg-gray-900">
      <footer className="flex flex-row justify-between max-w-screen-xl px-8 mx-auto text-sm text-gray-500 xl:px-32 lg:px-24 md:px-12 sm:px-8 font-montserrat ">
        <div className="grid pt-10 mb-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:pt-24">
          {/* start of first column */}
          <div className="">
            {/* <!-- logo - start --> */}
            <div className="mb-4 lg:-mt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xl font-bold text-gray-100 md:text-2xl"
                aria-label="logo"
              >
                {/* <svg
                  width="95"
                  height="94"
                  viewBox="0 0 95 94"
                  className="w-5 h-auto text-indigo-500"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                </svg>
                Flowrift */}
                <img
                  src={require("../../assets/img/logo.PNG")}
                  alt="LOGO"
                  className="h-20 "
                />
              </Link>
            </div>
            {/* <!-- logo - end --> */}
          </div>
          {/* end of first column */}
          {/* <!-- nav - start --> */}
          <div className="mb-4">
            <div className="mb-4 font-semibold tracking-widest text-gray-100 uppercase font-montserrat">
              About Us
            </div>

            <p>
              Lam Kee Fisheries is a family based business. It has worked in the
              fisheries industry for over 25 years
            </p>
          </div>
          {/* <!-- nav - end --> */}

          {/* <!-- nav - start --> */}
          <div className="mb-4">
            <div className="mb-4 font-bold tracking-widest text-gray-100 uppercase">
              Links
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="">
                <div className="">
                  <Link to={"/"}>. Home</Link>
                </div>
                <div className="">
                  <Link to={"/products"}>. Products</Link>
                </div>
              </div>
              <div className="">
                <div className="">
                  <Link to={"/about-us"}>. About Us</Link>
                </div>
                <Link to={"/contact-us"}>. Contact Us</Link>
              </div>
            </div>
            <div className="">
              <Link to={"/announcements"}>. Announcements</Link>
            </div>
          </div>
          {/* <!-- nav - end --> */}

          {/* <!-- nav - start --> */}
          <div className="mb-4">
            <div className="mb-4 font-bold tracking-widest text-gray-100 uppercase">
              Contact Us
            </div>
            <p>
              Call us at +880-171-259-3474
              <div>Shreefaltola,C7G7+CM Monipur,khulna</div>
              <div>goldenbough.bd@gmail.com</div>
            </p>
          </div>
          {/* <!-- nav - end --> */}
        </div>
      </footer>
      <div className="py-8 text-sm text-center text-gray-400 border-t border-gray-800">
        {`© ${yearDate.getFullYear()} - Golden Bourgh Aquaculture Ltd. All rights reserved.`}
      </div>
    </div>
  );
};

export default Footer;
