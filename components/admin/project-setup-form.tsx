"use client";

import { useState } from "react";
import { Button, TextInput, DatePicker } from "@mantine/core";

interface ProjectSetupFormProps {
  onSubmit: (projectName: string, startDate: Date, endDate: Date) => void;
}

export function ProjectSetupForm({ onSubmit }: ProjectSetupFormProps) {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!projectName) {
      setError("Project name is required");
      return;
    }
    if (!startDate || !endDate) {
      setError("Both start and end dates are required");
      return;
    }
    if (endDate <= startDate) {
      setError("End date must be after start date");
      return;
    }
    setError("");
    onSubmit(projectName, startDate, endDate);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold">Setup New Project</h2>
      <TextInput
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.currentTarget.value)}
        className="mb-4"
      />
      <DatePicker
        placeholder="Start Date"
        value={startDate}
        onChange={setStartDate}
        className="mb-4"
      />
      <DatePicker
        placeholder="End Date"
        value={endDate}
        onChange={setEndDate}
        className="mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={handleSubmit}>Submit New Project</Button>
    </div>
  );
}
