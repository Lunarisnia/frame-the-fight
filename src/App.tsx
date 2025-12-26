import { Draggable, Frame } from "./components"
import "./App.css";
import { useContext } from "react";
import { SharingSystemContext } from "./features/sharing-system";
import { FancyText } from "./components/fancy-text/FancyText";

function App() {
  const ctx = useContext(SharingSystemContext);
  return (
    <>
      <Draggable x={ctx.player1.nameplate.position.x} y={ctx.player1.nameplate.position.y} >
        <Frame src="nameplate.png" inverse={false} />
      </Draggable>
      <Draggable x={ctx.player1.score.position.x} y={ctx.player1.score.position.y} >
        <Frame src="score.png" inverse={false} />
      </Draggable>
      <Draggable x={ctx.player1.country.position.x} y={ctx.player1.country.position.y} >
        <Frame src="country.png" inverse={false} />
      </Draggable>

      <Draggable x={ctx.player2.nameplate.position.x} y={ctx.player2.nameplate.position.y} >
        <Frame src="nameplate.png" inverse={true} />
      </Draggable>
      <Draggable x={ctx.player2.score.position.x} y={ctx.player2.score.position.y} >
        <Frame src="score.png" inverse={true} />
      </Draggable>
      <Draggable x={ctx.player2.country.position.x} y={ctx.player2.country.position.y} >
        <Frame src="country.png" inverse={true} />
      </Draggable>

      <Draggable x={ctx.stage.position.x} y={ctx.stage.position.y} >
        <Frame src="group.png" inverse={false} />
      </Draggable>

      <Draggable x={ctx.player1.nameplate.teamTextPosition.x} y={ctx.player1.nameplate.teamTextPosition.y}>
        <FancyText color={"#FFFFFF"}>
          TEAM1
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player1.nameplate.textPosition.x} y={ctx.player1.nameplate.textPosition.y}>
        <FancyText color={"#FFFFFF"}>
          Player 1
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player2.nameplate.teamTextPosition.x} y={ctx.player2.nameplate.teamTextPosition.y}>
        <FancyText color={"#FFFFFF"}>
          TEAM2
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player2.nameplate.textPosition.x} y={ctx.player2.nameplate.textPosition.y}>
        <FancyText color={"#FFFFFF"}>
          Player 2
        </FancyText>
      </Draggable>

      <Draggable x={ctx.stage.textPosition.x} y={ctx.stage.textPosition.y}>
        <FancyText color={"#FFFFFF"}>
          Grand Final
        </FancyText>
      </Draggable>
    </>
  )
}


export default App
