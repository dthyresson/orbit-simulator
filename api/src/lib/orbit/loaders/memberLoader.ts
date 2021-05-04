import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { deorbitize } from 'src/lib/orbit/utils'

const parser = ({ config, item }) => {
  delete item.type
  item.workspaceSlug = config.workspace
  item.name = item.name === '' ? null : item.name
  return deorbitize({ config, model: item })
}

const persister = async (item) => {
  logger.info(`Saving member ${item.orbitId} ${item.name}`)

  const { orbitId, name, slug } = item
  logger.debug(
    { orbitData: { orbitId, name, slug } },
    `Member ${item.orbitId} ${item.name} detail`
  )

  const identities = (item.identities || []).map((identity) => {
    const clonedIdentity = { ...identity }
    const orbitId = Number(clonedIdentity.id)
    clonedIdentity.orbitId = orbitId
    delete clonedIdentity.id

    clonedIdentity.identityType = clonedIdentity.type.toUpperCase()
    delete clonedIdentity.type

    return clonedIdentity
  })

  const connectOrCreateIdentities = (identities || []).map((identity) => {
    return {
      where: { orbitId: identity.orbitId },
      create: identity,
    }
  })

  delete item.identities
  delete item.workspaceSlug

  try {
    return await db.member.upsert({
      where: { orbitId: item.orbitId },
      update: {
        ...item,
        workspaces: { connect: { slug: process.env.WORKSPACE_ID } },
        identities: { connectOrCreate: connectOrCreateIdentities },
      },
      create: {
        ...item,
        workspaces: { connect: { slug: process.env.WORKSPACE_ID } },
        identities: { create: identities },
      },
    })
  } catch (error) {
    logger.error(error, 'Error loading member')
    return Promise.reject(new Error(`Failed to save member ${item.orbitId}`))
  }
}

export { parser, persister }
