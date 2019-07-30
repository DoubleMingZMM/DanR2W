import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PureChild from './pureChild';

export default class Pure extends PureComponent {

  // shouldComponentUpdate() {
  //   return true;
  // }

  componentWillReceiveProps(nextPros, preState) {

  }

  render() {
    const { name, age, sex, relation } = this.props;
    console.log('pure=======>start');
    return (
      <div>
        <div>{name}</div>
        <div>{age}</div>
        <div>{sex}</div>
        <div>{relation.join()}</div>
        <PureChild />
      </div>
    );
  }
}

Pure.propTypes = {
  // 也可以写成静态方式
  name: PropTypes.string,
  age: PropTypes.number,
  sex: PropTypes.string,
  relation: PropTypes.array,
};
