const InfoCard = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default InfoCard;
