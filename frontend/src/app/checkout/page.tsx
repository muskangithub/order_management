'use client';

import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCurrentOrder, setLoading, setError } from '@/lib/redux/orderSlice';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const checkoutSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    address: z.string().min(10, 'Complete address is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { items, totalAmount, clear } = useCart();
    const router = useRouter();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutForm>({
        resolver: zodResolver(checkoutSchema),
    });

    const onSubmit = async (formData: CheckoutForm) => {
        if (items.length === 0) return;

        dispatch(setLoading(true));
        try {
            const orderData = {
                userData: {
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                },
                items: items.map((item) => ({
                    menuItemId: item.id,
                    quantity: item.quantity,
                })),
            };

            const response = await api.post('/orders', orderData);
            const newOrder = response.data.data;

            dispatch(setCurrentOrder(newOrder));
            clear();

            toast.success("Order placed successfully!");


            router.push(`/orders/${newOrder.id}`);
        } catch (err: any) {
            console.error('Order failed:', err);
            dispatch(setError(err.message));
            toast.error("Order failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (items.length === 0) {
        router.push('/menu');
        return null;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-10 text-center">Checkout</h1>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" {...register('name')} placeholder="John Doe" />
                                    {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" {...register('phone')} placeholder="+1 234 567 8900" />
                                    {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Delivery Address</Label>
                                    <textarea
                                        id="address"
                                        {...register('address')}
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter your full street address, city, and zip code"
                                    />
                                    {errors.address && <p className="text-destructive text-xs">{errors.address.message}</p>}
                                </div>

                                <Button type="submit" className="w-full mt-6" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Processing..." : `Place Order ($${totalAmount.toFixed(2)})`}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Review</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <Separator />
                                <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
