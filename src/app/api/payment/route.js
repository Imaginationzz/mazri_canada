import { SquareClient, SquareEnvironment } from 'square';

export async function POST(req) {
    try {
        const accessToken = process.env.SQUARE_ACCESS_TOKEN;
        const client = new SquareClient({
            token: accessToken,
            environment: SquareEnvironment.Production,
        });

        const { token, amount } = await req.json();
        const amountCents = Math.round(amount * 100);

        const result = await client.payments.create({
            sourceId: token,
            idempotencyKey: crypto.randomUUID(),
            amountMoney: {
                amount: BigInt(amountCents),
                currency: 'CAD',
            },
            autocomplete: true,
        });

        // The new SDK often nests the response in .data
        const paymentData = result.data?.payment || result.result?.payment;

        return new Response(JSON.stringify(paymentData, (key, value) => {
            return typeof value === 'bigint' ? value.toString() : value;
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Square API Error:', error);

        // Extract the most helpful error message for your frontend
        const errorMessage = error.errors?.[0]?.detail || error.message || "Payment failed";

        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}