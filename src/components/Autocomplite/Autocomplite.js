import React, { useState } from 'react';
import COIN_NAMES from './names';
import currency from '../../variables/isoCodes'
import PropTypes from 'prop-types';
import findKey from '../../helpers/findKey';

import classes from './Autocomplite.module.scss';
import Icon from './images/search-icon.svg';

const initialState = {
  activeSuggestion: 0,
  filteredSuggestions: [],
  showSuggestions: false,
  userInput: ''
};

function Autocomplete({ findCoin, getCoins, activeTab, findCurrency}) {

  const [state, setState] = useState(initialState);
  const CURRENCY_NAMES = Object.values(currency);

  const onChange = e => {
    const userInput = e.currentTarget.value;

    if (userInput.length === 0) {
      getCoins();
    }

    let filteredSuggestions = null;

    if (activeTab) {
      filteredSuggestions = CURRENCY_NAMES.filter(
        suggestion =>
          suggestion
            .toLowerCase()
            .slice(0, userInput.length)
            .indexOf(userInput.toLowerCase()) > -1
      );
    } else {
      filteredSuggestions = COIN_NAMES.filter(
        suggestion =>
          suggestion
            .toLowerCase()
            .slice(0, userInput.length)
            .indexOf(userInput.toLowerCase()) > -1
      );
    }

    setState({
      ...state,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  const onClick = e => {
    let findText = e.currentTarget.innerText;
    if (activeTab) {
      setState({
        ...state,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
      
      findCurrency(findKey(findText, currency));
    } else {
      setState({
        ...state,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
      findCoin(e.currentTarget.innerText);
    }
    
  };

  const onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = state;


    let nameOfCurrency = findKey(filteredSuggestions[activeSuggestion], currency);
    if (e.keyCode === 13) {
      setState({
        activeSuggestion,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });

      if (activeTab) {
        findCurrency(nameOfCurrency)
      } else {
        findCoin(filteredSuggestions[activeSuggestion]);
      }
    }
    if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setState({ ...state, activeSuggestion: activeSuggestion - 1 });
    }
    if (e.keyCode === 40) {
      if (state.activeSuggestion - 1 === state.filteredSuggestions.length) {
        return;
      }
      setState({ ...state, activeSuggestion: activeSuggestion + 1 });
    }
  };

  let suggestionsListComponent;

  if (state.showSuggestions && state.userInput) {
    if (state.filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className={classes.suggestions}>
          {state.filteredSuggestions.map((suggestion, index) => {
            let className;

            if (index === state.activeSuggestion) {
              className = classes.suggestionActive;
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = <div className={classes.nosuggestions}>No matches!</div>;
    }
  }

  return (
    <div className={classes.wrapper}>
      <img className={classes.icon} src={Icon} alt="search icon" draggable="false" />
      <input
        className={classes.input}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={state.userInput}
      />
      {suggestionsListComponent}
    </div>
  );
}

Autocomplete.defaultProps = {
  findCoin: () => {},
  getCoins: () => {}
};

Autocomplete.propTypes = {
  findCoin: PropTypes.func,
  getCoins: PropTypes.func
};

export default Autocomplete;
