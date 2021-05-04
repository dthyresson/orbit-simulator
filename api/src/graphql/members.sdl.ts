export const schema = gql`
  type Member {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    deletedAt: DateTime
    activitiesCount: Int!
    avatarUrl: String
    bio: String
    birthday: String
    company: String
    firstActivityOccurredAt: DateTime
    lastActivityOccurredAt: DateTime
    mergedAt: DateTime
    location: String
    name: String
    orbitLevel: Int!
    pronouns: String
    reach: Int
    shippingAddress: String
    slug: String!
    source: String!
    tagList: [String]!
    tags: [String]!
    teammate: Boolean!
    tshirt: String
    url: String
    orbitUrl: String!
    created: Boolean!
    love: Float
    twitter: String
    github: String
    discourse: String
    email: String
    devto: String
    linkedin: String
    githubFollowers: Int
    twitterFollowers: Int
    topics: [String]!
    languages: [String]!
    activities: [Activity]!
    identities: [Identity]!
    identitiesCount: Int!
    workspaces: [Workspace]!
  }

  type Query {
    members: [Member!]!
    member(id: String!): Member
  }

  input CreateMemberInput {
    orbitSyncAt: DateTime!
    orbitUpdatedAt: DateTime!
    orbitId: Int!
    deletedAt: DateTime
    activitiesCount: Int!
    avatarUrl: String
    bio: String
    birthday: String
    company: String
    firstActivityOccurredAt: DateTime
    lastActivityOccurredAt: DateTime
    mergedAt: DateTime
    location: String
    name: String
    orbitLevel: Int!
    pronouns: String
    reach: Int
    shippingAddress: String
    slug: String!
    source: String!
    tagList: [String]!
    tags: [String]!
    teammate: Boolean!
    tshirt: String
    url: String
    orbitUrl: String!
    created: Boolean!
    love: Float
    twitter: String
    github: String
    discourse: String
    email: String
    devto: String
    linkedin: String
    githubFollowers: Int
    twitterFollowers: Int
    topics: [String]!
    languages: [String]!
    identitiesCount: Int!
  }

  input UpdateMemberInput {
    orbitSyncAt: DateTime
    orbitUpdatedAt: DateTime
    orbitId: Int
    deletedAt: DateTime
    activitiesCount: Int
    avatarUrl: String
    bio: String
    birthday: String
    company: String
    firstActivityOccurredAt: DateTime
    lastActivityOccurredAt: DateTime
    mergedAt: DateTime
    location: String
    name: String
    orbitLevel: Int
    pronouns: String
    reach: Int
    shippingAddress: String
    slug: String
    source: String
    tagList: [String]!
    tags: [String]!
    teammate: Boolean
    tshirt: String
    url: String
    orbitUrl: String
    created: Boolean
    love: Float
    twitter: String
    github: String
    discourse: String
    email: String
    devto: String
    linkedin: String
    githubFollowers: Int
    twitterFollowers: Int
    topics: [String]!
    languages: [String]!
    identitiesCount: Int
  }

  type Mutation {
    createMember(input: CreateMemberInput!): Member!
    updateMember(id: String!, input: UpdateMemberInput!): Member!
    deleteMember(id: String!): Member!
  }
`
