const Teams = () => {
  return (
    <div className="py-6 bg-white sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 mx-auto md:px-8">
        {/* <!-- text - start --> */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-[#b8cc08] font-montserrat font-semibold text-center lg:text-5xl md:mb-6">
            Meet our Team
          </h2>

          <p className="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.
          </p>
        </div>
        {/* <!-- text - end --> */}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-6 sm:gap-y-8 lg:gap-y-12">
          {/* <!-- person - start --> */}
          <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
            <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-full shadow-lg md:w-32 md:h-32">
              <img
                src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256"
                loading="lazy"
                alt="Photo by Radu Florin"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div>
              <div className="font-bold text-center text-indigo-500 md:text-lg sm:text-left">
                John McCulling
              </div>
              <p className="text-sm text-center text-gray-500 md:text-base sm:text-left">
                Founder / CEO
              </p>
            </div>
          </div>
          {/* <!-- person - end --> */}

          {/* <!-- person - start --> */}
          <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
            <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-full shadow-lg md:w-32 md:h-32">
              <img
                src="https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?auto=format&q=75&fit=crop&w=256"
                loading="lazy"
                alt="Photo by christian ferrer"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div>
              <div className="font-bold text-center text-indigo-500 md:text-lg sm:text-left">
                Kate Berg
              </div>
              <p className="text-sm text-center text-gray-500 md:text-base sm:text-left">
                CFO
              </p>
            </div>
          </div>
          {/* <!-- person - end --> */}

          {/* <!-- person - start --> */}
          <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
            <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-full shadow-lg md:w-32 md:h-32">
              <img
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&q=75&fit=crop&w=256"
                loading="lazy"
                alt="Photo by Ayo Ogunseinde"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div>
              <div className="font-bold text-center text-indigo-500 md:text-lg sm:text-left">
                Greg Jackson
              </div>
              <p className="text-sm text-center text-gray-500 md:text-base sm:text-left">
                CTO
              </p>
            </div>
          </div>
          {/* <!-- person - end --> */}

          {/* <!-- person - start --> */}
          <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
            <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-full shadow-lg md:w-32 md:h-32">
              <img
                src="https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?auto=format&q=75&fit=crop&w=256"
                loading="lazy"
                alt="Photo by Midas Hofstra"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div>
              <div className="font-bold text-center text-indigo-500 md:text-lg sm:text-left">
                Robert Greyson
              </div>
              <p className="text-sm text-center text-gray-500 md:text-base sm:text-left">
                Creative Director
              </p>
            </div>
          </div>
          {/* <!-- person - end --> */}

          {/* <!-- person - start --> */}
          <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
            <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-full shadow-lg md:w-32 md:h-32">
              <img
                src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&q=75&fit=crop&w=256"
                loading="lazy"
                alt="Photo by Elizeu Dias"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div>
              <div className="font-bold text-center text-indigo-500 md:text-lg sm:text-left">
                John Roberts
              </div>
              <p className="text-sm text-center text-gray-500 md:text-base sm:text-left">
                Investor Relations
              </p>
            </div>
          </div>
          {/* <!-- person - end --> */}

          {/* <!-- person - start --> */}
          <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
            <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-full shadow-lg md:w-32 md:h-32">
              <img
                src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&q=75&fit=crop&w=256"
                loading="lazy"
                alt="Photo by Matheus Ferrero"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div>
              <div className="font-bold text-center text-indigo-500 md:text-lg sm:text-left">
                Judy Amandez
              </div>
              <p className="text-sm text-center text-gray-500 md:text-base sm:text-left">
                Senior Art Director
              </p>
            </div>
          </div>
          {/* <!-- person - end --> */}
        </div>
      </div>
    </div>
  );
};
export default Teams;
