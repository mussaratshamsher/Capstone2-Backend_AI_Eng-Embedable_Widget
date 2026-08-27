import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    // Determine the amount based on the plan
    let amount = 0;
    if (plan === 'pro') amount = 49.00;
    else if (plan === 'enterprise') amount = 299.00; // Custom placeholder amount

    // Ensure Safepay keys exist
    const clientKey = process.env.SAFE_PAY_PUBLIC_KEY;
    const secretKey = process.env.SAFE_PAY_SECRET_KEY; // Note: using exactly how it's spelled in .env

    if (!clientKey || !secretKey) {
      console.error("Safepay credentials are not set in the environment.");
      return NextResponse.json({ error: "Server configuration error: SAFE_PAY_PUBLIC_KEY or SAFE_PAY_SECRET_KEY is missing in Vercel environment variables." }, { status: 500 });
    }

    // Call Safepay API to initialize the transaction and get a tracker
    const safepayRes = await fetch('https://sandbox.api.getsafepay.com/order/v1/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        environment: 'sandbox',
        client: clientKey,
        amount: amount,
        currency: 'PKR', // Safepay usually expects PKR, changed from USD for testing if USD was disabled
      }),
    });

    const safepayData = await safepayRes.json();

    if (!safepayRes.ok || !safepayData.data || !safepayData.data.token) {
      console.error("Safepay error:", safepayData);
      return NextResponse.json({ error: "Failed to initialize payment with Safepay", details: safepayData }, { status: 500 });
    }

    // Safepay returns the tracker id in data.token
    const tracker = safepayData.data.token;

    return NextResponse.json({ tracker });
    
  } catch (error) {
    console.error("Error creating Safepay checkout session:", error);
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
  }
}

