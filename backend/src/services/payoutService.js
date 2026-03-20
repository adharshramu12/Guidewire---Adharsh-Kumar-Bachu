// ── GigShield Payout Service ──────────────────────────
// Mock integration with Razorpay/UPI for instant payouts

export const initiatePayout = async (worker, amount, reason) => {
  console.log(`[Payout] Initiating payout of ₹${amount} to ${worker.name} (${worker.upiId})`);
  console.log(`[Payout] Reason: ${reason}`);

  // Simulate network latency for fintech credibility
  await new Promise(resolve => setTimeout(resolve, 2500));

  const payoutId = `PAY_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const success = Math.random() > 0.01; // 99% success rate in mock

  if (success) {
    console.log(`[Payout] ✅ Success! ID: ${payoutId}`);
    return {
      success: true,
      payoutId,
      amount,
      timestamp: new Date().toISOString(),
      upiRef: `RZP${Date.now()}`
    };
  } else {
    console.error(`[Payout] ❌ Failed to dispatch to UPI for ${worker.id}`);
    throw new Error('UPI Transaction failed at Gateway');
  }
};
