import React from "React";
import {Button, Col, Row, Icon} from "antd";
import UrlHelper from "js-url-helper";
import classnames from "classnames";
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import style from './Index.less';
import * as service from '../services/commonServices';

const urlHelper = new UrlHelper(location);

/**
 * 考试首页
 */
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      examName: '',
      examInstruction: '',
      examType: 1,
      examArrangedType: 1,
      examSceneId: null,
      examSceneStatus: null,
      examCourses: [],
      answerModel: null,
    };

    this.getExamInfo();
  }

  /**
   * 获取考试信息
   */
  getExamInfo = () => {
    let loading = layer.msg('加载中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    service.GetExamInfo({
      payload: {}
    }).then((res) => {
      layer.close(loading);

      this.setState({
        answerModel: res.ReturnEntity.AnswerModel,
        examName: res.ReturnEntity.ExamName,
        examInstruction: res.ReturnEntity.ExamInstruction,
        examType: res.ReturnEntity.ExamType,
        examArrangedType: res.ReturnEntity.ExamArrangedType,
        examSceneId: res.ReturnEntity.ExamSceneId,
        examSceneStatus: res.ReturnEntity.ExamSceneStatus,
        examCourses: res.ReturnEntity.ExamCourses
      });
    });
  };

  /**
   * 点击刷新
   */
  onClickRefresh = () => {
    this.getExamInfo();
  };

  /**
   * 开启考试
   * @param {String} courseId
   */
  startToExam = (courseId) => {
    let loading = layer.msg('准备中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    return new Promise((resolve) => {
      service.StartToExam({
        payload: {
          "ExamSceneId": this.state.examSceneId,
          "CourseId": courseId,
        }
      }).then((res) => {
        layer.close(loading);

        resolve(res.ReturnEntity.ExamPaperId);
      });
    });
  };

  /**
   * 跳转到考试作答
   * @param {String} courseId
   */
  jumpAnswer = (courseId) => {
    const that = this;
    const { answerModel } = this.state;

    let path = '';
    if (answerModel === 1) {
      path = '/onlineExamStudent/answer/answer.html';
    } else if (answerModel === 2) {
      path = '/onlineExamStudent/answer/answerInOne.html';
    } else {
      path = '/onlineExamStudent/answer/answer.html';
    }

    this.startToExam(courseId).then((examPaperId) => {
      urlHelper.jump({
        path: path,
        search: urlHelper.setSearchParam({
          examSceneId: that.state.examSceneId,
          courseId: courseId,
          examPaperId: examPaperId,
        })
      });
    });
  };

  /**
   * 渲染考试状态 1 （科目按先后顺序开考）
   * @param {object} item
   * @param {number} statusFlag 考试状态
   * @param {number} index
   */
  renderExamStatus_1 =(item, statusFlag, index) => {
    /**
     * 考试是否可开启状态
     */
    const openStatus = {
      0: true,
      1: false
    };

    if (statusFlag === 1) {
      return (
        <div className={classnames(style.cardFooter, "text-r")}>
          {index === 0 ? null : (item.IsCanOpenExam === 0 && this.state.examSceneStatus === 2) ?
            <span className="font-wrong">请先考完上一学科再开始该学科考试</span> : null}
          <Button type="primary" disabled={openStatus[item.IsCanOpenExam]} onClick={() => {
            this.jumpAnswer(item.CourseId)
          }}>开始考试</Button>
        </div>
      );
    }
    if (statusFlag === 2) {
      return (
        <div className={classnames(style.cardFooter, "text-r")}>
          <Button type="primary" disabled={openStatus[item.IsCanOpenExam]} onClick={() => {
            this.jumpAnswer(item.CourseId)
          }}>继续考试</Button>
        </div>
      );
    }
    if (statusFlag === 3) {
      if (this.state.examType === 1) {
        return (
          <div className={classnames(style.cardFooter, "text-r")}>
            <span className="icon icon-hand-over" />
          </div>
        );
      } else {
        return (
          <div className={classnames(style.cardFooter, "text-r")}>
            <span className={classnames(style.tips,"font-prompt h3")}>{item.Score}分</span>
            {(item.IsCanOpenExam === 0 && this.state.examSceneStatus === 2) ?
              <span className="font-wrong">请先完成进行中的考试</span> : null}
            <Button type="primary" disabled={openStatus[item.IsCanOpenExam]} onClick={() => {
              this.jumpAnswer(item.CourseId)
            }}>再考一次</Button>
          </div>
        );
      }
    }
  };

  /**
   * 渲染考试状态 2 （科目可任意选择开考）
   * @param {object} item
   * @param {number} statusFlag 考试状态
   */
  renderExamStatus_2 =(item, statusFlag) => {
    /**
     * 考试是否可开启状态
     */
    const openStatus = {
      0: true,
      1: false
    };

    if (statusFlag === 1) {
      return (
        <div className={classnames(style.cardFooter, "text-r")}>
          {(item.IsCanOpenExam === 0 && this.state.examSceneStatus === 2) ?
            <span className="font-wrong">请先完成进行中的考试</span> : null}
          <Button type="primary" disabled={openStatus[item.IsCanOpenExam]} onClick={() => {
            this.jumpAnswer(item.CourseId)
          }}>开始考试</Button>
        </div>
      );
    }
    if (statusFlag === 2) {
      return (
        <div className={classnames(style.cardFooter, "text-r")}>
          <Button type="primary" disabled={openStatus[item.IsCanOpenExam]} onClick={() => {
            this.jumpAnswer(item.CourseId)
          }}>继续考试</Button>
        </div>
      );
    }
    if (statusFlag === 3) {
      if (this.state.examType === 1) {
        return (
          <div className={classnames(style.cardFooter, "text-r")}>
            <span className="icon icon-hand-over" />
          </div>
        );
      } else {
        return (
          <div className={classnames(style.cardFooter, "text-r")}>
            <span className={classnames(style.tips,"font-prompt h3")}>{item.Score}分</span>
            <div>
              {(item.IsCanOpenExam === 0 && this.state.examSceneStatus === 2) ?
                <span className="font-wrong">请先完成进行中的考试</span> : null}
              <Button type="primary" disabled={openStatus[item.IsCanOpenExam]} onClick={() => {
                this.jumpAnswer(item.CourseId)
              }}>再考一次</Button>
            </div>
          </div>
        );
      }
    }
  };

  /**
   * 渲染考试科目
   */
  renderExamCourses = (item, i) => {
    const that = this;

    /**
     * 匹配考试状态
     * @param {number} status
     * @param {number} index
     */
    function matchExamStatus(status, index) {
      let exam;

      switch (that.state.examArrangedType) {
        case 1:
          exam = that.renderExamStatus_1(item, status, index);
          break;
        case 2:
          exam = that.renderExamStatus_2(item, status);
          break;
      }

      return exam;
    }

    return (
      <Col className={style.courseCard} span={12}>
        <div className={style.card}>
          <h2>{item.CourseName}<span className="h3" style={{display: this.state.examType === 1 ? "none" : "inline"}}>模拟</span></h2>
          <p><span>考试时长</span><em>： {item.TimeLength / 60}分钟</em></p>
          <p><span>总分</span><em>： {item.TotalScore}分</em></p>
          {/*<p><span>及格分</span><em>： {item.PassScore}分</em></p>*/}
          {matchExamStatus(item.StatusFlag, i)}
        </div>
      </Col>
    );
  };

  render() {
    return (
      <div>
        <Header />
        <div className={style.courseBox}>
          <Row type="flex" justify="center">
            <Col className="text-r" span={24}>
              <Button className={style.refresh} onClick={this.onClickRefresh}><Icon type="sync"/>刷新</Button>
            </Col>
            <Col className="text-c" span={24}>
              <header>
                <h1>{this.state.examName}</h1>
                <h4>{this.state.examInstruction}</h4>
              </header>
            </Col>
            <Col span={24}>
              <Row type="flex" justify="center">
                {
                  this.state.examCourses.length ?
                    this.state.examCourses.map(this.renderExamCourses) :
                    null
                }
              </Row>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Index;
