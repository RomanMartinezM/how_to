// import { useState, useEffect } from 'react};
import "../../App.css";
import InfoCard from "../../components/InfoCard";
import Navbar from "../../components/Navbar";
import SearchForm from "../../components/SearchForm";
import ContentSearch from "../../components/ContentSearch";
// import { set, useForm } from 'react-hook-form';
import { useState } from "react";

const Home = () => {
  const dataServices = {
    title: "1 hour ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };

  const dataAbout = {
    title: "23 minutes ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };
  const dataContact = {
    title: "15 minutes ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maurissit amet magna id ex hendrerit semper.",
  };

  const [content, setContent] = useState("");

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        <div className="container mx-auto pt-12 pb-20">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Search something
          </h1>
          <SearchForm setContent={setContent} />
          <ContentSearch content={content} />

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
