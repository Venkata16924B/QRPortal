import React from 'react';
// import { createClassName } from '../common/lib';
import '../style/arrayElement.css';
import ArrayCell from './arrayCell';

export default class ArrayElement extends React.PureComponent{
  render(){
    return (
      <tr>
        {this.props.children.map( val => <ArrayCell header={this.props.header} critical={val.critical}>{val.name}</ArrayCell> )}
      </tr>
    );
  }
}