import {
  repositories,
  repository,
  createRepository,
  updateRepository,
  deleteRepository,
} from './repositories'

describe('repositories', () => {
  scenario('returns all repositories', async (scenario) => {
    const result = await repositories()

    expect(result.length).toEqual(Object.keys(scenario.repository).length)
  })

  scenario('returns a single repository', async (scenario) => {
    const result = await repository({ id: scenario.repository.one.id })

    expect(result).toEqual(scenario.repository.one)
  })

  scenario('creates a repository', async (scenario) => {
    const result = await createRepository({
      input: {
        orbitId: 5650038,
        name: 'String2286394',
        owner: 'String',
        fullName: 'String',
      },
    })

    expect(result.orbitId).toEqual(5650038)
    expect(result.name).toEqual('String2286394')
    expect(result.owner).toEqual('String')
    expect(result.fullName).toEqual('String')
  })

  scenario('updates a repository', async (scenario) => {
    const original = await repository({ id: scenario.repository.one.id })
    const result = await updateRepository({
      id: original.id,
      input: { orbitId: 4374339 },
    })

    expect(result.orbitId).toEqual(4374339)
  })

  scenario('deletes a repository', async (scenario) => {
    const original = await deleteRepository({ id: scenario.repository.one.id })
    const result = await repository({ id: original.id })

    expect(result).toEqual(null)
  })
})
