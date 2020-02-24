import React, { Fragment, useState } from "react";
import { array } from "prop-types";
import COIN_NAMES from './names';

import classes from "./Autocomplite.module.scss";

const initialState = {
  activeSuggestion: 0,
  filteredSuggestions: [],
  showSuggestions: false,
  userInput: ""
}


function Autocomplete({ handleClick }) {
  const [state, setState] = useState(initialState);

  const onChange = e => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = COIN_NAMES.filter(
      suggestion =>
        suggestion.toLowerCase().slice(0, userInput.length).indexOf(userInput.toLowerCase()) > -1
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
    handleClick(e.currentTarget.innerText);
  };

  const onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = state;

    if (e.keyCode === 13) {
      setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      handleClick(filteredSuggestions[activeSuggestion]);
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
              <li
                className={className}
                key={suggestion}
                onClick={onClick}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className={classes.nosuggestions}>
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  return (
    <Fragment>
      <input
        className={classes.input}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={state.userInput}
      />
      {suggestionsListComponent}
    </Fragment>
  )

}

Autocomplete.defaultProps = {
  suggestions: []
}

Autocomplete.propTypes = {
  suggestions: array.isRequired
}



export default Autocomplete;