import React from 'react';

export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      query: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    console.log(this);
    this.setState({
      query: e.target.value,
    });
  };
  render() {
    const { todo, query } = this.state;
    return (
      <>
        <div>
          <h1>Todo</h1>
          <input
            value={query}
            onChange={this.handleChange}
            type="text"
            placeholder="Add Something"
          />
          <button>ADD TODO</button>
        </div>
      </>
    );
  }
}
