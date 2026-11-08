import type { Task } from '../../api/types'
import { PriorityBadge } from '../../components/PriorityBadge'

interface TaskCardProps {
  task: Task
  compact?: boolean
}

export function TaskCard({ task, compact = false }: TaskCardProps) {
  const today = new Date().toISOString().slice(0, 10)
  const isLate = task.dueDate !== null && task.dueDate < today && task.status !== 'DONE'

  return (
    <article className="rounded-lg bg-white p-3 shadow">
      <h3 className="font-semibold">{task.title}</h3>
      {!compact && <p className="text-sm text-gray-600">{task.description}</p>}
      <div className="mt-2 flex items-center gap-2">
        <PriorityBadge priority={task.priority} />
        {isLate && (
          <span className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
            En retard
          </span>
        )}
      </div>
    </article>
  )
}