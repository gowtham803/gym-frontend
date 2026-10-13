const PILLS = [
  { key: "all", label: "All", dot: null },
  { key: "active", label: "Active", dot: "var(--green)" },
  { key: "expiring", label: "Expiring", dot: "var(--amber)" },
  { key: "expired", label: "Expired", dot: "var(--red)" },
  { key: "frozen", label: "Frozen", dot: "#4b5563" },
];

const fmt = (n) => (n === undefined ? "–" : n.toLocaleString("en-IN"));

export default function FilterBar({
  filters,
  onChange,
  onReset,
  stats,
  options,
  total,
  page,
  pageSize,
}) {
  const s = stats || {};
  const counts = {
    all: s.total,
    active: s.active,
    expiring: s.expiring,
    expired: s.expired,
    frozen: s.frozen,
  };

  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);

  return (
    <div className="filter-card">
      <div className="filter-top">
        <div className="search-wrap">
          <svg className="search-icon" width="15" height="15" viewBox="0 0 16 16" fill="none"
               stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3.5 3.5" />
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name, phone, or Member ID (e.g. ITK-1024)..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
          />
          <span className="kbd">⌘K</span>
        </div>

        <div className="pills">
          {PILLS.map((p) => (
            <button
              key={p.key}
              className={`pill ${filters.status === p.key ? "pill-active" : ""}`}
              onClick={() => onChange({ status: p.key })}
            >
              {p.dot && <span className="dot" style={{ background: p.dot }} />}
              <span className="pill-label">{p.label}</span>
              <span className="pill-count">{fmt(counts[p.key])}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="filter-bottom">
        <div className="filter-left">
          <select
            className="dropdown"
            value={filters.plan}
            onChange={(e) => onChange({ plan: e.target.value })}
          >
            <option value="">Plan: All Plans</option>
            {(options.plans || []).map((p) => (
              <option key={p} value={p}>
                Plan: {p}
              </option>
            ))}
          </select>

          <select
            className="dropdown"
            value={filters.trainer}
            onChange={(e) => onChange({ trainer: e.target.value })}
          >
            <option value="">Trainer: Any Trainer</option>
            {(options.trainers || []).map((t) => (
              <option key={t} value={t}>
                Trainer: {t}
              </option>
            ))}
          </select>

          {/* Not connected to the backend yet */}
          <button className="dropdown" disabled title="Coming soon">
            Joined: Last 12 Months
          </button>

          <button className="reset" onClick={onReset}>
            ✕ Reset filters
          </button>
        </div>

        <div className="showing">
          Showing {first}-{last} of {fmt(total)}
        </div>
      </div>
    </div>
  );
}
