import axios from 'axios';
import React from 'react';
import 'Todo.css';
export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      query: '',
      page: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    console.log(this);
    this.setState({
      query: e.target.value,
    });
  };

  // on mounting I want to diaplay all the data
  handleAdd() {
    const { query } = this.state;
    const payload = {
      title: query,
      status: false,
    };
    axios
      .post('https://shadow-glittery-bosworth.glitch.me/todos', payload)
      .then((res) => {
        this.handleGetTodos();
      });
  }
  handleDelete(id) {
    axios
      .delete(`https://shadow-glittery-bosworth.glitch.me/todos/${id}`)
      .then((res) => {
        this.handleGetTodos();
      })
      .catch((err) => console.error(err));
  }
  handleGetTodos() {
    const { page } = this.state;

    return axios
      .get('https://shadow-glittery-bosworth.glitch.me/todos', {
        params: { _limit: 5, _page: page },
      })
      .then((res) =>
        this.setState(
          {
            todo: res.data,
          },
          () => {}
        )
      );
  }
  componentDidMount() {
    this.handleGetTodos();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.handleGetTodos();
    }
  }
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
          <button onClick={this.handleAdd.bind(this)}>ADD TODO</button>
          <div>
            {todo?.map((item) => (
              <div id="tododiv" key={item.id}>
                {item.title}
                <button onClick={this.handleDelete.bind(this, item.id)}>
                  DELETE
                </button>
              </div>
            ))}
            <button
              disabled={this.state.page === 1 ? true : false}
              onClick={() => this.setState({ page: this.state.page - 1 })}
            >
              Prev
            </button>
            <button
              disabled={todo.length < 1 ? true : false}
              onClick={() => this.setState({ page: this.state.page + 1 })}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}
