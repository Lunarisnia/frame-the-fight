import { Draggable, Frame } from "./components"
import "./App.css";
import { useContext } from "react";
import { SharingSystemContext } from "./features/sharing-system";

function App() {
  const ctx = useContext(SharingSystemContext);
  return (
    <>
      <Draggable x={ctx.player1.nameplate.position.x} y={ctx.player1.nameplate.position.y} >
        <Frame src="nameplate.png" inverse={false} />
      </Draggable>
      <Draggable x={ctx.player2.nameplate.position.x} y={ctx.player2.nameplate.position.y} >
        <Frame src="nameplate.png" inverse={true} />
      </Draggable>
    </>
  )
}


export default App
