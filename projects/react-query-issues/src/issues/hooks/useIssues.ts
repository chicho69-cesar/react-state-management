import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { State } from '../interfaces'
import { getIssues } from '../services'

interface Props {
  state?: State
  labels: string[]
  page?: number
}

export function useIssues({ labels, state }: Props) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [labels, state])

  const issuesQuery = useQuery({
    queryKey: ['issues', { labels, state, page }],
    queryFn: () => getIssues({ labels, state, page })
  })

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return
    setPage(page + 1)
  }

  const prevPage = () => {
    if (page === 1) return
    setPage(page - 1)
  }

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'Loading' : page,
    nextPage,
    prevPage
  }
}
