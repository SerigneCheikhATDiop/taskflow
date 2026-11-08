export type TaskStatus = 'TODO' | 'DOING' | 'DONE'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
  id: number
  projectId: number
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  assigneeId: number | null
  dueDate: string | null
  createdAt: string
}

export interface Project {
  id: number
  name: string
  description: string
  ownerId: number
}