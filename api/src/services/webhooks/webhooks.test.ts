import {
  webhooks,
  webhook,
  createWebhook,
  updateWebhook,
  deleteWebhook,
} from './webhooks'

describe('webhooks', () => {
  scenario('returns all webhooks', async (scenario) => {
    const result = await webhooks()

    expect(result.length).toEqual(Object.keys(scenario.webhook).length)
  })

  scenario('returns a single webhook', async (scenario) => {
    const result = await webhook({ id: scenario.webhook.one.id })

    expect(result).toEqual(scenario.webhook.one)
  })

  scenario('creates a webhook', async (scenario) => {
    const result = await createWebhook({
      input: { name: 'String', slug: 'String6754788', endpoint: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.slug).toEqual('String6754788')
    expect(result.endpoint).toEqual('String')
  })

  scenario('updates a webhook', async (scenario) => {
    const original = await webhook({ id: scenario.webhook.one.id })
    const result = await updateWebhook({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a webhook', async (scenario) => {
    const original = await deleteWebhook({ id: scenario.webhook.one.id })
    const result = await webhook({ id: original.id })

    expect(result).toEqual(null)
  })
})
