import React, { useState } from 'react';
import COIN_NAMES from './names';
import PropTypes from 'prop-types';

import classes from './Autocomplite.module.scss';
import Icon from './images/search-icon.svg';

const initialState = {
  activeSuggestion: 0,
  filteredSuggestions: [],
  showSuggestions: false,
  userInput: ''
};

function Autocomplete({ findCoin, getCoins }) {
  const [state, setState] = useState(initialState);

  const onChange = e => {
    const userInput = e.currentTarget.value;

    if (userInput.length === 0) {
      getCoins();
    }

    const filteredSuggestions = COIN_NAMES.filter(
      suggestion =>
        suggestion
          .toLowerCase()
          .slice(0, userInput.length)
          .indexOf(userInput.toLowerCase()) > -1
    );

    setState({
      ...state,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  const onClick = e => {
    setState({
      ...state,
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    findCoin(e.currentTarget.innerText);
  };

  const onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = state;

    if (e.keyCode === 13) {
      setState({
        activeSuggestion,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });

      findCoin(filteredSuggestions[activeSuggestion]);
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
