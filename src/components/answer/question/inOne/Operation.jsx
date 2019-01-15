import React from "React";
import {Button} from "antd";
import style from './QuestionStyles.less';

/**
 * 操作题 Operation
 */
class Operation extends React.Component {
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
            <Button type="primary" onClick={this.handleClick} disabled>点击此处开始答题</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Operation;
