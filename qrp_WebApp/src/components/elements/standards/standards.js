import React from 'react';
import {BodyElement, BodyBlock, BodyTitle, SlidedownMenu, APIQuery, Radio} from '../../index';
import {CAST, CISQ, OWASP, CWE} from './elements';
import {businessCrit, qualityStandards} from './queries';
import {Title} from './title';
import {LOADRULESLIST, SHOWOVERLAY, HIDEOVERLAY} from '../../actions/actions';

const idPrefix = 'BC_',
  MainDivClassName = 'bodyRow container block';

//const casticon = '/img/castsoftware.svg';

export default class Standards extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

    Radio.listen( LOADRULESLIST, () =>
      this.setState( _state => {
        return {
          menuVisible: false,
          menuData: _state.menuData,
          scope: undefined
        };
      }));
  }

  render(){
    let key = 0;
    return (<div className={MainDivClassName}>
      <BodyTitle value={Title}/>
      <BodyBlock>{[
        <BodyElement key={key++} slideDown={true} value={CAST} className="bodyElement inline casticon" onclick={()=> APIQuery(businessCrit, this.getBusinessCritera.bind(this))}/>,
        <BodyElement key={key++} slideDown={true} value={CISQ} className="bodyElement inline cisqicon" onclick={()=> APIQuery(qualityStandards, this.getCisqStandards.bind(this))}/>,
        <BodyElement key={key++} slideDown={true} value={OWASP} className="bodyElement inline owaspicon" onclick={()=> APIQuery(qualityStandards, this.getOwaspStandards.bind(this))}/>,
        <BodyElement key={key++} slideDown={true} value={CWE} className="bodyElement inline cweicon" onclick={()=> APIQuery(qualityStandards, this.getCweStandards.bind(this))}/>
      ]}</BodyBlock>
      <SlidedownMenu visible={this.state.menuVisible}>{this.state.menuData}</SlidedownMenu>,
    </div>);
  }

  getCisqStandards( res ){
    const data = res.data,
      name = CISQ,
      href = data.find( ( e ) => e.name === name ).href;

    APIQuery( href, rr =>{
      let d = rr.data,
        out = d.map( c => {
          return { name: c.name, href: c.href };
        } ),
        menuEls = this.buildSlideDownMenuElements( out ),
        nextScope = CISQ;
      return this.setState({ menuData: menuEls, menuVisible: this.determineMenuVisibility( nextScope ), scope: nextScope });
    });
  }

  getOwaspStandards( res ){
    const data = res.data,
      name = OWASP,
      href = data.find( ( e ) => e.name === name ).href;

    APIQuery( href, rr =>{
      let d = rr.data,
        out = d.map( c => {
          return { name: c.name, href: c.href };
        } ),
        menuEls = this.buildSlideDownMenuElements( out ),
        nextScope = OWASP;
      return this.setState({ menuData: menuEls, menuVisible: this.determineMenuVisibility( nextScope ), scope: nextScope });
    });
  }

  getCweStandards( res ){
    const data = res.data,
      name = CWE,
      href = data.find( ( e ) => e.name === name ).href;

    APIQuery( href, rr =>{
      let d = rr.data,
        out = d.map( c => {
          return { name: c.name, href: c.href };
        } ),
        menuEls = this.buildSlideDownMenuElements( out ),
        nextScope = CWE;
      return this.setState({ menuData: menuEls, menuVisible: this.determineMenuVisibility( nextScope ), scope: nextScope });
    });
  }

  getBusinessCritera( res ){
    const data = res.data,
      out = data.map( ( c ) => {
        return { id: idPrefix + c.id, name: c.name, href: c.href};
      });

    const menuEls = this.buildSlideDownMenuElements( out );
    return Radio.emit(SHOWOVERLAY, { children: menuEls });
  }

  determineMenuVisibility( nextScope ){
    return ( (this.state.scope === nextScope && this.state.menuVisible ) ? false : true );
  }

  buildSlideDownMenuElements( data ){
    return data.map( e => <BodyElement key={e.name + e.id} value={e.name} onclick={() => {
      Radio.emit(LOADRULESLIST, e.href, e.name);
      Radio.emit( HIDEOVERLAY );
    }} id={e.id} title={e.title}/> );
  }
}
