import { githubApi } from '../../api/github-api'
import { sleep } from '../../helpers'
import type { Issue, State } from '../interfaces'

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2)
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2)
  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
  return data
}

interface Props {
  state?: State
  labels: string[]
  page?: number
}

export const getIssues = async ({ labels, page = 1, state }: Props): Promise<Issue[]> => {
  const params = new URLSearchParams()

  if (state) {
    params.append('state', state)
  }

  if (labels.length > 0) {
    const labelString = labels.join(',')
    params.append('labels', labelString)
  }

  params.append('page', page.toString())
  params.append('per_page', '5')

  const { data } = await githubApi.get<Issue[]>('/issues', { params })

  return data
}

interface QueryProps {
  pageParam: number
  queryKey: (string | Props)[]
}

export const getInfiniteIssues = async ({ queryKey, pageParam }: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey
  const { labels, state } = args as Props

  const params = new URLSearchParams()

  if (state) {
    params.append('state', state)
  }

  if (labels.length > 0) {
    const labelString = labels.join(',')
    params.append('labels', labelString)
  }

  params.append('page', pageParam.toString())
  params.append('per_page', '5')

  const { data } = await githubApi.get<Issue[]>('/issues', { params })

  return data
}
