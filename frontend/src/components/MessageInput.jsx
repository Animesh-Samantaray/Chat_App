import React, { useState, useRef } from "react";
import { Image, Send, X } from "lucide-react"; 
import { useChatStore } from "../store/useChatStore.js";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full bg-zinc-900 border-t border-zinc-800 p-4">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border border-zinc-700 shadow-md"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-white hover:bg-red-500 transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        className="flex items-center gap-3 bg-zinc-800 rounded-full px-4 py-3 shadow-inner"
        onSubmit={handleSendMessage}
      >
        {/* Message Input */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-sm"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-700 transition text-zinc-400"
        >
          <Image size={20} />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          <Send size={18} />
          <span className="text-sm font-medium">Send</span>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
