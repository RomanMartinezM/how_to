const Notification = ({ loading, message }) => {
  return (
    loading && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
