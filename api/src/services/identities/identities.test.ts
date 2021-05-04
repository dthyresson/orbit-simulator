import { identities } from './identities'

describe('identities', () => {
  scenario('returns all identities', async (scenario) => {
    const result = await identities()

    expect(result.length).toEqual(Object.keys(scenario.identity).length)
  })
})
