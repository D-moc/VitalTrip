import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      transition={Slide}
      theme="colored"
      className="rounded-2xl drop-shadow-xl"
      toastClassName={() =>
        "relative flex p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg font-semibold text-sm sm:text-base"
      }
      bodyClassName="flex items-center"
      progressClassName="bg-white/80 h-1 rounded-full"
    />
  );
};

export default CustomToastContainer;
