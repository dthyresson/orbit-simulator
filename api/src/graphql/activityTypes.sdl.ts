export const schema = gql`
  type ActivityType {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    name: String!
    shortName: String!
    key: String!
    category: String!
    deletedAt: DateTime
    weight: Float!
    activities: [Activity]!
  }

  type Query {
    activityTypes: [ActivityType!]!
    activityType(id: String!): ActivityType
  }

  input CreateActivityTypeInput {
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    name: String!
    shortName: String!
    key: String!
    category: String!
    deletedAt: DateTime
    weight: Float!
  }

  input UpdateActivityTypeInput {
    orbitSyncAt: DateTime
    orbitUpdatedAt: DateTime
    orbitId: Int
    name: String
    shortName: String
    key: String
    category: String
    deletedAt: DateTime
    weight: Float
  }

  type Mutation {
    createActivityType(input: CreateActivityTypeInput!): ActivityType!
    updateActivityType(
      id: String!
      input: UpdateActivityTypeInput!
    ): ActivityType!
    deleteActivityType(id: String!): ActivityType!
  }
`
