import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/actions/server/order";
import Container from "@/components/ui/Container";
import { format } from "date-fns";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";

export const metadata = {
  title: "Admin Orders | Cream & Co.",
  description: "View all customer orders.",
};

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }
  
  const orders = await getAllOrders();

  // Basic stats
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid" || o.orderStatus === "confirmed")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingCount = orders.filter((o) => o.orderStatus === "pending").length;

  return (
    <div className="min-h-screen bg-base-200 py-12 lg:py-20">
      <Container>
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-base-content">
                All Orders Dashboard
              </h1>
              <p className="text-base-content/60 mt-1">
                Manage and track all customer orders
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-base-100 rounded-xl p-4 border border-base-300 shadow-sm min-w-[150px]">
                <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest mb-1">
                  Total Orders
                </p>
                <p className="text-2xl font-black">{orders.length}</p>
              </div>
              <div className="bg-base-100 rounded-xl p-4 border border-base-300 shadow-sm min-w-[150px]">
                <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-black text-primary">
                  ৳{totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200/50 text-base-content/70">
                    <th className="font-bold text-xs uppercase tracking-widest py-4">
                      Date & ID
                    </th>
                    <th className="font-bold text-xs uppercase tracking-widest py-4">
                      Customer
                    </th>
                    <th className="font-bold text-xs uppercase tracking-widest py-4">
                      Items
                    </th>
                    <th className="font-bold text-xs uppercase tracking-widest py-4 text-right">
                      Total
                    </th>
                    <th className="font-bold text-xs uppercase tracking-widest py-4 text-center">
                      Payment
                    </th>
                    <th className="font-bold text-xs uppercase tracking-widest py-4 text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-12 text-base-content/50">
                        No orders have been placed yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-base-200/30 transition-colors">
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {format(new Date(order.createdAt), "MMM d, yyyy")}
                            </span>
                            <span className="text-xs text-base-content/50 font-mono mt-0.5">
                              #{order._id.slice(-6)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center shrink-0">
                              <HiOutlineUser className="text-base-content/40" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm truncate max-w-[150px]">
                                {order.userName}
                              </span>
                              <span className="text-xs text-base-content/50 truncate max-w-[150px]">
                                {order.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <HiOutlineShoppingBag className="text-base-content/40" />
                                <span className="text-sm font-bold">
                                  {order.cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
                                </span>
                              </div>
                              <div className="flex flex-col gap-1 ml-6">
                                {order.cartItems.map((item, i) => (
                                  <div key={i} className="text-[10px] leading-tight">
                                    <span className="font-medium">{item.name}</span>
                                    {item.details && (
                                      <div className="text-[9px] text-base-content/60 bg-base-200 px-1.5 py-0.5 rounded mt-0.5 border border-base-300">
                                        {item.details.flavor}, {item.details.size}, {item.details.cream}
                                        {item.details.message && <span className="block mt-0.5 italic">&quot;{item.details.message}&quot;</span>}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                        </td>
                        <td className="py-4 text-right">
                          <span className="font-bold text-sm">
                            ৳{order.totalAmount.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex justify-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                order.paymentStatus === "paid"
                                  ? "bg-success/10 text-success border border-success/20"
                                  : order.paymentStatus === "cancelled" || order.paymentStatus === "failed"
                                  ? "bg-error/10 text-error border border-error/20"
                                  : "bg-warning/10 text-warning border border-warning/20"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex justify-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                order.orderStatus === "confirmed"
                                  ? "bg-info/10 text-info border border-info/20"
                                  : order.orderStatus === "delivered"
                                  ? "bg-success/10 text-success border border-success/20"
                                  : "bg-base-300 text-base-content/70"
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
