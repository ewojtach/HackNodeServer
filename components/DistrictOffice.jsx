import React from 'react';
import DistrictOfficeGroups from './DistrictOfficeGroups.jsx';
import DistrictOfficeContact from './DistrictOfficeContact.jsx';
import Relay from 'react-relay';
// import { Lokka } from 'lokka';
// import { Transport } from 'lokka-transport-http';

class DistrictOffice extends React.Component {
  constructor(props) {
    super(props);
  }


   render() {
     console.log ('props: '+JSON.stringify(this.props.store));
     return (<div id="district">
              <h2>Urzad dzielnicy {this.props.store.offices[0].name}</h2>
              <DistrictOfficeContact districtName={this.props.store.offices[0].name}/>
              <DistrictOfficeGroups groups={this.props.store.offices[0].groups}/>
            </div>);
   }
        //      <DistrictOfficeGroups/>
}

DistrictOffice = Relay.createContainer(DistrictOffice, {
  // data requirements
  fragments: {
    store: () => Relay.QL `fragment on Store { offices { name,
        groups { ${DistrictOfficeGroups.getFragment('groups')} } } }`,
  },
});

export default DistrictOffice;
