import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-2xl mt-5 text-[#f14e23]">
        Places To Visit
      </h2>
      <div>
        {trip.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="my-3 ">
            <h2 className="font-medium text-lg">{item.Day}</h2>
            {item.places.map((place, placeIndex) => (
              <div key={placeIndex}>
                <PlaceCardItem place={place} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
