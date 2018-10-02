import { connect } from 'react-redux';
import BodyRulesList from './brl-model';
import { childConstructor } from './brl-lib';
import { fetchDetailsData } from 'details-section/ds-actions';
import { setSelected } from './brl-actions';
import { setSelectedSearchResult } from 'global-search/gs-actions';
import './style';

const mapDispatchToProps = (dispatch) => {
  return {
    arrayChildConstructor: (val, index) => {
      return childConstructor(val, index, () => {
        if(val.searchid) dispatch(setSelectedSearchResult(val.id));
        else dispatch(setSelected(val.id));
        dispatch(fetchDetailsData(val.href));
      });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.rulesList.data,
    searchVisible: state.search.resultsVisible,
    searchResults: state.search.results,
    loading: state.rulesList.loading
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(BodyRulesList);