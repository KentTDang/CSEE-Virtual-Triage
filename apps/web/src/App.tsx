import { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../../../packages/ui/src/components/ui/shadcn-io/ai/conversation";

import {
  Message,
  MessageContent,
} from "../../../packages/ui/src/components/ui/shadcn-io/ai/message";

function App() {
  return (
    <Conversation className="relative w-full" style={{ height: "500px" }}>
      <ConversationContent>
        <Message from={"user"}>
          <MessageContent>Hi there!</MessageContent>
        </Message>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}

export default App;
