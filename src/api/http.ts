const BASE_URL = import.meta.env.VITE_API_URL

export class HttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function http<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new HttpError(response.status, `Erreur HTTP ${response.status}`)
  }

  return (await response.json()) as T
}