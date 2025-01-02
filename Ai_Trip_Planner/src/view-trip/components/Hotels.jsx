import React from "react";
import HotelCarditem from "./HotelCarditem";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-2xl mt-5 text-[#f14e23]">
        Hotels Recommendation
      </h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols- lg:grid-cols-3">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCarditem hotel={hotel} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
