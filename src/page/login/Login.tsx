import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/api/axios";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
          email:'',
          password:''
      });
      const handleChange = (e) =>{
           setFormData({
            ...formData,
            [e.target.name]: e.target.value
           })
      }

      const handleSubmit = async (e) =>{
            e.preventDefault();
            console.log("Form Data Submitted:", formData);
            // fetch('http://127.0.0.1:8000/api/user-login', {
            //   method: 'POST',
            //   headers:{
            //     'Content-Type':'application/json',
            //     'Accept':'application/json'
            //   },
            //   body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //   console.log('Success:', data.status);
            //   if(data.status == true)
            //   {
            //     toast.success("User has been successfully logged in!")
            //   }else{
            //   toast.error("Login failed");  
            //   }
            // })
            // .catch((error) => {
            //   toast.error(error.message || "Something went wrong");
            //   console.error('Error:', error);
            // });
          try{  
            const loginRes = await api.post('user-login', formData);
            console.log("success", loginRes)
            if(loginRes.data.status == true)
            {
              toast.success("User has been successfully logged in!")
              navigate('/')
            }
            else{
              toast.error("Login failed");
            }
          }
          catch(error)
          {
            toast.error("Something went wrong");
          }  

      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f4f8] p-4">
      <Card className="w-[420px] shadow-xl border-0 rounded-2xl p-10 bg-white">
        <CardHeader className="text-center">
          <img src="/logo/logo.png" alt="Accord Logo" className="w-40 mx-auto mb-4" />
          <CardTitle className="text-xl font-semibold text-gray-800 text-left">Hello! let’s get started</CardTitle>
          <p className="text-sm text-gray-500 text-left">Sign in to continue.</p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="h-11 rounded-xl"
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="h-11 rounded-xl"
            />

            <Button type="submit" className="w-full h-11 rounded-xl text-white font-semibold bg-blue-700 hover:bg-blue-800">
              SIGN IN
            </Button>

            <div className="flex items-center justify-between text-sm mt-2">
              

              {/* <a href="#" className="text-blue-700 hover:underline">
                Forgot password?
              </a> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
