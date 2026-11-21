import type { Task, TaskStatus } from '../../api/types'
import { PriorityBadge } from '../../components/PriorityBadge'

interface TaskCardProps {
  task: Task
  compact?: boolean
  onChangeStatus: (id: number, status: TaskStatus) => void
}

export function TaskCard({ task, compact = false, onChangeStatus }: TaskCardProps) {
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
      <select
        value={task.status}
        onChange={(e) => onChangeStatus(task.id, e.target.value as TaskStatus)}
        className="mt-2 rounded border px-2 py-1 text-sm"
      >
        <option value="TODO">À faire</option>
        <option value="DOING">En cours</option>
        <option value="DONE">Terminé</option>
      </select>
    </article>
  )
}