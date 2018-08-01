import React from 'react';
import { Header } from './style';

export default function (props) {
  let { header, children, styles, elementInfo={}, id } = props;
  if(!children || !children.length){
    return null;
  }
  const options = getOptions(children);
  return (
    <div key={header} id={id}>
      <Header style={props.headerStyle}>{header}</Header>
      <select name={props.name} key={id} style={{...styles,...elementInfo.style}} onChange={(evt) => { props.onChange(evt, id, header); }} multiple={elementInfo.multiple}>
        {options}
      </select>
    </div>
  );
}

function getOptions(children) {
  const options = [];
  for (let i = 0; i < children.length; i += 1) {
    options.push(<option value={children[i].name} id={children[i].id} key={children[i].id}>{children[i].name}</option>);
  }

  return options;
}
