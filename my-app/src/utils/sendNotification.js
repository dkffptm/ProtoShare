export const sendNotification = async ({ type, projectId, payload }) => {
  try {
    await fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ type, projectId, payload }),
    });
  } catch (err) {
    console.error("알림 생성 실패:", err);
  }
};
