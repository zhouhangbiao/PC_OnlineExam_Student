import React from 'React';
import {Col, Row} from "antd";
import classnames from "classnames";
import style from "./Header.less";
import * as service from '../../services/commonServices';

/**
 * 头部组件
 */
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noLogout: this.props.noLogout
    }
  }

  /**
   * 清除用户缓存
   */
  clearUserInfoStorage = () => {
    localStorage.removeItem('StudentCode');
    localStorage.removeItem('SeatNumber');
    localStorage.removeItem('UserTrueName');
    localStorage.removeItem('UserFace');
    localStorage.removeItem('SchoolName');
    localStorage.removeItem('RoomName');
  };

  /**
   * 退出
   */
  logout = () => {
    let loading = layer.msg('退出中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    service.Logout({
      payload: {}
    }).then((res) => {
      layer.close(loading);

      if (res.ReturnEntity === 1) {
        layer.msg('退出成功', {icon: 1, time: 1000});
        this.clearUserInfoStorage();
        setTimeout(() => {
          window.location.href = '/onlineExamStudent/login.html';
        }, 1000);
      } else {
        layer.msg('退出失败', {icon: 2, time: 2000});
      }
    });
  };

  /**
   * 处理退出
   */
  handleLogout = () => {
    const that = this;

    layer.confirm('确定退出登录？', {
      btn: ['确定','取消']
    }, function(){
      that.logout();
    });
  };

  render() {
    return (
      <div className={style.headerBox}>
        <Row type="flex" justify="center" align="middle">
          <Col span={20}>
            <div className={style.personImg} style={{
              backgroundImage: `url(${localStorage.getItem('UserFace')})`,
            }} />
            <div className={style.infos}>
              <p>姓名：{localStorage.getItem('UserTrueName')}</p>
              <p>
                <span>准考证号：<i>{localStorage.getItem('StudentCode')}</i></span>
                <span>座位号：<i>{localStorage.getItem('SeatNumber')}</i></span>
                <span>考点：<i>{localStorage.getItem('SchoolName')}</i></span>
                <span>考场：<i>{localStorage.getItem('RoomName')}</i></span>
              </p>
            </div>
          </Col>
          <Col className={classnames(style.headerQuit, 'text-r')} span={4}>
            <a href="javascript: void(0)" style={{display: this.state.noLogout ? 'none' : 'inline'}} onClick={this.handleLogout}>退出</a>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Header
