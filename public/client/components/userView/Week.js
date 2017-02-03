import React from 'react';
import Star from './Star.js';

export default class Week extends React.Component {

  renderStars() {
    var arr = [];
    for(var i = 0; i < this.props.weekInfo.stars; i++) {
      arr.push( <Star key={i}/> );
    }
    return arr;
  }

  render() {
    return (
      <div className='Week'>
        <div className='weekDates'><p>Jan 31 - Feb 5</p></div>
        <div className='stars'>
          {this.renderStars()}
        </div>
      </div>
    )
  }
}