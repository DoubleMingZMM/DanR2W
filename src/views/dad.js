import React, { Component } from 'react';

import Child from './child';

export default class Dad extends Component {
  render() {
    return (
        <Child />
    );
  }
}
