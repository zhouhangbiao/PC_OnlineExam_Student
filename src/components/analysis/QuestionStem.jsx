import React from "React";
import UrlHelper from "js-url-helper";
import {Col, Row} from "antd";
import * as service from "../../services/answerServices";
import styles from './Analysis.less';

const urlHelper = new UrlHelper(location);
const query = urlHelper.getSearchParam();
const handInErrMsg = {
  0: "提交失败",
  2: "考试已关闭",
  3: "已被监考老师强制交卷",
  4: "监考老师已设置重考，请重新考试",
};

/**
 * 试卷解析-左侧题目题干区
 */
class QuestionStem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      reload: true
    };
  }

  /**
   * 题目倒计时完成
   */
  onComplete = () => {
    const { questionInfo } = this.props;

    if (questionInfo.NextQuestionId) {
      this.props.onQuestionCountDown && this.props.onQuestionCountDown(questionInfo.NextQuestionId);
    } else {
      this.handleHandInExam();
    }
  };

  /**
   * 处理交卷
   */
  handleHandInExam = () => {
    const that = this;

    this.setState({
      reload: false
    });

    layer.confirm('当前已为最后一题，你已完成考试，请交卷。', {
      title: '提示',
      btn: ['交卷'],
      closeBtn: 0
    }, function(){
      layer.closeAll();

      that.props.handInSaveAnswerInfo &&　that.props.handInSaveAnswerInfo(that.props.questionInfo.QuestionId, that.handInExam);
    });
  };

  /**
   * 交卷
   */
  handInExam = () => {
    layer.msg('交卷中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    service.HandInExamPaper({
      payload: {
        "ExamSceneId": query.examSceneId,
        "CourseId": query.courseId,
      }
    }).then((res) => {
      layer.closeAll();

      if (res.ReturnEntity.HandResult === 1) {
        layer.msg('交卷成功', {icon: 1, time: 1000});
        setTimeout(() => {
          urlHelper.jump({
            path: '/onlineExamStudent/answer/result.html',
            search: urlHelper.setSearchParam({
              examSceneId: query.examSceneId,
              courseId: query.courseId
            })
          });
        }, 1000);
      } else {
        layer.confirm(handInErrMsg[res.ReturnEntity.HandResult], {
          title: '提示',
          btn: ['确定']
        }, function(){
          if (res.ReturnEntity.HandResult === 4) {
            window.location.href = '/onlineExamStudent/index.html';
          } else {
            layer.msg(handInErrMsg[res.ReturnEntity.HandResult], {icon: 2, time: 2000});
            setTimeout(function () {
              urlHelper.jump({
                path: '/onlineExamStudent/answer/result.html',
                search: urlHelper.setSearchParam({
                  examSceneId: query.examSceneId,
                  courseId: query.courseId
                })
              });
            }, 2000);
          }
        });
      }
    });
  };

  /**
   * 切换原始/缩放大小
   */
  toggleOriginalSize = (event) => {
    if (event.target.className.indexOf('original-max-width') === -1) {
      event.target.className = 'original-max-width';
      event.target.title = '点击缩小';
    } else {
      event.target.className = '';
      event.target.title = '点击放大';
    }
  };

  render() {
    const { questionInfo } = this.props;

    if (!questionInfo.QuestionId) {
      return '';
    }

    return (
      <Row className={styles.QuestionStemWrap}>
        <Col className={styles.questionsHeader} span={24}>{`${questionInfo.QuestionCategoryName}（共计${questionInfo.QuestionCount}题，合计${questionInfo.Score}分）`}</Col>
        <Col className={styles.questionsInfo} span={24}>
          <Row type="flex" className={styles.flexWrap}>
            <Col className={styles.infoHeader} span={24}>
              <Row className={styles.header} type="flex">
                <Col span={12}><span className="font-prompt">{questionInfo.QuestionIndex}</span>/{questionInfo.QuestionCount}</Col>
              </Row>
            </Col>
            <Col className={styles.questionsCont} span={24}>
              <img src={questionInfo.QuestionPicture} onClick={this.toggleOriginalSize} title="点击放大"/>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default QuestionStem;
