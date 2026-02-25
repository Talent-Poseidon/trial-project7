"use client";

import { useState, useEffect } from "react";
import { Button, TextInput, DatePicker, Pagination } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ProjectSetupForm } from "./project-setup-form";

interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export function AdminProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching projects from an API
    const fetchProjects = async () => {
      const allProjects = [
        { id: "1", name: "Project Alpha", startDate: "2023-01-01", endDate: "2023-12-31" },
        { id: "2", name: "Project Beta", startDate: "2023-02-01", endDate: "2023-11-30" },
        // Add more projects as needed
      ];
      setProjects(allProjects);
    };
    fetchProjects();
  }, []);

  const handleNewProject = async (projectName: string, startDate: Date, endDate: Date) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
      alert('Project Created Successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the project');
    }
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Search logic
  const filteredProjects = currentProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Existing Projects</h2>
        <TextInput
          placeholder="Search Projects"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          className="mb-4"
        />
        <ul>
          {filteredProjects.map((project) => (
            <li key={project.id} className="mb-2">
              {project.name} ({new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()})
            </li>
          ))}
        </ul>
        <Pagination
          total={Math.ceil(projects.length / projectsPerPage)}
          page={currentPage}
          onChange={setCurrentPage}
          className="mt-4"
        />
      </div>
      <ProjectSetupForm onSubmit={handleNewProject} />
    </div>
  );
}
