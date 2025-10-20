import React, { useState, useRef } from "react";
import { Image, Send,X } from "lucide-react"; // optional icons
import { useChatStore } from "../store/useChatStore.js";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");

  const {sendMessage} = useChatStore();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

    const handleImageChange = (e) => {

      const file = e.target.files[0];
console.log("File selected:", file);
      if(!file.type.startsWith('image/')){
        toast.error('Plz select an image file');
        return;
      }

      const reader = new FileReader();

      reader.onloadend=()=>{
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file)
  };

  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current){
      fileInputRef.current.value='';
    }
  };

  const handleSendMessage = async (e) => {
          e.preventDefault();
          if(!text.trim() && !imagePreview) return;
           try{
              await sendMessage({
                text:text.trim(),
                image:imagePreview
              });

              setText('');
              setImagePreview(null);
              if(fileInputRef.current) fileInputRef.current.value='';
           }catch(error){
              console.log(error);
            toast.error(error.message)
           }
  };

  return (
    <div className="w-full bg-zinc-900 border-t border-zinc-800 p-3">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form
        className="flex items-center gap-3 bg-zinc-800 rounded-full px-4 py-2 shadow-inner"
        onSubmit={handleSendMessage} 
      >
        {/* Message input */}
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image icon */}
       <button
            type="button"
            className={` sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>

        {/* Send button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
