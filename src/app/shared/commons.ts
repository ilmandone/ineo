export type TaskState = 'TODO' | 'IN PROGRESS' | 'DONE'

export interface Task {
  id: number
  title: string
  state: TaskState
  description: string
}
