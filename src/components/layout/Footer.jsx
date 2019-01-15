import React from 'React';
import styles from './Footer.less';

/**
 * 底部组件
 */
class Footer extends React.Component{
  render(){
    return(
    <div className={styles.footerBoxWrap} style={{ paddingTop: "10px", position: this.props.fixed === false ? "inherit" : "fixed" }}>
      <div className={styles.footerBox}>
        <div className="text-c">版权信息：{localStorage.getItem('Copyright') || ""}</div>
      </div>
    </div>
    )
  }
}

export default Footer
