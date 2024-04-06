"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type datatype = {
  username: string;
  email: string;
};
function Page() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<datatype>({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handlelogout = async () => {
    try {
      setLoading(true);
      const resp = await axios.post("http://localhost:3000/api/users/logout");
      if (resp.status === 200) {
        router.push("/signin");
      }
    } catch (error) {
      toast.error("Error While Logging out!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getdata = async () => {
      try {
        setLoading(true);
        const resp = await axios.get("http://localhost:3000/api/users/me");
        if (resp.status === 200) {
          setData(resp.data.data);
          console.log(resp.data.data);
        }
      } catch (error) {
        toast.error("Error while getting user data..");
      } finally {
        setLoading(false);
      }
    };
    getdata();
  }, []);
  return (
    <>
      {isClient && (
        <div className="flex items-center justify-center h-screen">
          {loading ? (
            <div className="h-screen flex justify-center items-center text-black">
              loading....
            </div>
          ) : (
            <div className="flex flex-col justify-center space-y-5">
              <div>
                <div>{`Name:${data?.username}`}</div>
                <div>{`Email:${data?.email}`}</div>
              </div>
              <div className="text-center">
                <button
                  onClick={handlelogout}
                  className="bg-black text-white px-4 py-2"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Page;
