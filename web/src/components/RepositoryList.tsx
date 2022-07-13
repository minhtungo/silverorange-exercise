import { useState, useEffect } from 'react';
import { fetchData } from './../utils/fetchData';
import Card from './Card';
import './RepositoryList.styles.css';

const RepositoryList = () => {
  const [repos, setRepos] = useState({});

  //filter repos based on criteria passed
  const filterRepository = (keyword, criteria) => {
    const filteredRepo = repos.filter((repo) => repo[criteria] === keyword);
    setRepos(filteredRepo);
  };

  useEffect(() => {
    fetchData('http://localhost:4000/repos', setRepos);
  }, []);

  return (
    <div className="repository-list">
      {/* sort repos by reverse chronological order with mutating the repos  */}
      {repos.length > 0 ? (
        repos
          .slice()
          .sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          })
          .map(
            ({
              id,
              name,
              description,
              language,
              forks_count,
              commits_url,
              full_name,
            }) => (
              <Card
                key={id}
                name={name}
                description={description}
                language={language}
                forksCount={forks_count}
                commitsUrl={commits_url}
                fullName={full_name}
                filterRepository={filterRepository}
                setData={setRepos}
              />
            )
          )
      ) : (
        <h3>Fetching...</h3>
      )}
    </div>
  );
};
export default RepositoryList;
