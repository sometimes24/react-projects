import React from 'react';

import AddOption from './AddOption'
import Options from './Options'
import Action from './Action'
import Header from './Header'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }))
  };

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handlePick = () => {
    const randomOption = Math.floor(Math.random() * this.state.options.length);
    this.setState(() => ({ selectedOption: this.state.options[randomOption] }));
    console.log('Option: ' + this.state.options[randomOption])
  };

  handleAddOption = (option) => {
    if (!option) {
      return "Option cannot be empty"
    } else if (this.state.options.indexOf(option) > -1) {
      return "Option already exists"
    }

    this.setState((prevState) => ({
      options: prevState.options.concat([option])
    }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      //Do nothing
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  render() {
    const subtitle = 'Where decisions are made...';
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
              options={this.state.options}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}  