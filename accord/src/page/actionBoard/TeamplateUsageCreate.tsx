import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

export const TeamplateUsageCreate = () => {
  return (
    <div className="p-4">
      {/* Main White Card */}
      <Card className="max-w-8xl mx-auto shadow-md border rounded-xl bg-white">

        {/* Top Header */}
        <CardHeader className="flex flex-row items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">Add Sub Profile Group</h2>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <X size={22} />
          </button>
        </CardHeader>

        {/* Form Body */}
        <CardContent className="pt-6">

          {/* 2 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Select Template */}
            <div>
              <label className="block mb-1 text-gray-700 text-sm font-medium">
                Template*
              </label>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="- Select Template -" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="template1">Template 1</SelectItem>
                  <SelectItem value="template2">Template 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Template Usage Name */}
            <div>
              <label className="block mb-1 text-gray-700 text-sm font-medium">
                Template Usage Name
              </label>
              <Input placeholder="Enter Usage Name" />
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-1 text-gray-700 text-sm font-medium">
                Priority
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department Reference ID */}
            <div>
              <label className="block mb-1 text-gray-700 text-sm font-medium">
                Department Reference ID
              </label>
              <Input placeholder="Enter Reference ID" />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block mb-1 text-gray-700 text-sm font-medium">
              Description
            </label>
            <Textarea
              placeholder="Write description..."
              className="h-28"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Button variant="outline" className="bg-[#66cfff] text-white hover:bg-[#55b8e6]">
              Reset
            </Button>

            <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6">
              Add
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};
