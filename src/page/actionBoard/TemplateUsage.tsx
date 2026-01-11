import { useEffect, useState } from "react";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/api/axios";
import { Link } from "react-router";

export default function TemplateUsagePage() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("10");
  const [data, setData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [approvalData, setApprovalData] = useState<any[]>([]);
  const [approvalLoading, setApprovalLoading] = useState(false);

  const fetchData = async (searchText = search) => {
    try {
      setLoading(true);
      const res = await api.get("/template-usages", {
        params: {
          page: 1,
          per_page: 10000,
          search: searchText,
        },
      });

      setAllData(res.data.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovalDetails = async (id: number) => {
    try {
      setApprovalLoading(true);
      const res = await api.get("/template-usage-aproval", {
        params: { dataid: id },
      });
      setApprovalData(res.data.data || []);
    } catch (err) {
      console.error(err);
      setApprovalData([]);
    } finally {
      setApprovalLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchData();
  }, []);

  // reset page on search
  useEffect(() => {
    setPage(1);
  }, [search]);

  // reset page on show change
  useEffect(() => {
    setPage(1);
  }, [show]);

  // filter and paginate data
  useEffect(() => {
    const filtered = search
      ? allData.filter(
          (item) =>
            item.template_name.toLowerCase().includes(search.toLowerCase()) ||
            item.template_usages_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        )
      : allData;
    const total = filtered.length;
    const perPage = Number(show);
    const lastPageCalc = Math.ceil(total / perPage);
    setLastPage(lastPageCalc);
    if (page > lastPageCalc && lastPageCalc > 0) {
      setPage(lastPageCalc);
    }
    const start = (page - 1) * perPage;
    const end = start + perPage;
    setData(filtered.slice(start, end));
  }, [allData, search, show, page]);

  return (
    <>
      <Card className="rounded-xl shadow-md bg-white">
        {/* HEADER */}
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <Select value={show} onValueChange={setShow}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>

          <Input
            placeholder="Search..."
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>

        {/* TABLE */}
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
                {!loading &&
                  data.map((row, index) => (
                    <tr
                      key={row.id}
                      className="border-b text-sm hover:bg-gray-50"
                    >
                      <td className="p-3">
                        {(page - 1) * Number(show) + index + 1}
                      </td>
                      <td className="p-3">{row.template_name}</td>
                      <td className="p-3">{row.template_usages_name}</td>
                      <td className="p-3">{row.description}</td>
                      <td className="p-3 capitalize">{row.priority}</td>
                      <td className="p-3">{row.department_reference_id}</td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          className="bg-yellow-400 text-white rounded-full text-xs px-3"
                          onClick={() => {
                            setSelectedRow(row);
                            fetchApprovalDetails(row.id);
                            setIsModalOpen(true);
                          }}
                        >
                          Approval Details
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          className="bg-sky-400 text-white rounded-full text-xs px-3"
                        >
                          <Link
                            to="/action-board-templates-design"
                            state={{
                              template_id: row.template_id,
                              template_usage_id: row.id,
                            }}
                          >
                            Template Design
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}

                {!loading && data.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center p-4">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {loading && <p className="text-center py-4 text-sm">Loading...</p>}
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <span>
              Page {page} of {lastPage}
            </span>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>

              <Button size="sm">{page}</Button>

              <Button
                variant="outline"
                size="sm"
                disabled={page === lastPage}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="!w-[50vw] xl:!w-[800px] 2xl:!w-[900px] !max-w-none">
          <DialogHeader>
            <DialogTitle>
              Approval Details for {selectedRow?.template_usages_name}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-sm">
                  <th className="p-3 border border-gray-300 text-left">
                    Sl No.
                  </th>
                  <th className="p-3 border border-gray-300 text-left">
                    Approval Index Name
                  </th>
                  <th className="p-3 border border-gray-300 text-left">
                    Approval Section Name
                  </th>
                  <th className="p-3 border border-gray-300 text-left">
                    User Name
                  </th>
                  <th className="p-3 border border-gray-300 text-left">
                    Status
                  </th>
                  <th className="p-3 border border-gray-300 text-left">
                    Company Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {approvalLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center p-4">
                      Loading...
                    </td>
                  </tr>
                ) : approvalData.length > 0 ? (
                  approvalData.map((item, index) => (
                    <tr key={index} className="border-b text-sm">
                      <td className="p-3 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {item.approvalIndex?.approval_indices_name}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {item.approval_section_name}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {item.umuser?.Full_name}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {item.user_approval_status == 0
                          ? "In Progress"
                          : item.user_approval_status == 1
                          ? "Approved"
                          : item.user_approval_status == 2
                          ? "Not Assigned"
                          : "Rejected"}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {item.company?.company_name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center p-4">
                      No approval details found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
