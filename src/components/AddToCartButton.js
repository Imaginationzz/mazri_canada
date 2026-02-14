"use client";

import { useCart } from '@/context/CartContext';
import styles from './AddToCartButton.module.css';

export default function AddToCartButton({ book }) {
    const { addToCart } = useCart();

    return (
        <button
            className="btn"
            onClick={() => {
                addToCart(book);
                alert('Added to cart!');
            }}
        >
            Add to Cart
            <span className={styles.arabicLabel}>/ أضف إلى السلة</span>
        </button>
    );
}
