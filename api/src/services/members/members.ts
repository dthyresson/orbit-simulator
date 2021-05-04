import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const members = () => {
  requireAuth()

  return db.member.findMany()
}

export const member = ({ id }: Prisma.MemberWhereUniqueInput) => {
  requireAuth()

  return db.member.findUnique({
    where: { id },
  })
}

interface CreateMemberArgs {
  input: Prisma.MemberCreateInput
}

export const createMember = ({ input }: CreateMemberArgs) => {
  requireAuth()

  return db.member.create({
    data: input,
  })
}

interface UpdateMemberArgs extends Prisma.MemberWhereUniqueInput {
  input: Prisma.MemberUpdateInput
}

export const updateMember = ({ id, input }: UpdateMemberArgs) => {
  requireAuth()

  return db.member.update({
    data: input,
    where: { id },
  })
}

export const deleteMember = ({ id }: Prisma.MemberWhereUniqueInput) => {
  requireAuth()

  return db.member.delete({
    where: { id },
  })
}

export const Member = {
  activities: (_obj, { root }: ResolverArgs<Prisma.MemberWhereUniqueInput>) =>
    db.member.findUnique({ where: { id: root.id } }).activities(),
  identities: (_obj, { root }: ResolverArgs<Prisma.MemberWhereUniqueInput>) =>
    db.member.findUnique({ where: { id: root.id } }).identities(),
  workspaces: (_obj, { root }: ResolverArgs<Prisma.MemberWhereUniqueInput>) =>
    db.member.findUnique({ where: { id: root.id } }).workspaces(),
}
