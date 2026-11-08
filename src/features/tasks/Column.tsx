import type { ReactNode } from 'react'

interface ColumnProps {
  title: string
  count: number
  children: ReactNode
}

export function Column({ title, count, children }: ColumnProps) {
  return (
    <section className="rounded-lg bg-gray-100 p-3">
      <h2 className="mb-3 font-bold">
        {title} ({count})
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  )
}