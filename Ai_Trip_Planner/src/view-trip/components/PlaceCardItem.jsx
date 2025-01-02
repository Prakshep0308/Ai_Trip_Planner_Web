import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: place.placeName };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[1].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className=" my-5 p-4 border rounded-lg hover:shadow-xl transition-all cursor-pointer flex gap-5">
        <img
          src={photoUrl ? photoUrl : "placeholder.jpg"}
          className="w-[200px] h-[200px] object-cover"
        />
        <div className="flex flex-col gap-5">
          <h3 className="font-medium text-lg text-[#f14e23]">
            {place.placeName}
          </h3>
          <p className="text-[#624a46]">{place.placeDetails}</p>
          <h3 className="font-medium text-[#624a46]">
            Ticket Prize:{" "}
            <span className=" text-lime-500">{place.ticketPricing}</span>
          </h3>
          <h3 className="font-medium text-[#624a46]">
            Time To Travel:{" "}
            <span className=" text-yellow-500">{place.timeToTravel}</span>
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
