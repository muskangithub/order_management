'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import Link from 'next/link';
import { Search, Package, ArrowRight, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

const statusConfig = {
    RECEIVED: { color: 'bg-gray-500', label: 'Order Received' },
    PREPARING: { color: 'bg-yellow-500', label: 'Preparing' },
    OUT_FOR_DELIVERY: { color: 'bg-blue-500', label: 'Out for Delivery' },
    DELIVERED: { color: 'bg-green-500', label: 'Delivered' },
};

export default function TrackOrderPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search_phone = searchParams.get('phone');

    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // 🔥 Fetch Orders Function
    const fetchOrders = async (phoneNumber: string) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/orders/track/${phoneNumber}`);
            setOrders(data.data);

            if (data.data.length === 0) {
                toast.info("No orders found for this number");
            }
        } catch (error) {
            console.error('Search failed:', error);
            toast.error("Failed to find orders");
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Auto-fill + Auto-fetch when URL has phone param
    useEffect(() => {
        if (search_phone) {
            setPhone(search_phone);
            fetchOrders(search_phone);
        }
    }, [search_phone]);

    // 🔥 Handle Form Submit
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (phone.length < 10) {
            toast.error("Please enter a valid phone number");
            return;
        }

        router.push(`/track?phone=${phone}`);
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Track My Order</h1>
                <p className="text-muted-foreground">
                    Enter your phone number to see your order history and live status
                </p>
            </div>

            {/* 🔍 Search Card */}
            <Card className="mb-10">
                <CardContent className="pt-6">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="phone" className="sr-only">
                                Phone Number
                            </Label>

                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number (e.g., 1234567890)"
                                    value={phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setPhone(value);

                                        // 🔥 Remove query param if user edits phone
                                        if (search_phone && value !== search_phone) {
                                            router.replace('/track');
                                        }
                                    }}
                                    className="pl-10"
                                />

                            </div>
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                "Searching..."
                            ) : (
                                <>
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* 📦 Orders Section */}
            {search_phone && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Package className="h-6 w-6 text-primary" />
                        {orders.length > 0
                            ? `Orders Found (${orders.length})`
                            : !loading && "No Orders Found"}
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                        {orders.map((order) => {
                            const config =
                                statusConfig[
                                order.status as keyof typeof statusConfig
                                ] || statusConfig.RECEIVED;

                            return (
                                <Link
                                    key={order.id}
                                    href={`/orders/${order.id}?phone=${phone}`}
                                >
                                    <Card className="hover:border-primary transition-all group overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-lg">
                                                            Order #{order.id.slice(0, 8)}
                                                        </span>
                                                        <Badge className={config.color}>
                                                            {config.label}
                                                        </Badge>
                                                    </div>

                                                    <p className="text-sm text-muted-foreground">
                                                        Placed on{" "}
                                                        {new Date(order.createdAt).toLocaleDateString()} at{" "}
                                                        {new Date(order.createdAt).toLocaleTimeString()}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                                    <div className="text-right">
                                                        <p className="text-sm text-muted-foreground">
                                                            Total Amount
                                                        </p>
                                                        <p className="font-bold text-lg text-primary">
                                                            $
                                                            {parseFloat(order.totalAmount).toFixed(2)}
                                                        </p>
                                                    </div>

                                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
