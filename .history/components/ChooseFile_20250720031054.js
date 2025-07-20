"use client";
import Image from "next/image";
import { BiTrash, BiUpload } from "react-icons/bi";
import { FaFile } from "react-icons/fa";

export default function ChooseFile({ files, setFiles }) {


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
      <div>
        <label className="font-medium">Files</label>
      <div
        className={`${files.length <= 0 ? "" : ""
          }  flex flex-col h-full items-center justify-start gap-4`}
      >
        <div className="w-full  h-full flex justify-center items-center gap-8 flex-col border-dashed border-secondary mt-2 rounded-md border-2 p-8">
          <div className=""> <BiUpload size={28} /></div>
          <div className="text-center w-full">
            <h1 className="font-bold text-lg">Choose a file to upload</h1>
            <p className="font-light text-slate-400">JPEG, PNG, PDF, and JPG, file 1MB limited</p>
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
              name="files"
              onChange={handleFileChange}
              multiple


              className="w-full hidden"
            />
          </div>
        </div>
        {/* {files.length <= 0 && <h1 className="text-slate-300 text-md">Upload image</h1>} */}

     

      </div>
      </div>

         {files.length > 0 && (
          <div className="overflow-y-scroll flex flex-wrap justify-start gap-4 border-dashed border-secondary mt-2 rounded-md border-2 p-4 w-full">
            {files.map((fileData, index) => (
              <div
                key={index}
                className="w-full rounded-md relative group border"
              >
                {fileData.file.type.startsWith("image/") ? (
                  <div className="w-full border flex items-center gap-2 border-secondary rounded-sm max-sm:w-full max-sm:h-52  ">
                   <div className="w-10 h-10">
                     <Image
                      height={20}
                      width={20}
                      src={fileData.preview}
                      alt="Preview"
                      className="p-2 w-20 h-20 rounsded-md  object-cover transition-opacity duration-300 group-hover:opacity-10"
                    />
                   </div>
                    <p className="w-full">file name</p>
                  </div>
                ) : (
                  <div className="text-xs p-3 flex items-center gap-2">
                    <FaFile size={18} />
                    <p className="">{fileData.file.name}</p>
                  </div>
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
  );
}
