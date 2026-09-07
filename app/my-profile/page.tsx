"use client"
import { useEffect, useState } from "react"
import { useAuth } from '@/app/context/AuthContext'
import axios from "axios"

type Order = {
    id: number;
    total_amount: number;
    status: string;
}

const statusStyles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border border-amber-200",
    processing: "bg-blue-100 text-blue-700 border border-blue-200",
    shipped: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    cancelled: "bg-red-100 text-red-700 border border-red-200",
    default: "bg-slate-100 text-slate-700 border border-slate-200",
}

export default function MyProfile () {

    const { user } = useAuth()

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${user?.userId}`);
                const ordersData = response.data.orders;
                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        if (user?.userId) {
            fetchOrders();
        }
    }, [user?.userId]);

    const getStatusClass = (status: string) => {
        const normalized = status.toLowerCase();
        return statusStyles[normalized] ?? statusStyles.default;
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 shadow-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">Account</p>
                    <h1 className="mt-3 text-3xl font-bold text-white">Welcome, {user?.email ?? "Collector"}</h1>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/80">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-5">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Orders</p>
                            <h2 className="mt-1 text-2xl font-bold text-slate-800">Order History</h2>
                        </div>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                            {orders.length} {orders.length === 1 ? "order" : "orders"}
                        </span>
                    </div>

                    <div className="p-6">
                        {orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map((order: Order) => (
                                    <div
                                        key={order.id}
                                        className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Order ID</p>
                                            <p className="mt-1 text-lg font-bold text-slate-800">#{order.id}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Total</p>
                                            <p className="mt-1 text-lg font-bold text-slate-800">
                                                ${Number(order.total_amount).toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="sm:text-right">
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Status</p>
                                            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                                <p className="text-lg font-semibold text-slate-700">No orders found.</p>
                                <p className="mt-2 text-sm text-slate-500">Your completed purchases will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}