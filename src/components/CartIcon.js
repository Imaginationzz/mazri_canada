"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css'; // Re-use header styles or create specific ones

export default function CartIcon() {
    const { cartCount } = useCart();

    return (
        <div className={styles.cartIconWrapper}>
            <Link href="/cart" className={styles.cartLink}>
                <span className={styles.cartLabel}>Cart</span>
                {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
            </Link>
        </div>
    );
}
