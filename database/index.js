const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});
mongoose.Promise = require('bluebird');
var db = mongoose.connection;

let repoSchema = mongoose.Schema({
  "id": {type: Number, unique: true},
  "name": String,
  "full_name": String,
  "owner": Object,
  "private": Boolean,
  "html_url": String,
  "description": String,
  "fork": Boolean,
  "url": String,
  "forks_url": String,
  "keys_url": String,
  "collaborators_url": String,
  "teams_url": String,
  "hooks_url": String,
  "issue_events_url": String,
  "events_url": String,
  "assignees_url": String,
  "branches_url": String,
  "tags_url": String,
  "blobs_url": String,
  "git_tags_url": String,
  "git_refs_url": String,
  "trees_url": String,
  "statuses_url": String,
  "languages_url": String,
  "stargazers_url": String,
  "contributors_url": String,
  "subscribers_url": String,
  "subscription_url": String,
  "commits_url": String,
  "git_commits_url": String,
  "comments_url": String,
  "issue_comment_url": String,
  "contents_url": String,
  "compare_url": String,
  "merges_url": String,
  "archive_url": String,
  "downloads_url": String,
  "issues_url": String,
  "pulls_url": String,
  "milestones_url": String,
  "notifications_url": String,
  "labels_url": String,
  "releases_url": String,
  "deployments_url": String,
  "created_at": String,
  "updated_at": String,
  "pushed_at": String,
  "git_url": String,
  "ssh_url": String,
  "clone_url": String,
  "svn_url": String,
  "homepage": String,
  "size": Number,
  "stargazers_count": Number,
  "watchers_count": Number,
  "language": String,
  "has_issues": Boolean,
  "has_downloads": Boolean,
  "has_wiki": Boolean,
  "has_pages": Boolean,
  "forks_count": Number,
  "mirror_url": String,
  "open_issues_count": Number,
  "forks": Number,
  "open_issues": Number,
  "watchers": Number,
  "default_branch": String
});

let userSchema = mongoose.Schema({
  "login": String,
  "id": {type: Number, unique: true},
  "avatar_url": String,
  "gravatar_id": String,
  "url": String,
  "html_url": String,
  "followers_url": String,
  "following_url": String,
  "gists_url": String,
  "starred_url": String,
  "subscriptions_url": String,
  "organizations_url": String,
  "repos_url": String,
  "events_url": String,
  "received_events_url": String,
  "type": String,
  "site_admin": Boolean
});

let Repo = mongoose.model('Repo', repoSchema);

let User = mongoose.model('User', userSchema);

let save = (newRepos) => {
  
  return new Promise((resolve, reject) => {
    Repo.collection.insert(newRepos, (err, docs) => {
      if(err && err.message.includes('E11000')) {
        resolve(err.message);
      } else if(err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      var user = newRepos[0].owner;
      User.collection.insert(user, (err, docs) => {
        if(err && err.message.includes('E11000')) {
          resolve(err.message);
        } else if(err) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  });

}

let get = () => {
  var repos;
  return new Promise((resolve, reject) => {
    Repo.find()
    .limit(25)
    .sort('-stargazers_count')
    .exec((err, repo) => {
      if(err) {
        reject(err);
      } else {
        repos = repo;
        resolve(repo);
      }
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      User.find()
      .exec((err, users) => {
        if(err) {
          reject(err);
        } else {
          resolve({repos: repos, users: users});
        }
      });
    });
  });
}

let count = () => {
  return new Promise((resolve, reject) => {
    Repo.count()
    .exec((err, count) => {
      if(err) {
        reject(err);
      } else {
        resolve(count);
      }
    });
  });
}

module.exports.save = save;
module.exports.get = get;
module.exports.count = count;