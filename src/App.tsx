import { Draggable, Frame } from "./components"
import "./App.css";

function App() {
  return (
    <>
      <Draggable x={97} y={5}>
        <Frame />
      </Draggable>
    </>
  )
}

export default App
