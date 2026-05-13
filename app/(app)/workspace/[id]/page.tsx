import { notFound } from "next/navigation";
import { WorkspaceClient } from "@/components/workspace/workspace-client";
import { projects, type Project } from "@/lib/mock-data";

const fallback: Project = {
  id: "new",
  title: "Untitled project",
  editedAt: "Just now",
  thumbnail: "/projects/zoromi-landing.png",
  imageBg: "#F9F9F9",
  imageFit: "top",
};

export default async function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = id === "new" ? fallback : projects.find((p) => p.id === id);
  if (!project) notFound();

  return <WorkspaceClient project={project} />;
}
