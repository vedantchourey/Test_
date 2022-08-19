import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { searchPeopleByText } from "../../../service-clients/search-service-client";

export default function ReplyInput({onSubmit}: any): JSX.Element {
  const [reply, setReply] = useState<string>("");
  const fetchUsersInReply = async (query: any, callback: any): Promise<any> => {
    const response = await searchPeopleByText({ search: query.toLowerCase() });
    callback(
      response.map((i) => ({ id: i.username, display: i.username })).slice(0, 2)
    );
  };
  return (
    <Box display={"flex"} flex={1}>
      <MentionsInput
        value={reply}
        onChange={(e): any => {
          setReply(e.target.value);
        }}
        // style={style}
        style={{
          input: {
            color: "#fff",
            border: 0,
            letterSpacing: 0,
            lineHeight: 1.5,
          },
          suggestions: {
            list: {
              backgroundColor: "#0f0526",
              border: "1px solid rgba(0,0,0,0.15)",
              // borderRadius: 5,
              fontSize: 14,
            },
            item: {
              padding: "5px 15px",
              borderBottom: "1px solid rgba(0,0,0,0.15)",
              borderRadius: 5,
              "&focused": {
                backgroundColor: "rgba(255,255,255, 0.1)",
              },
            },
          },
          flex: 1,
          border: 0,
        }}
        placeholder={"Your reply"}
      >
        <Mention
          markup="@~__display__~"
          displayTransform={(username): any => `@${username}`}
          trigger="@"
          data={fetchUsersInReply}
          renderSuggestion={(suggestion, search, highlightedDisplay): any => (
            <div className="user">{highlightedDisplay}</div>
          )}
          style={{ backgroundColor: "#6931F9" }}
        />
      </MentionsInput>
      <Button
        size="small"
        variant={"contained"}
        style={{
          borderRadius: 99999,
          textTransform: "capitalize",
        }}
        onClick={(): void => {
          onSubmit(reply);
          setReply("");
        }}
      >
        Reply
      </Button>
    </Box>
  );
}
