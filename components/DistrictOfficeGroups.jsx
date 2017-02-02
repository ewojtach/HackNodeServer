import React from 'react';
import Group from './Group.jsx';
import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';
import Relay from 'react-relay';

class DistrictOfficeGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      groups: [],
    };
  }
/*
  componentWillMount() {
    this.fetchGroups();
  }

  fetchGroups() {
    const client = new Lokka({
      transport: new Transport('http://localhost:6001/graphql'),
    });

    console.log(Relay.QL `query { offices { name, groups { nazwaGrupy } } }`);


    client.query(`
			{
			  offices{
			   name,
			   groups{
			    nazwaGrupy
			  }
		   }
			}
		`).then(result => {
  let groupList;
  console.log(JSON.stringify(result));
  groupList = result.offices[0].groups;
  console.log('groups: ' + JSON.stringify(groupList));

  this.setState({ groupList });
  // this.state.gropuList = groupList;
  console.log('groups from state: ' + this.state.groupList[0].nazwaGrupy);
		});
  }
  */

  render() {
  //  console.log ('groups props: '+JSON.stringify(this.props));
    // everything now will be in props.store and managed by relay
    for (let i = 0; i < this.props.groups.length; i++) {
      this.state.groups.push(
        <Group groupName = {this.props.groups[i].node.nazwaGrupy}/>
      );
    }

    return (<div>{this.state.groups}</div>);
  }
}

DistrictOfficeGroups = Relay.createContainer(DistrictOfficeGroups, {
  // data requirements
  fragments: {
    groups: () => Relay.QL `fragment on GroupEdge @relay(plural: true)  { node { nazwaGrupy }  }`,
  },
});

export default DistrictOfficeGroups;
