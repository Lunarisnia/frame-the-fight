import { Draggable } from "./components"
import { Nameplate } from "./components/nameplate/nameplate"

function App() {
  return (
    <>
      <Draggable>
        <Nameplate />
      </Draggable>
      <Draggable>
        <div style={{ backgroundColor: "red", width: 400, height: 100 }}><h1>HEADER</h1></div>
      </Draggable>
    </>
  )
}

export default App
