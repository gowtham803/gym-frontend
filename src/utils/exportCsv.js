export function exportRosterToCsv(members, filename = "sanctum-athlete-roster.csv") {
  if (!members || members.length === 0) {
    alert("No members available to export.");
    return false;
  }

  const headers = [
    "Member ID",
    "Full Name",
    "Email",
    "Phone",
    "Membership Duration",
    "Start Date",
    "Expiry Date",
    "Days Left",
    "Status"
  ];

  const rows = members.map((m) => [
    `"${(m.member_id || "").replace(/"/g, '""')}"`,
    `"${(m.name || "").replace(/"/g, '""')}"`,
    `"${(m.email || "").replace(/"/g, '""')}"`,
    `"${(m.phone || "").replace(/"/g, '""')}"`,
    `"${(m.duration || "").replace(/"/g, '""')}"`,
    `"${(m.start_date || "").replace(/"/g, '""')}"`,
    `"${(m.expiry_date || "").replace(/"/g, '""')}"`,
    m.days_left ?? 0,
    `"${(m.status || "").replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}
