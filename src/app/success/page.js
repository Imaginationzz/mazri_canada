"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import styles from '@/app/page.module.css'; // Re-use main styles or create specific ones

export default function SuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
            <h1 className="section-title">Thank You! / شكراً لك</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                Your payment was successful. We have received your order.
                <br />
                تم استلام طلبك بنجاح.
            </p>
            <Link href="/" className="btn">
                Return Home / العودة للصفحة الرئيسية
            </Link>
        </div>
    );
}
