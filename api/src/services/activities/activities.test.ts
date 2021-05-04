import {
  activities,
  activity,
  createActivity,
  updateActivity,
  deleteActivity,
} from './activities'

describe('activities', () => {
  scenario('returns all activities', async (scenario) => {
    const result = await activities()

    expect(result.length).toEqual(Object.keys(scenario.activity).length)
  })

  scenario('returns a single activity', async (scenario) => {
    const result = await activity({ id: scenario.activity.one.id })

    expect(result).toEqual(scenario.activity.one)
  })

  scenario('creates a activity', async (scenario) => {
    const result = await createActivity({
      input: {
        orbitId: 1100193,
        activityTypeId: 'scenario.activity.two.activityTypeId',
        memberId: 'scenario.activity.two.memberId',
        action: 'String',
        key: 'String',
        type: 'String',
        orbitUrl: 'String',
        tags: 'String',
      },
    })

    expect(result.orbitId).toEqual(1100193)
    expect(result.activityTypeId).toEqual(
      'scenario.activity.two.activityTypeId'
    )
    expect(result.memberId).toEqual('scenario.activity.two.memberId')
    expect(result.action).toEqual('String')
    expect(result.key).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.orbitUrl).toEqual('String')
    expect(result.tags).toEqual('String')
  })

  scenario('updates a activity', async (scenario) => {
    const original = await activity({ id: scenario.activity.one.id })
    const result = await updateActivity({
      id: original.id,
      input: { orbitId: 650334 },
    })

    expect(result.orbitId).toEqual(650334)
  })

  scenario('deletes a activity', async (scenario) => {
    const original = await deleteActivity({ id: scenario.activity.one.id })
    const result = await activity({ id: original.id })

    expect(result).toEqual(null)
  })
})
