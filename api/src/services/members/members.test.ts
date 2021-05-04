import {
  members,
  member,
  createMember,
  updateMember,
  deleteMember,
} from './members'

describe('members', () => {
  scenario('returns all members', async (scenario) => {
    const result = await members()

    expect(result.length).toEqual(Object.keys(scenario.member).length)
  })

  scenario('returns a single member', async (scenario) => {
    const result = await member({ id: scenario.member.one.id })

    expect(result).toEqual(scenario.member.one)
  })

  scenario('creates a member', async (scenario) => {
    const result = await createMember({
      input: {
        orbitId: 8211465,
        slug: 'String5332985',
        source: 'String',
        tagList: 'String',
        tags: 'String',
        orbitUrl: 'String',
        topics: 'String',
        languages: 'String',
      },
    })

    expect(result.orbitId).toEqual(8211465)
    expect(result.slug).toEqual('String5332985')
    expect(result.source).toEqual('String')
    expect(result.tagList).toEqual('String')
    expect(result.tags).toEqual('String')
    expect(result.teammate).toEqual()
    expect(result.orbitUrl).toEqual('String')
    expect(result.created).toEqual()
    expect(result.topics).toEqual('String')
    expect(result.languages).toEqual('String')
  })

  scenario('updates a member', async (scenario) => {
    const original = await member({ id: scenario.member.one.id })
    const result = await updateMember({
      id: original.id,
      input: { orbitId: 5061546 },
    })

    expect(result.orbitId).toEqual(5061546)
  })

  scenario('deletes a member', async (scenario) => {
    const original = await deleteMember({ id: scenario.member.one.id })
    const result = await member({ id: original.id })

    expect(result).toEqual(null)
  })
})
