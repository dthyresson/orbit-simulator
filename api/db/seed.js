/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

const WORKSPACES = [
  {
    orbitId: 554,
    name: 'RedwoodJS',
    slug: 'redwoodjs',
  },
]

const REPOSITORIES = [
  {
    orbitId: 17023,
    name: 'redwood',
    owner: 'redwoodjs',
    fullName: 'redwoodjs/redwood',
  },
  {
    orbitId: 17024,
    name: 'redwoodjs.com',
    owner: 'redwoodjs',
    fullName: 'redwoodjs/redwoodjs.com',
  },
  {
    orbitId: 17022,
    name: 'create-redwood-app',
    owner: 'redwoodjs',
    fullName: 'redwoodjs/create-redwood-app',
  },
  {
    orbitId: 17819,
    name: 'learn.redwoodjs.com',
    owner: 'redwoodjs',
    fullName: 'redwoodjs/learn.redwoodjs.com',
  },
  {
    orbitId: 27450,
    name: 'playground-auth',
    owner: 'redwoodjs',
    fullName: 'redwoodjs/playground-auth',
  },
]

const ACTIVITY_TYPES = [
  {
    orbitId: 1,
    name: 'Opened a pull request',
    shortName: 'Opened pull request',
    key: 'pull_requests:opened',
    category: 'github',
    weight: 2,
  },
  {
    orbitId: 2,
    name: 'Opened an issue',
    shortName: 'Issue opened',
    key: 'issues:opened',
    category: 'github',
    weight: 1,
  },
  {
    orbitId: 3,
    name: 'Starred a repository',
    shortName: 'GitHub star',
    key: 'star:created',
    category: 'github',
    weight: 0.5,
  },
  {
    orbitId: 4,
    name: 'Had a pull request merged',
    shortName: 'Merged pull request',
    key: 'pull_requests:merged',
    category: 'github',
    weight: 2,
  },
  {
    orbitId: 9,
    name: 'Commented on an issue',
    shortName: 'Issue comment',
    key: 'issue_comment:created',
    category: 'github',
    weight: 1,
  },
  {
    orbitId: 12,
    name: 'Created content',
    shortName: 'Content created',
    key: 'post:created',
    category: 'orbit',
    weight: 1,
  },
  {
    orbitId: 14,
    name: 'Has an added note',
    shortName: 'Note added',
    key: 'note:created',
    category: 'orbit',
    weight: 1,
  },
  {
    orbitId: 16,
    name: 'Tweeted',
    shortName: 'Twitter mention',
    key: 'tweet:sent',
    category: 'twitter',
    weight: 1,
  },
  {
    orbitId: 17,
    name: 'Followed on twitter',
    shortName: 'Twitter follow',
    key: 'twitter:followed',
    category: 'twitter',
    weight: 0.5,
  },
  {
    orbitId: 18,
    name: 'Created a Discourse post',
    shortName: 'Discourse post',
    key: 'discourse:post:created',
    category: 'discourse',
    weight: 1,
  },
  {
    orbitId: 19,
    name: 'Created a Discourse topic',
    shortName: 'Discourse topic',
    key: 'discourse:topic:created',
    category: 'discourse',
    weight: 1,
  },
  {
    orbitId: 20,
    name: 'Sent a message in Slack',
    shortName: 'Slack message',
    key: 'slack:message:sent',
    category: 'slack',
    weight: 0.5,
  },
  {
    orbitId: 21,
    name: 'Joined a channel in Slack',
    shortName: 'Slack channel join',
    key: 'slack:channel:joined',
    category: 'slack',
    weight: 0.5,
  },
  {
    orbitId: 22,
    name: 'Replied to a thread in Slack',
    shortName: 'Slack thread reply',
    key: 'slack:thread:replied',
    category: 'slack',
    weight: 0.5,
  },
  {
    orbitId: 24,
    name: 'Replied to a message in Discord',
    shortName: 'Discord message reply',
    key: 'discord:message:replied',
    category: 'discord',
    weight: 0.5,
  },
  {
    orbitId: 25,
    name: 'Joined a server in Discord',
    shortName: 'Discord server join',
    key: 'discord:server:joined',
    category: 'discord',
    weight: 0.5,
  },
]

async function main() {
  // Orbit Workspace
  await db.workspace.createMany({
    data: WORKSPACES,
  })

  // GitHub Repositories
  await db.repository.createMany({
    data: REPOSITORIES,
  })

  // Orbit ActivityTypes
  await db.activityType.createMany({
    data: ACTIVITY_TYPES,
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
