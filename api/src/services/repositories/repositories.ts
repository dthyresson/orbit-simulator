import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const repositories = () => {
  return db.repository.findMany()
}

export const repository = ({ id }: Prisma.RepositoryWhereUniqueInput) => {
  return db.repository.findUnique({
    where: { id },
  })
}

interface CreateRepositoryArgs {
  input: Prisma.RepositoryCreateInput
}

export const createRepository = ({ input }: CreateRepositoryArgs) => {
  return db.repository.create({
    data: input,
  })
}

interface UpdateRepositoryArgs extends Prisma.RepositoryWhereUniqueInput {
  input: Prisma.RepositoryUpdateInput
}

export const updateRepository = ({ id, input }: UpdateRepositoryArgs) => {
  return db.repository.update({
    data: input,
    where: { id },
  })
}

export const deleteRepository = ({ id }: Prisma.RepositoryWhereUniqueInput) => {
  return db.repository.delete({
    where: { id },
  })
}

export const Repository = {
  activities: (
    _obj,
    { root }: ResolverArgs<Prisma.RepositoryWhereUniqueInput>
  ) => db.repository.findUnique({ where: { id: root.id } }).activities(),
  workspaces: (
    _obj,
    { root }: ResolverArgs<Prisma.RepositoryWhereUniqueInput>
  ) => db.repository.findUnique({ where: { id: root.id } }).workspaces(),
}
