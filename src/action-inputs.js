const core = require('@actions/core');
const github = require('@actions/github');

module.exports.getInputs = function () {
  const JIRA_TOKEN = core.getInput('jira-token', { required: true });
  const JIRA_BASE_URL = core.getInput('jira-base-url', { required: true });
  const FAIL_WHEN_JIRA_ISSUE_NOT_FOUND =
    core.getInput('fail-when-jira-issue-not-found') === 'true' || false;

  return {
    JIRA_TOKEN,
    JIRA_BASE_URL,
    FAIL_WHEN_JIRA_ISSUE_NOT_FOUND
  };
};
