import { ApolloServer, gql } from 'apollo-server-micro';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { get } from '@/utils/common';

const typeDefs = gql`
  type Query {
    "Fetch metrobus balance"
    metrobus("Card number" user: String!): MetrobusResult!
    "Fetch prepaid Panapass balance"
    corredor("Prepaid Panapass number" user: String!): CorredorResult!
    "Fetch IDAAN balance"
    idaan("Account number" user: String!, "Account owner" name: String!): IDAANResult!
    "Fetch ENSA balance"
    ensa("Account number" user: String!, "Account password" pass: String!): LightResult!
    "Fetch Naturgy balance"
    naturgy("Account Username" user: String!, "Account password" pass: String!, "Account number" account: String): LightResult!
    "Fetch Cable Onda balance"
    cableonda("Account number" user: String!): CableOndaResult!
  }
  type Datetime {
    date: String!
    time: String
    type: String!
  }
  type MetrobusDetails {
    model: String!
    ksi: String!
    fechalogueoString: String!
  }
  type IDAANDetails {
    waste: String!
    water: String!
  }
  type CableOndaDetails {
    montoVencido30: String
    montoVencido60: String
    montoVencido90: String
    montoActual: String
  }
  type MetrobusResult {
    "Status of the operation: 'success' or 'error'"
    status: String!
    "Debug error message"
    msg: String
    "Account balance"
    balance: String
    "Date info"
    datetime: Datetime
    "Additional info"
    details: MetrobusDetails
  }
  type CorredorResult {
    "Status of the operation: 'success' or 'error'"
    status: String!
    "Debug error message"
    msg: String
    "Account balance"
    balance: String
  }
  type IDAANResult {
    "Status of the operation: 'success' or 'error'"
    status: String!
    "Debug error message"
    msg: String
    "Account balance"
    balance: String
    "Additional info"
    details: IDAANDetails
  }
  type LightResult {
    "Status of the operation: 'success' or 'error'"
    status: String!
    "Debug error message"
    msg: String
    "Error message"
    error_msg: String
    "Account balance"
    balance: String
    "Date info"
    datetime: Datetime
    "Account number"
    account: String
  }
  type CableOndaResult {
    "Status of the operation: 'success' or 'error'"
    status: String!
    "Debug error message"
    msg: String
    "Account balance"
    balance: String
    "Date info"
    datetime: Datetime
    "Additional info"
    details: CableOndaDetails
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
    ensa: async (parent, args, context) => {
      const url = 'http://localhost:3000/api/ptycards/v2/ensa';
      const response = await promiseWrapper(url, args);
      return JSON.parse(response);
    },
    naturgy: async (parent, args, context) => {
      const url = 'http://localhost:3000/api/ptycards/v2/naturgy';
      const response = await promiseWrapper(url, args);
      return JSON.parse(response);
    },
    cableonda: async (parent, args, context) => {
      const url = 'http://localhost:3000/api/ptycards/v2/cableonda';
      const response = await promiseWrapper(url, args);
      return JSON.parse(response);
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers, playground: true });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
