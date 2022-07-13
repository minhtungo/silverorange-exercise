import ReactMarkdown from 'react-markdown';

const RepoMarkDown = ({ content }) => {
  return (
    <div>
      {content.length !== 0 ? (
        <ReactMarkdown children={content} />
      ) : (
        <p>No content</p>
      )}
    </div>
  );
};
export default RepoMarkDown;
