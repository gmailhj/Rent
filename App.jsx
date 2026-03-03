import { useState } from "react";

const COLORS = {
  primary: "#1a56db", primaryDark: "#1e40af", accent: "#f59e0b",
  success: "#10b981", danger: "#ef4444", warning: "#f59e0b",
  bg: "#f0f4ff", sidebar: "#0f172a", sidebarText: "#94a3b8",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
};

const initialData = {
  properties: [
    { id: 1, name: "Sunrise PG", type: "PG", address: "MG Road, Bangalore", rooms: 12, occupied: 9, rent: 8500 },
    { id: 2, name: "Green Hostel", type: "Hostel", address: "Koramangala, Bangalore", rooms: 20, occupied: 17, rent: 6500 },
    { id: 3, name: "BlueSky Flats", type: "Flat", address: "Indiranagar, Bangalore", rooms: 6, occupied: 5, rent: 18000 },
  ],
  tenants: [
    { id: 1, name: "Rahul Sharma", room: "101", property: "Sunrise PG", phone: "9876543210", joinDate: "2024-01-15", rent: 8500, status: "active", paid: true },
    { id: 2, name: "Priya Nair", room: "102", property: "Sunrise PG", phone: "9123456789", joinDate: "2024-02-01", rent: 8500, status: "active", paid: false },
    { id: 3, name: "Amit Verma", room: "201", property: "Green Hostel", phone: "9988776655", joinDate: "2023-11-10", rent: 6500, status: "active", paid: true },
    { id: 4, name: "Sneha Iyer", room: "202", property: "Green Hostel", phone: "9871234560", joinDate: "2024-03-05", rent: 6500, status: "active", paid: false },
    { id: 5, name: "Karan Singh", room: "A1", property: "BlueSky Flats", phone: "9001234567", joinDate: "2023-09-01", rent: 18000, status: "active", paid: true },
    { id: 6, name: "Divya Menon", room: "103", property: "Sunrise PG", phone: "9119988776", joinDate: "2024-04-10", rent: 8500, status: "notice", paid: false },
  ],
  payments: [
    { id: 1, tenant: "Rahul Sharma", property: "Sunrise PG", amount: 8500, date: "2025-02-01", status: "paid", method: "UPI" },
    { id: 2, tenant: "Priya Nair", property: "Sunrise PG", amount: 8500, date: "2025-02-01", status: "pending", method: "-" },
    { id: 3, tenant: "Amit Verma", property: "Green Hostel", amount: 6500, date: "2025-02-01", status: "paid", method: "Bank Transfer" },
    { id: 4, tenant: "Sneha Iyer", property: "Green Hostel", amount: 6500, date: "2025-02-01", status: "pending", method: "-" },
    { id: 5, tenant: "Karan Singh", property: "BlueSky Flats", amount: 18000, date: "2025-02-01", status: "paid", method: "NEFT" },
    { id: 6, tenant: "Divya Menon", property: "Sunrise PG", amount: 8500, date: "2025-01-01", status: "overdue", method: "-" },
  ],
  maintenance: [
    { id: 1, property: "Sunrise PG", room: "101", issue: "Leaking tap", reported: "2025-02-20", status: "open", priority: "medium" },
    { id: 2, property: "Green Hostel", room: "202", issue: "Fan not working", reported: "2025-02-22", status: "in-progress", priority: "high" },
    { id: 3, property: "BlueSky Flats", room: "A1", issue: "Wi-Fi issue", reported: "2025-02-18", status: "resolved", priority: "low" },
    { id: 4, property: "Sunrise PG", room: "103", issue: "Broken window lock", reported: "2025-02-24", status: "open", priority: "high" },
  ],
  announcements: [
    { id: 1, title: "Water Supply Interruption", message: "Water supply will be interrupted on Feb 28, 8AM-12PM.", date: "2025-02-25", property: "All Properties" },
    { id: 2, title: "Rent Due Reminder", message: "February rent is due. Please pay before Feb 28.", date: "2025-02-20", property: "All Properties" },
  ],
  rooms: [
    { id: 1, number: "101", property: "Sunrise PG", type: "Single", capacity: 1, occupied: 1, floor: 1, amenities: ["AC", "Attached Bath"], status: "occupied", tenants: ["Rahul Sharma"] },
    { id: 2, number: "102", property: "Sunrise PG", type: "Single", capacity: 1, occupied: 1, floor: 1, amenities: ["Fan", "Attached Bath"], status: "occupied", tenants: ["Priya Nair"] },
    { id: 3, number: "103", property: "Sunrise PG", type: "Double", capacity: 2, occupied: 1, floor: 1, amenities: ["AC", "Common Bath"], status: "partial", tenants: ["Divya Menon"] },
    { id: 4, number: "104", property: "Sunrise PG", type: "Double", capacity: 2, occupied: 0, floor: 1, amenities: ["Fan", "Common Bath"], status: "vacant", tenants: [] },
    { id: 5, number: "201", property: "Green Hostel", type: "Dormitory", capacity: 6, occupied: 4, floor: 2, amenities: ["Fan", "Common Bath", "Locker"], status: "partial", tenants: ["Amit Verma"] },
    { id: 6, number: "202", property: "Green Hostel", type: "Double", capacity: 2, occupied: 2, floor: 2, amenities: ["AC", "Common Bath"], status: "occupied", tenants: ["Sneha Iyer"] },
    { id: 7, number: "A1", property: "BlueSky Flats", type: "2BHK", capacity: 1, occupied: 1, floor: 1, amenities: ["AC", "Attached Bath", "Kitchen", "WiFi"], status: "occupied", tenants: ["Karan Singh"] },
    { id: 8, number: "A2", property: "BlueSky Flats", type: "1BHK", capacity: 1, occupied: 0, floor: 1, amenities: ["AC", "Attached Bath", "Kitchen"], status: "vacant", tenants: [] },
  ],
  utilityBills: [
    { id: 1, tenant: "Rahul Sharma", room: "101", property: "Sunrise PG", month: "2025-02", elecPrevReading: 1200, elecCurrReading: 1345, elecRate: 8, waterUnits: 5, waterRate: 50, status: "paid" },
    { id: 2, tenant: "Priya Nair", room: "102", property: "Sunrise PG", month: "2025-02", elecPrevReading: 980, elecCurrReading: 1102, elecRate: 8, waterUnits: 4, waterRate: 50, status: "pending" },
    { id: 3, tenant: "Amit Verma", room: "201", property: "Green Hostel", month: "2025-02", elecPrevReading: 500, elecCurrReading: 562, elecRate: 7, waterUnits: 3, waterRate: 40, status: "paid" },
    { id: 4, tenant: "Sneha Iyer", room: "202", property: "Green Hostel", month: "2025-02", elecPrevReading: 320, elecCurrReading: 401, elecRate: 7, waterUnits: 4, waterRate: 40, status: "pending" },
    { id: 5, tenant: "Karan Singh", room: "A1", property: "BlueSky Flats", month: "2025-02", elecPrevReading: 2100, elecCurrReading: 2389, elecRate: 9, waterUnits: 8, waterRate: 60, status: "paid" },
  ],
  checklists: [
    {
      id: 1, tenant: "Rahul Sharma", room: "101", property: "Sunrise PG", type: "move-in", date: "2024-01-15", status: "completed",
      items: [
        { label: "Keys handed over", done: true },
        { label: "Room cleanliness verified", done: true },
        { label: "Furniture inventory signed", done: true },
        { label: "Meter reading noted", done: true },
        { label: "ID documents collected", done: true },
        { label: "Rent agreement signed", done: true },
        { label: "Security deposit paid", done: true },
      ]
    },
    {
      id: 2, tenant: "Divya Menon", room: "103", property: "Sunrise PG", type: "move-out", date: "2025-03-01", status: "in-progress",
      items: [
        { label: "Notice period served", done: true },
        { label: "Pending dues cleared", done: false },
        { label: "Room inspection done", done: true },
        { label: "Damage assessment", done: false },
        { label: "Keys returned", done: false },
        { label: "Security deposit refunded", done: false },
        { label: "Final meter reading", done: false },
      ]
    },
  ],
};

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "properties", label: "Properties", icon: "🏠" },
  { id: "rooms", label: "Rooms", icon: "🚪" },
  { id: "tenants", label: "Tenants", icon: "👥" },
  { id: "payments", label: "Payments", icon: "💰" },
  { id: "utilities", label: "Utilities", icon: "⚡" },
  { id: "checklist", label: "Checklists", icon: "✅" },
  { id: "maintenance", label: "Maintenance", icon: "🔧" },
  { id: "announcements", label: "Announcements", icon: "📢" },
  { id: "reports", label: "Reports", icon: "📊" },
];

