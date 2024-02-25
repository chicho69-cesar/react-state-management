import { useInfiniteQuery } from '@tanstack/react-query'
import { State } from '../interfaces'
import { getInfiniteIssues } from '../services'

interface Props {
  state?: State
  labels: string[]
  page?: number
}

export function useIssuesInfinite({ labels, state }: Props) {
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels }],
    queryFn: ({ pageParam, queryKey }) => getInfiniteIssues({ pageParam, queryKey }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if ( lastPage.length === 0 ) return
      return pages.length + 1
    }
  })

  return { issuesQuery }
}
