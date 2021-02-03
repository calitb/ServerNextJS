import { ApolloServer, gql } from 'apollo-server-micro';

import { get } from '@/utils/common';

const typeDefs = gql`
  type Query {
    metrobus(user: String!): Result!
    corredor(user: String!): Result!
    idaan(user: String!, name: String!): Result!
  }
  type Datetime {
    date: String!
    time: String
    type: String!
  }
  type Details {
    model: String
    ksi: String
    fechalogueoString: String
    waste: String
    water: String
    montoVencido30: String
    montoVencido60: String
    montoActual: String
    numCuenta: String
  }
  type Result {
    """
    Status of the operation: 'success' or 'error'
    """
    status: String!
    """
    Error message
    """
    msg: String
    """
    Account balance
    """
    balance: String
    """
    Date info
    """
    datetime: Datetime
    """
    Additional info
    """
    details: Details
  }
`;

const promiseWrapper = (url: string, params: Record<string, any>): Promise<string> => {
  return new Promise((resolve, reject) => {
    get(url, params, undefined, undefined, (response) => {
      resolve(response);
    });
  });
};

const resolvers = {
  Query: {
    metrobus: async (parent, args, context) => {
      const url = 'http://localhost:3000/api/ptycards/v2/metrobus';
      const response = await promiseWrapper(url, args);
      return JSON.parse(response);
    },
    corredor: async (parent, args, context) => {
      const url = 'http://localhost:3000/api/ptycards/v2/corredor';
      const response = await promiseWrapper(url, args);
      return JSON.parse(response);
    },
    idaan: async (parent, args, context) => {
      const url = 'http://localhost:3000/api/ptycards/v2/idaan';
      const response = await promiseWrapper(url, args);
      return JSON.parse(response);
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
