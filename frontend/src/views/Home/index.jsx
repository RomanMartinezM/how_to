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
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const toggleSearchForm = () => {
    setShowSearchForm(prev => prev ? prev : !prev);
    setShowInfoCard(false);
    setShowAnalytics(false)
  };
  
  const toggleInfoCard = () => {
    setShowInfoCard(prev => prev ? prev : !prev);
    setShowSearchForm(false);
    setShowAnalytics(false)
  };

  const toggleAnalytics = () => {
    setShowAnalytics(prev => prev ? prev : !prev);
    setShowSearchForm(false);
    setShowInfoCard(false);
  }

  return (
    <>
      <div className="bg-gray-100">
        <Navbar onSearchClick={toggleSearchForm} onInfoCardClick={toggleInfoCard} onAnalyticsClick={toggleAnalytics}/>
        <div className="container mx-auto pt-12 pb-20">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Search something
          </h1>
          {showSearchForm && <SearchForm setContent={setContent} />}
          <ContentSearch content={content} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showInfoCard && <InfoCard
              title={dataServices.title}
              content={dataServices.content}
            />}
            {showInfoCard && <InfoCard
              title={dataAbout.title}
              content={dataAbout.content}
            />}
            {showInfoCard && <InfoCard
              title={dataContact.title}
              content={dataContact.content}
            />}
            {showAnalytics && <p>Analytics</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
