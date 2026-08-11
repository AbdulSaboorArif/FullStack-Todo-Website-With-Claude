import { formatTime } from "@/lib/format";
import type { Message } from "@/lib/types";

type UserMessageProps = {
  message: Message;
};

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex flex-col items-end w-full group">
      <div className="max-w-[85%] md:max-w-[70%]">
        <div className="bg-surface-container-low border border-outline-variant rounded-2xl rounded-tr-none px-6 py-4 shadow-sm">
          <p className="font-body-md text-body-md text-on-surface">
            {message.content}
          </p>
        </div>
        <div className="mt-1 flex justify-end">
          <span className="font-label-sm text-label-sm text-outline">
            You • {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
