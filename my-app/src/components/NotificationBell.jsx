import React, { useEffect, useState } from 'react';

export default function NotificationBell({ apiBase }) {
  const [notifs, setNotifs] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifs = () => {
      fetch(`${apiBase}?unread=true`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => {
          setNotifs(Array.isArray(data) ? data : []);
        })
        .catch(console.error);
    };

    fetchNotifs();
    const interval = setInterval(fetchNotifs, 10000); // 10초마다 자동 갱신
    return () => clearInterval(interval);
  }, [apiBase]);

  const markRead = async (id) => {
    try {
      await fetch(`${apiBase}/${id}/read`, {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setNotifs(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("알림 읽기 실패:", err);
    }
  };

  const renderMessage = (n) => {
    let payload;
    try {
      payload = typeof n.payload === 'string' ? JSON.parse(n.payload) : n.payload;
    } catch (err) {
      console.error("payload 파싱 실패:", err);
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
      case "TASK_DELETED":
        return `${payload.title || "업무"} 업무가 삭제되었습니다.`;
      default:
        return "알 수 없는 알림입니다.";
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="relative p-2 hover:bg-gray-700 rounded"
      >
        🔔
        {notifs.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
            {notifs.length}
          </span>
        )}
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-80 bg-white text-black rounded shadow-lg z-50 overflow-hidden">
          {notifs.length === 0 ? (
            <li className="p-2 text-center text-gray-500">새 알림이 없습니다.</li>
          ) : (
            notifs.map(n => (
              <li
                key={n.id}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => markRead(n.id)}
              >
                <div className="text-sm">{renderMessage(n)}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleString("ko-KR")}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
