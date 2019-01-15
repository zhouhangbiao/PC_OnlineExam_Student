import React from "React";
import {Col, Row, Icon} from "antd";
import styles from './QuestionStyles.less';
import classnames from "classnames";
import _ from 'lodash';

/**
 * 阅读理解（复杂题）QuestionDisplayType_3
 */
class MultiGroupIncluedText extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentQuestionGroupIndex: 0
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.question.QuestionId !== prevProps.question.QuestionId) {
      this.setState({
        currentQuestionGroupIndex: 0
      });
    }
  }

  /**
   * 处理点击小题选项
   * @param option
   */
  handleClickQuestionGroupOption = (option) => {
    const { currentAnswer } = this.props;
    const { currentQuestionGroupIndex } = this.state;
    const tempAnswer = _.cloneDeep(currentAnswer);

    try {
      tempAnswer[currentQuestionGroupIndex].StudentAnswer = [option];
      this.props.setCurrentAnswer(tempAnswer);
    } catch (err) {
      console.log(err);
      window.localFunction && localFunction.sendStudentPageError(JSON.stringify({
        'Error': err.message,
        'Location': location.href,
      }));
    }
  };

  /**
   * 处理切换小题
   * @param angle
   */
  handleChangeGroup = (angle) => {
    const { question } = this.props;
    let curGroupIndex = this.state.currentQuestionGroupIndex;

    if (angle > 0) {
      if (curGroupIndex < question.QuestionGroups.length - 1) {
        curGroupIndex ++;
      }
    } else {
      if (curGroupIndex > 0) {
        curGroupIndex --;
      }
    }

    this.setState({
      currentQuestionGroupIndex: curGroupIndex
    });
  };

  /**
   * 保存作答信息
   * @param angle
   * @return {Promise}
   */
  saveAnswerInfo = (angle) => {
    const { saveAnswerInfo, updateAnswerCardInfo, question } = this.props;
    let curGroupIndex = this.state.currentQuestionGroupIndex;

    return new Promise((resolve, reject) => {
      if (angle > 0) {
        if (curGroupIndex < question.QuestionGroups.length - 1) {
          curGroupIndex ++;
        } else {
          return;
        }
      } else {
        if (curGroupIndex > 0) {
          curGroupIndex --;
        } else {
          return;
        }
      }

      let loading = layer.msg('保存中', {
        icon: 16,
        shade: 0.3,
        time: 0
      });

      saveAnswerInfo && saveAnswerInfo().then(() => {
        layer.close(loading);
        if (updateAnswerCardInfo) {
          updateAnswerCardInfo().then(resolve);
        } else {
          resolve();
        }
      }, () => {
        layer.close(loading);
        reject();
      });
    });
  };

  /**
   * 渲染小题
   */
  renderQuestionGroup = () => {
    const { question, currentAnswer } = this.props;
    let { currentQuestionGroupIndex } = this.state;

    return question.QuestionGroups.map((item, index) => {
      let style = styles.questionGroupBtn;
      let result = _.find(currentAnswer, curAnswer => {
        return curAnswer.QuestionGroupId === item.QuestionGroupId
      });

      if (result && result.StudentAnswer[0]) {
        style = classnames(styles.questionGroupBtn, styles.answered);
      }

      if (index === currentQuestionGroupIndex) {
        style = classnames(style, styles.cur);
      }

      return (
        <span className={style}>{index + 1}</span>
      )
    });
  };

  /**
   * 渲染小题选项
   * @return {XML}
   */
  renderQuestionGroupOptions = () => {
    const { question, currentAnswer } = this.props;
    let { currentQuestionGroupIndex } = this.state;
    let content;

    if (currentQuestionGroupIndex >= question.QuestionGroups.length) {
      currentQuestionGroupIndex = 0;
    }

    try {
      content = question.QuestionGroups[currentQuestionGroupIndex].QuestionGroupOptions.map(item => {
        let style = styles.option;

        if (currentAnswer && currentAnswer[currentQuestionGroupIndex] && item.QuestionOptionId === currentAnswer[currentQuestionGroupIndex].StudentAnswer[0]) {
          style = classnames(styles.option, styles.cur);
        }

        return (
          <span className={style} onClick={() => {this.handleClickQuestionGroupOption(item.QuestionOptionId)}}>{item.QuestionOptionId}</span>
        )
      });
    } catch (err) {
      console.log(err);
      window.localFunction && localFunction.sendStudentPageError(JSON.stringify({
        'Error': err.message,
        'Location': location.href,
      }));
    }

    return (
      <div className={styles.options}>
        {content}
      </div>
    )
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

  render(){
    const { question } = this.props;
    const { currentQuestionGroupIndex } = this.state;

    let leftStyle, rightStyle, leftSwitchDesc, rightSwitchDesc;
    leftStyle = styles.leftSwitchWrap;
    rightStyle = styles.rightSwitchWrap;
    leftSwitchDesc = styles.switchDesc;
    rightSwitchDesc = styles.switchDesc;

    if (currentQuestionGroupIndex === 0) {
      leftStyle = classnames(leftStyle, styles.limit);
      leftSwitchDesc = classnames(leftSwitchDesc, styles.limit);
    } else if (question && currentQuestionGroupIndex === question.QuestionGroups.length - 1) {
      rightStyle = classnames(rightStyle, styles.limit);
      rightSwitchDesc = classnames(rightSwitchDesc, styles.limit);
    }

    return (
      <Col className={classnames(styles.questionsInfo, styles.multiGroupInfo)} span={24}>
        <Row type="flex" className={styles.flexWrap}>
          {
            question.QuestionGroupsPicture !== '' ? (
              <Col className={styles.questionGroupDescWrap} span={24}>
                <img src={question.QuestionGroupsPicture} onClick={this.toggleOriginalSize} title="点击放大"/>
              </Col>
            ) : ''
          }
          <Col className={styles.questionGroupBtnWrap} span={24}>
            {this.renderQuestionGroup()}
          </Col>
          <Col className={classnames(styles.infoHeader, styles.multiGroupInfoHeader)} span={24}>
            <span>作答区</span>
            <span className={styles.groupIndexWrap}><span className={styles.curIndex}>{currentQuestionGroupIndex + 1}</span>/{question.QuestionGroups.length}</span>
          </Col>
          <Col className={styles.questionGroupOptionWrap} span={24}>
            <div className={leftStyle}
                 onClick={() => {
                   this.saveAnswerInfo(-1).then(() => {
                     this.handleChangeGroup(-1);
                   });
                 }}>
              <Icon className={styles.switchGroupBtn} type="left-circle-o"/>
              <span className={leftSwitchDesc}>上一小题</span>
            </div>
            <div className={rightStyle}
                 onClick={() => {
                   this.saveAnswerInfo(1).then(() => {
                     this.handleChangeGroup(1);
                   });
                 }}>
              <Icon className={styles.switchGroupBtn} type="right-circle-o" />
              <span className={rightSwitchDesc}>下一小题</span>
            </div>
            {this.renderQuestionGroupOptions()}
          </Col>
        </Row>
      </Col>
    );
  }
}

export default MultiGroupIncluedText;
