const WEBHOOK_URL = 'https://n8n.globalyhub.com/webhook/355b05bc-676d-4051-b477-e7919a6ac6d0'

export async function triggerReferralWebhook(payload: Record<string, any>) {
  try {
    // We use POST to send structured JSON data. 
    // If the receiver specifically requires GET, we would need to append query params.
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        source: 'website-v2',
      }),
    })

    if (!response.ok) {
      console.error(`[Webhook] Failed to trigger: ${response.status} ${response.statusText}`)
      // We don't throw here to avoid failing the main user flow if the webhook is down
    } else {
      console.log(`[Webhook] Successfully triggered: ${payload.event_type}`)
    }
  } catch (error) {
    console.error('[Webhook] Error triggering webhook:', error)
  }
}
