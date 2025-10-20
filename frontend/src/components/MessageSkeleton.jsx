import React from "react";
// powered by ai
const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-950">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-3 ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Avatar */}
          {idx % 2 === 0 && (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 animate-pulse shadow-inner" />
          )}

          {/* Message Bubble */}
          <div
            className={`max-w-[70%] rounded-2xl p-3 ${
              idx % 2 === 0
                ? "bg-gray-800/70 rounded-tl-none"
                : "bg-blue-600/30 rounded-tr-none"
            }`}
          >
            <div className="space-y-2">
              {/* Username placeholder */}
              <div className="h-3 w-20 bg-gray-700/80 rounded-md animate-pulse" />
              {/* Message line(s) */}
              <div className="h-4 w-48 bg-gray-700/70 rounded-md animate-pulse" />
              <div className="h-4 w-32 bg-gray-700/70 rounded-md animate-pulse" />
            </div>
          </div>

          {/* Avatar on right side */}
          {idx % 2 !== 0 && (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 animate-pulse shadow-inner" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
