import { useQuery } from '@tanstack/react-query'
import { getRandomNumberFromApi } from '../utils/fetcher'

export function useRandom() {
  const query = useQuery({
    queryKey: ['randomNumber'],
    queryFn: getRandomNumberFromApi,
  })

  return query
}
