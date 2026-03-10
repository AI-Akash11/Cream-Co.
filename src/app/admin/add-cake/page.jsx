import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { redirect } from "next/navigation";
import AddCakeClient from "./AddCakeClient";

export const metadata = {
  title: "Add New Cake | Cream & Co.",
  description: "Create a new artisan cake listing for your shop.",
};

export default async function AddCakePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen">
      <AddCakeClient />
    </div>
  );
}
