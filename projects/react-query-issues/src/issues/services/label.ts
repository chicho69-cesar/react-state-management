import { githubApi } from '../../api/github-api'
import { sleep } from '../../helpers'
import { Label } from '../interfaces'

export const getLabels = async (): Promise<Label[]> => {
  await sleep(2)

  const { data } = await githubApi.get<Label[]>('/labels?per_page=100', {
    headers: {
      Authorization: null
    }
  })

  return data
}
