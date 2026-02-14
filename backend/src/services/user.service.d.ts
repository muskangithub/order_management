export declare const userService: {
    findOrCreate: (data: {
        name: string;
        phone: string;
        address: string;
    }) => Promise<{
        id: string;
        name: string;
        phone: string;
        address: string;
        createdAt: Date;
    } | undefined>;
};
//# sourceMappingURL=user.service.d.ts.map