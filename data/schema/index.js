import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import DistrictOfficeType from './types/districtOffice';

let store = {};

const StoreType = new GraphQLObjectType({
  name: 'Store',

  fields: {
    offices: {
      type: new GraphQLList(DistrictOfficeType),
      args: {
        id: { type: GraphQLString },
      },
      description: 'District offices optionaly identified by id field',
      resolve: (_, { id }) => {
        // call our db to resolve id
        let retObj;
        if (id !== undefined && id !== null) {
          retObj = [
            { id: 42,
            name: 'Ursynów' }];
        } else {
          retObj = [
            { id: 41,
            name: 'Wola' },
            { id: 42,
            name: 'Ursynów' }];
        } return retObj;
      },
    },
  },
});

const ncSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: StoreType,
        resolve: () => store,
      },
    }),
  }),

  // mutation:
});


module.exports = ncSchema;
