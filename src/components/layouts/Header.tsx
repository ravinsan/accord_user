import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

const Header = () =>{
    return (
     <>
        <header className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-semibold">New User User</h1>

  <DropdownMenu>
    <DropdownMenuTrigger className="outline-none">
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full border shadow-sm"
        />
        <ChevronDown size={18} className="text-gray-700" />
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      className="bg-white shadow-xl rounded-lg p-3 w-56 mr-5 space-y-2"
    >
      <DropdownMenuItem className="cursor-pointer p-2 text-gray-700 rounded-md hover:bg-gray-100">
        Profile
      </DropdownMenuItem>

      <DropdownMenuItem className="cursor-pointer p-2 text-gray-700 rounded-md hover:bg-gray-100">
        Settings
      </DropdownMenuItem>

      <DropdownMenuItem className="cursor-pointer p-2 text-red-600 rounded-md hover:bg-red-50">
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</header>

     </>
    );
}

export default Header;