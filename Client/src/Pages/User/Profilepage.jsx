import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Intro from "../../Components/User/Intro";
import Spinner from "../../Components/Constants/Spinner";
import toast from "react-hot-toast";
import { updateuser } from "../../redux/Slices/UserSlice";

const Profilepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);
      if (!navigator.onLine) {
        toast.error("Oops, You are Offline!");
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BACKEND_BASE_URL}/AuthCommon/userdetails`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message);
        }
        dispatch(updateuser(data.existeduser));
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [dispatch]);

  const userState = useSelector((state) => state.user);

  return (
    <div className="w-full mt-9">
      {isLoading ? <Spinner /> : userState && <Intro userState={userState} />}
    </div>
  );
};

export default Profilepage;
