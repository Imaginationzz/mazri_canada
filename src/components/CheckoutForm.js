"use client";

import { useState, useCallback } from 'react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm({ total }) {
    const [status, setStatus] = useState('idle'); // idle, processing, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    if (!appId || !locationId) {
        return (
            <div className={styles.configError}>
                <p><strong>Payment Configuration Missing</strong></p>
                <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                    {!appId && <li>Missing: <code>NEXT_PUBLIC_SQUARE_APP_ID</code></li>}
                    {!locationId && <li>Missing: <code>NEXT_PUBLIC_SQUARE_LOCATION_ID</code></li>}
                </ul>
                <p>Please check your Vercel Environment Variables.</p>
            </div>
        );
    }

    // Note: For multi-currency/location support, postal code validation depends on the Square Account settings.
    // If testing in Sandbox with a US account, use a US Zip (e.g. 94103).
    // If testing with a Canadian account, use a CA Postal Code (e.g. K1A 0B1).


    const handleCardTokenized = useCallback(async (token, verifiedBuyer) => {
        setStatus('processing');
        try {
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token.token, amount: total }),
            });

            console.log('Payment API Response Status:', response.status);

            const textResponse = await response.text();
            console.log('Payment API Raw Response:', textResponse);

            if (response.ok) {
                try {
                    setStatus('success');
                    window.location.href = '/success';
                } catch (e) {
                    console.error("Success but failed to parse?", e);
                }
            } else {
                try {
                    const errorData = JSON.parse(textResponse);
                    setErrorMessage(errorData.error || "Payment failed");
                } catch (e) {
                    setErrorMessage("Server returned non-JSON error. Check console.");
                }
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage("Network error occurred.");
        }
    }, [total]);

    return (
        <div className={styles.paymentForm}>
            <PaymentForm
                applicationId={appId}
                locationId={locationId}
                cardTokenizeResponseReceived={handleCardTokenized}
            >
                <CreditCard />
            </PaymentForm>

            {status === 'processing' && <p>Processing payment...</p>}
            {status === 'success' && <p className={styles.success}>Payment Successful!</p>}
            {status === 'error' && (
                <div className={styles.error}>
                    <p>Payment Failed.</p>
                    <p style={{ fontSize: '0.8em' }}>{errorMessage}</p>
                </div>
            )}


        </div>
    );
}
