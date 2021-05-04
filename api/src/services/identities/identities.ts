import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const identities = () => {
  requireAuth()

  return db.identity.findMany()
}

export const Identity = {
  member: (_obj, { root }: ResolverArgs<Prisma.IdentityWhereUniqueInput>) =>
    db.identity.findUnique({ where: { id: root.id } }).member(),
}
