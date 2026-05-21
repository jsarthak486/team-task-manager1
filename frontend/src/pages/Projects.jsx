import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Projects() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const load = async () => {
    const res = await api.get("/api/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();

    await api.post("/api/projects", form);

    setForm({
      title: "",
      description: "",
    });

    load();
  };

  return (
    <div className="page">
      <h1>Projects</h1>

      {user?.role === "Admin" && (
        <form className="form" onSubmit={createProject}>
          <input
            placeholder="Project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <button type="submit">Create Project</button>
        </form>
      )}

      <div className="list">
        {projects.map((p) => (
          <div className="item" key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <small>Members: {p.members?.length || 0}</small>
          </div>
        ))}
      </div>
    </div>
  );
}