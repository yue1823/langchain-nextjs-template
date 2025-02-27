import { cn } from "@/utils/cn";
import type { Message } from "ai/react";
import HashtagsView from "./HashtagsView";
import Image from "next/image";
import { parseContentToJson } from "@/utils/parseContentToJson";

const formatMessageContent = (content: string) => {
  const parts = content.split(/(#\w+)/g);
  return parts.map((part, index) => {
    if (part.startsWith("#")) {
      return (
        <span
          key={index}
          className="inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground mx-1"
        >
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export function ChatMessageMetaMove(props: {
  message: Message;
  aiEmoji?: string;
  sources: any[];
}) {
  return (
    <div
      className={cn(
        `rounded-[24px] max-w-[80%] mb-8 flex`,
        props.message.role === "user"
          ? "bg-secondary text-secondary-foreground px-4 py-2"
          : null,
        props.message.role === "user" ? "ml-auto" : "mr-auto",
      )}
    >
      {props.message.role !== "user" && (
        <div className="mr-4 border bg-secondary -mt-2 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
          {props.aiEmoji}
        </div>
      )}

      <div className="whitespace-pre-wrap flex flex-col w-full">
        {parseContentToJson(props.message)}

        {props.sources && props.sources.length ? (
          <>
            <code className="mt-4 mr-auto bg-primary px-2 py-1 rounded">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="mt-1 mr-2 bg-primary px-2 py-1 rounded text-xs">
              {props.sources?.map((source, i) => (
                <div className="mt-2" key={"source:" + i}>
                  {i + 1}. &quot;{source.pageContent}&quot;
                  {source.metadata?.loc?.lines !== undefined ? (
                    <div>
                      <br />
                      Lines {source.metadata?.loc?.lines?.from} to{" "}
                      {source.metadata?.loc?.lines?.to}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </code>
          </>
        ) : null}
      </div>
    </div>
  );
}
