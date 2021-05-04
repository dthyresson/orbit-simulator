import { Prisma } from '@prisma/client'

import type { APIGatewayEvent } from 'aws-lambda'
import {
  verifyEvent,
  // VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/webhooks'

import { deserialize } from 'deserialize-json-api'

import { createPayload } from 'src/services/payloads/payloads'

import { parser, persister } from 'src/lib/orbit/loaders/activityLoader'

import { logger } from 'src/lib/logger'

const webhookDetails = (event) => {
  const webhook = 'orbitWebhook-background'
  const orbitEvent = event.headers['x-orbit-event'] || ''
  const orbitEventId = event.headers['x-orbit-event-id'] || ''
  const orbitEventType = event.headers['x-orbit-event-type'] || ''
  const orbitUserAgent = event.headers['user-agent'] || ''
  const orbitSignature = event.headers['x-orbit-signature'] || ''

  return {
    webhook,
    orbitEvent,
    orbitEventId,
    orbitEventType,
    orbitUserAgent,
    orbitSignature,
  }
}

const parseEventPayload = (event) => {
  const payload = JSON.parse(JSON.parse(event.body).event_payload).event_payload

  const item = deserialize(payload, { transformKeys: 'camelCase' })

  return parser({
    config: { parserConfig: { listAttributes: ['tags'] } },
    item: item.data,
  })
}

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
  const orbitInfo = webhookDetails(event)

  const webhookLogger = logger.child({ orbitInfo })

  webhookLogger.info(`>> in webhook`)

  try {
    const options = {
      signatureHeader: 'X-Orbit-Signature',
    }

    verifyEvent('sha256Verifier', {
      event,
      secret: process.env.ORBIT_WEBHOOK_SECRET,
      options,
    })

    const input: Prisma.PayloadCreateInput = {
      body: JSON.parse(event.body),
      webhook: {
        connectOrCreate: {
          where: {
            slug: 'orbit',
          },
          create: {
            slug: 'orbit',
            name: 'orbit',
            endpoint: 'http://example.com/orbit',
          },
        },
      },
    }

    await createPayload({ input })

    if (orbitInfo.orbitEventType === 'activity:created') {
      const parsedActivity = parseEventPayload(event)

      webhookLogger.debug(parsedActivity, 'parsedActivity')

      persister(parsedActivity)

      return {
        statusCode: 200,
        body: JSON.stringify({
          data: 'orbitWebhook done',
        }),
      }
    } else {
      webhookLogger.warn(
        `Unsupported Orbit Event Type: ${orbitInfo.orbitEventType}`
      )
      return {
        statusCode: 400,
        body: JSON.stringify({
          data: `Unsupported Orbit Event Type: ${orbitInfo.orbitEventType}`,
        }),
      }
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
