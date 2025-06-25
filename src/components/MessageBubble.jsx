function MessageBubble({ sender, text }) {
  const isUser = sender === "user";
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const processedText = text.replace(urlRegex, (url) => {
    return `<a href="${url}" class="text-blue-500 underline break-all" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 max-w-sm rounded-xl break-words whitespace-pre-wrap ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-bl-none"
        }`}
         dangerouslySetInnerHTML={{ __html: processedText }}
      >
        {/* {text} */}
      </div>
    </div>
  );
}

export default MessageBubble;
