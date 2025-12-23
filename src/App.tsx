import { Draggable, Frame } from "./components"
import "./App.css";
import { useContext } from "react";
import { SharingSystemContext } from "./features/sharing-system";

function App() {
  const ctx = useContext(SharingSystemContext);
  return (
    <>
      <Draggable x={138} y={5} setPosition={ctx.setP1HealthBarPos}>
        <Frame />
      </Draggable>
    </>
  )
}

export default App
