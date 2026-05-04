const WEBHOOK_URL = 'https://n8n.globalyhub.com/webhook/355b05bc-676d-4051-b477-e7919a6ac6d0'

export async function triggerReferralWebhook(payload: Record<string, any>) {
  try {
    // The n8n webhook is configured for GET requests.
    // We append the payload as query parameters.
    const params = new URLSearchParams()
    
    // Flatten the payload into query params
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, String(value))
      }
    })
    
    // Add common fields
    params.append('timestamp', new Date().toISOString())
    params.append('source', 'website-v2')

    const urlWithParams = `${WEBHOOK_URL}?${params.toString()}`

    const response = await fetch(urlWithParams, {
      method: 'GET',
    })

    if (!response.ok) {
      console.error(`[Webhook] Failed to trigger: ${response.status} ${response.statusText}`)
    } else {
      console.log(`[Webhook] Successfully triggered (GET): ${payload.event_type}`)
    }
  } catch (error) {
    console.error('[Webhook] Error triggering webhook:', error)
  }
}