function Badge({ color, children }) {
  const map = { green: ["#d1fae5","#065f46"], red: ["#fee2e2","#991b1b"], yellow: ["#fef3c7","#92400e"], blue: ["#dbeafe","#1e40af"], purple: ["#ede9fe","#5b21b6"], gray: ["#f1f5f9","#475569"] };
  const [bg, fg] = map[color] || map.gray;
  return <span style={{ background: bg, color: fg, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, display: "inline-block", whiteSpace: "nowrap" }}>{children}</span>;
}

function Card({ children, style = {} }) {
  return <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", padding: 20, ...style }}>{children}</div>;
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 140 }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 3 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color, marginTop: 2, fontWeight: 600 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: wide ? 640 : 480, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <span style={{ fontWeight: 700, fontSize: 17, color: COLORS.text }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: COLORS.muted, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", options, hint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.muted, marginBottom: 5 }}>{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "9px 11px", borderRadius: 9, border: `1.5px solid ${COLORS.border}`, fontSize: 13, color: COLORS.text, background: "#fff" }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "9px 11px", borderRadius: 9, border: `1.5px solid ${COLORS.border}`, fontSize: 13, color: COLORS.text, boxSizing: "border-box" }} />
      )}
      {hint && <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3 }}>{hint}</div>}
    </div>
  );
}

function Btn({ children, onClick, color = COLORS.primary, outline, style = {}, small }) {
  return (
    <button onClick={onClick} style={{ padding: small ? "5px 12px" : "9px 18px", borderRadius: 9, background: outline ? "transparent" : color, color: outline ? color : "#fff", border: `2px solid ${color}`, fontWeight: 700, fontSize: small ? 11 : 13, cursor: "pointer", ...style }}>{children}</button>
  );
}

