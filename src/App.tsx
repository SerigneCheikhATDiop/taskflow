import { Header } from './components/Header'
import { Board } from './features/tasks/Board'

export default function App() {
  return (
    <>
      <Header projectName="Projet 1" />
      <Board />
    </>
  )
}