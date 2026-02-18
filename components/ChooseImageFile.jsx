"use client";
import { BiTrash, BiUpload } from "react-icons/bi";

export default function ChooseImageFile({files ,setFiles}) {
 

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileArray = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Preview image URL
    }));
    setFiles((prevFiles) => [...prevFiles, ...fileArray]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    const newFileList = new DataTransfer();
    updatedFiles.forEach((fileData) => newFileList.items.add(fileData.file));
    document.getElementById("fileInput").files = newFileList.files;
  };


  return (
    <div className="">
      <label className="font-medium">Image</label>
      <div
        className={`${
          files.length <= 0 ? "" : ""
        }  flex flex-col h-full items-center justify-start gap-4`}
      >
        <div className="w-full h-full flex justify-center items-center gap-8 flex-col border-dashed border-secondary mt-2 rounded-md border-2 p-8">
          <div className=""> <BiUpload size={28} /></div>
          <div className="text-center w-full">
            <h1 className="font-bold text-lg">Choose a file to upload</h1>
            <p className="font-light text-slate-400">JPEG, PNG, PDG, and JPG, file 1MB limited</p>
          </div>
          <div className="flex justify-center w-full">
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-blue-600 text-secondarytext px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Choose Image
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              name="images"
         onChange={handleFileChange}
         multiple
        
      
              className="w-full hidden"
            />
          </div>
        </div>
        {/* {files.length <= 0 && <h1 className="text-slate-300 text-md">Upload image</h1>} */}
 
       {files.length > 0 && (
           <div className="flex flex-wrap justify-start gap-4 border-dashed border-secondary mt-2 rounded-md border-2 p-4 w-full">
           {files.map((fileData, index) => (
             <div
               key={index}
               className="w-40 h-full max-sm:w-full max-sm:h-52 rounded-md relative group "
             >
               {fileData.file.type.startsWith("image/") ? (
                <div className="w-40 h-40 border border-secondary rounded-sm max-sm:w-full max-sm:h-full">
                   <img
                   src={fileData.preview}
                   alt="Preview"
                   className="p-2 rounsded-md w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-10"
                 />
                </div>
               ) : (
                 <p className="text-xs">{fileData.file.name}</p>
               )}
               <button
                 type="button"
                 onClick={() => handleRemoveFile(index)}
                 className="flex justify-center items-center absolute top-1/2 left-1/2  text-slate-200
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                transform -translate-x-1/2 -translate-y-1/2 "
               >
                 <BiTrash
                   className="duration-300 rounded-full p-2 w-9 h-9
                transform hover:scale-125 scale-100 bg-black opacity-50 hover:opacity-90 hover:text-primarytext "
                   size={20}
                 />
               </button>
             </div>
           ))}
         </div>
       )}

      </div>
    </div>
  );
}
