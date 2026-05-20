import React from "react";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p className="page">Loading...</p>;

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="grid">
        <div className="card"><h2>{stats.total}</h2><p>Total Tasks</p></div>
        <div className="card"><h2>{stats.pending}</h2><p>Pending</p></div>
        <div className="card"><h2>{stats.inProgress}</h2><p>In Progress</p></div>
        <div className="card"><h2>{stats.completed}</h2><p>Completed</p></div>
        <div className="card"><h2>{stats.overdue}</h2><p>Overdue</p></div>
      </div>
    </div>
  );
}
