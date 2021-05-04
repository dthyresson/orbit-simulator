import { Prisma } from '@prisma/client'
import { formatISO } from 'date-fns'
import type { APIGatewayEvent } from 'aws-lambda'
import {
  verifyEvent,
  VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/webhooks'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { sendOrbitActivity } from 'src/lib/orbit/api/sendOrbitActivity'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

export const handler = async (event: APIGatewayEvent) => {
  const discourseInfo = { webhook: 'discourse' }
  const webhookLogger = logger.child({ discourseInfo })

  webhookLogger.trace('Invoked discourseWebhook function')

  try {
    const options = {
      signatureHeader: 'X-Discourse-Event-Signature',
    } as VerifyOptions

    verifyEvent('sha256Verifier', {
      event,
      secret: process.env.DISCOURSE_WEBHOOK_SECRET,
      options,
    })

    webhookLogger.debug({ headers: event.headers }, 'Headers')

    const payload = JSON.parse(event.body)

    webhookLogger.debug({ payload }, 'Body payload')

    const input: Prisma.PayloadCreateInput = {
      body: payload,
      webhook: {
        connectOrCreate: {
          where: {
            slug: 'discourse',
          },
          create: {
            slug: 'discourse',
            name: 'discourse',
            endpoint: 'http://example.com/discourse',
          },
        },
      },
    }

    const persistedPayload = await db.payload.create({
      data: input,
    })
    const body = persistedPayload.body
    const keys = Object.keys(body)
    const activityType = keys[0] || 'misc'

    const activity = {
      description: `${formatISO(
        persistedPayload.updatedAt
      )} - Orbit Discourse ${activityType}`,
      link: 'https://orbit-event.discourse.com/',
      link_text: 'See the event',
      title: `Orbit Discourse ${activityType}`,
      activity_type: `discourse:${activityType}`,
      key: `${activityType}-${persistedPayload.id}`,
      occurred_at: persistedPayload.updatedAt,
      identity: {
        source: 'email',
        email: 'patrick@orbit.love',
      },
    }

    await sendOrbitActivity({ activity })

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: payload,
      }),
    }
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      webhookLogger.warn('Unauthorized')

      return {
        statusCode: 401,
      }
    } else {
      webhookLogger.error({ error }, error.message)

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      }
    }
  }
}
