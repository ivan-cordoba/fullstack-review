import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <thead>
        <tr><td>GitHub User</td><td>Repo Name</td><td>Number Of Forks</td><td>Number of Watchers</td></tr>
      </thead>
      <tbody>
    {props.repos.map(repo => {
      return (
        <tr>
            <td>{repo.owner.login}</td>
            <td><a href={repo.html_url}>{repo.name}</a></td>
            <td>{repo.forks}</td>
            <td>{repo.watchers}</td>
        </tr>
      );
    })}
    </tbody></table>
  </div>
)

export default RepoList;