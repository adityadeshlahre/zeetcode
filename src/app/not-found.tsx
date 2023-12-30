import type { NextPage } from "next";
import NextLink from "next/link";

import SEO from "../components/seo";

const PageNotFound: NextPage = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        url="https://github.com/adityadeshlahre"
        description="Uh oh! Either I have done something wrong or you have tried to do something cheeky."
      />

      <div className="flex h-96 flex-col items-center justify-center">
        <h1 className="text-black-300 mb-2 text-center text-4xl">Uh oh!</h1>
        <h2 className="text-black-300 mb-6 w-1/2 text-center text-3xl">
          Either I have done something wrong or you have tried to do something
          cheeky.
        </h2>

        <NextLink
          href="/"
          className="relative text-3xl text-gray-500 transition duration-300 ease-in-out hover:text-purple-300"
        >
          Back Home
        </NextLink>
      </div>
    </>
  );
};

export default PageNotFound;
