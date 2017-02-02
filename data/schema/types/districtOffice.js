import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  connectionFromPromisedArray, // for db call
} from 'graphql-relay';

import GroupType from './group';
import ContactInfoType from './contactInfo';

const groupConnection = connectionDefinitions({
  name: 'Group',
  nodeType: GroupType,
});

module.exports = new GraphQLObjectType({
  name: 'DistrictOfficeType',

  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    contactInfo: {
      type: ContactInfoType,
      resolve: () => {
        // call local db

        return {
          address: '15, Warszawa',
          openingHours: '8-16',
          email: 'ursynow@um.warszawa.pl',
          phone: '22-366-12-34',
        };
      },
    },
    groupConnection: {
      type: groupConnection.connectionType,
      args: connectionArgs, // first:... last:...  dla wolania db, bedzie limit(args.first) + promise przy connection
      resolve: (_, args) => connectionFromArray([
        // call um data api [
        {
          'status': '1',
          'czasObslugi': '00:04',
          'lp': '1',
          'idGrupy': '0',
          'liczbaCzynnychStan': 3,
          'nazwaGrupy': 'Meldunki i dowody',
          'literaGrupy': 'A',
          'liczbaKlwKolejce': 0,
          'aktualnyNumer': 89,
        },
        {
          'status': '1',
          'czasObslugi': '00:09',
          'lp': '1',
          'idGrupy': '0',
          'liczbaCzynnychStan': 3,
          'nazwaGrupy': 'Program 500+',
          'literaGrupy': 'P',
          'liczbaKlwKolejce': 0,
          'aktualnyNumer': 89,
        },
        {
          'status': '1',
          'czasObslugi': '00:02',
          'lp': '1',
          'idGrupy': '0',
          'liczbaCzynnychStan': 3,
          'nazwaGrupy': 'Dowody rejestracyjne',
          'literaGrupy': 'R',
          'liczbaKlwKolejce': 0,
          'aktualnyNumer': 89,
        },
        {
          'status': '1',
          'czasObslugi': '00:09',
          'lp': '1',
          'idGrupy': '0',
          'liczbaCzynnychStan': 3,
          'nazwaGrupy': 'Paszporty - wnioski',
          'literaGrupy': 'W',
          'liczbaKlwKolejce': 0,
          'aktualnyNumer': 89,
        },
        {
          'status': '1',
          'czasObslugi': '00:07',
          'lp': '1',
          'idGrupy': '0',
          'liczbaCzynnychStan': 3,
          'nazwaGrupy': 'Paszporty - wydawanie',
          'literaGrupy': 'H',
          'liczbaKlwKolejce': 0,
          'aktualnyNumer': 89,
        },
        {
          'status': '1',
          'czasObslugi': '00:12',
          'lp': '1',
          'idGrupy': '0',
          'liczbaCzynnychStan': 3,
          'nazwaGrupy': 'Odpady komunalne',
          'literaGrupy': 'Z',
          'liczbaKlwKolejce': 0,
          'aktualnyNumer': 89,
        },
        {
          'status': '1',
          'czasObslugi': '00:05',
          'lp': '1',
          'idGrupy': '0',
          'liczbaCzynnychStan': 3,
          'nazwaGrupy': 'Sprawy inne',
          'literaGrupy': 'S',
          'liczbaKlwKolejce': 0,
          'aktualnyNumer': 89,
        },
        {
          'status': '1',
          'czasObslugi': '00:04',
          'lp': '2',
          'idGrupy': '0',
          'liczbaCzynnychStan': 1,
          'nazwaGrupy': 'Wydawanie dowod\u00f3w osobistych',
          'literaGrupy': 'B',
          'liczbaKlwKolejce': 0,
          'aktualnyNumer': 82,
        },
      ], args),
    },
  },

});
