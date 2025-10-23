import React, { useState, useRef } from "react";
import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage } = useChatStore();
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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      fileInputRef.current.value = "";
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-2 sm:p-3 bg-[#0d0d0d] border-t border-zinc-800">
      {imagePreview && (
        <div className="mb-2 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg border border-zinc-700"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1 -right-1 bg-zinc-800 text-white rounded-full p-[2px] hover:bg-red-500 transition"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-2"
      >
        <input
          type="text"
          placeholder="Message..."
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-zinc-400 hover:text-white transition"
        >
          <Image size={18} />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-[#056162] hover:bg-[#128c7e] text-white p-2 rounded-full transition disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
