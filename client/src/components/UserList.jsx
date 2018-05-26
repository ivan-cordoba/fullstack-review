import React from 'react';

const UserList = (props) => (
  <div id="user-list">
    <h4> User List Component </h4><br/>
    <table>
      <thead>
        <tr>
          <td>Users</td>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, index) => (
          <tr key={index}>
            <td><a href={user.html_url}>{user.login}</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default UserList;