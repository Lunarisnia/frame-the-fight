import { Draggable, Frame } from "./components"
import "./App.css";
import { useContext } from "react";
import { SharingSystemContext } from "./features/sharing-system";
import { FancyText } from "./components/fancy-text/FancyText";

function App() {
  const ctx = useContext(SharingSystemContext);
  return (
    <>
      <Draggable x={ctx.player1.nameplate.position.x} y={ctx.player1.nameplate.position.y} visible={ctx.player1.nameplate.visible} setPosition={ctx.setPlayer1HealthPosition} >
        <Frame src="nameplate.png" inverse={false} />
      </Draggable>
      <Draggable x={ctx.player1.score.position.x} y={ctx.player1.score.position.y} visible={ctx.player1.score.visible} setPosition={ctx.setPlayer1ScorePosition}>
        <Frame src="score.png" inverse={false} />
      </Draggable>
      <Draggable x={ctx.player1.country.position.x} y={ctx.player1.country.position.y} visible={ctx.player1.country.visible} setPosition={ctx.setPlayer1CountryPosition}>
        <Frame src="country.png" inverse={false} />
      </Draggable>

      <Draggable x={ctx.player2.nameplate.position.x} y={ctx.player2.nameplate.position.y} visible={ctx.player2.nameplate.visible} setPosition={ctx.setPlayer2HealthPosition}>
        <Frame src="nameplate.png" inverse={true} />
      </Draggable>
      <Draggable x={ctx.player2.score.position.x} y={ctx.player2.score.position.y} visible={ctx.player2.score.visible} setPosition={ctx.setPlayer2ScorePosition}>
        <Frame src="score.png" inverse={true} />
      </Draggable>
      <Draggable x={ctx.player2.country.position.x} y={ctx.player2.country.position.y} visible={ctx.player2.country.visible} setPosition={ctx.setPlayer2CountryPosition}>
        <Frame src="country.png" inverse={true} />
      </Draggable>

      <Draggable x={ctx.stage.position.x} y={ctx.stage.position.y} visible={ctx.stage.visible} setPosition={ctx.setStagePosition}>
        <Frame src="group.png" inverse={false} />
      </Draggable>

      <Draggable x={ctx.logo.position.x} y={ctx.logo.position.y} setPosition={ctx.setLogoPosition} visible={ctx.logo.visible}>
        <Frame src="logo.png" inverse={false} width={ctx.logo.size.w} height={ctx.logo.size.h} />
      </Draggable>


      <Draggable x={ctx.player1.nameplate.teamTextPosition.x} y={ctx.player1.nameplate.teamTextPosition.y} setPosition={ctx.setPlayer1TeamPosition}>
        <FancyText color={"#FF0000"} font={ctx.font} fontSize={ctx.player1.nameplate.teamFontSize}>
          {ctx.player1.nameplate.team}
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player1.nameplate.textPosition.x} y={ctx.player1.nameplate.textPosition.y} setPosition={ctx.setPlayer1NamePosition}>
        <FancyText color={"#FFFFFF"} font={ctx.font} fontSize={ctx.player1.nameplate.nameFontSize}>
          {ctx.player1.nameplate.name}
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player1.country.textPosition.x} y={ctx.player1.country.textPosition.y} setPosition={ctx.setPlayer1CountryIconPosition}>
        <FancyText color={"#FFFFFF"} font={ctx.font} fontSize={ctx.player1.country.fontSize}>
          {ctx.player1.country.name}
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player1.score.textPosition.x} y={ctx.player1.score.textPosition.y} setPosition={ctx.setPlayer1ScoreTextPosition}>
        <FancyText color={"#FFFFFF"} font={ctx.font} fontSize={ctx.player1.score.fontSize}>
          {ctx.player1.score.value}
        </FancyText>
      </Draggable>

      <Draggable x={ctx.player2.nameplate.teamTextPosition.x} y={ctx.player2.nameplate.teamTextPosition.y} setPosition={ctx.setPlayer2TeamPosition}>
        <FancyText color={"#FF0000"} font={ctx.font} fontSize={ctx.player2.nameplate.teamFontSize}>
          {ctx.player2.nameplate.team}
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player2.nameplate.textPosition.x} y={ctx.player2.nameplate.textPosition.y} setPosition={ctx.setPlayer2NamePosition}>
        <FancyText color={"#FFFFFF"} font={ctx.font} fontSize={ctx.player2.nameplate.nameFontSize}>
          {ctx.player2.nameplate.name}
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player2.country.textPosition.x} y={ctx.player2.country.textPosition.y} setPosition={ctx.setPlayer2CountryIconPosition}>
        <FancyText color={"#FFFFFF"} font={ctx.font} fontSize={ctx.player2.country.fontSize}>
          {ctx.player2.country.name}
        </FancyText>
      </Draggable>
      <Draggable x={ctx.player2.score.textPosition.x} y={ctx.player2.score.textPosition.y} setPosition={ctx.setPlayer2ScoreTextPosition}>
        <FancyText color={"#FFFFFF"} font={ctx.font} fontSize={ctx.player2.score.fontSize}>
          {ctx.player2.score.value}
        </FancyText>
      </Draggable>

      <Draggable x={ctx.stage.textPosition.x} y={ctx.stage.textPosition.y} setPosition={ctx.setStageNamePosition}>
        <FancyText color={"#FFFFFF"} font={ctx.font} fontSize={ctx.stage.fontSize}>
          {ctx.stage.value}
        </FancyText>
      </Draggable>
    </>
  )
}

export default App
