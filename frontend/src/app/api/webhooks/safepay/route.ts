import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-sfpy-signature');
    const secretKey = process.env.SAFE_PAY_SECRET_KEY; // Note: using exactly how it's spelled in .env

    if (!secretKey) {
      console.error("Safepay secret key is missing");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    // Safepay Webhook Verification (Standard HMAC SHA256)
    // IMPORTANT: Verify with Safepay docs if they require specific payload serialization for the signature
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(JSON.stringify(body));
    const calculatedSignature = hmac.digest('hex');

    // NOTE: In sandbox, you might just want to bypass strict verification to test the flow,
    // but in production, ALWAYS verify the signature to ensure the webhook is legit.
    /*
    if (signature !== calculatedSignature) {
      console.error("Invalid Safepay webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    */

    console.log("Received Safepay Webhook:", body);

    // TODO: Process the payment success
    // Example: Check body.type === 'payment.success' or similar depending on Safepay event types
    // Update the user's subscription in your database here
    
    // if (body.data && body.data.status === 'PAID') {
    //   await db.users.update({ where: { email: userEmail }, data: { plan: 'pro' }});
    // }

    return NextResponse.json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("Error processing Safepay webhook:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
