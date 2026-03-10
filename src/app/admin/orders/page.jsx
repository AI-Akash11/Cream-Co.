import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/actions/server/order";
import Container from "@/components/ui/Container";
import { format } from "date-fns";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import AdminOrdersClient from "./AdminOrdersClient";

export const metadata = {
  title: "All Orders | Cream & Co.",
  description: "View and manage all customer orders.",
};

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  const initialData = await getAllOrders(1, 10);

  return (
    <div className="min-h-screen">
      <AdminOrdersClient initialData={initialData} />
    </div>
  );
}
