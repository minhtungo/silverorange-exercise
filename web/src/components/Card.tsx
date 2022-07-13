import { useState } from 'react';

import axios from 'axios';

const Card = ({
  id,
  name,
  description,
  language,
  forksCount,
  commitsUrl,
  fullName,
  filterRepository,
}) => {
  const [latestCommit, setLatestCommit] = useState({});
  const [showMore, setShowMore] = useState(false);

  const handleClick = (commitUrl) => {
    if (Object.keys(latestCommit).length === 0) {
      const commitHistoryUrl = commitUrl.replace('{/sha}', '');

      const fetchData = async () => {
        try {
          const { data } = await axios.get(commitHistoryUrl);
          setLatestCommit(data[0].commit);
        } catch (error) {
          throw new Error(error);
        }
      };
      fetchData();
    }
  };

  return (
    <div
      key={id}
      onClick={() => {
        setShowMore(!showMore);
        handleClick(commitsUrl, fullName);
      }}
      className="card"
    >
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="count">Fork Count: {forksCount}</p>
      <button onClick={() => filterRepository(language, 'language')}>
        {language}
      </button>
      {showMore && latestCommit && (
        <>
          <h5>Latest Commit on {latestCommit.author?.date}</h5>
          <h4>{latestCommit.author?.name}</h4>
          <p>{latestCommit?.message}</p>
        </>
      )}
    </div>
  );
};
export default Card;
