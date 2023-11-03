import React from "react";
import UseNavbar from "../../Components/userComponents/UseNavbar";
import Footer from "../../Components/userComponents/Footer";

export default function AboutUsPage() {
  return (
    <>
      <div style={{ height: "3rem" }}>
        <UseNavbar />
      </div>

      <div className="p-10 mx-auto my-auto flex flex-col justify-center items-center min-h-screen min-w-screen">
        <h1 className="font-kaushan text-center xxs:text-2xl xs:text-xl sm:text-xl md:text-lg lg:text-2xl">
          WE’RE Wedding Bells{" "}
        </h1>
        <p className="flex text-lg font-sans mt-5 xxs:text-lg xs:text-xl sm:text-xl md:text-lg lg:text-2xl">
          Its is a story of 11 teenage friends, who made a good team in their
          school and locality, enthusiastic about conducting and organizing
          events around them. As time passed they carried on with their lives,
          with their higher studies. They missed each others’ companies a lot
          and found a way to get united again. To be together, they converted
          their passion of organizing events, a creative way, into a business.
        </p>
      </div>

      <Footer />
    </>
  );
}
