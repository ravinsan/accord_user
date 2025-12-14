import { Link, useLocation } from "react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();

  // Sidebar toggle state
  const [isOpen, setIsOpen] = useState(true);

  // Menu items
  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "Create New Document", path: "/template-usage-create" },
    { label: "Action Tasks", path: "/action-tasks" },
    { label: "Status Tracking", path: "/template-usage" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-60" : "w-20"
      } bg-white shadow-xl p-5 flex flex-col border-r transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Menu
            className="w-6 h-6 text-gray-700 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />

          {/* Hide title when collapsed */}
          {isOpen && <h2 className="font-semibold text-lg text-gray-700">Menu</h2>}
        </div>
      </div>

      {/* Menu List */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`block p-2 rounded-md cursor-pointer transition-all
                ${active ? "bg-blue-600 text-white font-medium" : "hover:bg-gray-100"}
              `}
            >
              {/* Text hide on collapse */}
              {isOpen ? item.label : item.label.charAt(0)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
