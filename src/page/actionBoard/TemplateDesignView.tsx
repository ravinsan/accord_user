import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TemplateDesignView = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* PAGE HEADER */}
      <div className="bg-white rounded-xl shadow-sm border mb-6">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Input Type View</h2>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-3 gap-6 p-6">

          {/* LEFT SECTION */}
          <div className="col-span-2 space-y-6">
            <div className="text-sm text-blue-600 flex gap-10">
              <div>
                <span className="font-semibold">Sr# :</span> 1
              </div>
              <div>
                <span className="font-semibold">Template Name :</span> Test 11111
              </div>
            </div>

            <div className="text-sm text-blue-600">
              <span className="font-semibold">Place Holder Name :</span>{" "}
              Party2: Witness2 Father/ Mother Name
            </div>

            <div>
              <h3 className="text-2xl font-semibold">Witness 2</h3>
              <label className="block text-sm text-gray-600 mt-2">
                Father/ Mother Name
              </label>
              <input
                type="text"
                placeholder="Father/ Mother Name"
                className="mt-2 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button className="bg-teal-500 hover:bg-teal-600">
              Submit
            </Button>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-1 border-l pl-6 space-y-4">

            <div>
              <h4 className="text-blue-600 font-semibold">Test 11111</h4>
              <p className="text-sm text-blue-500">
                Party2: Witness2 Father/ Mother Name
              </p>
            </div>

            <div className="border-t pt-3">
              <h4 className="text-blue-600 font-semibold mb-3">
                Display Comments
              </h4>

              {/* COMMENTS */}
              {[
                "aaaa",
                "khgkhk",
                "hhhhhhhh",
                "kkkkkk",
                "dddddddddd",
                "jjjjjjjjj",
              ].map((comment, index) => (
                <div key={index} className="mb-3">
                  <p className="text-blue-600 font-medium">
                    shubhb@probuds.com
                  </p>
                  <p className="text-sm text-gray-700">{comment}</p>
                </div>
              ))}
            </div>

            {/* ADD COMMENT */}
            <div className="border-t pt-4">
              <label className="block text-blue-600 font-semibold mb-2">
                Add comment
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 mb-3"
              />
              <Button className="bg-yellow-500 hover:bg-yellow-600">
                Reply
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDesignView;
