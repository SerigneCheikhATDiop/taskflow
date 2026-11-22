import type { TaskStatus } from '../../api/types'
import { updateTaskStatus } from '../../api/tasksApi'
import { useTasks } from '../../hooks/useTasks'
import { Column } from './Column'
import { TaskCard } from './TaskCard'

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'TODO', title: 'À faire' },
  { status: 'DOING', title: 'En cours' },
  { status: 'DONE', title: 'Terminé' },
]

export function Board() {
  const { tasks, loading, error, reload } = useTasks(1)

  async function handleChangeStatus(id: number, status: TaskStatus) {
    await updateTaskStatus(id, status)
    reload()
  }

  if (loading) {
    return <p className="p-4">Chargement…</p>
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={reload}
          className="mt-2 rounded bg-blue-600 px-3 py-1 text-white"
        >
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-3">
      {columns.map(({ status, title }) => {
        const columnTasks = tasks.filter((task) => task.status === status)

        return (
          <Column key={status} title={title} count={columnTasks.length}>
            {columnTasks.length === 0 ? (
              <p className="text-gray-500">Aucune tâche</p>
            ) : (
              columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onChangeStatus={handleChangeStatus}
                />
              ))
            )}
          </Column>
        )
      })}
    </div>
  )
}