function TH({ children }) { return <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: 0.4, whiteSpace: "nowrap" }}>{children}</th>; }
function TD({ children, bold }) { return <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: bold ? 700 : 400 }}>{children}</td>; }

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ data }) {
  const occupied = data.properties.reduce((a, p) => a + p.occupied, 0);
  const totalRooms = data.properties.reduce((a, p) => a + p.rooms, 0);
  const totalRent = data.payments.filter(p => p.status === "paid").reduce((a, p) => a + p.amount, 0);
  const pendingDues = data.payments.filter(p => p.status !== "paid").length;
  const pendingUtils = data.utilityBills.filter(b => b.status !== "paid").length;
  const openMaint = data.maintenance.filter(m => m.status !== "resolved").length;

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: COLORS.text }}>Good morning, Manager! 👋</h2>
      <p style={{ color: COLORS.muted, marginBottom: 20, fontSize: 13 }}>Here's what's happening across your properties today.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard icon="🏠" label="Total Rooms" value={totalRooms} sub={`${occupied} occupied`} color={COLORS.primary} />
        <StatCard icon="👥" label="Active Tenants" value={data.tenants.filter(t => t.status === "active").length} color="#8b5cf6" />
        <StatCard icon="💰" label="Rent Collected" value={`₹${(totalRent/1000).toFixed(1)}K`} color={COLORS.success} />
        <StatCard icon="⚠️" label="Rent Pending" value={pendingDues} color={COLORS.danger} />
        <StatCard icon="⚡" label="Utility Dues" value={pendingUtils} color={COLORS.warning} />
        <StatCard icon="🔧" label="Open Issues" value={openMaint} color="#06b6d4" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Property Occupancy</h3>
          {data.properties.map(p => (
            <div key={p.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                <span>{p.name}</span><span style={{ color: COLORS.muted }}>{p.occupied}/{p.rooms}</span>
              </div>
              <div style={{ background: "#f0f4ff", borderRadius: 6, height: 7 }}>
                <div style={{ width: `${(p.occupied/p.rooms)*100}%`, background: COLORS.primary, height: "100%", borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Pending Utility Bills</h3>
          {data.utilityBills.filter(b => b.status !== "paid").map(b => {
            const elec = (b.elecCurrReading - b.elecPrevReading) * b.elecRate;
            const water = b.waterUnits * b.waterRate;
            return (
              <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{b.tenant}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>⚡₹{elec} + 💧₹{water}</div>
                </div>
                <Badge color="yellow">₹{elec + water}</Badge>
              </div>
            );
          })}
        </Card>
        <Card>
          <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Recent Payments</h3>
          {data.payments.slice(0,5).map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${COLORS.border}` }}>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>{p.tenant}</div><div style={{ fontSize: 11, color: COLORS.muted }}>{p.date}</div></div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>₹{p.amount.toLocaleString()}</div>
                <Badge color={p.status==="paid"?"green":p.status==="pending"?"yellow":"red"}>{p.status}</Badge>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Active Checklists</h3>
          {data.checklists.map(c => {
            const done = c.items.filter(i => i.done).length;
            return (
              <div key={c.id} style={{ marginBottom: 14, padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{c.tenant}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted }}>Room {c.room} • {c.type === "move-in" ? "Move In" : "Move Out"}</div>
                  </div>
                  <Badge color={c.type==="move-in"?"blue":"purple"}>{c.type}</Badge>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 6, height: 5, marginTop: 6 }}>
                  <div style={{ width: `${(done/c.items.length)*100}%`, background: c.type==="move-in"?COLORS.success:COLORS.warning, height: "100%", borderRadius: 6 }} />
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3 }}>{done}/{c.items.length} complete</div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

// ── Properties ────────────────────────────────────────────────────────────────
function Properties({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", type: "PG", address: "", rooms: "", rent: "" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  function add() {
    setData(d => ({ ...d, properties: [...d.properties, { id: Date.now(), ...form, rooms: +form.rooms, rent: +form.rent, occupied: 0 }] }));
    setModal(false); setForm({ name: "", type: "PG", address: "", rooms: "", rent: "" });
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Properties</h2>
        <Btn onClick={() => setModal(true)}>+ Add Property</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {data.properties.map(p => (
          <Card key={p.id} style={{ border: `1.5px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div><div style={{ fontSize: 16, fontWeight: 800 }}>{p.name}</div><div style={{ fontSize: 12, color: COLORS.muted }}>{p.address}</div></div>
              <Badge color="blue">{p.type}</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              {[["Total Rooms", p.rooms], ["Occupied", p.occupied], ["Vacant", p.rooms - p.occupied], ["Rent/Room", `₹${p.rent.toLocaleString()}`]].map(([l, v]) => (
                <div key={l} style={{ background: "#f8fafc", borderRadius: 8, padding: "8px 12px" }}>
                  <div style={{ fontSize: 10, color: COLORS.muted, fontWeight: 600 }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: COLORS.muted }}>Occupancy</span>
                <span style={{ fontWeight: 700, color: COLORS.primary }}>{Math.round((p.occupied/p.rooms)*100)}%</span>
              </div>
              <div style={{ background: "#e2e8f0", borderRadius: 6, height: 7 }}>
                <div style={{ width: `${(p.occupied/p.rooms)*100}%`, background: COLORS.primary, height: "100%", borderRadius: 6 }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      {modal && (
        <Modal title="Add New Property" onClose={() => setModal(false)}>
          <Input label="Property Name" value={form.name} onChange={f("name")} />
          <Input label="Type" value={form.type} onChange={f("type")} options={["PG","Hostel","Flat"]} />
          <Input label="Address" value={form.address} onChange={f("address")} />
          <Input label="Total Rooms" value={form.rooms} onChange={f("rooms")} type="number" />
          <Input label="Rent per Room (₹)" value={form.rent} onChange={f("rent")} type="number" />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={COLORS.muted} onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={add}>Add Property</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Rooms ─────────────────────────────────────────────────────────────────────
function Rooms({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [propFilter, setPropFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState({ number: "", property: data.properties[0]?.name || "", type: "Single", capacity: "1", floor: "1", amenities: "" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const typeIcon = t => ({ Single: "🛏️", Double: "🛏️🛏️", Dormitory: "🏨", "2BHK": "🏠", "1BHK": "🏡" })[t] || "🚪";
  const statusColor = s => s === "occupied" ? "red" : s === "vacant" ? "green" : "yellow";

  const filtered = data.rooms.filter(r =>
    (propFilter === "All" || r.property === propFilter) &&
    (statusFilter === "all" || r.status === statusFilter)
  );

  function addRoom() {
    const amenities = form.amenities.split(",").map(a => a.trim()).filter(Boolean);
    setData(d => ({ ...d, rooms: [...d.rooms, { id: Date.now(), ...form, capacity: +form.capacity, floor: +form.floor, occupied: 0, status: "vacant", tenants: [], amenities }] }));
    setModal(false);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Room Management</h2>
        <Btn onClick={() => setModal(true)}>+ Add Room</Btn>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {[["all","All",data.rooms.length], ["occupied","Occupied",data.rooms.filter(r=>r.status==="occupied").length], ["partial","Partial",data.rooms.filter(r=>r.status==="partial").length], ["vacant","Vacant",data.rooms.filter(r=>r.status==="vacant").length]].map(([s,l,v]) => (
          <div key={s} onClick={() => setStatusFilter(s)} style={{ background: "#fff", borderRadius: 12, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", border: `2px solid ${statusFilter===s?COLORS.primary:"transparent"}`, minWidth: 90 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.text }}>{v}</div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
        {["All", ...data.properties.map(p => p.name)].map(p => (
          <button key={p} onClick={() => setPropFilter(p)} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12, background: propFilter===p?COLORS.primary:"#f1f5f9", color: propFilter===p?"#fff":COLORS.muted }}>{p}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 14 }}>
        {filtered.map(r => (
          <div key={r.id} onClick={() => setDetail(r)} style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", cursor: "pointer", border: `2px solid ${r.status==="vacant"?"#d1fae5":r.status==="occupied"?"#fee2e2":"#fef3c7"}` }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{typeIcon(r.type)}</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Room {r.number}</div>
            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8 }}>{r.property} • Fl {r.floor}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <Badge color={statusColor(r.status)}>{r.status}</Badge>
              <span style={{ fontSize: 11, color: COLORS.muted }}>{r.type}</span>
            </div>
            <div style={{ background: "#f0f4ff", borderRadius: 6, height: 5, marginBottom: 5 }}>
              <div style={{ width: `${(r.occupied/r.capacity)*100}%`, background: r.status==="vacant"?COLORS.success:r.status==="occupied"?COLORS.danger:COLORS.warning, height: "100%", borderRadius: 6 }} />
            </div>
            <div style={{ fontSize: 10, color: COLORS.muted }}>{r.occupied}/{r.capacity} beds</div>
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 3 }}>
              {r.amenities.slice(0,3).map(a => <span key={a} style={{ fontSize: 9, background: "#eff6ff", color: COLORS.primary, borderRadius: 5, padding: "2px 6px", fontWeight: 600 }}>{a}</span>)}
              {r.amenities.length > 3 && <span style={{ fontSize: 9, color: COLORS.muted }}>+{r.amenities.length-3}</span>}
            </div>
          </div>
        ))}
      </div>

      {detail && (
        <Modal title={`Room ${detail.number} — ${detail.property}`} onClose={() => setDetail(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[["Type",detail.type],["Floor",detail.floor],["Capacity",detail.capacity+" beds"],["Occupied",detail.occupied+" beds"],["Status",detail.status]].map(([l,v]) => (
              <div key={l} style={{ background: "#f8fafc", borderRadius: 9, padding: "9px 12px" }}>
                <div style={{ fontSize: 10, color: COLORS.muted, fontWeight: 600 }}>{l}</div>
                <div style={{ fontSize: 14, fontWeight: 700, textTransform: "capitalize" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, marginBottom: 7 }}>AMENITIES</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {detail.amenities.map(a => <span key={a} style={{ background: "#eff6ff", color: COLORS.primary, borderRadius: 7, padding: "4px 11px", fontSize: 12, fontWeight: 600 }}>{a}</span>)}
            </div>
          </div>
          {detail.tenants.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, marginBottom: 7 }}>TENANTS</div>
              {detail.tenants.map(t => {
                const tenant = data.tenants.find(tn => tn.name === t);
                return tenant ? (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#f8fafc", borderRadius: 9, marginBottom: 7 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.primary+"20", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: COLORS.primary, fontSize: 13 }}>{t[0]}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 14 }}>{t}</div><div style={{ fontSize: 11, color: COLORS.muted }}>{tenant.phone}</div></div>
                    <Badge color={tenant.status==="active"?"green":"yellow"}>{tenant.status}</Badge>
                  </div>
                ) : null;
              })}
            </div>
          )}
          {detail.status === "vacant" && (
            <div style={{ marginTop: 14, padding: 14, background: "#d1fae5", borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontWeight: 700, color: "#065f46" }}>✅ Room is Available</div>
            </div>
          )}
        </Modal>
      )}

      {modal && (
        <Modal title="Add New Room" onClose={() => setModal(false)}>
          <Input label="Room Number" value={form.number} onChange={f("number")} />
          <Input label="Property" value={form.property} onChange={f("property")} options={data.properties.map(p=>p.name)} />
          <Input label="Room Type" value={form.type} onChange={f("type")} options={["Single","Double","Dormitory","1BHK","2BHK"]} />
          <Input label="Bed Capacity" value={form.capacity} onChange={f("capacity")} type="number" />
          <Input label="Floor" value={form.floor} onChange={f("floor")} type="number" />
          <Input label="Amenities (comma-separated)" value={form.amenities} onChange={f("amenities")} hint="e.g. AC, Attached Bath, WiFi" />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={COLORS.muted} onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={addRoom}>Add Room</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Tenants ───────────────────────────────────────────────────────────────────
function Tenants({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", room: "", property: data.properties[0]?.name||"", phone: "", joinDate: "", rent: "" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const filtered = data.tenants.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.property.toLowerCase().includes(search.toLowerCase()));
  function add() {
    setData(d => ({ ...d, tenants: [...d.tenants, { id: Date.now(), ...form, rent: +form.rent, status: "active", paid: false }] }));
    setModal(false);
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Tenants</h2>
        <Btn onClick={() => setModal(true)}>+ Add Tenant</Btn>
      </div>
      <input placeholder="🔍  Search tenants..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13, marginBottom: 16, boxSizing: "border-box" }} />
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead><tr style={{ background: "#f8fafc" }}>{["Tenant","Room","Property","Phone","Join Date","Rent","Status"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id} style={{ borderTop: `1px solid ${COLORS.border}`, background: i%2?"#fafafa":"#fff" }}>
                  <TD><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.primary+"20", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: COLORS.primary, fontSize: 12 }}>{t.name[0]}</div><span style={{ fontWeight: 600 }}>{t.name}</span></div></TD>
                  <TD>{t.room}</TD><TD>{t.property}</TD><TD>{t.phone}</TD><TD>{t.joinDate}</TD>
                  <TD bold>₹{t.rent.toLocaleString()}</TD>
                  <TD><Badge color={t.status==="active"?"green":"yellow"}>{t.status}</Badge></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {modal && (
        <Modal title="Add Tenant" onClose={() => setModal(false)}>
          <Input label="Name" value={form.name} onChange={f("name")} />
          <Input label="Room" value={form.room} onChange={f("room")} />
          <Input label="Property" value={form.property} onChange={f("property")} options={data.properties.map(p=>p.name)} />
          <Input label="Phone" value={form.phone} onChange={f("phone")} />
          <Input label="Join Date" value={form.joinDate} onChange={f("joinDate")} type="date" />
          <Input label="Monthly Rent (₹)" value={form.rent} onChange={f("rent")} type="number" />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={COLORS.muted} onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={add}>Add Tenant</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Payments ──────────────────────────────────────────────────────────────────
function Payments({ data, setData }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter==="all" ? data.payments : data.payments.filter(p=>p.status===filter);
  const total = data.payments.reduce((a,p)=>a+p.amount,0);
  const collected = data.payments.filter(p=>p.status==="paid").reduce((a,p)=>a+p.amount,0);
  function markPaid(id) { setData(d => ({ ...d, payments: d.payments.map(p => p.id===id?{...p,status:"paid",method:"UPI",date:"2025-02-25"}:p) })); }
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, color: COLORS.text }}>Payments</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard icon="💰" label="Expected" value={`₹${(total/1000).toFixed(1)}K`} color={COLORS.primary} />
        <StatCard icon="✅" label="Collected" value={`₹${(collected/1000).toFixed(1)}K`} color={COLORS.success} />
        <StatCard icon="⏳" label="Pending" value={`₹${((total-collected)/1000).toFixed(1)}K`} color={COLORS.danger} />
        <StatCard icon="📈" label="Collection Rate" value={`${Math.round((collected/total)*100)}%`} color="#8b5cf6" />
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 16 }}>
        {["all","paid","pending","overdue"].map(s=>(
          <button key={s} onClick={() => setFilter(s)} style={{ padding: "7px 16px", borderRadius: 18, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12, background: filter===s?COLORS.primary:"#f1f5f9", color: filter===s?"#fff":COLORS.muted }}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
        ))}
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 550 }}>
            <thead><tr style={{ background: "#f8fafc" }}>{["Tenant","Amount","Date","Method","Status","Action"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {filtered.map((p,i) => (
                <tr key={p.id} style={{ borderTop: `1px solid ${COLORS.border}`, background: i%2?"#fafafa":"#fff" }}>
                  <TD bold>{p.tenant}</TD>
                  <TD bold>₹{p.amount.toLocaleString()}</TD>
                  <TD>{p.date}</TD><TD>{p.method}</TD>
                  <TD><Badge color={p.status==="paid"?"green":p.status==="pending"?"yellow":"red"}>{p.status}</Badge></TD>
                  <TD>{p.status!=="paid"&&<Btn small onClick={()=>markPaid(p.id)}>Mark Paid</Btn>}</TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function Utilities({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ tenant: data.tenants[0]?.name||"", room: "", property: data.properties[0]?.name||"", month: "2025-02", elecPrevReading: "", elecCurrReading: "", elecRate: "8", waterUnits: "", waterRate: "50" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const calcElec = b => (b.elecCurrReading - b.elecPrevReading) * b.elecRate;
  const calcWater = b => b.waterUnits * b.waterRate;
  const liveElec = (+form.elecCurrReading - +form.elecPrevReading) * +form.elecRate || 0;
  const liveWater = +form.waterUnits * +form.waterRate || 0;
  function addBill() {
    setData(d => ({ ...d, utilityBills: [...d.utilityBills, { id: Date.now(), ...form, elecPrevReading: +form.elecPrevReading, elecCurrReading: +form.elecCurrReading, elecRate: +form.elecRate, waterUnits: +form.waterUnits, waterRate: +form.waterRate, status: "pending" }] }));
    setModal(false);
  }
  function markPaid(id) { setData(d => ({ ...d, utilityBills: d.utilityBills.map(b => b.id===id?{...b,status:"paid"}:b) })); }
  const totalCollected = data.utilityBills.filter(b=>b.status==="paid").reduce((a,b)=>a+calcElec(b)+calcWater(b),0);
  const totalPending = data.utilityBills.filter(b=>b.status!=="paid").reduce((a,b)=>a+calcElec(b)+calcWater(b),0);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Utility Billing ⚡💧</h2>
        <Btn onClick={() => setModal(true)}>+ Generate Bill</Btn>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard icon="🧾" label="Bills Generated" value={data.utilityBills.length} color={COLORS.warning} />
        <StatCard icon="✅" label="Collected" value={`₹${totalCollected.toLocaleString()}`} color={COLORS.success} />
        <StatCard icon="⏳" label="Pending" value={`₹${totalPending.toLocaleString()}`} color={COLORS.danger} />
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {data.utilityBills.map(b => {
          const elec = calcElec(b);
          const water = calcWater(b);
          const units = b.elecCurrReading - b.elecPrevReading;
          return (
            <Card key={b.id} style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.primary+"20", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: COLORS.primary }}>{b.tenant[0]}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{b.tenant}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted }}>Room {b.room} • {b.property} • {b.month}</div>
                  </div>
                  <Badge color={b.status==="paid"?"green":"yellow"}>{b.status}</Badge>
                </div>
                {b.status!=="paid" && <Btn small onClick={()=>markPaid(b.id)}>Mark Paid</Btn>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <div style={{ padding: "14px 18px", borderRight: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 5 }}>⚡ ELECTRICITY</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Prev: {b.elecPrevReading} • Curr: {b.elecCurrReading}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Used: <strong>{units} units</strong> @ ₹{b.elecRate}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: COLORS.warning, marginTop: 5 }}>₹{elec}</div>
                </div>
                <div style={{ padding: "14px 18px", borderRight: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 5 }}>💧 WATER</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>{b.waterUnits} units @ ₹{b.waterRate}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "#06b6d4", marginTop: 20 }}>₹{water}</div>
                </div>
                <div style={{ padding: "14px 18px", background: "#f8fafc" }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 5 }}>TOTAL DUE</div>
                  <div style={{ fontWeight: 900, fontSize: 24, color: COLORS.text, marginTop: 14 }}>₹{(elec+water).toLocaleString()}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {modal && (
        <Modal title="Generate Utility Bill" onClose={() => setModal(false)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Tenant" value={form.tenant} onChange={f("tenant")} options={data.tenants.map(t=>t.name)} />
            <Input label="Room Number" value={form.room} onChange={f("room")} />
            <Input label="Property" value={form.property} onChange={f("property")} options={data.properties.map(p=>p.name)} />
            <Input label="Billing Month" value={form.month} onChange={f("month")} type="month" />
          </div>
          <div style={{ fontWeight: 700, marginBottom: 10, marginTop: 4, color: COLORS.text }}>⚡ Electricity Reading</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Input label="Previous Reading" value={form.elecPrevReading} onChange={f("elecPrevReading")} type="number" />
            <Input label="Current Reading" value={form.elecCurrReading} onChange={f("elecCurrReading")} type="number" />
            <Input label="Rate per Unit (₹)" value={form.elecRate} onChange={f("elecRate")} type="number" />
          </div>
          {liveElec > 0 && <div style={{ background: "#fef3c7", borderRadius: 8, padding: "9px 14px", marginBottom: 10, fontSize: 13 }}>⚡ {+form.elecCurrReading - +form.elecPrevReading} units used → <strong>₹{liveElec}</strong></div>}
          <div style={{ fontWeight: 700, marginBottom: 10, color: COLORS.text }}>💧 Water Consumption</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Units Consumed" value={form.waterUnits} onChange={f("waterUnits")} type="number" />
            <Input label="Rate per Unit (₹)" value={form.waterRate} onChange={f("waterRate")} type="number" />
          </div>
          {liveWater > 0 && <div style={{ background: "#e0f2fe", borderRadius: 8, padding: "9px 14px", marginBottom: 10, fontSize: 13 }}>💧 Water bill: <strong>₹{liveWater}</strong></div>}
          <div style={{ background: "#d1fae5", borderRadius: 10, padding: "12px 16px", marginBottom: 18, fontSize: 15, fontWeight: 700 }}>
            Total Bill: ₹{(liveElec + liveWater).toLocaleString()}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={COLORS.muted} onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={addBill}>Generate Bill</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Checklists ────────────────────────────────────────────────────────────────
const DEFAULT_MOVEIN = ["Keys handed over","Room cleanliness verified","Furniture inventory signed","Electricity meter reading noted","Water meter reading noted","ID documents collected","Rent agreement signed","Security deposit paid","Emergency contact collected","House rules explained"];
const DEFAULT_MOVEOUT = ["Notice period served (30 days)","Pending rent dues cleared","Pending utility dues cleared","Room inspection done","Damage assessment completed","Deductions agreed upon","Keys returned","Security deposit refunded","Final electricity meter reading","Final water meter reading","NOC / clearance issued"];

function Checklist({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [form, setForm] = useState({ tenant: data.tenants[0]?.name||"", room: "", property: data.properties[0]?.name||"", type: "move-in", date: "" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  function create() {
    const items = (form.type==="move-in"?DEFAULT_MOVEIN:DEFAULT_MOVEOUT).map(label => ({ label, done: false }));
    const newC = { id: Date.now(), ...form, status: "in-progress", items };
    setData(d => ({ ...d, checklists: [...d.checklists, newC] }));
    setModal(false); setActiveId(newC.id);
  }

  function toggleItem(clId, idx) {
    setData(d => ({
      ...d,
      checklists: d.checklists.map(c => {
        if (c.id !== clId) return c;
        const items = c.items.map((it, i) => i===idx ? { ...it, done: !it.done } : it);
        return { ...c, items, status: items.every(i=>i.done) ? "completed" : "in-progress" };
      })
    }));
  }

  const active = data.checklists.find(c => c.id === activeId);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Move-in / Move-out Checklists</h2>
        <Btn onClick={() => setModal(true)}>+ New Checklist</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: active ? "1fr 340px" : "1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 12 }}>
          {data.checklists.map(c => {
            const done = c.items.filter(i=>i.done).length;
            const pct = Math.round((done/c.items.length)*100);
            return (
              <Card key={c.id} onClick={() => setActiveId(activeId===c.id?null:c.id)} style={{ cursor: "pointer", border: `2px solid ${activeId===c.id?COLORS.primary:"transparent"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{c.tenant}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>Room {c.room} • {c.property} • {c.date}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge color={c.type==="move-in"?"blue":"purple"}>{c.type==="move-in"?"Move In":"Move Out"}</Badge>
                    <Badge color={c.status==="completed"?"green":"yellow"}>{c.status}</Badge>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: COLORS.muted }}>{done}/{c.items.length} tasks</span>
                  <span style={{ fontWeight: 700, color: pct===100?COLORS.success:COLORS.primary }}>{pct}%</span>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 6, height: 7, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: pct===100?COLORS.success:`linear-gradient(90deg,${COLORS.primary},#8b5cf6)`, borderRadius: 6 }} />
                </div>
              </Card>
            );
          })}
        </div>
        {active && (
          <Card style={{ position: "sticky", top: 72, alignSelf: "start", maxHeight: "72vh", overflow: "auto" }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{active.tenant}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>Room {active.room} • {active.property}</div>
              <Badge color={active.type==="move-in"?"blue":"purple"}>{active.type==="move-in"?"🔑 Move In":"📦 Move Out"}</Badge>
            </div>
            {active.items.map((item, idx) => (
              <div key={idx} onClick={() => toggleItem(active.id, idx)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${item.done?COLORS.success:COLORS.border}`, background: item.done?COLORS.success:"transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  {item.done && <span style={{ color: "#fff", fontSize: 12, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontSize: 13, color: item.done?COLORS.muted:COLORS.text, textDecoration: item.done?"line-through":"none", lineHeight: 1.4 }}>{item.label}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: "10px 14px", background: "#f8fafc", borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{active.items.filter(i=>i.done).length}/{active.items.length}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>tasks completed</div>
            </div>
          </Card>
        )}
      </div>
      {modal && (
        <Modal title="Create Checklist" onClose={() => setModal(false)}>
          <Input label="Tenant" value={form.tenant} onChange={f("tenant")} options={data.tenants.map(t=>t.name)} />
          <Input label="Room Number" value={form.room} onChange={f("room")} />
          <Input label="Property" value={form.property} onChange={f("property")} options={data.properties.map(p=>p.name)} />
          <Input label="Type" value={form.type} onChange={f("type")} options={["move-in","move-out"]} />
          <Input label="Date" value={form.date} onChange={f("date")} type="date" />
          <div style={{ background: "#f0f4ff", borderRadius: 10, padding: 14, marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 7 }}>Auto-generated ({form.type==="move-in"?DEFAULT_MOVEIN.length:DEFAULT_MOVEOUT.length} items):</div>
            <div style={{ maxHeight: 140, overflow: "auto" }}>
              {(form.type==="move-in"?DEFAULT_MOVEIN:DEFAULT_MOVEOUT).map((item,i) => (
                <div key={i} style={{ fontSize: 12, color: COLORS.muted, padding: "2px 0" }}>• {item}</div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={COLORS.muted} onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={create}>Create Checklist</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Maintenance ───────────────────────────────────────────────────────────────
function Maintenance({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ property: data.properties[0]?.name||"", room: "", issue: "", priority: "medium" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  function add() { setData(d => ({ ...d, maintenance: [...d.maintenance, { id: Date.now(), ...form, reported: "2025-02-25", status: "open" }] })); setModal(false); }
  function updateStatus(id, status) { setData(d => ({ ...d, maintenance: d.maintenance.map(m => m.id===id?{...m,status}:m) })); }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Maintenance</h2>
        <Btn onClick={() => setModal(true)}>+ Log Request</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[["open","🔴",COLORS.danger],["in-progress","🟡",COLORS.warning],["resolved","🟢",COLORS.success]].map(([s,ic,c]) => (
          <Card key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: 16 }}>
            <span style={{ fontSize: 24 }}>{ic}</span>
            <div><div style={{ fontSize: 22, fontWeight: 800, color: c }}>{data.maintenance.filter(m=>m.status===s).length}</div><div style={{ fontSize: 12, color: COLORS.muted, textTransform: "capitalize" }}>{s.replace("-"," ")}</div></div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {data.maintenance.map(m => (
          <Card key={m.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
            <span style={{ fontSize: 24 }}>{m.priority==="high"?"🔴":m.priority==="medium"?"🟡":"🟢"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.issue}</div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>{m.property} • Room {m.room} • {m.reported}</div>
            </div>
            <Badge color={m.priority==="high"?"red":m.priority==="medium"?"yellow":"green"}>{m.priority}</Badge>
            <Badge color={m.status==="open"?"red":m.status==="in-progress"?"yellow":"green"}>{m.status}</Badge>
            <div style={{ display: "flex", gap: 6 }}>
              {m.status==="open"&&<Btn small onClick={()=>updateStatus(m.id,"in-progress")}>Start</Btn>}
              {m.status==="in-progress"&&<Btn small color={COLORS.success} onClick={()=>updateStatus(m.id,"resolved")}>Resolve</Btn>}
            </div>
          </Card>
        ))}
      </div>
      {modal && (
        <Modal title="Log Maintenance Request" onClose={() => setModal(false)}>
          <Input label="Property" value={form.property} onChange={f("property")} options={data.properties.map(p=>p.name)} />
          <Input label="Room" value={form.room} onChange={f("room")} />
          <Input label="Issue" value={form.issue} onChange={f("issue")} />
          <Input label="Priority" value={form.priority} onChange={f("priority")} options={["low","medium","high"]} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={COLORS.muted} onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={add}>Submit</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Announcements ─────────────────────────────────────────────────────────────
function Announcements({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", property: "All Properties" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  function add() { setData(d => ({ ...d, announcements: [{ id: Date.now(), ...form, date: "2025-02-25" }, ...d.announcements] })); setModal(false); }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>Announcements</h2>
        <Btn onClick={() => setModal(true)}>+ New Announcement</Btn>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {data.announcements.map(a => (
          <Card key={a.id} style={{ borderLeft: `4px solid ${COLORS.primary}` }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 5 }}>{a.title}</div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 9 }}>{a.message}</div>
            <div style={{ display: "flex", gap: 12, fontSize: 12, color: COLORS.muted }}>
              <span>📅 {a.date}</span><span>🏠 {a.property}</span>
            </div>
          </Card>
        ))}
      </div>
      {modal && (
        <Modal title="New Announcement" onClose={() => setModal(false)}>
          <Input label="Title" value={form.title} onChange={f("title")} />
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.muted, marginBottom: 5 }}>Message</label>
            <textarea value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} rows={4} style={{ width: "100%", padding: "9px 11px", borderRadius: 9, border: `1.5px solid ${COLORS.border}`, fontSize: 13, resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <Input label="Property" value={form.property} onChange={f("property")} options={["All Properties",...data.properties.map(p=>p.name)]} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn outline color={COLORS.muted} onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={add}>Publish</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Reports ───────────────────────────────────────────────────────────────────
function Reports({ data }) {
  const months = ["Sep","Oct","Nov","Dec","Jan","Feb"];
  const revenue = [82000,90000,95000,88000,102000,110000];
  const maxRev = Math.max(...revenue);
  const paidCount = data.payments.filter(p=>p.status==="paid").length;
  const pendingCount = data.payments.filter(p=>p.status!=="paid").length;
  const totalRevenue = data.payments.filter(p=>p.status==="paid").reduce((a,p)=>a+p.amount,0);
  const calcElec = b => (b.elecCurrReading-b.elecPrevReading)*b.elecRate;
  const calcWater = b => b.waterUnits*b.waterRate;
  const utilityRev = data.utilityBills.filter(b=>b.status==="paid").reduce((a,b)=>a+calcElec(b)+calcWater(b),0);
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: COLORS.text }}>Reports & Analytics</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard icon="💰" label="Rent Revenue" value={`₹${(totalRevenue/1000).toFixed(1)}K`} color={COLORS.success} />
        <StatCard icon="⚡" label="Utility Revenue" value={`₹${utilityRev.toLocaleString()}`} color={COLORS.warning} />
        <StatCard icon="👥" label="Total Tenants" value={data.tenants.length} color={COLORS.primary} />
        <StatCard icon="🚪" label="Vacant Rooms" value={data.rooms.filter(r=>r.status==="vacant").length} color={COLORS.danger} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Revenue Trend (6 Months)</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
            {revenue.map((v,i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div style={{ fontSize: 9, color: COLORS.muted, fontWeight: 600 }}>₹{(v/1000).toFixed(0)}K</div>
                <div style={{ width: "100%", height: `${(v/maxRev)*100}px`, background: i===5?COLORS.primary:COLORS.primary+"55", borderRadius: "5px 5px 0 0" }} />
                <div style={{ fontSize: 10, color: COLORS.muted, fontWeight: 600 }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Room Status</h3>
          {[["Occupied","red",data.rooms.filter(r=>r.status==="occupied").length],["Partial","yellow",data.rooms.filter(r=>r.status==="partial").length],["Vacant","green",data.rooms.filter(r=>r.status==="vacant").length]].map(([l,c,v]) => (
            <div key={l} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{l}</span>
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
              <div style={{ background: "#e2e8f0", borderRadius: 6, height: 8 }}>
                <div style={{ width: `${(v/data.rooms.length)*100}%`, height: "100%", background: c==="red"?COLORS.danger:c==="yellow"?COLORS.warning:COLORS.success, borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Property Performance</h3>
          {data.properties.map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div><div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div><div style={{ fontSize: 11, color: COLORS.muted }}>{data.tenants.filter(t=>t.property===p.name).length} tenants • {p.type}</div></div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, color: COLORS.success }}>₹{(p.occupied*p.rent/1000).toFixed(1)}K</div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{Math.round((p.occupied/p.rooms)*100)}% occupied</div>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Payment Collection</h3>
          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 16px" }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <svg viewBox="0 0 36 36" style={{ width: 120, height: 120, transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke={COLORS.success} strokeWidth="4" strokeDasharray={`${(paidCount/(paidCount+pendingCount))*87.96} 87.96`} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{Math.round((paidCount/(paidCount+pendingCount))*100)}%</div>
                <div style={{ fontSize: 10, color: COLORS.muted }}>Collected</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            {[["Paid",COLORS.success,paidCount],["Pending",COLORS.danger,pendingCount]].map(([l,c,v]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 3, background: c }} />
                  <span style={{ fontSize: 11, color: COLORS.muted }}>{l}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [data, setData] = useState(initialData);
  const [collapsed, setCollapsed] = useState(false);

  const pages = { dashboard: Dashboard, properties: Properties, rooms: Rooms, tenants: Tenants, payments: Payments, utilities: Utilities, checklist: Checklist, maintenance: Maintenance, announcements: Announcements, reports: Reports };
  const PageComp = pages[page];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: COLORS.bg, overflow: "hidden" }}>
      <aside style={{ width: collapsed ? 60 : 210, background: COLORS.sidebar, display: "flex", flexDirection: "column", transition: "width 0.2s", flexShrink: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 12px", display: "flex", alignItems: "center", gap: 9, borderBottom: "1px solid rgba(255,255,255,0.07)", minHeight: 64 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🏘️</div>
          {!collapsed && <div><div style={{ color: "#fff", fontWeight: 800, fontSize: 14, lineHeight: 1 }}>RentOk</div><div style={{ color: COLORS.sidebarText, fontSize: 10 }}>PG Manager Pro</div></div>}
        </div>
        <nav style={{ flex: 1, padding: "10px 6px", overflowY: "auto" }}>
          {NAV.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)} title={n.label} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 9, border: "none", background: active?COLORS.primary:"transparent", color: active?"#fff":COLORS.sidebarText, cursor: "pointer", marginBottom: 1, fontSize: 13, fontWeight: active?700:500, textAlign: "left" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{n.icon}</span>
                {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{n.label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "10px 6px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: collapsed?"center":"flex-start", gap: 8, padding: "9px 10px", borderRadius: 9, border: "none", background: "transparent", color: COLORS.sidebarText, cursor: "pointer", fontSize: 13 }}>
            <span>{collapsed?"▶":"◀"}</span>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
        <div style={{ background: "#fff", padding: "14px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>{NAV.find(n=>n.id===page)?.label}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 12, color: COLORS.muted }}>Feb 25, 2026</div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>M</div>
          </div>
        </div>
        <div style={{ padding: 22 }}>
          <PageComp data={data} setData={setData} />
        </div>
      </main>
    </div>
  );
}
