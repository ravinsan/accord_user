import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { BASE_URL } from "@/config";

type Section = "main" | "placeholders" | "attachments";

interface Tab {
  id: Section;
  label: string;
}

interface LocationState {
  template_id: number;
  template_usage_id: number;
}

const ActionBoardTemplateDesign = () => {
  const [activeSection, setActiveSection] = useState<Section>("main");
  const [loading, setLoading] = useState(false);
  const [templateData, setTemplateData] = useState<any>(null);
  const [newAttachmentName, setNewAttachmentName] = useState("");
  const [newAttachmentFiles, setNewAttachmentFiles] = useState<FileList | null>(
    null
  );

  const location = useLocation();
  const navigate = useNavigate();

  const { template_id, template_usage_id } =
    (location.state as LocationState) || {};

  useEffect(() => {
    if (!template_id || !template_usage_id) {
      navigate("/template-usages");
      return;
    }

    fetchTemplateDesign();
  }, []);

  const fetchTemplateDesign = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/action-boards/templates/design/${template_id}/${template_usage_id}`
      );
      console.log("Template Design API Response:", res.data.data.records);
      setTemplateData(res.data.data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAttachment = async () => {
    if (
      !newAttachmentName ||
      !newAttachmentFiles ||
      newAttachmentFiles.length === 0
    ) {
      alert("Please provide attachment name and at least one file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("attachement_name", newAttachmentName);

      // IMPORTANT: backend expects 'image[]' exactly
      Array.from(newAttachmentFiles).forEach((file) => {
        formData.append("image[]", file);
      });

      const res = await api.post(
        `/template-usage/upload-image/${template_usage_id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setTemplateData((prev: any) => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...(res.data.data || [])],
      }));

      // Clear form
      setNewAttachmentName("");
      setNewAttachmentFiles(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload attachments.");
    }
  };

  const tabs: Tab[] = [
    { id: "main", label: "Main Document" },
    { id: "placeholders", label: "Placeholder Inputs" },
    { id: "attachments", label: "Attachments" },
  ];

  return (
    <div className="p-6">
      <Card className="rounded-2xl shadow-md">
        {/* HEADER */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-semibold">Template Design</h2>
        </div>

        {/* TABS */}
        <div className="px-6 mt-4 flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-t border-l border-r rounded-t-md
                ${
                  activeSection === tab.id
                    ? "bg-blue-700 text-white"
                    : "bg-gray-50 text-gray-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <CardContent className="p-6">
          {loading && (
            <p className="text-center text-sm text-gray-500">
              Loading template data...
            </p>
          )}

          {/* ================= MAIN DOCUMENT ================= */}
          {!loading && activeSection === "main" && (
            <div className="border rounded-lg p-6 space-y-4">
              <p>
                <span className="font-semibold">Template Name :</span>{" "}
                {templateData?.template_usage?.template_name || "-"}
              </p>
              <p>
                <span className="font-semibold">Template Usage Name :</span>{" "}
                {templateData?.template_usage?.template_usages_name || "-"}
              </p>
              <p>
                <span className="font-semibold">Template Priority :</span>{" "}
                {templateData?.template_usage?.priority || "-"}
              </p>
              <p>
                <span className="font-semibold">Reference ID :</span>{" "}
                {templateData?.template_usage?.department_reference_id || "-"}
              </p>
              <p>
                <span className="font-semibold">Template Description :</span>{" "}
                {templateData?.template_usage?.description || "-"}
              </p>
            </div>
          )}

          {/* ================= PLACEHOLDER INPUTS ================= */}
          {!loading && activeSection === "placeholders" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Placeholder Inputs</h3>

              <div className="rounded-xl shadow-sm border p-4">
                <div className="flex justify-between mb-3">
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    defaultValue={10}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Search"
                    className="border rounded px-3 py-1 text-sm"
                  />
                </div>

                <table className="w-full border">
                  <thead className="bg-blue-700 text-white">
                    <tr>
                      <th className="p-2 text-left">#</th>
                      <th className="p-2 text-left">Template Name</th>
                      <th className="p-2 text-left">Input Library Name</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templateData?.records?.map((item: any, index: number) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{item?.template?.template_name}</td>
                        <td className="p-2">
                          {item?.placeholder?.input_library_name}
                        </td>
                        <td className="p-2">
                          <Link
                            to="/templates-design-view"
                            state={{
                              id: item.id,
                              template_usage_id: template_usage_id,
                            }}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= ATTACHMENTS ================= */}
          {!loading && activeSection === "attachments" && (
            <div className="space-y-6">
              {/* Attachments Table */}
              <div className="rounded-xl shadow-sm border p-4">
                <table className="w-full border">
                  <thead className="bg-blue-700 text-white">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Name Of Attachment</th>
                      <th className="p-2">File</th>
                      <th className="p-2">Type / Size</th>
                      <th className="p-2">Last Edited By / On</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templateData?.attachments?.map(
                      (attachment: any, index: number) => (
                        <tr className="text-center" key={index}>
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">
                            {attachment?.attachement_name}
                          </td>
                          <td className="p-2">
                            <img
                              src={
                                attachment?.image
                                  ? `${BASE_URL}${attachment.image}`
                                  : ""
                              }
                              alt="image"
                              className="w-20 h-20 object-cover mx-auto"
                            />
                          </td>
                          <td className="p-2">
                            {attachment?.extension} / {attachment?.size}
                          </td>
                          <td className="p-2">{attachment?.updated_at}</td>
                          <td className="p-2">
                            <Button
                              className="bg-yellow-500 hover:bg-yellow-600"
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = `${BASE_URL}${attachment?.image}`;
                                link.setAttribute(
                                  "download",
                                  attachment?.attachement_name || "attachment"
                                );
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                            >
                              ⬇
                            </Button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* ADD NEW ATTACHMENT FORM */}
              <div className="border rounded-xl p-4 space-y-4">
                <h3 className="text-lg font-semibold">Add New Attachment</h3>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Attachment Name
                    </label>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      value={newAttachmentName}
                      onChange={(e) => setNewAttachmentName(e.target.value)}
                      placeholder="Enter attachment name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Attachment File
                    </label>
                    <input
                      type="file"
                      className="w-full"
                      multiple
                      onChange={(e) => setNewAttachmentFiles(e.target.files)}
                      key={newAttachmentFiles ? newAttachmentFiles.length : ""}
                    />
                  </div>
                  <div className="col-span-2 flex space-x-4 mt-2">
                    <Button
                      className="bg-blue-700 hover:bg-blue-800"
                      onClick={handleAddAttachment}
                    >
                      Add
                    </Button>
                    <Button
                      className="bg-gray-300 hover:bg-gray-400 text-black"
                      onClick={() => {
                        setNewAttachmentName("");
                        setNewAttachmentFiles(null);
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionBoardTemplateDesign;
