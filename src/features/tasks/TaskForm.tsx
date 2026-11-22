import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority } from '../../api/types'
import type { NewTask } from '../../api/tasksApi'

interface TaskFormProps {
  projectId: number
  onCreate: (task: NewTask) => Promise<void>
}

interface FormErrors {
  title?: string
  dueDate?: string
  submit?: string
}

export function TaskForm({ projectId, onCreate }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('MEDIUM')
  const [dueDate, setDueDate] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const today = new Date().toISOString().slice(0, 10)
    const newErrors: FormErrors = {}

    if (title.trim().length < 3) {
      newErrors.title = 'Le titre doit contenir au moins 3 caractères.'
    }
    if (dueDate !== '' && dueDate < today) {
      newErrors.dueDate = "L'échéance ne peut pas être dans le passé."
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      await onCreate({
        projectId,
        title: title.trim(),
        description,
        status: 'TODO',
        priority,
        assigneeId: null,
        dueDate: dueDate === '' ? null : dueDate,
        createdAt: new Date().toISOString(),
      })
      setTitle('')
      setDescription('')
      setPriority('MEDIUM')
      setDueDate('')
    } catch {
      setErrors({ submit: 'La création a échoué. Le serveur est-il lancé ?' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="m-4 space-y-3 rounded-lg bg-white p-4 shadow">
      <h2 className="font-bold">Nouvelle tâche</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Titre
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-2 py-1"
        />
        {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border px-2 py-1"
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium">
            Priorité
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="rounded border px-2 py-1"
          >
            <option value="LOW">Faible</option>
            <option value="MEDIUM">Moyenne</option>
            <option value="HIGH">Haute</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium">
            Échéance
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded border px-2 py-1"
          />
          {errors.dueDate && <p className="text-sm text-red-600">{errors.dueDate}</p>}
        </div>
      </div>

      {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-blue-600 px-3 py-1 text-white disabled:opacity-50"
      >
        {submitting ? 'Création…' : 'Ajouter'}
      </button>
    </form>
  )
}