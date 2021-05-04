import {
  workspaces,
  workspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from './workspaces'

describe('workspaces', () => {
  scenario('returns all workspaces', async (scenario) => {
    const result = await workspaces()

    expect(result.length).toEqual(Object.keys(scenario.workspace).length)
  })

  scenario('returns a single workspace', async (scenario) => {
    const result = await workspace({ id: scenario.workspace.one.id })

    expect(result).toEqual(scenario.workspace.one)
  })

  scenario('creates a workspace', async (scenario) => {
    const result = await createWorkspace({
      input: { orbitId: 6354018, name: 'String7718876', slug: 'String3373080' },
    })

    expect(result.orbitId).toEqual(6354018)
    expect(result.name).toEqual('String7718876')
    expect(result.slug).toEqual('String3373080')
  })

  scenario('updates a workspace', async (scenario) => {
    const original = await workspace({ id: scenario.workspace.one.id })
    const result = await updateWorkspace({
      id: original.id,
      input: { orbitId: 2651983 },
    })

    expect(result.orbitId).toEqual(2651983)
  })

  scenario('deletes a workspace', async (scenario) => {
    const original = await deleteWorkspace({ id: scenario.workspace.one.id })
    const result = await workspace({ id: original.id })

    expect(result).toEqual(null)
  })
})
