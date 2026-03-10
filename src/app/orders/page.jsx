import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { getUserOrders } from "@/actions/server/order";
import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { format } from "date-fns";
import { HiOutlineShoppingBag, HiArrowRight } from "react-icons/hi";

import UserOrdersClient from "./UserOrdersClient";

export const metadata = {
  title: "My Orders | Cream & Co.",
  description: "View your past orders and their status.",
};

export default async function UserOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const initialData = await getUserOrders(session.user.email, 1, 5);

  return (
    <UserOrdersClient 
      initialData={initialData} 
      userEmail={session.user.email} 
    />
  );
}
