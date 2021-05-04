import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const activityTypes = () => {
  requireAuth()

  return db.activityType.findMany()
}

export const activityType = ({ id }: Prisma.ActivityTypeWhereUniqueInput) => {
  requireAuth()

  return db.activityType.findUnique({
    where: { id },
  })
}

interface CreateActivityTypeArgs {
  input: Prisma.ActivityTypeCreateInput
}

export const createActivityType = ({ input }: CreateActivityTypeArgs) => {
  requireAuth()

  return db.activityType.create({
    data: input,
  })
}

interface UpdateActivityTypeArgs extends Prisma.ActivityTypeWhereUniqueInput {
  input: Prisma.ActivityTypeUpdateInput
}

export const updateActivityType = ({ id, input }: UpdateActivityTypeArgs) => {
  requireAuth()

  return db.activityType.update({
    data: input,
    where: { id },
  })
}

export const deleteActivityType = ({
  id,
}: Prisma.ActivityTypeWhereUniqueInput) => {
  requireAuth()

  return db.activityType.delete({
    where: { id },
  })
}

export const ActivityType = {
  activities: (
    _obj,
    { root }: ResolverArgs<Prisma.ActivityTypeWhereUniqueInput>
  ) => db.activityType.findUnique({ where: { id: root.id } }).activities(),
}
