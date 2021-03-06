import React from 'react';
import { createClassName, COMMON_CLASSES } from 'common/';
import { CLASSES, TEXTINPUT, INPUTREF, ENTER } from './gs-constants';
import './style.css';

export default class GlobalSearch extends React.PureComponent{
  constructor(props){
    super(props);
  }

  render() {
    const props = this.props;
    return (
      <div className={createClassName(CLASSES.container, COMMON_CLASSES.floatRight)}>
        <input type={TEXTINPUT} ref={INPUTREF} className={CLASSES.inputBox} placeholder={props.language.search} onKeyPress={ (event) => {
          const key = event.key;
          if (key === ENTER) {
            props.fetchSearchResults( this.refs[INPUTREF].value );
            this.refs[INPUTREF].value = '';
          }
        }}/><span className={COMMON_CLASSES.searchIcon} onClick={() => this.refs[INPUTREF].focus()}></span>
      </div>
    );
  }
}