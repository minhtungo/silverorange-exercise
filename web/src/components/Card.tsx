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

  const handleClick = (commitUrl, fullName = '') => {

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

    </div>
  );
};
export default Card;
