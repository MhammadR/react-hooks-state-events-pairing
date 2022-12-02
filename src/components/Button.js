import React from "react";

function Button({ votes = "", content = "", onBtnClick, name, id = -1 }) {
  return (
    <button name={name} id={id} votes={votes} onClick={onBtnClick}>
      {votes} {content}
    </button>
  );
}

export default Button;
