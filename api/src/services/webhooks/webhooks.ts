import { Prisma } from '@prisma/client'
import { ResolverArgs } from '@redwoodjs/api/dist/types'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const webhooks = () => {
  requireAuth()

  return db.webhook.findMany()
}

export const webhook = ({ id }: Prisma.WebhookWhereUniqueInput) => {
  requireAuth()

  return db.webhook.findUnique({
    where: { id },
  })
}

export const simulateWebhook = async ({
  slug,
}: Prisma.WebhookWhereUniqueInput) => {
  const wh = db.webhook.findUnique({
    where: { slug },
  })

  return wh
}

interface CreateWebhookArgs {
  input: Prisma.WebhookCreateInput
}

export const createWebhook = ({ input }: CreateWebhookArgs) => {
  requireAuth()

  return db.webhook.create({
    data: input,
  })
}

interface UpdateWebhookArgs extends Prisma.WebhookWhereUniqueInput {
  input: Prisma.WebhookUpdateInput
}

export const updateWebhook = ({ id, input }: UpdateWebhookArgs) => {
  requireAuth()

  return db.webhook.update({
    data: input,
    where: { id },
  })
}

export const deleteWebhook = ({ id }: Prisma.WebhookWhereUniqueInput) => {
  requireAuth()

  return db.webhook.delete({
    where: { id },
  })
}

export const Webhook = {
  payload: (_obj, { root }: ResolverArgs<Prisma.WebhookWhereUniqueInput>) =>
    db.webhook.findUnique({ where: { id: root.id } }).payload(),
}
