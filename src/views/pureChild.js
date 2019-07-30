import React, { Component } from 'react';

export default class PureChild extends Component {

  // shouldComponentUpdate() {
  //   return true;
  // }

  componentWillReceiveProps(nextPros, preState) {

  }

  render() {
    console.log('pureChild=======>start');
    return (
      <div>
        <div>purechild</div>
      </div>
    );
  }
}

