import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table><tbody>
    {props.repos.map(repo => {
      return (
        <tr>
          <td><a href={repo.html_url}>{repo.full_name}</a></td>
        </tr>
      );
    })}
    </tbody></table>
  </div>
)

export default RepoList;