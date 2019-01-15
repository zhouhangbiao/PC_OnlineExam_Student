import React from "React";
import {Col, Row, Button, Form, Icon, Input, Modal} from "antd";
import classnames from "classnames";
import cookie from '../utils/cookie';
import style from './Login.less';
import * as service from '../services/commonServices';
import encrypt from '../utils/encrypt';

const FormItem = Form.Item;
const MacAddress = cookie.get('MacAddress') !== 'undefined' ? cookie.get('MacAddress') : 'Mac 地址读取异常';
const IpAddress = cookie.get('IpAddress') !== 'undefined' ? cookie.get('IpAddress') : 'Ip 地址读取异常';
const SeatNumber = cookie.get('SeatNumber') !== 'undefined' ? cookie.get('SeatNumber') : '?';
const bindErrMsg = {
  0: "绑定失败",
  2: "座位号重复"
};
const loginErrMsg = {
  2: "用户名或密码不匹配",
  3: "没有权限",
  4: "被禁用",
  5: "座位号不一致",
  6: "系统暂未开放",
  7: "你已迟到超过规定时间，禁止考试",
  9: "当前没有待考试场次，请确认开考时间，或咨询监考老师"
};

/**
 * 是否在绑定座位号后自动登录（已经通过登录表单验证）
 * @type {boolean}
 */
let autoLogin = false;

/**
 * 自动聚焦绑定座位号
 */
function autoFocusSeatNumber() {
  $('#SeatNumber').focus();

  setTimeout(function () {
    if (!$('#SeatNumber').is(":focus")) {
      autoFocusSeatNumber();
    }
  }, 100);
}

/**
 * 自动聚焦密码
 */
function autoFocusPassword() {
  $('#Password').focus();

  setTimeout(function () {
    if (!$('#Password').is(":focus")) {
      autoFocusPassword();
    }
  }, 100);
}

