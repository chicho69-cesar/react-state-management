import { useQuery } from '@tanstack/react-query'
import { getLabels } from '../services'

export function useLabels() {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
    staleTime: 1000 * 60 * 60, // 1 hour
    // initialData: [],
    // placeholderData: [],
    placeholderData: [
      {
        id: 725156255,
        node_id: 'MDU6TGFiZWw3MjUxNTYyNTU=',
        url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)',
        name: 'good first issue (taken)',
        color: 'b60205',
        default: false,
      },
      {
        id: 717031390,
        node_id: 'MDU6TGFiZWw3MTcwMzEzOTA=',
        url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue',
        name: 'good first issue',
        color: '6ce26a',
        default: true
      }
    ]
  })

  return labelsQuery
}
