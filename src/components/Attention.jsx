import React from "React";
import {Button, Col, Row} from "antd";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import CountDown from "../components/CountDown.jsx";
import style from "./Attention.less";
import * as service from "../services/commonServices";

/**
 * 考生须知
 */
class Attention extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attentionInfo: '',
      visible: 'inline-block',
      disabled: true
    };

    this.getAttentionInfo();
  }

  /**
   * 获取考生须知信息
   */
  getAttentionInfo = () => {
    service.GetExamExplainInfo({
      payload: {}
    }).then((res) => {
      this.setState({
        attentionInfo: res.ReturnEntity
      });
    });
  };

  /**
   * 倒计时完成回调
   */
  onCountDownComplete = () => {
    this.setState({
      visible: 'none',
      disabled: false
    });
  };

  /**
   * 跳转到首页
   */
  jumpIndex = () => {
    window.location.href = '/onlineExamStudent/index.html';
  };

  render() {
    return (
      <div>
        <Header />
        <div className={style.attentionBox}>
          <div className={style.attention}>
            <Row className={style.content} type="flex" justify="center">
              <Col span={24} dangerouslySetInnerHTML={{__html: this.state.attentionInfo}}/>
              <Col span={24} className="text-c">
                <Button type="primary" disabled={this.state.disabled} onClick={this.jumpIndex}>
                  我已阅读，点击进入考试
                  <div style={{display: this.state.visible}}>
                    <CountDown color="rgba(0, 0, 0, 0.25)"  count={5} onComplete={this.onCountDownComplete}/>
                  </div>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Attention;
