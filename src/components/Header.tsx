interface HeaderProps {
  projectName: string
}

export function Header({ projectName }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
      <h1 className="text-2xl font-bold">TaskFlow</h1>
      <p>Projet : {projectName}</p>
    </header>
  )
}