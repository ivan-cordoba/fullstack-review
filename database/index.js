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

let Repo = mongoose.model('Repo', repoSchema);

let save = (newRepos) => {

  return new Promise((resolve, reject) => {
    Repo.collection.insert(newRepos, (err, docs) => {
      if(err && err.message.includes('E11000')) {
        reject(err);
      } else {
        resolve('inserted into DB');
      }
    })
  });

}

let get = (callback) => {
  console.log('Getting repos...');
  Repo.find()
  .limit(25)
  .sort('-stargazers_count')
  .exec((err, repo) => {
    callback(err, repo);
  });
}

var exampleObj = {
  "id": 18221276,
  "name": "git-consortium",
  "full_name": "octocat/git-consortium",
  "owner": {
    "login": "octocat",
    "id": 583231,
    "avatar_url": "https://avatars0.githubusercontent.com/u/583231?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "followers_url": "https://api.github.com/users/octocat/followers",
    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    "organizations_url": "https://api.github.com/users/octocat/orgs",
    "repos_url": "https://api.github.com/users/octocat/repos",
    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/octocat/received_events",
    "type": "User",
    "site_admin": false
  },
  "private": false,
  "html_url": "https://github.com/octocat/git-consortium",
  "description": "This repo is for demonstration purposes only.",
  "fork": false,
  "url": "https://api.github.com/repos/octocat/git-consortium",
  "forks_url": "https://api.github.com/repos/octocat/git-consortium/forks",
  "keys_url": "https://api.github.com/repos/octocat/git-consortium/keys{/key_id}",
  "collaborators_url": "https://api.github.com/repos/octocat/git-consortium/collaborators{/collaborator}",
  "teams_url": "https://api.github.com/repos/octocat/git-consortium/teams",
  "hooks_url": "https://api.github.com/repos/octocat/git-consortium/hooks",
  "issue_events_url": "https://api.github.com/repos/octocat/git-consortium/issues/events{/number}",
  "events_url": "https://api.github.com/repos/octocat/git-consortium/events",
  "assignees_url": "https://api.github.com/repos/octocat/git-consortium/assignees{/user}",
  "branches_url": "https://api.github.com/repos/octocat/git-consortium/branches{/branch}",
  "tags_url": "https://api.github.com/repos/octocat/git-consortium/tags",
  "blobs_url": "https://api.github.com/repos/octocat/git-consortium/git/blobs{/sha}",
  "git_tags_url": "https://api.github.com/repos/octocat/git-consortium/git/tags{/sha}",
  "git_refs_url": "https://api.github.com/repos/octocat/git-consortium/git/refs{/sha}",
  "trees_url": "https://api.github.com/repos/octocat/git-consortium/git/trees{/sha}",
  "statuses_url": "https://api.github.com/repos/octocat/git-consortium/statuses/{sha}",
  "languages_url": "https://api.github.com/repos/octocat/git-consortium/languages",
  "stargazers_url": "https://api.github.com/repos/octocat/git-consortium/stargazers",
  "contributors_url": "https://api.github.com/repos/octocat/git-consortium/contributors",
  "subscribers_url": "https://api.github.com/repos/octocat/git-consortium/subscribers",
  "subscription_url": "https://api.github.com/repos/octocat/git-consortium/subscription",
  "commits_url": "https://api.github.com/repos/octocat/git-consortium/commits{/sha}",
  "git_commits_url": "https://api.github.com/repos/octocat/git-consortium/git/commits{/sha}",
  "comments_url": "https://api.github.com/repos/octocat/git-consortium/comments{/number}",
  "issue_comment_url": "https://api.github.com/repos/octocat/git-consortium/issues/comments{/number}",
  "contents_url": "https://api.github.com/repos/octocat/git-consortium/contents/{+path}",
  "compare_url": "https://api.github.com/repos/octocat/git-consortium/compare/{base}...{head}",
  "merges_url": "https://api.github.com/repos/octocat/git-consortium/merges",
  "archive_url": "https://api.github.com/repos/octocat/git-consortium/{archive_format}{/ref}",
  "downloads_url": "https://api.github.com/repos/octocat/git-consortium/downloads",
  "issues_url": "https://api.github.com/repos/octocat/git-consortium/issues{/number}",
  "pulls_url": "https://api.github.com/repos/octocat/git-consortium/pulls{/number}",
  "milestones_url": "https://api.github.com/repos/octocat/git-consortium/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/octocat/git-consortium/notifications{?since,all,participating}",
  "labels_url": "https://api.github.com/repos/octocat/git-consortium/labels{/name}",
  "releases_url": "https://api.github.com/repos/octocat/git-consortium/releases{/id}",
  "deployments_url": "https://api.github.com/repos/octocat/git-consortium/deployments",
  "created_at": "2014-03-28T17:55:38Z",
  "updated_at": "2016-12-06T13:06:37Z",
  "pushed_at": "2016-10-30T13:43:30Z",
  "git_url": "git://github.com/octocat/git-consortium.git",
  "ssh_url": "git@github.com:octocat/git-consortium.git",
  "clone_url": "https://github.com/octocat/git-consortium.git",
  "svn_url": "https://github.com/octocat/git-consortium",
  "homepage": null,
  "size": 190,
  "stargazers_count": 7,
  "watchers_count": 7,
  "language": null,
  "has_issues": true,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": false,
  "forks_count": 24,
  "mirror_url": null,
  "open_issues_count": 4,
  "forks": 24,
  "open_issues": 4,
  "watchers": 7,
  "default_branch": "master"
}

module.exports.save = save;
module.exports.get = get;