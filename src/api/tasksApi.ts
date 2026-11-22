import type { Task, TaskStatus } from './types'
import { http } from './http'

export type NewTask = Omit<Task, 'id'>

export function getTasks(projectId: number, signal?: AbortSignal): Promise<Task[]> {
  return http<Task[]>(
    `/tasks?projectId=${projectId}&_sort=createdAt&_order=desc`,
    { signal },
  )
}

export function createTask(task: NewTask): Promise<Task> {
  return http<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export function updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
  return http<Task>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export function deleteTask(id: number): Promise<void> {
  return http<void>(`/tasks/${id}`, { method: 'DELETE' })
}