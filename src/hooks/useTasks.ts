import { useEffect, useState } from 'react'
import type { Task } from '../api/types'
import { getTasks } from '../api/tasksApi'

export function useTasks(projectId: number) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    getTasks(projectId, controller.signal)
      .then((data) => {
        setTasks(data)
        setLoading(false)
      })
      .catch(() => {
        if (controller.signal.aborted) return
        setError('Impossible de charger les tâches. Le serveur est-il lancé ?')
        setLoading(false)
      })

    return () => controller.abort()
  }, [projectId, reloadKey])

  function reload() {
    setReloadKey((key) => key + 1)
  }

  return { tasks, loading, error, reload }
}