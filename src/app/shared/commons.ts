export type TaskState = 'TODO' | 'IN PROGRESS' | 'DONE'

export interface Task {
  id: string
  title: string
  state: TaskState
  description: string
}
