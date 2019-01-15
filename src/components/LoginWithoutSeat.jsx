import React from "React";
import {Col, Row, Button, Form, Icon, Input} from "antd";
import cookie from '../utils/cookie';
import style from './Login.less';
import * as service from '../services/commonServices';
import encrypt from '../utils/encrypt';

const FormItem = Form.Item;
const MacAddress = cookie.get('MacAddress') !== 'undefined' ? cookie.get('MacAddress') : '50-7B-9D-FC-CD-90';
const IpAddress = cookie.get('IpAddress') !== 'undefined' ? cookie.get('IpAddress') : '127.0.0.1';
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
 * 登录（不需要绑定座位号）
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      systemName: "",
      terminalName: "",
      systemLogo: "",
      disable: false,
    };

    this.getSystemInfo();
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
   * 设置用户缓存
   */
  setUserInfoStorage = (info) => {
    localStorage.setItem('StudentCode', info['StudentCode']);
    localStorage.setItem('SeatNumber', info['ReturnEntity'].SeatNumber);
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
   * 提交登录信息
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields(['StudentCode', 'Password'], (err) => {
      if (err) {
        return false;
      } else {
        this.login();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    let rules = {
      "StudentCode": [
        {required: true, message: '准考证号不能为空'},
        {max: 50, message: '最多输入50个字符'},
      ],
      "Password": [
        {required: true, message: '密码不能为空'},
        {max: 50, message: '最多输入50个字符'},
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
          <Col className="text-r" span={12} />
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
                         placeholder="请输入准考证号"
                         autofocus="autofocus"
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
      </div>
    );
  }
}

export default Form.create()(Login);
