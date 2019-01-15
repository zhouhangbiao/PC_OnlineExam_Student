import React from "React";
import style from './QuestionStyles.less';

/**
 * 写作题 QuestionDisplayType_23
 */
class Writing extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { question } = this.props;

    return (
      <div className={style.questionWrap} id={question.QuestionId}>
        <span className={style.questionNumberWrap}>{`第${question.QuestionIndex}题`}</span>
        <div className={style.questionContentWrap}>
          <img src={question.QuestionPicture}/>
        </div>
        <div className={style.questionAnswerWrap}>
          <div className={style.answerDesc}>作答区：</div>
          <div className={style.answerContent}>
            <span className={style.writingDesc}>提示：作答完成后，请直接将纸质答卷交给监考老师</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Writing;
