// import { useState, useEffect } from 'react';
import "../../App.css";
import InfoCard from "../../components/InfoCard";
import Navbar from "../../components/Navbar";
import SearchForm from "../../components/SearchForm";
// import { set, useForm } from 'react-hook-form';

const Home = () => {
  const dataServices = {
    title: "Services",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };

  const dataAbout = {
    title: "About Us",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };
  const dataContact = {
    title: "Contact",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        <div className="container mx-auto pt-12 pb-20">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Welcome
          </h1>
          <SearchForm />
          <p className="text-gray-700 text-lg text-center mb-12">
            The most searched
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              title={dataServices.title}
              content={dataServices.content}
            />
            <InfoCard
              title={dataAbout.title}
              content={dataAbout.content}
            />
            <InfoCard
              title={dataContact.title}
              content={dataContact.content}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
