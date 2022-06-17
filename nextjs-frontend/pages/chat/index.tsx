import React from "react";
import Chat from "../../src/frontend/components/chat";
import NoobPage from "../../src/frontend/components/page/noob-page";

export default function ChatPage(): JSX.Element {
  return (
    <NoobPage title="Chat" metaData={{}} hideChat={true}>
      <>
        <h1>Chat</h1>
        <Chat smallChat={false} />
      </>
    </NoobPage>
  );
}
