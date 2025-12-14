import { Outlet } from "react-router";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Sidebar from "./components/layouts/Sidebar";

const MasterLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f4f6fa]">
      
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        
        {/* Header */}
        <Header/>

        {/* Dynamic Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer/>

      </div>
    </div>
  );
};

export default MasterLayout;