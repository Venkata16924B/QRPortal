import React from 'react';
import { Technologies, Standards, RulesBody, Radio, LOADRULESLIST, RETURNTOSTART, UNSELECTME, UpdateURL } from '../index';

export default class Body extends React.Component{
  constructor(props){
    super(props);

    this.state = {};

    Radio.listen( LOADRULESLIST, this.LoadRuleList.bind(this));
    Radio.listen( RETURNTOSTART, this.hideRuleList.bind(this));
  }
  
  hideRuleList(){
    this.setState({
      rulesVisible: false
    });
    history.pushState(null, null, '/');
    Radio.emit(UNSELECTME);
  }

  LoadRuleList( url, name ){
    this.setState({
      rulesVisible: true,
      title: name,
      rulesHref: url,
    });

    UpdateURL(url, name);
  }

  render(){
    return (
      <div className='body'>
        <div className='static-UI'>
          <Standards />
          <Technologies />
        </div>
        <div className='rules'>
          <RulesBody visible={this.state.rulesVisible} 
            icon={this.state.title} 
            title={this.state.title}
            href={this.state.rulesHref}
            details={this.state.details}/>
        </div>
      </div>
    );
  }
}