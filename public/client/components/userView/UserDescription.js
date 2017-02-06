import React from 'react';
import dummydata from './../dummydata/userViewData';

export default class UserDescription extends React.Component {
  constructor(props) {
    // console.log('props', props);
    super(props);
    this.state = {
      name: '',
      team: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      this.setState({name: nextProps.user.name});
      this.setState({team: nextProps.user.team});
    }
  }

  render() {
    return (
      <div id='UserDescription'>
        <div id='username'><h3>{this.state.name}</h3></div>
        <div id='team'>Team: {this.state.team}</div>
      </div>
    )
  }
}

// temp removing userpicture
// <div id='userpic'><img height='100' width='75' src={dummydata.userpic}/></div>