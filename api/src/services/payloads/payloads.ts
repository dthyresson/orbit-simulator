import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const payloads = () => {
  requireAuth()

  return db.payload.findMany()
}

export const payload = ({ id }: Prisma.PayloadWhereUniqueInput) => {
  requireAuth()

  return db.payload.findUnique({
    where: { id },
  })
}

interface CreatePayloadArgs {
  input: Prisma.PayloadCreateInput
}

export const createPayload = ({ input }: CreatePayloadArgs) => {
  return db.payload.create({
    data: input,
  })
}

interface UpdatePayloadArgs extends Prisma.PayloadWhereUniqueInput {
  input: Prisma.PayloadUpdateInput
}

export const updatePayload = ({ id, input }: UpdatePayloadArgs) => {
  requireAuth()

  return db.payload.update({
    data: input,
    where: { id },
  })
}

export const deletePayload = ({ id }: Prisma.PayloadWhereUniqueInput) => {
  requireAuth()

  return db.payload.delete({
    where: { id },
  })
}

export const Payload = {
  webhook: (_obj, { root }: ResolverArgs<Prisma.PayloadWhereUniqueInput>) =>
    db.payload.findUnique({ where: { id: root.id } }).webhook(),
}
