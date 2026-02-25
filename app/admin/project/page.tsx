import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminProjectPage } from "@/components/admin/admin-project-page";
import { prisma } from "@/lib/prisma";

export default async function ProjectPage() {
  const session = await auth();

  if (!session?.user) redirect("/auth/login");

  // Double check role from DB to be safe
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user || user.role !== "admin") redirect("/dashboard");

  return <AdminProjectPage />;
}
