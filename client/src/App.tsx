import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Settings from "./components/Settings";
import Navbar from "./components/Navbar";
import People from "./components/People";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/people" element={<People />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/people" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
