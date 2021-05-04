import { db } from 'src/lib/db'

import { deorbitize } from 'src/lib/orbit/utils'

const parser = ({ config, item }) => {
  delete item.type

  return deorbitize({ config, model: item })
}

const persister = async (data) => {
  console.info(`saved workspace ${data.orbitId} ${data.name}`)

  const repositories = data.repositories || []
  delete data.repositories

  const workspace = await db.workspace.upsert({
    where: { orbitId: data.orbitId },
    update: { ...data },
    create: { ...data },
  })

  return await persistRepositories({ repositories, workspace })
}

const persistRepositories = async ({ repositories, workspace }) => {
  repositories.forEach(async (repository) => {
    const orbitId = Number(repository.id)
    repository.orbitId = orbitId
    delete repository.id

    delete repository.type

    try {
      await db.repository.upsert({
        where: { orbitId },
        update: { ...repository },
        create: {
          ...repository,
          workspaces: { connect: { id: workspace.id } },
        },
      })
    } catch (error) {
      return Promise.reject(new Error(`Failed to save workspace ${orbitId}`))
    }
  })

  return
}

export { parser, persister }
