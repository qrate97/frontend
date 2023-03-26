import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const MainLayout = ({ children }: { children: any }) => {
  return (
    <>
      <Header />
      <main className="w-full h-full py-5 px-40 h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
