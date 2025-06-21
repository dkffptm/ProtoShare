import { useParams } from "react-router-dom";
import ProjectTasksPage from "../../components/ProjectTasksPage";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  if (!projectId) {
    return <div className="text-center text-gray-400 mt-10">로딩 중...</div>;
  }
  return <ProjectTasksPage initialProjectId={projectId} />;
}