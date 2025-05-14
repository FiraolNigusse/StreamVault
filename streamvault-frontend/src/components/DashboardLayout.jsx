// src/components/DashboardLayout.jsx
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">StreamVault</h2>
        <nav>
          <ul>
            <li className="mb-2"><a href="/dashboard">Dashboard</a></li>
            {/* Add more sidebar links later */}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
