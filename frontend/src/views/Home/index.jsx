import "../../App.css";
import InfoCard from "../../components/InfoCard";
import Navbar from "../../components/Navbar";
import SearchForm from "../../components/SearchForm";
import ContentSearch from "../../components/ContentSearch";
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
  const [activeView, setActiveView] = useState('search');

  const toggleSearchForm = () => setActiveView('search');
  const toggleInfoCard = () => setActiveView('info');
  const toggleAnalytics = () => setActiveView('analytics');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-16">
      <Navbar 
        onSearchClick={toggleSearchForm} 
        onInfoCardClick={toggleInfoCard} 
        onAnalyticsClick={toggleAnalytics}
      />
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'search' && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
              Search something
            </h1>
            <SearchForm setContent={setContent} />
            <ContentSearch content={content} />
          </>
        )}

        {activeView === 'info' && (
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
        )}

        {activeView === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <p>Analytics content will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
