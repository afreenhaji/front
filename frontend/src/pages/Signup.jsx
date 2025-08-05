import React, { useState, useContext } from 'react';
import workLogo from '../assets/work.jpg';
import { authDataContext } from '../context/AuthContext';
import axios from "axios"
import { userDataContext } from '../context/UserContext';
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  let {serverUrl}=useContext(authDataContext)
  let {userData,setUserData}=useContext(userDataContext)
  let [firstName,setFirstName]=useState("")
  let [lastName,setLastName]=useState("")
  let [userName,setUserName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [loading,setLoading]=useState(false)
  let[err,setErr]=useState("")
  const handleSignUp=async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
        let result=await axios.post(serverUrl+"/api/auth/signup",{
            firstName,
            lastName,
            userName,
            email,
            password

        },{withCredentials:true})
        console.log(result)
        setUserData(result.data)
        Navigate("/")
        setErr("")
        setLoading(false)
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setUserName("")
    } catch (error){
        setLoading(false);
        setErr(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 relative flex items-center justify-center">
      {/* Logo at Top-Left */}
      <div className="absolute top-6 left-6">
        <img
          src={workLogo}
          alt="WorkNet Logo"
          className="w-16 h-16 rounded-full object-cover shadow-md"
        />
      </div>

      {/* Signup Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create your Account</h2>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userName} onChange={(e)=>setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} onChange={(e)=>setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              value={password} onChange={(e)=>setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {err && <p className="text-red-500 text-sm">{err}</p>}

  <button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
  disabled={loading}
>
  {loading ? "Loading..." : "Sign Up"}
</button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
