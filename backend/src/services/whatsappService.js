// ── GigShield WhatsApp Service ────────────────────────
// Mock integration with Twilio/WhatsApp Business API

export const sendWhatsAppAlert = async (worker, type, data) => {
  const name = worker.name.split(' ')[0];
  let message = '';

  switch (type) {
    case 'CLAIM_PAID':
      message = `✅ *GigShield: ₹${data.amount} Paid!*\n\nHi ${name}, heavy rain was detected in your zone (${data.zone}). A claim has been auto-approved and sent to your UPI (${worker.upiId}).\n\nGigScore: ${data.oldScore} ➔ ${data.newScore} (+15)`;
      break;
    case 'TRIGGER_DETECTED':
      message = `⚠️ *GigShield Alert*\n\nDisruption detected: ${data.triggerLabel} in ${data.zone}. Your income protection is active. We are monitoring live data. No action needed!`;
      break;
    case 'WEEKLY_RENEWAL':
      message = `🛡️ *GigShield: Coverage Renewed*\n\nYour protection for next week is active. ₹${data.premium} deducted. Stay safe out there!`;
      break;
    default:
      message = `🛡️ *GigShield Notification*\n\nUpdates available in your dashboard.`;
  }

  console.log(`[WhatsApp] Sending to ${worker.phone}...`);
  console.log(`[WhatsApp] Content: "${message.replace(/\n/g, ' ')}"`);

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, sid: `WA${Math.random().toString(36).substr(2, 12)}` };
};
