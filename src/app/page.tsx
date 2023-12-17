import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="leading-tighter mb-4 text-8xl font-extrabold tracking-tighter"
              data-aos="zoom-y-out"
            >
              ZeetCod3
              <br />
              <span className="bg-gradient-to-r from-gray-500 to-gray-800 bg-clip-text text-transparent">
                A sysmetry to LeetCode
              </span>
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-600"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Unlock the world of coding challenges at your fingertips, where
                mastery meets creativity. Elevate your skills with our platform,
                the playground for programmers.
              </p>
              <div
                className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              ></div>
            </div>
          </div>

          <div
            className="relative mb-8 flex justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="450"
          >
            <Link
              href={"/dashboard"}
              className="group absolute top-full flex -translate-y-1/2 transform items-center rounded-full bg-white p-4 font-medium text-gray-900 shadow-lg"
            >
              <span className="ml-3 mr-3">
                Click here to start the Challenge
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
