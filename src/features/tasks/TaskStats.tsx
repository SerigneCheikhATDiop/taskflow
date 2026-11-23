import type { Task } from '../../api/types'

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const today = new Date().toISOString().slice(0, 10)

  const total = tasks.length
  const done = tasks.filter((task) => task.status === 'DONE').length
  const late = tasks.filter(
    (task) => task.dueDate !== null && task.dueDate < today && task.status !== 'DONE',
  ).length
  const progress = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="mx-4 mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      <div className="rounded-lg bg-white p-3 shadow">
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="rounded-lg bg-white p-3 shadow">
        <p className="text-sm text-gray-500">Terminées</p>
        <p className="text-2xl font-bold">{done}</p>
      </div>
      <div className="rounded-lg bg-white p-3 shadow">
        <p className="text-sm text-gray-500">Avancement</p>
        <p className="text-2xl font-bold">{progress} %</p>
      </div>
      <div className="rounded-lg bg-white p-3 shadow">
        <p className="text-sm text-gray-500">En retard</p>
        <p className="text-2xl font-bold text-red-600">{late}</p>
      </div>
    </div>
  )
}