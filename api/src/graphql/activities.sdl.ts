export const schema = gql`
  type Activity {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    activityTypeId: String!
    memberId: String!
    action: String!
    key: String!
    occurredAt: DateTime
    type: String!
    orbitUrl: String!
    weight: Float!
    gNumber: Int
    gHtmlUrl: String
    gCreatedAt: DateTime
    gId: Int
    repositoryId: String
    gStarredAt: DateTime
    gTitle: String
    gMerged: Boolean
    gMergedAt: DateTime
    gMergedBy: String
    gBody: String
    isPullRequest: Boolean
    tags: [String]!
    activityLink: String
    url: String
    activityType: ActivityType!
    member: Member!
    repository: Repository
  }

  type Query {
    activities: [Activity!]!
    activity(id: String!): Activity
  }

  input CreateActivityInput {
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    activityTypeId: String!
    memberId: String!
    action: String!
    key: String!
    occurredAt: DateTime
    type: String!
    orbitUrl: String!
    weight: Float!
    gNumber: Int
    gHtmlUrl: String
    gCreatedAt: DateTime
    gId: Int
    repositoryId: String
    gStarredAt: DateTime
    gTitle: String
    gMerged: Boolean
    gMergedAt: DateTime
    gMergedBy: String
    gBody: String
    isPullRequest: Boolean
    tags: [String]!
    activityLink: String
    url: String
  }

  input UpdateActivityInput {
    orbitSyncAt: DateTime
    orbitUpdatedAt: DateTime
    orbitId: Int
    activityTypeId: String
    memberId: String
    action: String
    key: String
    occurredAt: DateTime
    type: String
    orbitUrl: String
    weight: Float
    gNumber: Int
    gHtmlUrl: String
    gCreatedAt: DateTime
    gId: Int
    repositoryId: String
    gStarredAt: DateTime
    gTitle: String
    gMerged: Boolean
    gMergedAt: DateTime
    gMergedBy: String
    gBody: String
    isPullRequest: Boolean
    tags: [String]!
    activityLink: String
    url: String
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): Activity!
    updateActivity(id: String!, input: UpdateActivityInput!): Activity!
    deleteActivity(id: String!): Activity!
  }
`
