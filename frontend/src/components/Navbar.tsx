'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Utensils, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
    const { items } = useCart();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/menu" className="flex items-center gap-2 font-bold text-2xl text-primary">
                    <Utensils className="h-8 w-8" />
                    <span>FoodDash</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/track" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                        <History className="h-4 w-4" />
                        Track Order
                    </Link>
                    <Link href="/menu" className="text-sm font-medium hover:text-primary transition-colors">
                        Menu
                    </Link>

                    <Link href="/cart" className="relative">
                        <Button variant="ghost" size="icon">
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]" variant="destructive">
                                    {itemCount}
                                </Badge>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
