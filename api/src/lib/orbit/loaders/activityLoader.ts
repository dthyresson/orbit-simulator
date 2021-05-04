import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { dateify, deorbitize } from 'src/lib/orbit/utils'

const parser = ({ config, item }) => {
  return deorbitize({ config, model: item })
}

const persister = async (data) => {
  logger.debug(
    { activityData: data },
    `Saving activity ${data.orbitId} ${data.key} ${data.occurredAt}`
  )

  const { orbitId, key, occurredAt, activityTypeId } = data
  logger.debug(
    { orbitData: { orbitId, key, activityTypeId, occurredAt } },
    `Activity ${data.orbitId} ${data.key} ${data.occurredAt} detail`
  )

  const activity = {
    ...dateify({ model: data }),
    orbitId: parseInt(data.orbitId),
    orbitSyncAt: new Date(),
    orbitUpdatedAt: data.updatedAt || new Date(),
    weight: parseFloat(data.weight),
    customType: data.tags[1].split(':')[1],
    customTitle: data.tags[2].split(':')[1],
  }

  const activityType = {
    ...data.activityType,
    orbitId: parseInt(data.activityType.id),
    weight: Number(data.activityType.weight),
    orbitSyncAt: new Date(),
    orbitUpdatedAt: new Date(),
  }

  delete activityType.id
  delete activityType.type

  const member = {
    ...dateify({ model: data.member }),
    orbitId: Number(data.member.id),
    name: data.name === '' ? null : data.name,
    languages: data.languages === null ? undefined : data.languages,
    tags: data.tags === null ? undefined : data.tags,
    topics: data.topics === null ? undefined : data.topics,
    orbitLevel: data.orbitLevel === null ? 4 : data.orbitLevel,
    orbitSyncAt: new Date(),
    orbitUpdatedAt: data.member.updatedAt || new Date(),
  }

  delete member.id
  delete member.type
  delete member.identities
  delete member.createdAt
  delete member.updatedAt

  const repository = {
    ...data.repository,
    orbitId: Number(data.repository?.id),
  }

  delete repository.id
  delete repository.type
  delete repository.createdAt
  delete repository.updatedAt

  // user is an Orbit user account seen when manually creating posts or content in the app
  delete activity.user

  delete activity.member
  delete activity.activityType
  delete activity.repository
  delete activity.createdAt
  delete activity.updatedAt

  activity.orbitSyncAt = new Date()

  let connections = {}

  if (repository.orbitId !== undefined && !isNaN(repository.orbitId)) {
    connections = {
      member: {
        connectOrCreate: {
          where: { orbitId: member.orbitId },
          create: { ...member },
        },
      },
      activityType: {
        connectOrCreate: {
          where: { orbitId: activityType.orbitId },
          create: { ...activityType },
        },
      },
      repository: { connect: { orbitId: repository.orbitId } },
    }
  } else {
    connections = {
      member: {
        connectOrCreate: {
          where: { orbitId: member.orbitId },
          create: { ...member },
        },
      },
      activityType: {
        connectOrCreate: {
          where: { orbitId: activityType.orbitId },
          create: { ...activityType },
        },
      },
    }
  }

  try {
    return await db.activity.upsert({
      where: { orbitId: activity.orbitId },
      update: {
        ...activity,
        member: {
          connect: {
            orbitId: member.orbitId,
          },
        },
      },
      create: {
        ...activity,
        ...connections,
      },
    })
  } catch (error) {
    logger.debug({ activity }, 'Activity details')
    logger.debug({ connections }, 'Activity connections')
    logger.error(error, `Failed to save activity ${data.orbitId} ${data.key}`)

    return Promise.reject(
      new Error(`Failed to save activity ${activity.orbitId}`)
    )
  }
}

export { parser, persister }
