export declare const orderService: {
    create: (userId: string, items: {
        menuItemId: string;
        quantity: number;
    }[]) => Promise<{
        items: any[];
        id?: string;
        userId?: string;
        status?: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
        createdAt?: Date;
        totalAmount?: string;
    }>;
    simulateStatusTransitions: (orderId: string) => Promise<void>;
    getById: (id: string) => Promise<{
        id: string;
        userId: string;
        status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
        createdAt: Date;
        totalAmount: string;
        orderItems: {
            id: string;
            price: string;
            orderId: string;
            menuItemId: string;
            quantity: string;
            menuItem: {
                id: string;
                name: string;
                description: string;
                price: string;
                imageUrl: string;
                category: string;
                createdAt: Date;
            };
        }[];
    } | undefined>;
    getByPhone: (phone: string) => Promise<{
        id: string;
        totalAmount: string;
        status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
        createdAt: Date;
    }[]>;
    updateStatus: (id: string, status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED") => Promise<{
        id: string;
        userId: string;
        status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
        totalAmount: string;
        createdAt: Date;
    } | undefined>;
};
//# sourceMappingURL=order.service.d.ts.map