const axios = require('axios');
const { getInputs } = require('./action-inputs');

export class JiraConnector {
  client = null;
  JIRA_TOKEN = null;
  JIRA_BASE_URL = null;

  constructor() {
    const { JIRA_TOKEN, JIRA_BASE_URL } = getInputs();

    this.JIRA_BASE_URL = JIRA_BASE_URL;
    this.JIRA_TOKEN = JIRA_TOKEN;

    console.log('got to jira token');
    console.log(this.JIRA_TOKEN);

    const encodedToken = Buffer.from(JIRA_TOKEN).toString('base64');

    this.client = axios.create({
      baseURL: `${JIRA_BASE_URL}/rest/api/3`,
      timeout: 2000,
      headers: { Authorization: `Basic ${encodedToken}` }
    });
  }

  async getIssue(issueKey) {
    const fields = 'summary,description,issuetype';

    try {
      const response = await this.client.get(
        `/issue/${issueKey}?fields=${fields}`
      );

      return {
        key: response.data.key,
        summary: response.data.fields.summary,
        description: response.data.fields.description,
        type: response.data.fields.issuetype.name,
        url: `${this.JIRA_BASE_URL}/browse/${response.data.key}`
      };
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data, null, 4));
    }
  }
}
