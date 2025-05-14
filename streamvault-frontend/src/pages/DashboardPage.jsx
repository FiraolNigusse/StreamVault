// src/pages/DashboardPage.jsx
import React from "react";
import DashboardLayout from "../components/DashboardLayout";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Upload a File</h2>
        <input type="file" className="block mb-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Upload
        </button>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
