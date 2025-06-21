import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectTasksPage from "./components/ProjectTasksPage";
import NotificationsPage from "./pages/NotificationsPage";
import Layout from "./components/Layout";

function App() {
  const navigate = useNavigate();
  const [hasNewInvite, setHasNewInvite] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch("/api/notifications?unread=true", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setHasNewInvite(true);
        }
      } catch (err) {
        console.error("알림 불러오기 실패", err);
      }
    };
    fetchUnread();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/projects"
        element={
          <Layout
            onLogout={handleLogout}
            hasNewInvite={hasNewInvite}
            onNoticeClick={() => setHasNewInvite(false)}
          >
            <CreateProjectPage />
          </Layout>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <Layout
            onLogout={handleLogout}
            hasNewInvite={hasNewInvite}
            onNoticeClick={() => setHasNewInvite(false)}
          >
            <ProjectTasksPage />
          </Layout>
        }
      />
      <Route
        path="/notifications"
        element={
          <Layout
            onLogout={handleLogout}
            hasNewInvite={hasNewInvite}
            onNoticeClick={() => setHasNewInvite(false)}
          >
            <NotificationsPage />
          </Layout>
        }
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
