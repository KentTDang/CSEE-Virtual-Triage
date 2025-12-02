import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Button } from "@workspace/ui/components/button";


export default function HelpTickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("oldest");
  const [statusFilter, setStatusFilter] =
    useState<"open" | "in_progress" | "resolved" | "all">("open");

const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    getAdmin();
    fetchTickets();
  }, [search, sort, statusFilter]);

  async function getAdmin() {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.id) setAdminEmail(data.user.email);
  }

  async function fetchTickets() {
    let query = supabase.from("help_tickets").select("*");

    // Status filter
    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    // Search filter
    if (search.trim()) {
        query = query.or(
        `email.ilike.%${search}%,sID.ilike.%${search}%`
        );
    }

    // Sort
    query = query.order("created_at", {
      ascending: sort === "oldest",
    });

    const { data, error } = await query;
    if (!error) setTickets(data || []);
  }

  async function updateStatus(id: string, newStatus: string) {

    const confirmed = window.confirm(
        `Are you sure you want to change this ticket's status to "${newStatus}"?`
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from("help_tickets")
      .update({
        status: newStatus,
        updated_by: adminEmail,
        updated_at: new Date(),
      })
      .eq("id", id);

    if (!error) fetchTickets();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Help Tickets</h1>

      <div className="flex gap-4 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search by email or Student ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded "
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          className={` hover:bg-black ${
            statusFilter === "open" ? "bg-black text-white" : "bg-gray-500"
          }`}
          onClick={() => setStatusFilter("open")}
        >
          Open
        </Button>

        <Button
          className={`hover:bg-black ${
            statusFilter === "in_progress" ? "bg-black text-white" : "bg-gray-500"
          }`}
          onClick={() => setStatusFilter("in_progress")}
        >
          In Progress
        </Button>

        <Button
          className={`hover:bg-black ${
            statusFilter === "resolved" ? "bg-black text-white" : "bg-gray-500"
          }`}
          onClick={() => setStatusFilter("resolved")}
        >
          Resolved
        </Button>

        <Button
          className={`px-3 py-1 rounded hover:bg-black ${
            statusFilter === "all" ? "bg-black text-white" : "bg-gray-500"
          }`}
          onClick={() => setStatusFilter("all")}
        >
          All
        </Button>
      </div>

      <div className="space-y-4">
        {tickets.map((t: any) => (
          <div key={t.id} className="border p-4 rounded bg-white">
            <p className="font-semibold">Student ID: {t.sID}</p>
            <p className="font-semibold">Email: {t.email}</p>
            <p className="font-semibold mt-1">Subject: {t.subject}</p>

            <p className="mt-2">{t.message}</p>

            <p className="text-sm text-gray-500 mt-2">
              Submitted: {new Date(t.created_at).toLocaleString()}
            </p>

            <p className="mt-1 font-medium">
              Status:{" "}
              <span
                className={
                  t.status === "resolved"
                    ? "text-green-600"
                    : t.status === "in_progress"
                    ? "text-orange-600"
                    : "text-gray-700"
                }
              >
                {t.status}
              </span>
            </p>

            {t.updated_by && (
              <p className="text-sm text-gray-500">
                Updated by admin: {t.updated_by} <br />
                At: {new Date(t.updated_at).toLocaleString()}
              </p>
            )}

            <div className="flex gap-2 mt-4">
              <Button
                className="px-3 py-1 bg-[#FC9800] rounded"
                onClick={() => updateStatus(t.id, "in_progress")}
              >
                In Progress
              </Button>

              <Button
                className="px-3 py-1 bg-[#FE0100] text-white rounded"
                onClick={() => updateStatus(t.id, "resolved")}
              >
                Resolve
              </Button>

              <Button
                className="px-3 py-1 bg-[#009900] rounded"
                onClick={() => updateStatus(t.id, "open")}
              >
                Reopen
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