/**
 * 登录（需要绑定座位号）
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      systemName: "",
      terminalName: "",
      systemLogo: "",
      visible: false,
      seatNumber: SeatNumber,
      studentCodeTips: '准考证号：绑定座位号后自动识别',
      studentCode: '',
      disable: false,
      disableBind: false,
    };

    this.getSystemInfo();

    if (SeatNumber !== '?') {
      this.getStudentCode(SeatNumber).then(this.setStudentCode);
    }
  }

  /**
   * 设置系统缓存
   */
  setSystemInfoStorage = (info) => {
    localStorage.setItem('SystemName', info.SystemName);
    localStorage.setItem('TerminalName', info.TerminalName);
    localStorage.setItem('SystemLogo', info.SystemLogo);
    localStorage.setItem('Copyright', info.Copyright);
  };

  /**
   * 获取配置信息
   */
  getSystemInfo = () => {
    let loading = layer.msg('加载中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    service.GetSystemInfo({
      payload: {
        "FromType": 2
      }
    }).then((res) => {
      layer.close(loading);

      if (res.ReturnEntity) {
        this.setSystemInfoStorage(res.ReturnEntity);
        this.setState({
          systemName: res.ReturnEntity.SystemName,
          terminalName: res.ReturnEntity.TerminalName,
          systemLogo: res.ReturnEntity.SystemLogo,
        });
      }
    });
  };

  /**
   * 获取秘钥
   */
  getSecretKey = () => {
    let loading = layer.msg('获取中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    return new Promise((resolve) => {
      service.GetSecretKey({
        payload: {
          "Key": this.props.form.getFieldValue('StudentCode')
        }
      }).then((res) => {
        layer.close(loading);

        resolve(res.ReturnEntity.SecretKey);
      });
    });
  };

  /**
   * 获取准考证号
   * @param {Number} seatNumber
   */
  getStudentCode = (seatNumber) => {
    let loading = layer.msg('获取准考证号中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    return new Promise((resolve) => {
      service.GetStudentCode({
        payload: {
          "SeatNumber": seatNumber
        }
      }).then((res) => {
        layer.close(loading);

        if (res.ReturnEntity !== '') {
          resolve(res.ReturnEntity);
        } else {
          this.setState({
            studentCodeTips: '准考证号：当前无考试或座位号有误'
          });
        }
      });
    });
  };

  /**
   * 设置准考证号
   * @param {String} studentCode
   */
  setStudentCode = (studentCode) => {
    this.props.form.setFieldsValue({'StudentCode': studentCode});
  };

  /**
   * 设置用户缓存
   */
  setUserInfoStorage = (info) => {
    localStorage.setItem('StudentCode', info['StudentCode']);
    localStorage.setItem('SeatNumber', this.state.seatNumber);
    localStorage.setItem('UserTrueName', info['ReturnEntity'].UserTrueName);
    localStorage.setItem('UserFace', info['ReturnEntity'].UserFace);
    localStorage.setItem('SchoolName', info['ReturnEntity'].SchoolName);
    localStorage.setItem('RoomName', info['ReturnEntity'].RoomName);
  };

  /**
   * 登录
   */
  login = () => {
    let loading = layer.msg('登录中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    this.setState({
      disable: true,
    });

    this.getSecretKey().then((token) => {
      service.Login({
        payload: {
          "SeatNumber": this.state.seatNumber,
          "StudentCode": this.props.form.getFieldValue('StudentCode'),
          "Password": encrypt.encryptByTripleDES(encrypt.encryptByMD5(this.props.form.getFieldValue('Password')), token),
        }
      }).then((res) => {
        layer.close(loading);

        if (res.ReturnEntity.LoginStatus === 1) {
          layer.msg('登录成功', {icon: 1, time: 1000});
          this.setUserInfoStorage({
            'StudentCode': this.props.form.getFieldValue('StudentCode'),
            'ReturnEntity': res.ReturnEntity
          });
          setTimeout(() => {
            window.location.href = '/onlineExamStudent/attention.html';
          }, 2000);
        } else {
          this.setState({
            disable: false,
          });

          layer.msg(loginErrMsg[res.ReturnEntity.LoginStatus], {icon: 2, time: 2000});
        }
      });
    });
  };

  /**
   * 绑定座位号
   */
  bindSeatNumber = () => {
    let loading = layer.msg('锁定中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    this.setState({
      disableBind: true,
    });

    return new Promise((resolve) => {
      service.BandingSeat({
        payload: {
          "MacAddress": MacAddress,
          "SeatNumber": this.props.form.getFieldValue('SeatNumber'),
          "IpAddress": IpAddress
        }
      }).then((res) => {
        const seatNumber = this.props.form.getFieldValue('SeatNumber');

        layer.close(loading);
        if (res.ReturnEntity === 1) {
          cookie.set('SeatNumber', seatNumber);
          this.setState({
            seatNumber: seatNumber
          });
          layer.msg('绑定座位号成功', {icon: 1, time: 2000});
          setTimeout(() => {
            resolve(seatNumber);
            this.setState({
              visible: false,
              disableBind: false,
            }, autoFocusPassword);
            if (autoLogin) {
              this.login();
            }
          }, 2000);
        } else {
          this.setState({
            disableBind: false,
          });

          layer.msg(bindErrMsg[res.ReturnEntity], {icon: 2, time: 2000});
        }
      });
    });
  };

  /**
   * 提交登录信息
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields(['StudentCode', 'Password'], (err) => {
      if (err) {
        return false;
      } else {
        if (this.state.seatNumber === '?') {
          autoLogin = true;
          layer.msg('请先绑定座位号', {icon: 7, shade: 0.3, time: 1000});
          setTimeout(() => {
            this.setState({
              visible: true
            }, autoFocusSeatNumber);
          }, 1000);
          return false;
        }
        this.login();
      }
    });
  };

  /**
   * 回车绑定座位号
   * @param event
   */
  handleKeyDown = (event) => {
    if (this.state.disableBind) {
      return false;
    }
    if (event.keyCode === 13) {
      this.setSeatNumber();
    }
  };

  /**
   * 显示设置座位号模态框
   */
  showModal = () => {
    if (this.state.seatNumber === '?') {
      this.setState({
        visible: true,
      }, autoFocusSeatNumber);
    }
  };

  /**
   * 关闭设置座位号模态框
   */
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 设置座位号
   */
  setSeatNumber = () => {
    this.props.form.validateFields(['MacAddress', 'SeatNumber'], (err) => {
      if (err) {
        return false;
      } else {
        this.bindSeatNumber().then(this.getStudentCode).then(this.setStudentCode);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    let rules = {
      "StudentCode": [
        {required: true, message: '准考证号不能为空'},
        {max: 50, message: '最多输入50个字符'},
      ],
      "Password": [
        {required: true, message: '密码不能为空'},
        {max: 50, message: '最多输入50个字符'},
      ],
      "MacAddress": [
        {required: true, message: 'mac地址不能为空'},
      ],
      "SeatNumber": [
        {required: true, message: '请输入机房座位号'},
        {max: 3, message: '最多输入3位数字'},
        {pattern: /^\d*$/, message: '只能是数字'},
      ],
    };
    return (
      <div className={style.loginWrap}>
        <Row className={style.headerBox} type="flex" justify="center" gutter={24}>
          <Col span={12}>
            <a className={style.logo}>
              <img src={this.state.systemLogo} />
            </a>
            <h2>{this.state.systemName}</h2>
          </Col>
          <Col className="text-r" span={12}>
            <span className="h4">座位号：</span>
            <span className={classnames(style.orderIndex, "font-prompt h2","text-c")} onClick={this.showModal}>{this.state.seatNumber}</span>
          </Col>
        </Row>
        <div className={style.loginBox}>
          <div className={style.login}>
            <h2>{this.state.terminalName}登录</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('StudentCode', {
                  rules: rules['StudentCode'],
                })(
                  <Input className="h3"
                         prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.5)'}}/>}
                         placeholder={this.state.studentCodeTips}
                         disabled={true}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('Password', {
                  rules: rules['Password'],
                })(
                  <Input className="h3"
                         prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.5)'}}/>}
                         type="password"
                         placeholder="请输入密码"/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" disabled={this.state.disable}>
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <Modal title="设置机房座位号"
               visible={this.state.visible}
               onCancel={this.handleCancel}
               className={style.loginModal}
               footer={[
                 <Button key="submit" type="primary" onClick={this.setSeatNumber} disabled={this.state.disableBind}>
                   锁定
                 </Button>,
               ]}
        >
          <Form>
            <FormItem {...formItemLayout} label="本机mac地址">
              {getFieldDecorator('MacAddress', {
                rules: rules['MacAddress'],
                initialValue: MacAddress
              })(
                <Input disabled={true} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="机房座位号">
              {getFieldDecorator('SeatNumber', {
                rules: rules['SeatNumber'],
              })(
                <Input placeholder="请输入座位号" onKeyDown={this.handleKeyDown}/>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Login);
