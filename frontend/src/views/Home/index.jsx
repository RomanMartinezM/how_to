import "../../App.css";
import InfoCard from "../../components/InfoCard";
import Navbar from "../../components/Navbar";
import SearchForm from "../../components/SearchForm";
import ContentSearch from "../../components/ContentSearch";
import { useState, useEffect } from "react";
import apiService from "../../services/apiService";
import Statistics from "../../components/Statistics";

const Home = () => {
  const [content, setContent] = useState("");
  const [activeView, setActiveView] = useState('search');

  const toggleSearchForm = () => setActiveView('search');
  const toggleInfoCard = () => setActiveView('info');
  const toggleStatistics = () => setActiveView('statistics');

  const [mostRecentSearches, setMostRecentSearches] = useState([]);
  const [searchTopicsMostQuerying, setSearchTopicsMostQuerying] = useState([]);

  const getTimeAgo = (date) => {
    const ONE_MINUTE = 60000;
    const ONE_HOUR = ONE_MINUTE * 60;
    const ONE_DAY = ONE_HOUR * 24;
    const ONE_WEEK = ONE_DAY * 7;
    const ONE_MONTH = ONE_DAY * 30;

    const timeAgo = Date.now() - date.getTime();
    if (timeAgo < ONE_MINUTE) {
      return 'Just now';
    } else if (timeAgo < ONE_HOUR) {
      return `${Math.round(timeAgo / ONE_MINUTE)} minutes ago`;
    } else if (timeAgo < ONE_DAY) {
      return `${Math.round(timeAgo / ONE_HOUR)} hours ago`;
    } else if (timeAgo < ONE_WEEK) {
      return `${Math.round(timeAgo / ONE_DAY)} days ago`;
    } else if (timeAgo < ONE_MONTH) {
      return `${Math.round(timeAgo / ONE_WEEK)} weeks ago`;
    } else {
      return `${Math.round(timeAgo / ONE_MONTH)} months ago`;
    }
  };
  
  useEffect(() => {
    const fetchMostRecentSearches = async () => {
      try {
        const res = await apiService.getMostRecentSearches();
        const recentSearches = res.data.map((search) => (  
          <InfoCard key={search._id} title={getTimeAgo(new Date(search.createdAt))} content={search.search_query} />
        ));
        setMostRecentSearches(recentSearches);
      } catch (error) {
        console.error('Error fetching most recent searches:', error);
      }
    };
    
    const fetchSearchTopicsMostQuerying = async () => {
      try {
        const res = await apiService.getSearchTopicsMostQuerying();
        const searchTopicsQuerying = res.data.map((topic) => {
          // Handle the nested timestamp format: { $date: { $numberLong: "..." } }
          const timestamp = topic.last_searched?.$date?.$numberLong 
            ? parseInt(topic.last_searched.$date.$numberLong, 10)
            : Date.now();
            
          return (
            <Statistics 
              key={topic.topic} 
              title={topic.topic} 
              content={`${topic.count} times queried - Last searched: ${getTimeAgo(new Date(timestamp))}`} 
            />
          );
        });
        setSearchTopicsMostQuerying(searchTopicsQuerying);
      } catch (error) {
        console.error('Error fetching search topics most querying:', error);
      }
    };
    
    fetchMostRecentSearches();
    fetchSearchTopicsMostQuerying();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-16">
      <Navbar 
        onSearchClick={toggleSearchForm} 
        onInfoCardClick={toggleInfoCard} 
        onStatisticsClick={toggleStatistics}
      />
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'search' && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
              Search something
            </h1>
            <div className="mb-8">
              <SearchForm setContent={setContent} />
            </div>
            <div className="mt-6">
              <ContentSearch content={content} />
            </div>
          </>
        )}

        {activeView === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mostRecentSearches}
          </div>
        )}

        {activeView === 'statistics' && (
          <div>
            {searchTopicsMostQuerying}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
