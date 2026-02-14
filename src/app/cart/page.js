"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';
import CheckoutForm from '@/components/CheckoutForm'; // We will create this next

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container">
                <div className={styles.emptyCart}>
                    <h1>Your Cart is Empty</h1>
                    <p>Looks like you haven't added any books yet.</p>
                    <Link href="/books" className="btn">
                        Browse Books
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="section-title" style={{ marginTop: '2rem' }}>Shopping Cart</h1>

            <div className={styles.cartLayout}>
                <div className={styles.cartItems}>
                    {cart.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemImage}>
                                {item.coverImage ? (
                                    <Image
                                        src={item.coverImage}
                                        alt={item.title}
                                        width={80}
                                        height={120}
                                        className={styles.image}
                                    />
                                ) : (
                                    <div className={styles.placeholderImage}>No Image</div>
                                )}
                            </div>

                            <div className={styles.itemDetails}>
                                <h3>{item.title}</h3>
                                <p className={styles.itemAuthor}>{item.author}</p>
                                <p className={styles.itemPrice}>${item.price}</p>
                            </div>

                            <div className={styles.itemActions}>
                                <div className={styles.quantityControls}>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className={styles.removeBtn}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <button onClick={clearCart} className={styles.clearBtn}>
                        Clear Cart
                    </button>
                </div>

                <div className={styles.checkoutSection}>
                    <div className={styles.summary}>
                        <h2>Order Summary</h2>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.paymentContainer}>
                        <h3>Payment Details</h3>
                        <CheckoutForm total={cartTotal} />
                    </div>
                </div>
            </div>
        </div>
    );
}
