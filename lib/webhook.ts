const WEBHOOK_URL = 'https://n8n.globalyhub.com/webhook/355b05bc-676d-4051-b477-e7919a6ac6d0'

export async function triggerReferralWebhook(payload: Record<string, any>) {
  try {
    // The n8n webhook is now configured for POST requests.
    // We send the payload as a JSON body.
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
    } else {
      console.log(`[Webhook] Successfully triggered (POST): ${payload.event_type}`)
    }
  } catch (error) {
    console.error('[Webhook] Error triggering webhook:', error)
  }
}
