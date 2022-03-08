import { red, yellow } from 'chalk'
import moment from 'moment'
import * as semver from 'semver'
import { config } from '../config'
import { GitHubApi, GitHubIssue, GitHubIssueState, GitHubIssueType } from '../util'

function formatDate(date: string) {
  return moment(date).fromNow()
}

function createIssueMarkdown(issue: GitHubIssue) {
  const assignee = issue.assignees.slice(-1)[0] ?? issue?.user
  return `- [#${issue.number}](${issue.html_url}) - ${issue.title} ${
    assignee
      ? `- _${formatDate(issue.updated_at)} by [${assignee?.login}](${assignee?.html_url})_`
      : ''
  }
`
}

function sortByPRNumber(issue1: GitHubIssue, issue2: GitHubIssue) {
  return issue1.number - issue2.number
}

export enum ReleaseType {
  MINOR = 'minor',
  PATCH = 'patch',
}

export type Flags = { ['dry-run']: boolean }

export default async function release(
  { 'dry-run': dryRun }: Flags,
  releaseType = ReleaseType.PATCH,
) {
  try {
    // eslint-disable-next-line no-undef-init
    let since: string | undefined = undefined
    let nextTag = config.github.initialVersion

    if (!config.github.token) {
      throw new Error('Environment variable GITHUB_TOKEN is missing!')
    }
    if (![ReleaseType.MINOR, ReleaseType.PATCH].includes(releaseType)) {
      throw new Error(`Invalid release type: ${releaseType}. Use either "minor" or "patch"`)
    }

    const git = new GitHubApi(config.github)
    const [latestRelease] = await git.fetchReleases()
    const initialRelease = latestRelease === undefined

    if (!initialRelease) {
      const tag = latestRelease?.tag_name ?? config.github.initialVersion
      const masterSha = await git.getHeadSHA(config.github.branch)
      if (!masterSha) {
        throw new Error('Something is wrong with this repository. Could not find master branch')
      }
      const tagSha = (await git.getTagSHA(tag)) as string
      if (masterSha === tagSha) {
        throw new Error(`No changes since last version ${tag}!`)
      }
      const commit = tagSha ? await git.getCommit(tagSha) : undefined
      if (!commit) {
        throw new Error(
          `Something is wrong with this repository. Could not find commit for tag "${tag}"`,
        )
      }
      since = commit?.committer?.date
      nextTag = `v${semver.inc(tag, releaseType as any)}`
      if (!nextTag) {
        throw new Error('Failed to identify next tag')
      }
    }
    const issues = await git.fetchIssues(
      {
        state: GitHubIssueState.Closed,
        type: GitHubIssueType.PullRequest,
        merged: true,
        sort: 'created',
        since: since as string | undefined,
      },
      sortByPRNumber,
    )
    if (!issues.length) {
      throw new Error('No new PR to release!')
    }
    const title = `Production build: ${nextTag}`
    const body = issues.sort(sortByPRNumber).map(createIssueMarkdown).join('')
    console.log(`
${yellow(title)}

${body}`)

    if (!dryRun) {
      await git.release(nextTag, title, body)
    } else {
      console.log(yellow('This was a dry run!'))
    }
  } catch (e: any) {
    console.error(red(e.message))
    console.log('')
  }
}
