import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/redux/store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/lib/redux/cartSlice';

export function useCart() {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart);

    return {
        ...cart,
        addItem: (item: any) => dispatch(addToCart(item)),
        removeItem: (id: string) => dispatch(removeFromCart(id)),
        updateQty: (id: string, quantity: number) => dispatch(updateQuantity({ id, quantity })),
        clear: () => dispatch(clearCart()),
    };
}
