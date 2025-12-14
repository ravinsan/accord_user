import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f4f8] p-4">
      <Card className="w-[420px] shadow-xl border-0 rounded-2xl p-10 bg-white">
        <CardHeader className="text-center">
          <img src="/logo/logo.png" alt="Accord Logo" className="w-40 mx-auto mb-4" />
          <CardTitle className="text-xl font-semibold text-gray-800 text-left">Hello! let’s get started</CardTitle>
          <p className="text-sm text-gray-500 text-left">Sign in to continue.</p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4 mt-4">
            <Input
              type="email"
              placeholder="Email"
              className="h-11 rounded-xl"
            />
            <Input
              type="password"
              placeholder="Password"
              className="h-11 rounded-xl"
            />

            <Button className="w-full h-11 rounded-xl text-white font-semibold bg-blue-700 hover:bg-blue-800">
              SIGN IN
            </Button>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center gap-2">
                <Checkbox id="remember" />
                <span className="text-gray-600">Keep me signed in</span>
              </label>

              <a href="#" className="text-blue-700 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
