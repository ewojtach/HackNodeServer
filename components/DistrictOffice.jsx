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

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({ limit: newLimit });
  }


   render() {
     console.log ('props: '+JSON.stringify(this.props.store));
     return (<div id="district">
              <h2>Urzad dzielnicy {this.props.store.offices[0].name}</h2>
              <DistrictOfficeContact districtName={this.props.store.offices[0].name}/>
              <select onChange={this.setLimit}>
                <option value="5">5</option>
                <option value="10" selected >10</option>
              </select>
              <DistrictOfficeGroups groups={this.props.store.offices[0].groupConnection.edges}/>
            </div>);
   }
        //      <DistrictOfficeGroups/>
}

DistrictOffice = Relay.createContainer(DistrictOffice, {
  initialVariables: {
    limit: 10,
  },
  // data requirements
  fragments: {
    store: () => Relay.QL `fragment on Store { offices { name,
        # fetch 5 groups only
        groupConnection(first: $limit) { edges { ${DistrictOfficeGroups.getFragment('groups')}} } } }`,
  },
});

export default DistrictOffice;
