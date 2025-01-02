import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelList,
} from "@/Constant/option";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/Service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState([]);
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.Budget ||
      !formData?.Travel
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const finalPrompt = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{total Days}", formData?.noOfDays)
      .replace("{traveler}", formData?.Travel)
      .replace("{budget}", formData?.Budget)
      .replace("{totalDays}", formData?.noOfDays);
    const result = await chatSession.sendMessage(finalPrompt);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "cities", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        onGenerateTrip();
      });
  };
  return (
    <div className="sm: px-10 md:px-32 lg:px-56 p-5 mt-20">
      <h2 className="font-bold text-3xl text-[#f14e23]">
        Tell us your travel preferences
      </h2>
      <p className="mt-3 text-[#624a46] text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">Enter destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip
          </h2>
          <Input
            placeholder={"EX.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOption.map((iteam, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("Budget", iteam.tittle)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.Budget == iteam.tittle && "border-[#624a46]"
                }`}
              >
                <h2 className="text-4xl">{iteam.icon}</h2>
                <h2 className="font-bold text-lg text-[#f14e23]">
                  {iteam.tittle}
                </h2>
                <h2 className="text-sm text-[#624a46]">{iteam.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan to traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((iteam, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("Travel", iteam.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.Travel == iteam.people && "border-[#624a46]"
                }`}
              >
                <h2 className="text-4xl">{iteam.icon}</h2>
                <h2 className="font-bold text-lg text-[#f14e23]">
                  {iteam.tittle}
                </h2>
                <h2 className="text-sm text-[#624a46]">{iteam.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="bg-[#624a46] text-white"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-8">Sign In with Google</h2>
              <p>Sign In to the App with Google Authentication securely</p>

              <Button
                onClick={login}
                className="w-full mt-10 bg-black text-white items-center"
              >
                <FcGoogle />
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
