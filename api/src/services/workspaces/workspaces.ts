import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const workspaces = () => {
  requireAuth()

  return db.workspace.findMany()
}

export const workspace = ({ id }: Prisma.WorkspaceWhereUniqueInput) => {
  requireAuth()

  return db.workspace.findUnique({
    where: { id },
  })
}

interface CreateWorkspaceArgs {
  input: Prisma.WorkspaceCreateInput
}

export const createWorkspace = ({ input }: CreateWorkspaceArgs) => {
  requireAuth()

  return db.workspace.create({
    data: input,
  })
}

interface UpdateWorkspaceArgs extends Prisma.WorkspaceWhereUniqueInput {
  input: Prisma.WorkspaceUpdateInput
}

export const updateWorkspace = ({ id, input }: UpdateWorkspaceArgs) => {
  requireAuth()

  return db.workspace.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkspace = ({ id }: Prisma.WorkspaceWhereUniqueInput) => {
  requireAuth()

  return db.workspace.delete({
    where: { id },
  })
}

export const Workspace = {
  members: (_obj, { root }: ResolverArgs<Prisma.WorkspaceWhereUniqueInput>) =>
    db.workspace.findUnique({ where: { id: root.id } }).members(),
  repositories: (
    _obj,
    { root }: ResolverArgs<Prisma.WorkspaceWhereUniqueInput>
  ) => db.workspace.findUnique({ where: { id: root.id } }).repositories(),
}
