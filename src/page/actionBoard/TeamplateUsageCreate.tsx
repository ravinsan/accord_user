import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TemplateList {
  id: string;
  template_name: string;
}

interface TemplateDetail {
  template_name?: string;
  department_name?: string;
  type?: string;
  category_name?: string;
  sub_cat_name?: string;
  version?: string;
  template_data?: string;
}

interface FormErrors {
  template_id?: string;
  template_usages_name?: string;
  priority?: string;
  department_reference_id?: string;
  description?: string;
}

export const TeamplateUsageCreate = () => {
  const [data, setData] = useState<TemplateList[]>([]);
  const [selectTempId, setSelectedTempId] = useState("");
  const [selectedData, setSelectedData] = useState<TemplateDetail>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    template_id: "",
    template_usages_name: "",
    priority: "",
    department_reference_id: "",
    description: "",
  });

  useEffect(() => {
    getTemplateList();
  }, []);

  const getTemplateList = async () => {
    const res = await api.get("/template-usage-name");
    setData(res.data.data);
  };

  useEffect(() => {
    if (selectTempId) {
      handleGetData();
    }
  }, [selectTempId]);

  const handleGetData = async () => {
    try {
      setLoading(true);
      setSelectedData({});

      const res = await api.get(
        `/get-template-detail?template_id=${selectTempId}`
      );

      setSelectedData(res.data.data);
    } catch (error) {
      console.error("Template detail error", error);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.template_id) newErrors.template_id = "Template is required";
    if (!form.template_usages_name.trim())
      newErrors.template_usages_name = "Usage Name is required";
    if (!form.priority) newErrors.priority = "Priority is required";
    if (!form.department_reference_id.trim())
      newErrors.department_reference_id = "Department Reference ID is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (!validate()) return;
    // console.log("FORM DATA =>", form);
    try{
      setLoading(true);
      const response = await api.post("/template-usage", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log("SUCCESS =>", response.data.success);
        if (response.data.success === true) {
        toast.success(response.data.data.message);

        // setTimeout(() => {
        //   window.location.replace("/");
        // }, 500);
      } else {
        toast.error(response.data.data.message || "Data failed");
      }
        setForm({
          template_id: "",
          template_usages_name: "",
          priority: "",
          department_reference_id: "",
          description: "",
        });

    }catch(err)
    {
      console.error("Template detail not save", err);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card className="max-w-8xl mx-auto shadow-md border rounded-xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">Add Sub Profile Group</h2>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <X size={22} />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          {/* FORM ROW (ONE LINE) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* TEMPLATE */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Template <span className="text-red-600">*</span>
              </label>

              <Select
                onValueChange={(value) => {
                  setSelectedTempId(value);
                  setForm({ ...form, template_id: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="---------- Select Template ----------" />
                </SelectTrigger>

                <SelectContent>
                  {data.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.template_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.template_id && (
                <p className="text-red-500 text-xs">{errors.template_id}</p>
              )}
            </div>

            {/* USAGE NAME */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Template Usage Name <span className="text-red-600">*</span>
              </label>

              <Input
                className="w-full"
                placeholder="Enter Usage Name"
                value={form.template_usages_name}
                onChange={(e) =>
                  setForm({ ...form, template_usages_name: e.target.value })
                }
              />

              {errors.template_usages_name && (
                <p className="text-red-500 text-xs">{errors.template_usages_name}</p>
              )}
            </div>

            {/* PRIORITY */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Priority <span className="text-red-600">*</span>
              </label>

              <Select
                onValueChange={(value) =>
                  setForm({ ...form, priority: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="----------- Select Priority -----------" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              {errors.priority && (
                <p className="text-red-500 text-xs">{errors.priority}</p>
              )}
            </div>

            {/* DEPT REF ID */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Department Reference ID <span className="text-red-600">*</span>
              </label>

              <Input
                className="h-10"
                placeholder="Enter Reference ID"
                value={form.department_reference_id}
                onChange={(e) =>
                  setForm({ ...form, department_reference_id: e.target.value })
                }
              />

              {errors.department_reference_id && (
                <p className="text-red-500 text-xs">
                  {errors.department_reference_id}
                </p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="block mb-1 text-sm font-medium">Description <span className="text-red-600">*</span></label>
            <Textarea
              className="h-28"
              placeholder="Write description..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          {/* LOADER */}
          {loading && (
            <div className="flex justify-center py-6">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          )}

          {/* TEMPLATE DETAILS (TWO LINE) */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              {selectedData.template_name && (
                <Input value={selectedData.template_name} readOnly />
              )}
              {selectedData.department_name && (
                <Input value={selectedData.department_name} readOnly />
              )}
              {selectedData.type && <Input value={selectedData.type} readOnly />}
              {selectedData.category_name && (
                <Input value={selectedData.category_name} readOnly />
              )}
              {selectedData.sub_cat_name && (
                <Input value={selectedData.sub_cat_name} readOnly />
              )}
              {selectedData.version && (
                <Input value={selectedData.version} readOnly />
              )}
            </div>
          )}

          {/* TEMPLATE HTML */}
          {!loading && selectedData.template_data && (
            <div
              className="border rounded p-4"
              dangerouslySetInnerHTML={{
                __html: selectedData.template_data,
              }}
            />
          )}

          {/* BUTTONS */}
          <div className="mt-6 flex gap-4">
            <Button onClick={handleSubmit}>Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
