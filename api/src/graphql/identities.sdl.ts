export const schema = gql`
  type Identity {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    identityType: IdentityType!
    memberId: String
    orbitId: Int!
    email: String
    username: String
    name: String
    source: String!
    sourceHost: String
    uid: String
    member: Member
  }

  enum IdentityType {
    DEVTO_IDENTITY
    DISCORD_IDENTITY
    DISCOURSE_IDENTITY
    EMAIL_IDENTITY
    GITHUB_IDENTITY
    LINKEDIN_IDENTITY
    SLACK_IDENTITY
    TWITTER_IDENTITY
    UNKNOWN_IDENTITY
  }

  type Query {
    identities: [Identity!]!
  }

  input CreateIdentityInput {
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    identityType: IdentityType!
    memberId: String
    orbitId: Int!
    email: String
    username: String
    name: String
    source: String!
    sourceHost: String
    uid: String
  }

  input UpdateIdentityInput {
    orbitSyncAt: DateTime
    orbitUpdatedAt: DateTime
    identityType: IdentityType
    memberId: String
    orbitId: Int
    email: String
    username: String
    name: String
    source: String
    sourceHost: String
    uid: String
  }
`
