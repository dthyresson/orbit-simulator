export const schema = gql`
  type Payload {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    webhook: Webhook!
    webhookId: String!
    body: JSON!
  }

  type Query {
    payloads: [Payload!]!
    payload(id: String!): Payload
  }

  input CreatePayloadInput {
    webhookId: String!
    body: JSON!
  }

  input UpdatePayloadInput {
    webhookId: String
    body: JSON
  }

  type Mutation {
    createPayload(input: CreatePayloadInput!): Payload!
    updatePayload(id: String!, input: UpdatePayloadInput!): Payload!
    deletePayload(id: String!): Payload!
  }
`
