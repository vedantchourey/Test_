import { useEffect } from "react";
const Component = ({ brackets }: { brackets: any }): any => {
  useEffect(() => {
    if (!brackets) return;

    (async function (): Promise<any> {
      const data = brackets;
      // @ts-expect-error: ignore
      window.bracketsViewer.addLocale("ru", {
        common: {
          "round-name": "раунд {{roundNumber}}",
        },
      });
      // @ts-expect-error: ignore
      // This is optional. You must do it before render().
      window.bracketsViewer.setParticipantImages(
        // @ts-expect-error: ignore
        data.participant.map((participant) => ({
          participantId: participant.id,
        }))
      );
      // @ts-expect-error: ignore
      window.bracketsViewer.onMatchClicked = (match): any => {
        match;
      };
      // @ts-expect-error: ignore
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
        .then(() => {
          //render finish
        });
    })();
  }, [brackets]);
  return (
    <>
      <div className="bracket" style={{ maxHeight: 600, overflow: "scroll" }}>
        <div id="example" className="brackets-viewer"></div>
      </div>
    </>
  );
};
export default Component;