"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function Verifyemail() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const verifytoken = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/users/verifyemail",
        { token }
      );
      if (resp.status === 200) {
        setVerified(true);
        toast.success("Email Verified Successfully");
        router.push("/signin");
      }
    } catch (error) {
      toast.error("Error while verifying the token");
    }
  };
  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifytoken();
    }
  }, [token]);
  return (
    <>
      {verified ? (
        <div className="flex justify-center items-center max-h-screen">
          User Successfully Verified..
          <button
            onClick={() => {
              router.push("/signin");
            }}
            className="bg-blue-500 text-white"
          >
            Back To Signin
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Verifyemail;
