import React from "react";
import styles from "./ToolTips.module.css";

const ToolTips = ({ text, children }) => {
  return (
    <div className={`relative inline-block  ${styles.tooltipContainer}`}>
      {children}
      <div className={` ${styles.tooltip}`} >{text}</div>
    </div>
  );
};

export default ToolTips;
