import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("/api/notifications", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  }, []);

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("알림 읽기 실패:", err);
    }
  };

  const deleteNotification = async (id) => {
    if (!window.confirm("정말 이 알림을 삭제하시겠습니까?")) return;
    try {
      await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("알림 삭제 실패:", err);
    }
  };

  const renderMessage = (n) => {
  let payload;
  try {
    payload = typeof n.payload === "string" ? JSON.parse(n.payload) : n.payload;
  } catch (err) {
    console.error("payload 파싱 실패", err);
    return "알림 내용을 불러올 수 없습니다.";
  }

  switch (n.type) {
    case "PROJECT_INVITED":
      return `${payload.inviter || "관리자"}님이 "${payload.projectTitle}" 프로젝트에 초대했습니다.`;
    case "COMMENT_ADDED":
      return `업무 ID ${payload.taskId}에 댓글이 추가되었습니다: "${payload.content}"`;
    case "COMMENT_UPDATED":
      return `업무 ID ${payload.taskId}의 댓글이 수정되었습니다: "${payload.content}"`;
    case "COMMENT_DELETED":
      return `업무 ID ${payload.taskId}의 댓글이 삭제되었습니다.`;
    case "TASK_ASSIGNED":
      return `${payload.title || "업무"} 업무가 할당되었습니다.`;
    case "TASK_UPDATED":
      return `${payload.title || "업무"} 업무가 수정되었습니다.`;
    case "TASK_DELETE":
      return `${payload.title || "업무"} 업무가 삭제되었습니다.`;
    default:
      return "알 수 없는 알림입니다.";
  }
};


  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">알림함</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-400">새 알림이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="bg-[#2a2a2a] p-4 rounded-md relative hover:bg-[#3a3a3a]"
            >
              <button
                onClick={() => deleteNotification(n.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 text-sm"
                title="삭제"
              >
                ✕
              </button>
              <div onClick={() => markAsRead(n.id)} className="cursor-pointer">
                <div className="text-sm text-gray-300 break-all">
                  {renderMessage(n)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleString("ko-KR")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
