const core = require('@actions/core');
const github = require('@actions/github');

const { getInputs } = require('./action-inputs');

export class GithubConnector {
  ghdata = null;
  octokit = null;

  constructor() {
    const { GITHUB_TOKEN } = getInputs();

    this.octokit = github.getOctokit(GITHUB_TOKEN);
    this.ghdata = this._getGithubData();

    console.log(`Event name: ${this.ghdata.eventName}`);
    // console.log(`Payload: ${JSON.stringify(this.ghdata, null, 4)}`);
  }

  get isPullRequest() {
    return (
      this.ghdata.eventName === 'pull_request' ||
      this.ghdata.eventName === 'pull_request_target'
    );
  }

  get headBranch() {
    return this.ghdata.pull_request.head.ref;
  }

  async updatePrDetails(issue) {
    const owner = this.githubData.owner;
    const repo = this.githubData.repository.name;
    const pull_number = this.githubData.pull_request.number;

    const currentDescrription = await this.getPullRequestDescription(
      owner,
      repo,
      pull_number
    );

    return await this.octokit.rest.pulls.update({
      owner,
      repo,
      pull_number,
      title: this._createTitle(issue),
      body: this._createJiraDescription(currentDescrription, issue)
    });
  }

  async getPullRequestDescription(owner, repository, pull_number) {
    try {
      const response = this.octokit.rest.pulls.get({
        owner,
        repo: repository,
        pull_number
      });

      return response?.data?.body || '';
    } catch (error) {
      throw new Error(JSON.stringify(error, null, 4));
    }
  }

  _getGithubData() {
    const {
      eventName,
      payload: { repository, pull_request }
    } = github.context;

    let owner = null;

    if (github.context?.payload?.organization) {
      owner = github.context?.payload?.organization?.login;
    } else {
      console.log(
        'Could not find organization, using repository owner instead.'
      );
      owner = github.context.payload.repository?.owner.login;
    }

    console.log(`Owner: ${owner}`);

    if (!owner) {
      throw new Error('Could not find owner.');
    }

    return {
      eventName,
      repository,
      owner,
      pull_request
    };
  }

  _createTitle(issue) {
    return `${issue.key}: ${issue.summary}`;
  }

  _createJiraDescription(currentDescrription, issue) {
    const { summary, description, url } = issue;
    return `
      ${currentDescrription}

      --- Generated from Jira  ---

      <a href="${url}">${summary}</a>

      **Description:**

      ${description}
    `;
  }
}
