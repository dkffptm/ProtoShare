import { useEffect, useState, useRef } from "react";

const CreateProjectPage = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
  const dropdownRef = useRef();

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/project/list", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setProjects(data || []);
    } catch (err) {
      console.error("프로젝트 목록 로딩 실패:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setMyUserId(decoded.userId);
      } catch (e) {
        console.error("JWT 디코딩 실패:", e);
      }
    }
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title: projectName, description }),
      });

      if (res.ok) {
        alert("프로젝트 생성 완료");
        setShowModal(false);
        setProjectName("");
        setDescription("");
        fetchProjects();
      } else {
        const data = await res.json();
        alert(data.error || "생성 실패");
      }
    } catch (err) {
      console.error("생성 실패:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("정말 이 프로젝트를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/project/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("삭제 완료");
        fetchProjects();
      } else {
        const data = await res.json();
        alert(data.error || "삭제 실패");
      }
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  const handleInvite = async () => {
    try {
      const res = await fetch("/api/project/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          projectId: selectedProjectId,
          email: inviteEmail,
        }),
      });

      if (res.ok) {
        alert("초대 완료");
        setInviteModalOpen(false);
        setInviteEmail("");
        fetchProjects();
      } else {
        const data = await res.json();
        alert(data.error || "초대 실패");
      }
    } catch (err) {
      console.error("초대 실패:", err);
    }
  };

  return (
    <div className="w-screen h-screen text-white flex flex-col bg-[#1e1e1e]">
      <div className="bg-[#202124] px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-roboto">
            <span className="text-blue-400 text-4xl">P</span>
            <span className="text-gray-400 text-lg">.</span>
            <span className="text-blue-400 text-4xl">S</span>
          </div>
          <div className="flex gap-4 items-center">
            <img
              src="/notice-icon.png"
              alt="공지"
              className="w-12 h-12 cursor-pointer"
            />
            <img
              src="/profile-icon.png"
              className="w-12 h-12 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-blue-400 font-semibold cursor-pointer">
            프로젝트 목록
          </div>
          <div className="text-gray-400 cursor-pointer">모든 작업</div>
        </div>
      </div>

      <div className="border-b border-gray-600" />

      <div className="bg-[#1e1e1e] px-10 py-10 flex items-start justify-center gap-[32rem]">
        <div className="flex flex-col items-start">
          <input
            type="text"
            placeholder="프로젝트 찾기"
            className="px-4 py-2 text-sm bg-white text-black border border-gray-600 rounded-full w-[40rem]"
          />
          <span className="text-xl font-bold text-white mt-10">프로젝트</span>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold px-8 py-2 rounded-lg flex justify-between items-center w-52"
          >
            <span className="mr-auto">신규 프로젝트</span>
            <span className="text-xs ml-auto">▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setShowModal(true);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#3a3a3a] text-white"
              >
                + 프로젝트 만들기
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[32rem] rounded-xl p-6 shadow-lg relative text-black">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-center text-lg font-bold mb-6">
              새 프로젝트 만들기
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  프로젝트 이름
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="○○업무, ○○ 프로젝트, 주간 정례"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  프로젝트 설명
                </label>
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="목적: 일상 업무 진행과 누락 방지"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
              >
                프로젝트 만들기
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {projects.map((p) => (
          <div
            key={p.id}
            className="relative bg-white text-black w-[24rem] rounded-xl shadow-md p-4"
          >
            {p.userId === myUserId && (
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === p.id ? null : p.id);
                  }}
                  className="text-gray-500 hover:text-black text-xl font-bold"
                >
                  &#58;
                </button>
                {menuOpen === p.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#2a2a2a] text-white rounded shadow z-10">
                    <button
                      onClick={() => {
                        setInviteModalOpen(true);
                        setMenuOpen(null);
                        setSelectedProjectId(p.id);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#3a3a3a]"
                    >
                      팀원 초대
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="w-full text-left px-4 py-2 hover:bg-[#3a3a3a] text-red-400"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-md flex items-center justify-center text-white font-bold">
                ■
              </div>
              <div className="text-md font-semibold tracking-widest">
                {p.title}
              </div>
            </div>
            <div className="text-gray-500 text-xs tracking-widest mb-4">
              {p.description}
            </div>
            <div className="border-t border-gray-300 my-2" />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>
                오늘이 마감인 작업{" "}
                <span className="text-blue-500 font-semibold">0</span>건
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProjectId(
                    selectedProjectId === p.id ? null : p.id
                  );
                }}
                className="text-blue-400 underline text-sm"
              >
                팀원 보기 ({p.invitedCount ?? p.members.length}명)
              </button>
            </div>
            {selectedProjectId === p.id && (
              <div className="mt-2 text-xs text-gray-800 bg-gray-100 rounded-md p-3 border">
                {p.members.length > 0 ? (
                  p.members.map((m, idx) => (
                    <div
                      key={idx}
                      className={
                        m.role === "ADMIN" ? "text-blue-500" : "text-gray-600"
                      }
                    >
                      {m.user?.email} {m.role === "ADMIN" && "(관리자)"}
                    </div>
                  ))
                ) : (
                  <div>초대된 사용자가 없습니다</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {inviteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow w-[24rem] relative">
            <button
              onClick={() => setInviteModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">팀원 초대</h3>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="이메일 주소 입력"
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <button
              onClick={handleInvite}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              초대하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProjectPage;
