import { gql } from 'deps';

const typeDefs = gql`
  type Mutation {
    store_cbv(cbv: toBeStoreCBV): String!
  }
  input toBeStoreCBV {
    title: String!
    short_description: String!
    cbv_id: String!
    blockchain: String!
    version_affected: String!
    component: String!
    severity: String!
    vulnerability_type: String!
    details: String!
    recommendation: String!
    references: String!
    labels: String!
    tests: String!
    aditional_comments: String!
    created_at: String!
    updated_at: String!
    api_key: String!
  }
  type Query {
    find_all_cbv: [StoreCBV],
    find_by_id(_id: String): StoreCBV,
    find_by_blockchain(blockchain: [String]): [StoreCBV],
    find_by_cbv_code(cbv_id: String): StoreCBV,
  }
  type CBV {
    title: String
    short_description: String
    cbv_id: String
    blockchain: String
    version_affected: String
    component: String
    severity: String
    vulnerability_type: String
    details: String
    recommendation: String
    references: String
    labels: String
    tests: String
    aditional_comments: String
    created_at: String
    updated_at: String
  }
  type StoreCBV {
    _id: String
    cbv: CBV
  }
`;

export { typeDefs };

