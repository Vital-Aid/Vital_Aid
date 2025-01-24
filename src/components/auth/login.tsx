"use client";
"use client"
import { Button } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signOut } from "next-auth/react";
import { useAppDispatch,useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/store/features/userSlice";
const Login: React.FC = () => { 
   const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      router.push("/home"); 
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-2xl sm:h-4/6 bg-gray-50 shadow-lg flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 px-8 py-12 sm:p-8">
          <button
            type="button"
            className="w-full bg-white border border-gray-300 text-black py-2 rounded-full hover:bg-gray-100 mb-2 text-sm"
            onClick={() => {

              signOut();
            }}
          >
            <FcGoogle size={25} className="mr-2 float-end" />
            logout
          </button>
          <h2 className="text-xl font-bold text-center text-gray-700 mb-2">
            WELCOME BACK
          </h2>

          <p className="text-center text-xs  text-gray-400 mb-6">
            Please enter your credentials to log in.
          </p>
          <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center w-full">
              <label
                className="flex flex-col items-start ml-24 text-gray-600 text-sm mb-2 w-full"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center w-full">
              <label
                className="flex flex-col items-start ml-24 text-gray-600 text-sm mb-2 w-full"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
            type="submit"
              variant="contained"
              className="w-3/4 !bg-custom-green-200"
              sx={{
                backgroundColor: "transparent",
              }}
            >
    {isLoading ? "Loading..." : "Sign In"}        
     </Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="sm:hidden mt-2 flex flex-col items-center justify-center space-y-4">
            <p className="text-gray-700 mt-3 text-base font-medium">
              Don't have an account yet?
            </p>
            <Link href="/create-account" passHref>
              <p className="px-5 py-3 text-sm font-semibold text-white bg-green-500 rounded-md shadow hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none">
                Create Account
              </p>
            </Link>
          </div>
        </div>

        <div className="hidden sm:flex w-full sm:w-1/2 p-8 bg-gradient-to-b from-custom-green-100 via-custom-green-200 to-custom-green-300 items-center justify-center h-full sm:h-auto">
          <div className="text-center">
            <p className="text-white text-2xl sm:text-xl font-medium mb-4">
              Don't have an account?
            </p>
            <Link href="/create-account" passHref>
              <p className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-green-600 text-green-500 rounded-lg text-sm inline-block w-[150px] text-center">
                Create it
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
