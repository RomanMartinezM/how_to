// Helper function to format the content with proper HTML structure
const formatContent = (content) => {
  if (!content) return '';
  
  // Split content into paragraphs
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    // Check if paragraph is a list item
    if (paragraph.match(/^\d+\.\s+.+/)) {
      // Format as ordered list
      const listItems = paragraph.split('\n').map(item => item.trim()).filter(Boolean);
      
      // Check if we should preserve the original numbers
      const hasOriginalNumbers = listItems.every(item => /^\d+\.\s+.+/.test(item));
      
      return (
        <ol key={index} className="list-decimal list-inside my-4 space-y-2">
          {listItems.map((item, i) => {
            // If original numbers should be preserved, render the item as is
            if (hasOriginalNumbers) {
              const match = item.match(/^(\d+\.)\s*(.*)/);
              return (
                <li key={i} className="text-gray-700 leading-relaxed" value={match[1].replace(/\.$/, '')}>
                  {match[2]}
                </li>
              );
            }
            // Otherwise, remove the number and let the browser handle the numbering
            return (
              <li key={i} className="text-gray-700 leading-relaxed">
                {item.replace(/^\d+\.\s*/, '')}
              </li>
            );
          })}
        </ol>
      );
    } else if (paragraph.match(/^\*\s+.+/)) {
      // Format as unordered list
      const listItems = paragraph.split('\n').map(item => item.trim()).filter(Boolean);
      return (
        <ul key={index} className="list-disc list-inside my-4 space-y-2">
          {listItems.map((item, i) => (
            <li key={i} className="text-gray-700 leading-relaxed">
              {item.replace(/^\*\s*/, '')}
            </li>
          ))}
        </ul>
      );
    } else if (paragraph.match(/^#+\s+.+/)) {
      // Format as heading
      const level = paragraph.match(/^#+/)[0].length;
      const text = paragraph.replace(/^#+\s*/, '');
      const HeadingTag = `h${Math.min(level + 1, 6)}`; // h2 to h6
      return <HeadingTag key={index} className="text-xl font-semibold my-4 text-gray-800">{text}</HeadingTag>;
    } else if (paragraph.trim() === '') {
      return null; // Skip empty paragraphs
    } else {
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {paragraph.trim()}
        </p>
      );
    }
  });
};

const ContentSearch = ({ content }) => {
  if (!content) return null;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="prose prose-lg max-w-none">
        {formatContent(content)}
      </div>
    </div>
  );
};

export default ContentSearch;
