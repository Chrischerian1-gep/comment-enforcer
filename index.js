const core = require('@actions/core');
const github = require('@actions/github');

async function eventHandler() {
    try {
        const minCommentLength = parseInt(core.getInput('min-comment-length'));
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
        const owner = github.context.issue.owner;
        const repo = github.context.issue.repo;
        const pullNumber = github.context.issue.number;
        const data = {
            owner: owner,
            repo: repo,
            pull_number: pullNumber,
        };
        const response = await octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews", data);

        const hasMessageWithMinLength = (response.data || [])
            .map(review => (review.body || "").length >= minCommentLength)
            .reduce((a, b) => a || b, false);

        if (!hasMessageWithMinLength) {
            core.setFailed(`No comments with a minimum length of ${minCommentLength} characters found in Pull Request Review Comments`);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

eventHandler()
    .then(resp => console.log(resp))
    .catch(err => console.log(err));
