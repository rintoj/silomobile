import { config } from '../config'
import { GitHubApi } from '../util'

export default async function currentRelease() {
  const git = new GitHubApi(config.github)
  const [latestRelease] = await git.fetchReleases()
  console.log(latestRelease.tag_name)
  return latestRelease.tag_name
}
