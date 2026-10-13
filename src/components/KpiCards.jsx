// Four KPI cards. Every number comes from GET /stats.
function Card({ label, value, note, noteColor, barPct, barColor }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value-row">
        <span className="kpi-value">{value}</span>
        <span className="kpi-note" style={{ color: noteColor }}>
          {note}
        </span>
      </div>
      <div className="kpi-track">
        <div
          className="kpi-bar"
          style={{ width: `${Math.max(0, Math.min(100, barPct))}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

export default function KpiCards({ stats }) {
  // Show dashes until the numbers arrive
  const s = stats || {};
  const fmt = (n) => (n === undefined ? "–" : n.toLocaleString("en-IN"));
  const pct = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);

  const valid = (s.active || 0) + (s.expiring || 0);

  return (
    <div className="kpi-row">
      <Card
        label="Total enrolled"
        value={fmt(s.total)}
        note={s.growth_pct > 0 ? `+${s.growth_pct}% m/m` : ""}
        noteColor="var(--green)"
        barPct={pct(valid, s.total)}
        barColor="var(--green)"
      />
      <Card
        label="Active today"
        value={fmt(s.active)}
        note={s.total ? `${pct(s.active, s.total)}% Active` : ""}
        noteColor="var(--green)"
        barPct={pct(s.active, s.total)}
        barColor="var(--green)"
      />
      <Card
        label="Expiring in 7d"
        value={fmt(s.expiring)}
        note="Requires action"
        noteColor="rgba(245, 158, 11, 0.9)"
        barPct={pct(s.expiring, s.total)}
        barColor="rgba(245, 158, 11, 0.8)"
      />
      <Card
        label="Turnstile pass-rate"
        value={s.pass_rate !== undefined ? `${s.pass_rate}%` : "–"}
        note="Live sync OK"
        noteColor="var(--green)"
        barPct={s.pass_rate || 0}
        barColor="var(--green)"
      />
    </div>
  );
}
