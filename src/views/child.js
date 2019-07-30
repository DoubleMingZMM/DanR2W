import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DButton from '@/components/DButton/index';
// import DIcon from '@/components/DIcon/index';
import DInput from '@/components/DInput/index';
import DSelect from '@/components/DSelect/index';
import Pure from './pure';
import DErrorBoundary from '@/components/DErrorBoundary/index';

import { Select } from 'antd';
// const Search = Input.Search;
// const DSearch = DInput.DSearch;
const DOption = DSelect.DOption;
const Option = Select.Option;

export default class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      value: 'value',
      className: 'aaaaaa',
      age: 26,
      relation: ['double', 'zmm']
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleClick() {
    this.setState({
      age: this.state.age - 1
    });
  }

  handleClick1() {
    this.state.relation.push('sssss');
    this.setState({
      relation: this.state.relation
    });
  }

  handleLoading() {
    this.setState({
      // loading: !this.state.loading
      loading: {delay: 5}
    });
  }

  handleEnter = (e) => {
    console.log(e.keyCode);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { loading, value, className, age, relation } = this.state;
    
    // if (value === 'ddd') {
    //   throw new Error('I crashed!');
    // }
    const pureProps = {
      name: 'daniel',
      age,
      sex: 'male',
      relation
    };

    return (
      <DErrorBoundary>
        <div style={{ color: this.context.color }}>
          我是child
          <DButton
            type="primary"
            onClick={this.handleClick}
          >
          按钮age
          </DButton>
          <DButton
            type="primary"
            onClick={this.handleClick1}
          >
          按钮relation
          </DButton>
          <div style={{width: 400}}>
            {/* <DSelect value={value}>
              <DOption />
            </DSelect> */}
            <div style={{marginBottom: 20}} />
            {/* <Select defaultValue="lucy"
              style={{ width: 120 }}
          >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select> */}

            {/* <DInput
              defaultValue="default"
              value={value}
              onChange={this.handleChange}
            /> */}
            <Pure {...pureProps} />
          </div>
        </div>
      </DErrorBoundary>
    );
  }
}

Child.propTypes = {
  // 也可以写成静态方式
  color: PropTypes.string
};
