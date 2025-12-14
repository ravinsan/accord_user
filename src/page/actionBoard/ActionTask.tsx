import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Printer, Upload } from "lucide-react";

export const ActionTask = () => {
  return (
    <div className="p-4">

      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6">List Of My Action Tasks</h1>

      {/* Main White Card */}
      <Card className="max-w-6xl mx-auto shadow-md border rounded-xl bg-white">

        {/* Top Tabs */}
        <CardHeader className="border-b pb-4">
          <Button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800">
            Pending for Reassignment
          </Button>
        </CardHeader>

        <CardContent>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center justify-between mb-4">

            {/* Left: Show Entries */}
            <div className="flex items-center gap-3 text-sm">
              <span>Show</span>

              <Select defaultValue="10">
                <SelectTrigger className="w-20 h-9">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>

              <span>entries</span>
            </div>

            {/* Right: Buttons + Search */}
            <div className="flex items-center gap-3">
              <Button className="bg-blue-700 text-white flex items-center gap-2">
                <Printer size={16} /> Print
              </Button>

              <Button className="bg-blue-700 text-white flex items-center gap-2">
                <Upload size={16} /> Export
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Search:</span>
                <Input
                  placeholder="Search..."
                  className="w-40 h-9"
                />
              </div>
            </div>
          </div>

          {/* Table Wrapper */}
          <div className="rounded-xl overflow-hidden border shadow-sm bg-white">

            {/* Blue Table Header */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-700 text-white text-sm">

                  <th className="px-3 py-3 text-left">Sl No.</th>
                  <th className="px-3 py-3 text-left">Doc ID</th>
                  <th className="px-3 py-3 text-left">Document Name</th>
                  <th className="px-3 py-3 text-left">Internal Dept. Ref No.</th>
                  <th className="px-3 py-3 text-left">Priority</th>
                  <th className="px-3 py-3 text-left">Location</th>
                  <th className="px-3 py-3 text-left">Department Name</th>
                  <th className="px-3 py-3 text-left">Created On</th>

                </tr>
              </thead>

              {/* Empty State Row */}
              <tbody>
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm">

            <p>Showing 0 to 0 of 0 entries</p>

            <div className="flex gap-2">
              <Button variant="outline" className="px-4 py-1">Previous</Button>
              <Button variant="outline" className="px-4 py-1">Next</Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};
