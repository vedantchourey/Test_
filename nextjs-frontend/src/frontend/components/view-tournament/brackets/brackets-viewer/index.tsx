import { useEffect } from "react";
import { frontendSupabase } from "../../../../services/supabase-frontend-service";
import '../../../ui-components/typography/heading.module.css'

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
      window.bracketsViewer.addLocale("en", {
        common: {
          "round-name": "раунд {{roundNumber}}",
        },
        "match-label": {
          "consolation-final": "3rd Place Playoff",
        },
      });
      
      // @ts-expect-error: ignore
      // This is optional. You must do it before render().
      window.bracketsViewer.setParticipantImages(
        // @ts-expect-error: ignore
        data?.participant?.map((participant) => {
          return {
            participantId: participant.id,
            imageUrl: participant.avatarUrl
              ? frontendSupabase.storage
                  .from("public-files")
                  .getPublicUrl(participant.avatarUrl).publicURL
              : "/images/teams/Player.png",
          };
        })
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
      {/* <div className="bracket hide-scrollbar" style={{ maxHeight: 600, overflow: "scroll", maxWidth: "80vw" }}>
        <div id="example" className="brackets-viewer hide-scrollbar" style={{ maxHeight: 600, overflow: "scroll", maxWidth: "80vw" }}></div>
      </div> */}
      <div className="bracket hide-scrollbar">
        <div id="example" className="brackets-viewer hide-scrollbar" ></div>
      </div>
    </>
  );
};
export default Component;
