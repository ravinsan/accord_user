import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const dummyData = [
  {
    id: 1,
    templateName: "Demo Template",
    usageName: "dddd",
    description: "ddddddd",
    priority: "Low",
    deptId: "Dept-01",
  },
];

export default function TemplateUsagePage() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("10");

  const filtered = dummyData.filter((item) =>
    item.templateName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Table Card */}
      <Card className="rounded-xl shadow-md bg-white">
        <CardHeader className="flex items-center justify-between">
          {/* Show Entries */}
          <div className="flex items-center gap-2">
            <span>Show</span>
            <Select value={show} onValueChange={setShow}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>

          {/* Search */}
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-800 text-white text-sm">
                  <th className="p-3 text-left">Sl No.</th>
                  <th className="p-3 text-left">Template Name</th>
                  <th className="p-3 text-left">Template Usage Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Priority</th>
                  <th className="p-3 text-left">Department ID</th>
                  <th className="p-3 text-left">Approval</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b text-sm hover:bg-gray-50"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{row.templateName}</td>
                    <td className="p-3">{row.usageName}</td>
                    <td className="p-3">{row.description}</td>
                    <td className="p-3">{row.priority}</td>
                    <td className="p-3">{row.deptId}</td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        className="bg-yellow-400 text-black rounded-full text-xs px-3"
                      >
                        Approval Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <span>
              Showing 1 to {filtered.length} of {filtered.length} entries
            </span>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
