import React from "React";
import {Col, Row} from "antd";
import style from './QuestionStyles.less';
import classnames from "classnames";
import _ from 'lodash';

/**
 * 七选五 QuestionDisplayType_10
 */
class ReadAndFillBlank extends React.Component {
  constructor(props){
    super(props);
  }

  handleClickOption = (index, value) => {
    const { question, currentAnswers } = this.props;
    let questionAnswer;

    if (currentAnswers) {
      questionAnswer = _.find(currentAnswers, { QuestionId: question.QuestionId });
    }

    let tempAnswer = _.cloneDeep(questionAnswer.QuestionAnswers);
    tempAnswer[0].StudentAnswer[index] = value;

    this.props.setCurrentAnswer(question.QuestionId, tempAnswer);
  };

  render(){
    const { question, currentAnswers } = this.props;

    const options = () => {
      let questionAnswer;

      if (currentAnswers) {
        questionAnswer = _.find(currentAnswers, { QuestionId: question.QuestionId });
      }

      return question.QuestionGroups[0].StudentAnswers.map((item, index) => {

        const questionBtn = question.QuestionGroups[0].QuestionGroupOptions.map(option => {
          let optionStyle = style.option;

          if (questionAnswer && questionAnswer.QuestionAnswers[0].StudentAnswer[index] === option.QuestionOptionId) {
            optionStyle = classnames(optionStyle, style.cur);
          }

          return (
            <span className={optionStyle} onClick={()=>{this.handleClickOption(index, option.QuestionOptionId)}}>{option.QuestionOptionId}</span>
          )
        });

        return (
          <div className={style.answerContent}>
            <span className={style.multiNumber}>{(index + 1 + '').length === 1 ? '0' + (index + 1) : (index + 1)}.</span>
            {questionBtn}
          </div>
        )
      });
    };

    return (
      <div className={style.questionWrap} id={question.QuestionId}>
        <span className={style.questionNumberWrap}>第{question.QuestionIndex}题</span>
        <Row type="flex">
          <Col span={12}>
            <div className={style.questionGroupContentWrap}>
              <img src={question.QuestionPicture}/>
            </div>
          </Col>
          <Col span={12}>
            <div className={classnames(style.questionGroupContentWrap, style.group)}>
              <img src={question.QuestionGroupsPicture}/>
            </div>
          </Col>
        </Row>
        <div className={classnames(style.questionAnswerWrap, style.fillBlank)}>
          <div className={style.answerDesc}>作答区：</div>
          <div className={style.multiWrap}>
            {options()}
          </div>
        </div>
      </div>
    );
  }
}

export default ReadAndFillBlank;
