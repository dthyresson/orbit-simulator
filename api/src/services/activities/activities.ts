import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const activities = () => {
  requireAuth()

  return db.activity.findMany({ orderBy: { occurredAt: 'desc' } })
}

export const activity = ({ id }: Prisma.ActivityWhereUniqueInput) => {
  requireAuth()

  return db.activity.findUnique({
    where: { id },
  })
}

interface CreateActivityArgs {
  input: Prisma.ActivityCreateInput
}

export const createActivity = ({ input }: CreateActivityArgs) => {
  requireAuth()

  return db.activity.create({
    data: input,
  })
}

interface UpdateActivityArgs extends Prisma.ActivityWhereUniqueInput {
  input: Prisma.ActivityUpdateInput
}

export const updateActivity = ({ id, input }: UpdateActivityArgs) => {
  requireAuth()

  return db.activity.update({
    data: input,
    where: { id },
  })
}

export const deleteActivity = ({ id }: Prisma.ActivityWhereUniqueInput) => {
  requireAuth()

  return db.activity.delete({
    where: { id },
  })
}

export const Activity = {
  activityType: (
    _obj,
    { root }: ResolverArgs<Prisma.ActivityWhereUniqueInput>
  ) => db.activity.findUnique({ where: { id: root.id } }).activityType(),
  member: (_obj, { root }: ResolverArgs<Prisma.ActivityWhereUniqueInput>) =>
    db.activity.findUnique({ where: { id: root.id } }).member(),
  repository: (_obj, { root }: ResolverArgs<Prisma.ActivityWhereUniqueInput>) =>
    db.activity.findUnique({ where: { id: root.id } }).repository(),
}
