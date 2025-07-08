const Statistics = ({title, content}) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md" style={style}>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p>{content}</p>
      </div>
    );
  };

  // Add a little space down for this component
  const style = {
    marginBottom: '1.5rem'
  };

export default Statistics;