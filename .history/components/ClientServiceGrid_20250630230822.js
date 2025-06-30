"use client";
import React, { useActionState, useState } from "react";
import { GiVacuumCleaner } from "react-icons/gi";
import {
  MdOutlineConstruction,
  MdOutlineLocalLaundryService,
} from "react-icons/md";
import { TbAirConditioningDisabled } from "react-icons/tb";
import ClientServiceForm from "./ClientServiceForm";
import { cancelService } from "@/actions/services";
import { formatDate, formatDateOnly, formatDateTime, formatTo12Hour } from "@/utils/formatDate";

const ClientService = ({
  services,
  booking,
  user,
}) => {
  const [serviceType, setServiceType] = useState();
  const [price, setPrice] = useState();
  const [isClicked, setIsClicked] = useState(false)
  function handleClick(value, price) {
    setPrice(price);
    setServiceType(value);
    setIsClicked((prev) => !prev);
  }

  const types = [
    {
      service: "cleaning room",
      name: "Cleaning room",
      price: 50,
      color: "bg-green-500",
      icon: <GiVacuumCleaner size={60} />,
    },
    {
      service: "laundry",
      name: "Laundary",
      price: 10,
      color: "bg-blue-500",
      icon: <MdOutlineLocalLaundryService size={60} />,
    },

    {
      service: "clean airconditioner",
      name: "Clean Airconditioner",
      price: 10,
      color: "bg-yellow-500",
      icon: <TbAirConditioningDisabled size={60} />,
    },

    {
      service: "fix",
      name: "Comming soon",
      price: 10,
      color: "bg-red-500",
      icon: <MdOutlineConstruction size={60} />,
    },
  ];
  const handleAction = async (serviceId) => {
    const response = await cancelService(serviceId);
    if (response.error) {
      console.error("Error cancelling service:", response.error);
    } else {
      console.log("Service cancelled successfully:", response.message);
    }
  };

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold">Service available</h1>
      <div className="mt-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4">
        {types.map((item, index) => {
          const isPending = services?.some(
            (s) => s.serviceType === item.service && s.status === "pending"
          );

          const isAccepted = services?.some(
            (s) => s.serviceType === item.service && s.status === "accepted"
          );
          return (
            <div
              key={item.name}
              type="button"
              className={`relative border w-full h-full p-10  justify-center items-center flex gap-4  ${item.color} text-primary rounded-lg `}
            >
              <div className="flex flex-col items-center gap-2">
                {item.icon}
                <div>
                  <p className="text-lg font-bold">{item.name}</p>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white/80 hover:opacity-100 opacity-0 flex items-center justify-center text-black px-2 py-1 rounded-md ">
                <button
                  value={item.service}
                  onClick={(e) =>
                    handleClick(e.target.value, { price: item.price })
                  }
                  type="button"
                  className="p-2 bg-blue-500 rounded-md text-primary transition-all duration-300 transform  hover:scale-125"
                >
                  Requesting
                </button>
              </div>

              {/* Overlay when pending */}
              {isPending && (
                <form className="absolute bg-white w-full h-full items-center justify-center text-black px-4 py-2 rounded-md z-0">
                  <div>
                     <p className="font-bold text-md">
                   Preparing your requesting...
                    </p>
                  </div>
                 <div className="flex flex-col">
                  <div>
                     <p className="animate-bounce p-2 rounded-md">Pending...</p>
                     <div className="flex flex-col text-xs items-center gap-2">
                    {item.icon}
                  </div>
                 
                  </div>
                  {/* <p className="absolute top-1 left-2 text-xs">
                    {formatDateOnly(formatDate(services.filter(service => service.serviceType === item.service && service.status === 'pending')[0].startDate)) + '-' + formatTo12Hour(services.filter(service => service.serviceType === item.service && service.status === 'pending')[0].startTime)}
                    </p> */}
                   
                  {services
                    .filter((s) => s.serviceType === item.service)
                    .map((service) => (
                      <button
                        key={service._id}
                        onClick={() => handleAction(service._id)}
                        type="button"
                        className="absolute bottom-2 bg-blue-500 p-2 rounded-md right-2 text-primary hover:bg-blue-700"
                      >
                        Cancel
                      </button>
                    ))}
                 </div>
                </form>
              )}

              {/* Overlay when accepted */}
              {isAccepted && (
                <div
                  title="Your service has been accepted you can request again after admin complete your service"
                  className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center text-black px-2 py-1 rounded-md z-0"
                >
                  <div className="animate-bounce flex flex-col text-xs items-center gap-2">
                    {item.icon}
                  </div>
                  <div className="absolute top-2 right-2">

                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex size-3 rounded-full bg-green-600"></span>
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-lg font-bold text-green-500">Accepted</p>
                    <span className="text-xs text-gray-500 text-center italic">
                      You can request again after admin complete your service
                    </span>
                  </div>
                  <p className="absolute top-1 left-2 text-xs">{formatDateOnly(services.filter(service => service.serviceType === item.service && service.status === 'accepted')[0].startDate) + '-' + formatTo12Hour(services.filter(service => service.serviceType === item.service && service.status === 'accepted')[0].startTime)}</p>

                </div>
              )}


            </div>
          );
        })}

<div className="flex items-center w-full max-w-2xl justify-between relative">
    {/* Progress line */}
    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 z-0 transform -translate-y-1/2"></div>

    {/* Steps */}
    {["Requested", "Accepted", "Completed"].map((step, index) => {
      const isActive = index <= 1; // example: current step is 2nd (Accepted)
      const isCompleted = index < 1;

      return (
        <div key={step} className="relative z-10 flex flex-col items-center w-1/3">
          <div className={`flex items-center w-10 h-10 rounded-full 
            ${isCompleted ? "bg-green-500 text-white" : isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}>
            {index + 1}
          </div>
          <span className="mt-2 text-sm font-medium">{step}</span>
        </div>
      );
    })}
  </div>

      </div>
      {isClicked && (
        <div className="absolute z-30 top-96 left-1/2 overflow-y-auto p-4 bg-white rounded-lg max-lg:w-full w-1/2 -translate-x-1/2 -translate-y-1/2  shadow-xl">
          <ClientServiceForm
            serviceType={serviceType}
            user={user}
            booking={booking}
            price={price}
            setIsClicked={setIsClicked}
          />
        </div>
      )}

      {isClicked && <div
        onClick={() => setIsClicked(false)}
        className='fixed inset-0 bg-black/80 overflow-y-auto p-4'>


      </div>}
    </div>
  );
};

export default ClientService;
