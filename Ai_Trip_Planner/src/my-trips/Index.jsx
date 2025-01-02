import { db } from "@/Service/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import MyTripCard from "./component/MyTripCard";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrip, setUserTrip] = useState([]);
  useEffect(() => {
    GetUserTRIP();
  }, []);
  const GetUserTRIP = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }
    setUserTrip([]);
    const q = query(
      collection(db, "cities"),
      where("useEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrip((prevVal) => [...prevVal, doc.data()]);
    });
  };
  return (
    <div className="sm: px-10 md:px-32 lg:px-56 p-5 mt-10">
      <h2 className="font-bold text-3xl text-[#f14e23]">Your Trips</h2>

      <div>
        {userTrip.map((trip, index) => (
          <MyTripCard trip={trip} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
