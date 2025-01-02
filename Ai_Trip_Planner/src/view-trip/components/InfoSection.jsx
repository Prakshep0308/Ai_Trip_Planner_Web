import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalApi";
import React, { useEffect, useState } from "react";
import { TfiSharethis } from "react-icons/tfi";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: trip?.userSelection?.location?.label };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[1].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "placeholder.jpg"}
        className="h-[340px] w-full object-cover rounded-xl mt-20"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-lg text-[#624a46] font-medium">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-2">
            <h2 className="p-1 px-3 bg-[#624a46] text-white rounded-lg text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-[#624a46] text-white rounded-lg text-xs md:text-md">
              💰 {trip?.userSelection?.Budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-[#624a46] text-white rounded-lg text-xs md:text-md">
              🥂 No. of Traveler: {trip?.userSelection?.Travel}
            </h2>
          </div>
        </div>
        <Button className="bg-[#f14e23]">
          <TfiSharethis />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
