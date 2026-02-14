'use client';

import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const { items, totalAmount, removeItem, updateQty } = useCart();

    if (items.length === 0) {
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <div className="flex justify-center mb-6">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground opacity-20" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Add some delicious food to get started!</p>
                <Button asChild size="lg">
                    <Link href="/menu">Browse Menu</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-10">Your Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                </div>

                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-primary font-semibold">${item.price}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateQty(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="text-right min-w-[80px]">
                                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button asChild className="w-full mt-8" size="lg">
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>
                            <Button asChild variant="ghost" className="w-full mt-4">
                                <Link href="/menu">Continue Shopping</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
