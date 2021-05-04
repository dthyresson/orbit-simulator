import {
  payloads,
  payload,
  createPayload,
  updatePayload,
  deletePayload,
} from './payloads'

describe('payloads', () => {
  scenario('returns all payloads', async (scenario) => {
    const result = await payloads()

    expect(result.length).toEqual(Object.keys(scenario.payload).length)
  })

  scenario('returns a single payload', async (scenario) => {
    const result = await payload({ id: scenario.payload.one.id })

    expect(result).toEqual(scenario.payload.one)
  })

  scenario('creates a payload', async (scenario) => {
    const result = await createPayload({
      input: {
        webhookId: 'scenario.payload.two.webhookId',
        body: { foo: 'bar' },
      },
    })

    expect(result.webhookId).toEqual('scenario.payload.two.webhookId')
    expect(result.body).toEqual({ foo: 'bar' })
  })

  scenario('updates a payload', async (scenario) => {
    const original = await payload({ id: scenario.payload.one.id })
    const result = await updatePayload({
      id: original.id,
      input: { body: { foo: 'baz' } },
    })

    expect(result.body).toEqual({ foo: 'baz' })
  })

  scenario('deletes a payload', async (scenario) => {
    const original = await deletePayload({ id: scenario.payload.one.id })
    const result = await payload({ id: original.id })

    expect(result).toEqual(null)
  })
})
