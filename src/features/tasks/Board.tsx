import { useState } from 'react'
import type { Task, TaskStatus } from '../../api/types'
import { mockTasks } from '../../data/mockTasks'
import { Column } from './Column'
import { TaskCard } from './TaskCard'

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'TODO', title: 'À faire' },
  { status: 'DOING', title: 'En cours' },
  { status: 'DONE', title: 'Terminé' },
]

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  function handleChangeStatus(id: number, status: TaskStatus) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
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