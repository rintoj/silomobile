import fetch from 'node-fetch'

export enum GitHubUserType {
  User = 'User',
}

export interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: GitHubUserType
  site_admin: boolean
}

export interface GitHubRelease {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  author: GitHubUser
  node_id: string
  tag_name: string
  target_commitish: string
  name: string
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  assets: any[]
  tarball_url: string
  zipball_url: string
  body: string
}

export interface GitHubIssue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: GitHubUser
  labels: GitHubLabel[]
  state: GitHubIssueState
  locked: boolean
  assignee: GitHubUser | null
  assignees: GitHubUser[]
  milestone: GitHubMilestone | null
  comments: number
  created_at: string
  updated_at: string
  closed_at: null
  author_association: AuthorAssociation
  body: string
  pull_request?: GitHubPullRequest
}

export enum GitHubIssueState {
  Open = 'open',
  Closed = 'closed',
  All = 'all',
}

export enum AuthorAssociation {
  Collaborator = 'COLLABORATOR',
  Owner = 'OWNER',
}

export interface GitHubLabel {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description: string
}

export interface GitHubMilestone {
  url: string
  html_url: string
  labels_url: string
  id: number
  node_id: string
  number: number
  title: string
  description: null
  creator: GitHubUser
  open_issues: number
  closed_issues: number
  state: GitHubIssueState
  created_at: string
  updated_at: string
  due_on: null
  closed_at: null
}

export interface GitHubPullRequest {
  url: string
  html_url: string
  diff_url: string
  patch_url: string
}

export enum GitHubIssueType {
  PullRequest = 'PullRequest',
  Issue = 'Issue',
  All = 'All',
}

export interface GitHubConfig {
  owner: string
  repo: string
  apiURL: string
  token: string
}

export interface GitRef {
  ref: string
  node_id: string
  url: string
  object: GitCommit
}

export interface GitCommit {
  sha: string
  type: string
  url: string
  node_id: string
  html_url: string
  author: Author
  committer: Author
  tree: Tree
  message: string
  parents: Parent[]
  verification: Verification
}

export interface Author {
  name: string
  email: string
  date: string
}

export interface Parent {
  sha: string
  url: string
  html_url: string
}

export interface Tree {
  sha: string
  url: string
}

export interface Verification {
  verified: boolean
  reason: string
  signature: null
  payload: null
}

const notNull = (i: any): i is NonNullable<any> => i != null

export interface FetchOptions {
  since?: string
  sort?: 'created' | 'updated' | 'comments'
  type?: GitHubIssueType
  state?: GitHubIssueState
  merged?: boolean
}

enum IssueType {
  feat,
  fix,
  docs,
  style,
  refactor,
  perf,
  test,
  build,
  ci,
  chore,
  revert,
}

function sortByTitle(issue1: GitHubIssue, issue2: GitHubIssue): number {
  const [type1] = issue1?.title?.split(':')
  const [type2] = issue2?.title?.split(':')
  const issueType1 = IssueType[type1 as any]
  const issueType2 = IssueType[type2 as any]
  return issueType1 === issueType2 ? 0 : issueType1 > issueType2 ? 1 : -1
}
export class GitHubApi {
  constructor(private gitConfig: GitHubConfig) {}

  config(config: Partial<GitHubConfig>) {
    this.gitConfig = { ...this.gitConfig, ...config }
    return this
  }

  get repoURL() {
    return `repos/${this.gitConfig.owner}/${this.gitConfig.repo}`
  }

  query(url: string) {
    return fetch(`${this.gitConfig.apiURL}${url}`, {
      headers: {
        Authorization: `token ${this.gitConfig.token}`,
      },
    }).then(data => data.json())
  }

  create<T>(url: string, payload: T) {
    return fetch(`${this.gitConfig.apiURL}${url}`, {
      method: 'POST',
      headers: {
        Authorization: `token ${this.gitConfig.token}`,
      },
      body: JSON.stringify(payload),
    }).then(data => data.json())
  }

  update<T>(url: string, payload: T) {
    return fetch(`${this.gitConfig.apiURL}${url}`, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${this.gitConfig.token}`,
      },
      body: JSON.stringify(payload),
    }).then(data => data.json())
  }

  filterIssueByType(issue: GitHubIssue, type?: GitHubIssueType) {
    return type === GitHubIssueType.PullRequest ? !!issue.pull_request : !issue.pull_request
  }

  async fetchIssues(
    { since, type, state, sort, merged }: FetchOptions = {},
    sortBy = sortByTitle,
  ): Promise<GitHubIssue[]> {
    const args = [
      merged ? 'q=is:merged' : undefined,
      since ? `since=${since}` : undefined,
      state ? `state=${state}` : undefined,
      sort ? `sort=${sort}` : undefined,
    ].filter(notNull)

    let url = `${this.gitConfig.apiURL}/${this.repoURL}/issues${
      args.length > 0 ? '?' : ''
    }${args.join('&')}`
    let issues: GitHubIssue[] = []
    while (url) {
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${this.gitConfig.token}`,
        },
      })
      issues = [...issues, ...(await response.json())]
      url = ((response.headers.get('link') || '').split(', ').find(t => /rel="next"/.test(t)) || '')
        .split(';')[0]
        .replace(/^<|>$/g, '')
    }

    if (!(issues instanceof Array)) {
      throw new Error('Invalid response from server!')
    }
    return issues
      .filter(issue => this.filterIssueByType(issue, type))
      .filter(issue => issue.user.login !== 'dependabot[bot]')
      .sort(sortBy)
  }

  async fetchReleases() {
    const response = await this.query(`/${this.repoURL}/releases`)
    return response as GitHubRelease[]
  }

  async getHeadSHA(branch: string) {
    const ref: GitRef | undefined = await this.query(`/${this.repoURL}/git/refs/heads/${branch}`)
    return ref?.object?.sha
  }

  async getTagSHA(tag: string) {
    const ref: GitRef | undefined = await this.query(`/${this.repoURL}/git/refs/tags/${tag}`)
    return ref?.object?.sha
  }

  async getCommit(sha: string): Promise<GitCommit | undefined> {
    return this.query(`/${this.repoURL}/git/commits/${sha}`)
  }

  async setTag(tag: string, sha: string) {
    const ref = await this.getTagSHA(tag)
    if (ref) {
      return this.update(`/${this.repoURL}/git/refs/tags/${tag}`, {
        sha,
        force: true,
      })
    }
    return this.create(`/${this.repoURL}/git/refs`, {
      ref: `refs/tags/${tag}`,
      sha,
    })
  }

  async release(tag: string, name: string, body: string) {
    return this.create(`/${this.repoURL}/releases`, {
      tag_name: tag,
      name,
      body,
    })
  }
}
