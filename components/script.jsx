import React from 'react';
import ReactDOM from 'react-dom';
import DistrictOffice from './DistrictOffice.jsx';
import Relay from 'react-relay';
// let DistrictOfficeContact = require('./DistrictOfficeContact.jsx');
// let Group = require('./Group.jsx');
// let DistrictOfficeGroups = require('./DistrictOfficeGroups.jsx');
// let DistrictOffice = require('./DistrictOffice.jsx');

class HomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL `
      query MainQuery {
        store {
          ${Component.getFragment('store')}
        }
      }
    `,
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={DistrictOffice}
    route={new HomeRoute()}
    />,
    document.getElementById('sampleQueueView')
);
