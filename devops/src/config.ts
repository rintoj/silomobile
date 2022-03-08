import dotenv from 'dotenv'

dotenv.config()

export const config = {
  github: {
    apiURL: 'https://api.github.com',
    token: process.env.GITHUB_TOKEN as string,
    owner: process.env.GITHUB_RELEASE_REPO_OWNER as string,
    repo: process.env.GITHUB_RELEASE_REPO as string,
    branch: process.env.GITHUB_RELEASE_BRANCH as string,
    initialVersion: process.env.GITHUB_RELEASE_INITIAL_VERSION as string,
  },
}
