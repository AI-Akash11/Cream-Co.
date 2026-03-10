import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { redirect, notFound } from "next/navigation";
import { getSingleCake } from "@/actions/server/cake";
import UpdateCakeClient from "./UpdateCakeClient";

export const metadata = {
  title: "Update Cake | Cream & Co.",
  description: "Modify existing artisan cake listings.",
};

export default async function UpdateCakePage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const { id } = await params;
  const cake = await getSingleCake(id);

  if (!cake) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <UpdateCakeClient cake={cake} />
    </div>
  );
}
