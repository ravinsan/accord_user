import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const UserDashboard = () => {
  return (
    <div className="p-4 space-y-6">

      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Dashboard</h2>        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,245</p>
            <p className="text-xs text-gray-500 mt-1">+12% this month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">842</p>
            <p className="text-xs text-gray-500 mt-1">+8% this week</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">New Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">152</p>
            <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$6,240</p>
            <p className="text-xs text-gray-500 mt-1">+5.4% growth</p>
          </CardContent>
        </Card>
      </div> 
    </div>
  );
};

export default UserDashboard;
