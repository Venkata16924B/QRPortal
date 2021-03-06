import React from 'react';
import PropTypes from 'prop-types';
import { VerticalArray } from 'components/';
import { compareFunction } from './cmp-lib';
import { HEADERS, NORULES, FILTERPLACEHOLDER, RULES, BOTH, CLASSES } from './cmp-constants';
import './style.css';

const generateLabel = ( data, fltLength, maxLength ) => {
  const _nRules = data.filter( e => e.parent.toLowerCase() !== BOTH ).length;
  return ( fltLength === maxLength ? `+${_nRules} Of ${maxLength} Rules` : `+${_nRules} from ${fltLength} of ${maxLength} Rules`);
};

const CompareListArray = ( props ) => {
  return(
    <span className={CLASSES.container}>
      <VerticalArray isLoading={props.loading} label={generateLabel} childConstructor={props.arrayChildConstructor} filterPlaceholder={FILTERPLACEHOLDER} itemCountTitle={RULES} onEmpty={NORULES} headers={[HEADERS.id, HEADERS.name, HEADERS.version, HEADERS.critical]} compare={compareFunction}>
        {props.data}
      </VerticalArray>
    </span>);
};

CompareListArray.propTypes = {
  data: PropTypes.array.isRequired,
  arrayChildConstructor: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default CompareListArray;