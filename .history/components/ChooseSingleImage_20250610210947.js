"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { BiPencil } from "react-icons/bi";

export default function ChooseSingleImageFile({imageUrl}) {
  const [file, setFile] = useState(null);
  const [editClicked, setEditClicked] = useState(false);
  const fileInputRef = useRef(null); // Ref for file input

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setFile({ file: selectedFile, preview: previewURL });
    }
  };

  return (
    <div className="">
      {file ? (
        <div className="w-full flex justify-center p-2 rounded-full relative">
          {file.file.type.startsWith("image/") && (
            <>
              <Image
              width={100}
              height={100}

                src={file.preview}
                className="w-32 h-32 object-cover rounded-full bg-secondary p-1"
                alt="Selected file preview"
              />
              <button
                onClick={() => setEditClicked(true)}
                className="p-2 bg-slate-600 text-secondarytext rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                type="button"
              >
                <BiPencil />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center p-2 rounded-full relative">
          <button
            onClick={() => setEditClicked(prev => !prev)}
            className="p-2 bg-slate-600 text-secondarytext rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2 "
            type="button"
          >
            <BiPencil />
          </button>
          <Image
            width={100}
            height={100}
            src={imageUrl || null}
            className="w-32 h-32 object-cover rounded-full bg-secondary p-1"
            alt="Default profile"
          />
        </div>
      )}

      {editClicked && (
    
           <div>
             <input
              ref={fileInputRef}
              onChange={handleFileChange}
               name="image"
              type="file"
              accept="image/*"
              className="w-full mt-4 p-2 rounded-md bg-secondary border-none text-xs focus:ring-0 focus:outline-none"
            />
          <p className="text-xs italic text-center mt-2">Choose file size below 1MB</p>
           </div>
        
     
      )}
    </div>
  );
}
