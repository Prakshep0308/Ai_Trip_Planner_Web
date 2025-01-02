import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCarditem = ({ hotel, index }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: hotel?.hotelName };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <Link
      key={index}
      to={
        "https://www.google.com/maps/search/?api=1&query=" + hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="my-5 p-4 border rounded-lg hover:shadow-xl transition-all cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "placeholder.jpg"}
          className="object-cover h-[#200px] w-full"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium text-[#f14e23]">{hotel?.hotelName}</h2>
          <h2 className="font-medium text-[#624a46]">
            📮{hotel?.hotelAddress}
          </h2>
          <h2 className="text-sm text-lime-500 font-medium">{hotel?.price}</h2>
          <h2 className="text-sm font-medium text-[#624a46]">
            ⭐{hotel?.rating} Stars
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCarditem;
