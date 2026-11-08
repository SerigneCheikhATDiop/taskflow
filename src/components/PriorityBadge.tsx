import type { Priority } from '../api/types'

interface PriorityBadgeProps {
  priority: Priority
}

const styles: Record<Priority, string> = {
  LOW: 'bg-gray-200 text-gray-700',
  MEDIUM: 'bg-orange-100 text-orange-700',
  HIGH: 'bg-red-100 text-red-700',
}

const labels: Record<Priority, string> = {
  LOW: 'Faible',
  MEDIUM: 'Moyenne',
  HIGH: 'Haute',
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`rounded px-2 py-1 text-xs font-medium ${styles[priority]}`}>
      {labels[priority]}
    </span>
  )
}