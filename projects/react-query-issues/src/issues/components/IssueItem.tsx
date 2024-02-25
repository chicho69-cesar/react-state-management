import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { Issue, State } from '../interfaces'
import { getIssueComments, getIssueInfo } from '../services'
import { FaCheckCircle, FaInfo } from 'react-icons/fa'
import { timeSince } from '../../helpers'
import { FiMessageSquare } from 'react-icons/fi'

interface Props {
  issue: Issue
}

export function IssueItem({ issue }: Props) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number],
      queryFn: () => getIssueInfo(issue.number)
    })

    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number, 'comments'],
      queryFn: () => getIssueComments(issue.number)
    })
  }

  const presetData = () => {
    queryClient.setQueryData(
      ['issue', issue.number],
      issue,
      {
        updatedAt: new Date().getTime() + 100000
      }
    )
  }

  return (
    <article
      className='card mb-2 issue'
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      // onMouseEnter={prefetchData}
      onMouseEnter={presetData}
    >
      <div className='card-body d-flex align-items-center'>
        {issue.state === State.Open ? (
          <FaInfo color='red' size={30} />
        ) : (
          <FaCheckCircle color='green' size={30} />
        )}

        <div className='d-flex flex-column flex-fill px-2'>
          <span>{issue.title}</span>
          <span className='issue-subinfo'>
            #{issue.number} opened {timeSince(issue.created_at)} ago by <span className='fw-bold'>{issue.user.login}</span>
          </span>

          <div>
            {issue.labels.map((label) => (
              <span
                key={label.id}
                className='badge rounded-pill m-1'
                style={{ backgroundColor: `#${label.color}`, color: 'black' }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className='d-flex align-items-center'>
          <img src={issue.user.avatar_url} alt='User Avatar' className='avatar' />
          <span className='px-2'>{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </article>
  )
}
