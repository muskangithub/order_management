'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { updateOrderStatus, setCurrentOrder } from '@/lib/redux/orderSlice';
import {
    CheckCircle2,
    Clock,
    Truck,
    ChefHat,
    ArrowLeft,
} from 'lucide-react';

const statusConfig = {
    RECEIVED: { color: 'bg-gray-500', icon: Clock, label: 'Order Received' },
    PREPARING: { color: 'bg-yellow-500', icon: ChefHat, label: 'Preparing Food' },
    OUT_FOR_DELIVERY: { color: 'bg-blue-500', icon: Truck, label: 'Out for Delivery' },
    DELIVERED: { color: 'bg-green-500', icon: CheckCircle2, label: 'Delivered 🎉' },
};

export default function OrderTrackingPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const currentOrder = useSelector(
        (state: RootState) => state.orders.currentOrder
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`);
                dispatch(setCurrentOrder(data.data));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();

        const socket = io('https://order-management-ten-taupe.vercel.app/');
        socket.emit('join-order', id);

        socket.on('status-update', (data) => {
            if (data.orderId === id) {
                dispatch(updateOrderStatus(data));
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [id, dispatch]);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-lg animate-pulse">
                Fetching order details...
            </div>
        );

    if (!currentOrder)
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                Order not found.
            </div>
        );

    const currentStatus = currentOrder.status;
    const config =
        statusConfig[currentStatus as keyof typeof statusConfig];
    const Icon = config.icon;

    const steps = ['RECEIVED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentIndex = steps.indexOf(currentStatus);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-10 px-4">

            {/* Back */}
            <div className="max-w-2xl mx-auto mb-4">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2" size={16} />
                    Back
                </Button>
            </div>

            <div className="max-w-2xl mx-auto">

                <Card className="rounded-xl shadow-lg border border-green-100 overflow-hidden">

                    {/* Green Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-8 px-6 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                                <Icon size={42} />
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold">{config.label}</h2>
                        <p className="opacity-90 text-sm mt-1">
                            Order #{currentOrder.id.slice(0, 8)}
                        </p>
                    </div>

                    <div className="p-6">

                        {/* Progress Timeline */}
                        <div className="relative mb-10">
                            <div className="absolute top-4 left-0 w-full h-1 bg-green-100 rounded-full" />

                            <div
                                className="absolute top-4 left-0 h-1 bg-green-500 rounded-full transition-all duration-700"
                                style={{
                                    width: `${(currentIndex / (steps.length - 1)) * 100}%`,
                                }}
                            />

                            <div className="flex justify-between">
                                {steps.map((step, index) => {
                                    const StepIcon =
                                        statusConfig[step as keyof typeof statusConfig].icon;

                                    const active = index <= currentIndex;

                                    return (
                                        <div key={step} className="flex flex-col items-center w-20">
                                            <div
                                                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm transition-all duration-300
                      ${active
                                                        ? 'bg-green-500 text-white shadow-md'
                                                        : 'bg-green-100 text-green-500'
                                                    }`}
                                            >
                                                <StepIcon size={16} />
                                            </div>

                                            <p className="text-[10px] mt-2 text-center text-muted-foreground leading-tight">
                                                {statusConfig[step as keyof typeof statusConfig].label}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-green-700">
                                Order Summary
                            </h3>

                            <div className="space-y-3">
                                {currentOrder?.orderItems?.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center bg-green-50 p-3 rounded-md"
                                    >
                                        <div>
                                            <p className="font-medium text-sm">
                                                {item.menuItem.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-sm">
                                            $
                                            {(
                                                parseFloat(item.price) *
                                                parseFloat(item.quantity)
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mt-6 text-base font-bold border-t pt-4 text-green-700">
                                <span>Total Paid</span>
                                <span>
                                    ${parseFloat(currentOrder.totalAmount).toFixed(2)}
                                </span>
                            </div>
                        </div>

                    </div>
                </Card>
            </div>
        </div>
    );

}
