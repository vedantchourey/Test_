import { useEffect } from "react";
const Component = ({ brackets }: { brackets: any }) => {
  useEffect(() => {
    console.log(1, brackets);

    if (!brackets) return;
    // manager.create(example as any).then((data) => {
    //   console.log(data);
    // });

    (async function () {
      const data = brackets;
      // @ts-ignore
      window.bracketsViewer.addLocale("ru", {
        common: {
          "round-name": "раунд {{roundNumber}}",
        },
      });
      // @ts-ignore
      // This is optional. You must do it before render().
      window.bracketsViewer.setParticipantImages(
        // @ts-ignore
        data.participant.map((participant) => ({
          participantId: participant.id,
        }))
      );
      // @ts-ignore
      window.bracketsViewer.onMatchClicked = (match) => console.log(match);
      // @ts-ignore
      window.bracketsViewer
        .render(
          {
            stages: data.stage,
            matches: data.match,
            matchGames: data.match_game,
            participants: data.participant,
          },
          {
            selector: "#example",
            participantOriginPlacement: "before",
            separatedChildCountLabel: true,
            showSlotsOrigin: true,
            showLowerBracketSlotsOrigin: true,
            highlightParticipantOnHover: true,
          }
        )
        .then(() => console.log("Render finished"));
    })();
  }, [brackets]);
  return (
    <>
      <div className="bracket" style={{ maxHeight: 600, overflow: "scroll"}}>
        <div id="example" className="brackets-viewer"></div>
      </div>
    </>
  );
};
export default Component;
