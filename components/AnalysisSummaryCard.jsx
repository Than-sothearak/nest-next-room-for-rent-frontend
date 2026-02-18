import React from "react";
import { IoMdClose } from "react-icons/io";

const AnalysisSummaryCard = ({ closeModal, data }) => {
  return (
    <div className="fixed w-full h-full top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-40 flex bg-black/80">
      <div className="flex justify-center items-center w-full h-full rounded-lg shadow-lg">
        <div className="gap-4 bg-primary rounded-lg shadow-lg relative px-10 py-6">
          <div className="flex justify-between items-center p-4 gap-5">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <button
              type="button"
              onClick={closeModal}
              className="hover:bg-slate-100 rounded-full p-3 absolute top-0 right-0  text-primarytext transition-all duration-300"
            >
              <IoMdClose size={20} />
            </button>
          </div>

         {data.title === "Total Tenants" && (
             <div className=" w-full">
            {data.values && Array.isArray(data.values) ? (
              <ul className="list-disc pl-5">
                {data.values.map((item, index) => (
                  <li key={index} className="text-start">
                    {item.username}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg">NA</p>
            )}
          </div>
         )}


         {data.title === "Total Parking" && (
             <div className=" w-full">
            {data.values && Array.isArray(data.values) ? (
              <ul className="list-disc pl-5">
                {data.values.map((item, index) => (
                  <div key={index} className="text-start">
                    {item.roomId?.roomName} - {item.parking?.slot} ({item.parking?.size})
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-lg">NA</p>
            )}
          </div>
         )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisSummaryCard;
