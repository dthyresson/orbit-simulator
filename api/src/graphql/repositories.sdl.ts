export const schema = gql`
  type Repository {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    name: String!
    owner: String!
    fullName: String!
    activities: [Activity]!
    workspaces: [Workspace]!
  }

  type Query {
    repositories: [Repository!]!
    repository(id: String!): Repository
  }

  input CreateRepositoryInput {
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    name: String!
    owner: String!
    fullName: String!
  }

  input UpdateRepositoryInput {
    orbitSyncAt: DateTime
    orbitUpdatedAt: DateTime
    orbitId: Int
    name: String
    owner: String
    fullName: String
  }

  type Mutation {
    createRepository(input: CreateRepositoryInput!): Repository!
    updateRepository(id: String!, input: UpdateRepositoryInput!): Repository!
    deleteRepository(id: String!): Repository!
  }
`
