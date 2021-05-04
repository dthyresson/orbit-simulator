export const schema = gql`
  type Workspace {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    name: String!
    slug: String!
    members: [Member]!
    repositories: [Repository]!
  }

  type Query {
    workspaces: [Workspace!]!
    workspace(id: String!): Workspace
  }

  input CreateWorkspaceInput {
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    name: String!
    slug: String!
  }

  input UpdateWorkspaceInput {
    orbitSyncAt: DateTime
    orbitUpdatedAt: DateTime
    orbitId: Int
    name: String
    slug: String
  }

  type Mutation {
    createWorkspace(input: CreateWorkspaceInput!): Workspace!
    updateWorkspace(id: String!, input: UpdateWorkspaceInput!): Workspace!
    deleteWorkspace(id: String!): Workspace!
  }
`
