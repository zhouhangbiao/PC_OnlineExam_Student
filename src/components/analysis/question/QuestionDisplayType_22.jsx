import React from "React";
import {Col, Row} from "antd";
import classnames from "classnames";
import styles from './QuestionStyles.less';

/**
 * 画图题 QuestionDisplayType_22
 */
class Draw extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.initDrawPaper();
    this.props.onDidMount && this.props.onDidMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount && this.props.onWillUnmount();
  }

  /**
   * 画布初始化
   * @private
   */
  initDrawPaper = () => {
    let $userDraw = $('#user_draw');
    let userDraw = $userDraw.get(0).getContext('2d');
    let $standardDraw = $('#standard_draw');
    let standardDraw = $standardDraw.get(0).getContext('2d');
    let drawPaperBg = new Image();

    drawPaperBg.src = this.props.question.QuestionPicture;
    drawPaperBg.onload = () => {
      let paperWidth = drawPaperBg.width;
      let paperHeight = drawPaperBg.height;

      $userDraw.attr({
        'width': paperWidth,
        'height': paperHeight
      });
      $standardDraw.attr({
        'width': paperWidth,
        'height': paperHeight
      });

      userDraw.drawImage(drawPaperBg, 0, 0);
      standardDraw.drawImage(drawPaperBg, 0, 0);

      this.renderDrawData(userDraw, this.props.question.QuestionGroups[0].DrawAnswers);
      this.renderDrawData(standardDraw, this.props.question.QuestionGroups[0].DrawStandardAnswers);
    };
  };

  /**
   * 渲染绘图数据
   */
  renderDrawData = (content, data) => {
    /**
     * 画圆形
     * @param {Array} pointStart
     * @param {Array} radii
     * @private
     */
    function _drawCircleTemp(pointStart, radii) {
      content.beginPath();
      content.arc(pointStart[0], pointStart[1], radii, 0, Math.PI * 2, false);
      content.stroke();
    }

    /**
     * 画直线
     * @param {Array} pointStart
     * @param {Array} pointEnd
     * @private
     */
    function _drawLineTemp(pointStart, pointEnd) {
      content.beginPath();
      content.moveTo(pointStart[0], pointStart[1]);
      content.lineTo(pointEnd[0], pointEnd[1]);
      content.stroke();
    }

    data.length && data.forEach(function (item) {
      if (item.IsQuestionGroupCorrect === 0) {
        content.strokeStyle = '#FF0000';
      } else {
        content.strokeStyle = '#22ac38';
      }

      switch (item.Type) {
        case 'line':
          content.setLineDash([]);
          _drawLineTemp(item.PointStart, item.PointEnd);
          break;
        case 'dash':
          content.setLineDash([5]);
          _drawLineTemp(item.PointStart, item.PointEnd);
          break;
        case 'circle':
          content.setLineDash([]);
          _drawCircleTemp(item.PointStart, item.Radii);
          break;
      }
    });
  };

  render(){
    const { question } = this.props;

    return (
    <Col className={styles.questionsInfo} span={24}>
      <Col className={styles.questionsHeader} span={24}>
        <div>{question.QuestionComment}</div>
      </Col>
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            答案与解析
          </Col>
          <Col className={classnames(styles.questionsCont, styles.analysis)} span={24}>
            <div dangerouslySetInnerHTML={
              {
                __html: question.QuestionAnalysis
              }
            }/>
          </Col>
        </Row>
      </Col>
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            你的作答
          </Col>
          <Col className={styles.drawPaper} span={24}>
            <canvas id="user_draw"/>
          </Col>
        </Row>
      </Col>
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            参考答案
          </Col>
          <Col className={styles.drawPaper} span={24}>
            <canvas id="standard_draw"/>
          </Col>
        </Row>
      </Col>
    </Col>
    );
  }
}

export default Draw;
