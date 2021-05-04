export const schema = gql`
  type Webhook {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    slug: String!
    endpoint: String!
    payload: [Payload]!
  }

  type Query {
    webhooks: [Webhook!]!
    webhook(id: String!): Webhook
  }

  input CreateWebhookInput {
    name: String!
    slug: String!
    endpoint: String!
  }

  input UpdateWebhookInput {
    name: String
    slug: String
    endpoint: String
  }

  type Mutation {
    createWebhook(input: CreateWebhookInput!): Webhook!
    updateWebhook(id: String!, input: UpdateWebhookInput!): Webhook!
    deleteWebhook(id: String!): Webhook!
    simulateWebhook(slug: String!): Webhook
  }
`
