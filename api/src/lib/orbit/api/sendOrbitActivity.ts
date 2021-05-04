import got from 'got'

import { logger } from 'src/lib/logger'

export const sendOrbitActivity = async ({ activity }) => {
  const url = `https://app.orbit.love/api/v1/${process.env.WORKSPACE_ID}/activities`
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.ORBIT_API_KEY}`,
  }

  const { body } = await got.post(url, {
    json: activity,
    headers,
    responseType: 'json',
  })

  logger.debug({ orbitResponse: body.data }, 'Response from Orbit API')

  return body
}
