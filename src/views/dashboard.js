import React, { Component } from 'react';
import { connect } from 'react-redux';
import './dashboard.less';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.loginMain = this.loginMain.bind(this);
    this.screenChange = this.screenChange.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    let bgDiv = document.getElementById('main_bgt');
    let w = window.innerWidth;// 屏幕分辨率，高
    let h = window.innerHeight;// 屏幕分辨率，宽
    bgDiv.style.width = w + 'px';
    bgDiv.style.height = h + 'px';
    console.log(w);
    console.log(h);
    let cl = document.getElementsByClassName('fixes');
    for (let i = 0; i < cl.length; i++) {
      if (i === 15) {
        cl[i].style.cssText += 'top:' + w / 3.467 + 'px;';
        cl[i].style.cssText += 'left:' + h / 0.71 + 'px;';
      }
      if (i === 16) {
        cl[i].style.cssText += 'top:' + w / 2.93 + 'px;';
        cl[i].style.cssText += 'left:' + h / 0.84 + 'px;';
      }
    }
    this.screenChange();
  }

  screenChange() {
    window.addEventListener('resize', this.resize);
  }

  resize() {
    let bgDiv = document.getElementById('main_bgt');
    let w = window.innerWidth;// 屏幕分辨率，高
    let h = window.innerHeight;// 屏幕分辨率，宽
    bgDiv.style.width = w + 'px';
    bgDiv.style.height = h + 'px';
    console.log(w);
    console.log(h);
    let cl = document.getElementsByClassName('fixes');
    for (let i = 0; i < cl.length; i++) {
      if (i === 15) {
        cl[i].style.cssText += 'top:' + w / 3.467 + 'px;';
        cl[i].style.cssText += 'left:' + h / 0.71 + 'px;';
      }
      if (i === 16) {
        cl[i].style.cssText += 'top:' + w / 2.93 + 'px;';
        cl[i].style.cssText += 'left:' + h / 0.84 + 'px;';
      }
    }
  }

  loginMain(val) {
    console.log(val);
  }

  render() {
    const pics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    return (
        <div id="main_bgt" >
            {pics.map(v => {
              return <div key={v} className={`fixe_img${v}`} onClick={this.loginMain} />;
            })}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
