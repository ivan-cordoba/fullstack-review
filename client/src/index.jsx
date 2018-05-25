import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getRepos();
    this.state = { 
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({username: term}),
      success: (message) => {
        console.log(message);
        this.getRepos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getRepos () {
    console.log('repos retrieved');
    $.ajax({
      url: '/repos',
      type: 'GET',
      dataType: 'text',
      success: (message) => {
        var repos = JSON.parse(message).data;
        this.setState({
          repos: repos
        });
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));