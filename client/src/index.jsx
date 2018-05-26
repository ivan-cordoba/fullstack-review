import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.new = 0;
    this.updated = 0;
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
        var data = JSON.parse(message);
        this.new = data.new;
        this.updated = data.updated;
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
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos} new={this.new} updated={this.updated}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));