import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import DButton from '@/components/DButton/index';
// import DIcon from '@/components/DIcon/index';
import DInput from '@/components/DInput/index';
import { Input } from 'antd';
const Search = Input.Search;
const DSearch = DInput.DSearch;

export default class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      value: 'value'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleClick() {
    console.log(22222222222);
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
    const { loading, value } = this.state;

    return (
      <div style={{ color: this.context.color }}>
          我是child
        <div style={{width: 400}}>
          <DSearch
            // disabled
            // addonAfter="addonAfter"
            addonBefore="addonBefore"
            // searchIconType="close-circle"
            // enterButton="Search"
            // searchText="搜索"
            // size="small"
            // style={{color: 'red'}}
            // value={value}
            // onChange={this.handleChange}
            // type="link"
            defaultValue={value}
            placeholder="input search text"
            // prefix="prefix"
            size="large"
            style={{color: 'red'}}
            // suffix="suffix"
            onSearch={value => console.log(value)}
          />
          <div style={{marginBottom: 20}} />
          <DInput
            value={value}
          />
          <div style={{marginBottom: 20}} />
          <Search
            // disabled
            addonAfter="addonAfter"
            addonBefore="addonBefore"
            className="aaaaa"
            defaultValue={value}
            enterButton="Searcsh"
            placeholder="input search text"
            prefix="prefix"
            size="large"
            style={{color: 'red'}}
            suffix="suffix"
            value={value}
            onChange={this.handleChange}
            onSearch={value => console.log(value)}
          />
        </div>
      </div>
    );
  }
}

Child.propTypes = {
  // 也可以写成静态方式
  color: PropTypes.string
};
