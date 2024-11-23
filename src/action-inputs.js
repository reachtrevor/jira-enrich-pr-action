const core = require('@actions/core');
const github = require('@actions/github');

module.exports.getInputs = function () {
  const GITHUB_TOKEN = core.getInput('github-token', { required: true });
  const JIRA_TOKEN = core.getInput('jira-api-key', { required: true });
  const JIRA_BASE_URL = core.getInput('jira-base-url', { required: true });
  const JIRA_USER_EMAIL = core.getInput('jira-user-email', { required: true });
  const FAIL_WHEN_JIRA_ISSUE_NOT_FOUND =
    core.getInput('fail-when-jira-issue-not-found') === 'true' || false;
  const DESCRIPTION_CHARACTER_LIMIT = core.getInput(
    'description-character-limit'
  );

  console.log(DESCRIPTION_CHARACTER_LIMIT);

  return {
    JIRA_TOKEN,
    JIRA_BASE_URL,
    JIRA_USER_EMAIL,
    GITHUB_TOKEN,
    FAIL_WHEN_JIRA_ISSUE_NOT_FOUND,
    DESCRIPTION_CHARACTER_LIMIT
  };
};
