import { useState } from 'react'
import type { TaskStatus } from '../../api/types'
import { createTask, deleteTask, updateTaskStatus } from '../../api/tasksApi'
import type { NewTask } from '../../api/tasksApi'
import { useTasks } from '../../hooks/useTasks'
import { Column } from './Column'
import { TaskCard } from './TaskCard'
import { TaskForm } from './TaskForm'
import { TaskStats } from './TaskStats'

const PROJECT_ID = 1

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'TODO', title: 'À faire' },
  { status: 'DOING', title: 'En cours' },
  { status: 'DONE', title: 'Terminé' },
]

export function Board() {
  const { tasks, loading, error, reload } = useTasks(PROJECT_ID)
  const [search, setSearch] = useState('')

  const query = search.trim().toLowerCase()
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query),
  )

  async function handleCreate(task: NewTask) {
    await createTask(task)
    reload()
  }

  async function handleChangeStatus(id: number, status: TaskStatus) {
    try {
      await updateTaskStatus(id, status)
      reload()
    } catch {
      window.alert('Le changement de statut a échoué.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask(id)
      reload()
    } catch {
      window.alert('La suppression a échoué.')
    }
  }

  let content

  if (loading) {
    content = <p className="p-4">Chargement…</p>
  } else if (error) {
    content = (
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
  } else {
    content = (
      <>
        <TaskStats tasks={tasks} />
        <div className="grid gap-4 p-4 md:grid-cols-3">
          {columns.map(({ status, title }) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === status,
            )

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
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </Column>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <TaskForm projectId={PROJECT_ID} onCreate={handleCreate} />
      <div className="mx-4 mt-4">
        <label htmlFor="search" className="block text-sm font-medium">
          Rechercher une tâche
        </label>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Titre de la tâche…"
          className="w-full rounded border bg-white px-2 py-1"
        />
      </div>
      {content}
    </>
  )
}