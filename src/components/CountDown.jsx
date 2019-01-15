import React from "React";

/**
 * 倒计时
 */
class CountDown extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      counted: 0,
      warn: false
    };
  }

  counted = 0;

  timer = null;

  shouldRecountDown = false;

  componentDidMount() {
    if (this.props.count) {
      this.countDown();
    }
    if (this.props.count === 0) {
      this.props.onComplete && this.props.onComplete();
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.id) {
      if (this.props.id !== nextProps.id) {
        this.shouldRecountDown = true;
        this.reCountDown();
        return;
      } else {
        this.shouldRecountDown = false;
      }
    }
    if (this.props.count !== nextProps.count) {
      this.shouldRecountDown = true;
      this.reCountDown();
    } else {
      this.shouldRecountDown = false;
    }
  }

  /**
   * 到计时
   */
  countDown = () => {
    this.timer = setInterval(() => {
      this.counted = this.counted + 1;
      this.setState({
        counted: this.counted
      });
      if (this.props.bound && this.props.count !== 0) {
        if ((this.props.count - this.counted <= this.props.bound) && !this.state.warn) {
          this.props.onBound && this.props.onBound(this.props.count - this.counted);
          this.setState({
            warn: true
          });
        }
      }
      if (this.props.count === this.counted) {
        clearInterval(this.timer);
        this.props.onComplete && this.props.onComplete();
        this.props.reload && this.reCountDown();
      }
    }, 1000);
  };

  /**
   * 重新倒计时
   */
  reCountDown = () => {
    clearInterval(this.timer);

    if (!this.shouldRecountDown) {
      return false;
    }

    this.counted = 0;
    this.countDown();
  };

  /**
   * 格式化秒
   * @param seconds
   * @return {string}
   */
  secondToTime = (seconds) => {
    let h = Math.floor(seconds / 3600) < 10 ? '0' + Math.floor(seconds / 3600) : Math.floor(seconds / 3600);
    let m = Math.floor((seconds / 60 % 60)) < 10 ? '0' + Math.floor((seconds / 60 % 60)) : Math.floor((seconds / 60 % 60));
    let s = Math.floor((seconds % 60)) < 10 ? '0' + Math.floor((seconds % 60)) : Math.floor((seconds % 60));

    if (h !== "00") {
      return h + ":" + m + ":" + s;
    } else {
      return m + ":" + s;
    }
  };

  /**
   * 获取倒计时时间
   * @return {string}
   */
  getCountDownTime = () => {
    return this.secondToTime(this.props.count - this.counted);
  };

  render(){
    return (
      <span style={{color: this.props.color ? this.props.color : "#FF0000", "padding-left": "10px"}}>
        {this.getCountDownTime()}
      </span>
    );
  }
}

export default CountDown;
