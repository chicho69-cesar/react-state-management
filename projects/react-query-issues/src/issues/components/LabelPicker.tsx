import { LoadingIcon } from '../../shared/components/LoadingIcon'
import { useLabels } from '../hooks'

interface Props {
  selectedLabels: string[]
  onChange: (labelName: string) => void
}

export function LabelPicker({ onChange, selectedLabels }: Props) {
  const labelsQuery = useLabels()

  if (labelsQuery.isLoading) {
    return <LoadingIcon />
  }

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : '' }`}
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  )
}
