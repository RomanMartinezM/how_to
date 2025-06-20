const ContentSearch = ({ content }) => {
  if (!content) return null;
  return (
    <div className="mt-4 mx-auto max-w-2xl p-4 bg-white border rounded-md shadow-md">
      {content}
    </div>
  );
};

export default ContentSearch;
