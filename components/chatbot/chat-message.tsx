import { Bot } from "lucide-react";

export type ChatMessageData = { id: string; role: "user" | "assistant"; content: string };

export default function ChatMessage({ message }: { message: ChatMessageData }) {
  const assistant = message.role === "assistant";
  return (
    <div className={`flex items-end gap-2 ${assistant ? "justify-start" : "justify-end"}`}>
      {assistant && <span className="grid size-7 shrink-0 place-items-center rounded-full bg-navy text-white"><Bot size={15} aria-hidden="true" /></span>}
      <div className={`max-w-[84%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[13px] leading-[1.55] ${assistant ? "rounded-bl-sm bg-[#f1f4f8] text-[#24334a]" : "rounded-br-sm bg-navy text-white"}`}>{message.content}</div>
    </div>
  );
}



