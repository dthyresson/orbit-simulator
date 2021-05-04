import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { deorbitize } from 'src/lib/orbit/utils'

const parser = ({ config, item }) => {
  delete item.type
  item.weight = item.weight ? Number(item.weight) : 0

  return deorbitize({ config, model: item })
}

const persister = async (data) => {
  logger.trace(`saving activityType ${data.orbitId} ${data.name}`)
  logger.debug(
    { activityType: data },
    `saving activityType ${data.orbitId} ${data.name}`
  )
  try {
    return await db.activityType.upsert({
      where: { orbitId: data.orbitId },
      update: { ...data },
      create: { ...data },
    })
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to save activityType ${data.orbitId}`)
    )
  }
}

export { parser, persister }
