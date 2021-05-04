import {
  activityTypes,
  activityType,
  createActivityType,
  updateActivityType,
  deleteActivityType,
} from './activityTypes'

describe('activityTypes', () => {
  scenario('returns all activityTypes', async (scenario) => {
    const result = await activityTypes()

    expect(result.length).toEqual(Object.keys(scenario.activityType).length)
  })

  scenario('returns a single activityType', async (scenario) => {
    const result = await activityType({ id: scenario.activityType.one.id })

    expect(result).toEqual(scenario.activityType.one)
  })

  scenario('creates a activityType', async (scenario) => {
    const result = await createActivityType({
      input: {
        orbitId: 6536875,
        name: 'String',
        shortName: 'String',
        key: 'String9720046',
        category: 'String',
      },
    })

    expect(result.orbitId).toEqual(6536875)
    expect(result.name).toEqual('String')
    expect(result.shortName).toEqual('String')
    expect(result.key).toEqual('String9720046')
    expect(result.category).toEqual('String')
  })

  scenario('updates a activityType', async (scenario) => {
    const original = await activityType({ id: scenario.activityType.one.id })
    const result = await updateActivityType({
      id: original.id,
      input: { orbitId: 1754394 },
    })

    expect(result.orbitId).toEqual(1754394)
  })

  scenario('deletes a activityType', async (scenario) => {
    const original = await deleteActivityType({
      id: scenario.activityType.one.id,
    })
    const result = await activityType({ id: original.id })

    expect(result).toEqual(null)
  })
})
