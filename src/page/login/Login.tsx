import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/api/axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation
  const validateForm = () => {
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const loginRes = await api.post("user-login", formData);

      if (loginRes.data.status === true) {
        localStorage.setItem("token", loginRes.data.token);
        toast.success("User has been successfully logged in!");

        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      } else {
        toast.error(loginRes.data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong, please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f4f8] p-4">
      <Card className="w-[420px] shadow-xl border-0 rounded-2xl p-10 bg-white">
        <CardHeader className="text-center">
          <img
            src="/logo/logo.png"
            alt="Accord Logo"
            className="w-40 mx-auto mb-4"
          />
          <CardTitle className="text-xl font-semibold text-gray-800 text-left">
            Hello! let’s get started
          </CardTitle>
          <p className="text-sm text-gray-500 text-left">
            Sign in to continue.
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-11 rounded-xl"
            />

            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="h-11 rounded-xl"
            />

            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-white font-semibold bg-blue-700 hover:bg-blue-800"
            >
              SIGN IN
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
