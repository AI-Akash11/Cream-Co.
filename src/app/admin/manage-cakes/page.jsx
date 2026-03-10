import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { redirect } from "next/navigation";
import { getCake } from "@/actions/server/cake";
import ManageCakesClient from "./ManageCakesClient";

export const metadata = {
  title: "Manage Cakes | Cream & Co.",
  description: "View, update, and delete artisan cake listings.",
};

export default async function ManageCakesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const initialData = await getCake({ page: 1, limit: 10 });

  return (
    <div className="min-h-screen">
      <ManageCakesClient initialData={initialData} />
    </div>
  );
}
