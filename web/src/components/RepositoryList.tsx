import { useState, useEffect } from 'react';
import { fetchData } from './../utils/fetchData';
import Card from './Card';
import './RepositoryList.styles.css';

const RepositoryList = () => {
  const [repos, setRepos] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  useEffect(() => {
    fetchData('http://localhost:4000/repos', setRepos);
  }, []);

  return (
    <>
      <div className="repository-list">
        {/* sort repos by reverse chronological order with mutating the repos  */}
        {repos.length > 0 ? (
          repos
            .slice()
            .filter(
              (repo) =>
                selectedLanguage === 'All' || repo.language === selectedLanguage
            )
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
                  setData={setRepos}
                  setSelectedLanguage={setSelectedLanguage}
                />
              )
            )
        ) : (
          <>
            <h4>Fetching...</h4>
            {repos.error && <h3>{repos.error.message}</h3>}
          </>
        )}
      </div>
      <button
        style={{ margin: 'auto' }}
        onClick={() => setSelectedLanguage('All')}
      >
        Back
      </button>
    </>
  );
};
export default RepositoryList;
