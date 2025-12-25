import { Draggable, Frame } from "./components"
import "./App.css";
import { useContext } from "react";
import { SharingSystemContext } from "./features/sharing-system";

function App() {
  const ctx = useContext(SharingSystemContext);
  return (
    <>
      <Draggable x={ctx.p1HealthBarPos.x} y={ctx.p1HealthBarPos.y} >
        <Frame src="nameplate.png" inverse={false} />
      </Draggable>
      <Draggable x={50} y={0} >
        <Frame src="nameplate.png" inverse={true} />
      </Draggable>
    </>
  )
}

export default App
