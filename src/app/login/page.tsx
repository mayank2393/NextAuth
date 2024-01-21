'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled , setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if(user.email.length > 0 && user.password.length >0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user])

  
  const onLogin = async () => {
    try{
      setLoading(true);
      const response = await axios.post("/api/users/login",user)

      console.log("Login successful" , response.data);
      toast.success("Login successful")

      router.push("/profile");
    }
    catch(err:any){
      console.log("Login failed" , err.message);
      toast.error(err.message);
    }
    finally{
      setLoading(false);
    }
  }
  return (

    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">{loading ? "Processing" : "Login"}</h1>
      <hr />
       <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
      <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  )
}
export default LoginPage;