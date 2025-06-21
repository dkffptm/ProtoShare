import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

export default function Header({ onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-[#1e1e1e] px-8 py-6">
      {/* 상단 로고 + 알림/프로필 */}
      <div className="flex justify-between items-center mb-4">
        <div
          className="text-2xl font-roboto cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          <span className="text-blue-400 text-4xl">P</span>
          <span className="text-gray-400 text-lg">.</span>
          <span className="text-blue-400 text-4xl">S</span>
        </div>

        <div className="flex gap-4 items-center">
          {/* 알림 */}
          <NotificationBell apiBase="/api/notifications" />

          {/* 프로필 */}
          <div className="relative">
            <img
              src="/profile-icon.png"
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-lg z-10">
                <button
                  onClick={onLogout}
                  className="block w-full text-center px-2 py-4 hover:bg-[#3a3a3a] text-white"
                  style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 메뉴 */}
      <div className="flex items-center gap-6">
        <div
          className="text-blue-400 font-semibold cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          프로젝트 목록
        </div>
        <div
          className="text-gray-400 cursor-pointer hover:text-white"
          onClick={() => navigate("/tasks")}
        >
          모든 작업
        </div>
      </div>
    </header>
  );
}
