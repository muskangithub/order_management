'use client';

import { useEffect, useState } from 'react';
import { MenuCard } from '@/features/menu/components/MenuCard';
import api from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const { data } = await api.get('/menu');
                setMenuItems(data.data);
            } catch (error) {
                console.error('Failed to fetch menu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Delicious Menu</h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-48 w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {menuItems.map((item: any) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
