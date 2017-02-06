import React from 'react';
import ChangeUnits from './ChangeUnits';
import SubmitUnits from './SubmitUnits';
import DropdownSelector from './DropdownSelector';
import axios from 'axios';

export default class LoggingExercise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      units: 0,
      currentRound: null,
      currentExercise: null,
      currentExUnit: null
    }
    this.unitChange = this.unitChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== null) {

      // Variables to represent the current round & exercise via received props
      var currEx = nextProps.rounds[nextProps.rounds.length - 1].exercise;
      var currRound = nextProps.rounds[nextProps.rounds.length - 1].name;

      this.setState({currentRound: currRound, currentExercise: currEx});

      console.log(nextProps.exercise);
      // Get the unit measure for the current exercise
      for (var i = 0; i < nextProps.exercise.length; i++) {
        if (nextProps.exercise[i].name === currEx) {
          this.setState({currentExUnit: nextProps.exercise[i].unit});
          return;
        }
      }
    }
  }

  unitChange(type) {
    if (type === '-' && this.state.units > 0) {
      this.setState({units: this.state.units - 1});
    } else if (type === '+') {
      this.setState({units: this.state.units + 1});
    }
  }

  submitClick(data) {

    var user = this.props.currentUser.username;
    var units = this.state.units;
    var currentScores = this.props.currentUser.scores;

    // Change user's in-state scores array: increment last element (current round's score)
    currentScores[currentScores.length - 1] += units;

    // Post scores back to database
    axios.post('/api/users/' + user + '/scores', {'scores': currentScores});
    console.log('Updated scores for', user, 'posted to database!');

    // reset visible unit counter back to 0
    this.setState({units: 0});
  }

  render() {
    return (
      <div className="text-center">
        <div className="exercise-info">
          <div>Current Round: {this.state.currentRound}</div>
          <div>Current Exercise: {this.state.currentExercise}</div>
        </div>
        <div className="exercise-info">Exercise Unit: {this.state.currentExUnit}</div>
        <table className="table">
          <tbody>
            <tr>
              <td><ChangeUnits onClick={this.unitChange} type={'-'} /></td>
              <td><div className="unit-display">{ this.state.units }</div> </td>
              <td><ChangeUnits onClick={this.unitChange} type={'+'} /></td>
            </tr>
          </tbody>
        </table>
        <div>
          <SubmitUnits onClick={this.submitClick} data={this.state.units}/>
        </div>
      </div>
    )
  }
}