const core = require('@actions/core');
const github = require('@actions/github');

module.exports.getInputs = function () {
  const JIRA_TOKEN = core.getInput('jira-token', { required: true });
  const JIRA_BASE_URL = core.getInput('', { required: true });
  const FAIL_WHEN_JIRA_ISSUE_NOT_FOUND =
    core.getInput('fail-when-jira-issue-not-found') === 'true' || false;

  const pr_title = github.context.payload.pull_request.title;
  const pr_description = github.context.payload.pull_request.body;

  return {
    config: {
      JIRA_TOKEN,
      JIRA_BASE_URL,
      FAIL_WHEN_JIRA_ISSUE_NOT_FOUND
    },
    pull_request: {
      title: pr_title,
      description: pr_description
    }
  };
};
