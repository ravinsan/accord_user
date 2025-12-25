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
import api from "@/api/axios";

export default function TemplateUsagePage() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("10");
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    pageNo = page,
    perPage = show,
    searchText = search
  ) => {
    try {
      setLoading(true);
      const res = await api.get("/template-usages", {
        params: {
          page: pageNo,
          per_page: perPage,
          search: searchText,
        },
      });

      setData(res.data.data.data);
      setLastPage(res.data.data.last_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // page / show change
  useEffect(() => {
    fetchData(1);
    setPage(1);
  }, [show]);

  // page change
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(1);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
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
                        className="bg-yellow-400 text-black rounded-full text-xs px-3"
                      >
                        Approval Details
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

          {loading && (
            <p className="text-center py-4 text-sm">Loading...</p>
          )}
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
  );
}
