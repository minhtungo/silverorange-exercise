import { useState } from 'react';

import axios from 'axios';
import { fetchData } from './../utils/fetchData';
import RepoMarkDown from './RepoMarkDown';

const Card = ({
  id,
  name,
  description,
  language,
  forksCount,
  commitsUrl,
  fullName,
  filterRepository,
  setSelectedLanguage,
}) => {
  const [latestCommit, setLatestCommit] = useState({});
  const [mdContent, setMdContent] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [showMdModal, setShowMdModal] = useState(false);

  const handleClick = (commitUrl, fullName) => {
    if (Object.keys(latestCommit).length === 0) {
      //remove "{sha}"" in the commit Url
      const commitHistoryUrl = commitUrl.replace('{/sha}', '');

      const fetchLatestCommit = async () => {
        try {
          const { data } = await axios.get(commitHistoryUrl);
          // set the first commit object in the response which is the latest commit
          setLatestCommit(data[0].commit);
        } catch (error) {
          throw new Error(error);
        }
      };
      fetchLatestCommit();

      //fetch markdown file
      const markDownUrl = `https://raw.githubusercontent.com/${fullName}/master/README.md`;
      fetchData(markDownUrl, setMdContent);
    }
  };

  return (
    <>
      <div
        key={id}
        onClick={() => {
          setShowMore(!showMore);
          handleClick(commitsUrl, fullName);
          setShowMdModal(true);
        }}
        className="card"
      >
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="count">Fork Count: {forksCount}</p>
        <button onClick={() => setSelectedLanguage(language)}>
          {language}
        </button>
        {/* only show commit info when clicked and latest commit already fetched */}
        {latestCommit && (
          <>
            {showMore && (
              <div>
                {latestCommit.author ? (
                  <>
                    <h5>Latest Commit on {latestCommit.author?.date}</h5>
                    <h4>{latestCommit.author?.name}</h4>
                    <p>{latestCommit?.message}</p>
                  </>
                ) : (
                  <>
                    <h4>Fetching commit data...</h4>
                    {latestCommit.error && (
                      <h5>No Commit Info For This Repo</h5>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {/* do not show the modal when clicking the repo to hide commit info */}
      {showMore && (
        <RepoMarkDown
          content={mdContent}
          show={showMdModal}
          setShow={setShowMdModal}
        />
      )}
    </>
  );
};
export default Card;
