import React, { Component } from 'react';
import { Clock } from './Clock';



export class ClockWrapper extends Component {

  render() {

    return (
      <div className="time76">
        <Clock
          timeOffset={this.props.timeOffset}
          size={this.props.size} />
        <span>{this.props.city}</span>
      </div>
    )

  }

}