'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/redux/cartSlice';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface MenuCardProps {
    item: {
        id: string;
        name: string;
        description: string;
        price: string;
        imageUrl: string;
        category: string;
    };
}

export function MenuCard({ item }: MenuCardProps) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price),
            imageUrl: item.imageUrl,
        }));
        toast.success(`Added ${item.name} to cart`);
    };

    return (
        <Card className="overflow-hidden flex flex-col h-full group hover:shadow-2xl transition-all duration-500 border-slate-100 rounded-2xl bg-white">
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-white/95 text-indigo-700 hover:bg-white border-none backdrop-blur-md shadow-md font-bold px-3 py-1 text-xs uppercase tracking-wider">
                        {item.category}
                    </Badge>
                </div>
            </div>
            <CardHeader className="pb-3 px-6 pt-6">
                <div className="flex justify-between items-start gap-3">
                    <CardTitle className="text-xl font-extrabold line-clamp-1 group-hover:text-indigo-600 transition-colors tracking-tight">
                        {item.name}
                    </CardTitle>
                    <span className="font-black text-lg text-indigo-600 whitespace-nowrap tabular-nums">
                        ${item.price}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow pb-6 px-6">
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">
                    {item.description}
                </p>
            </CardContent>
            <CardFooter className="pb-6 px-6 pt-0">
                <Button
                    onClick={handleAddToCart}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-300 font-bold rounded-xl h-11"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
