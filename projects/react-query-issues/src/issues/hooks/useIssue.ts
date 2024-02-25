import { useQuery } from '@tanstack/react-query'
import { getIssueComments, getIssueInfo } from '../services'

export function useIssue(issueNumber: number) {
  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueInfo(issueNumber)
  })

  const commentsQuery = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined
  })

  return {
    issueQuery,
    commentsQuery
  }
}
