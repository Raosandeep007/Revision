import axios from 'axios';
import React from 'react';
import './Todo.css';

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
    this.setState({
      query: e.target.value,
    });
  };

  handleChecked(id, status) {
    const payload = {
      status: !status,
    };

    axios
      .patch(`https://shadow-glittery-bosworth.glitch.me/todos/${id}`, payload)
      .then((res) => {
        this.handleGetTodos();
      });
  }
  // on mounting I want to diaplay all the data
  handleAdd() {
    const { query } = this.state;
    if (query.length > 0) {
      const payload = {
        title: query,
        status: false,
      };
      axios
        .post('https://shadow-glittery-bosworth.glitch.me/todos', payload)
        .then((res) => {
          this.handleGetTodos();
        });
    } else {
      alert('Nothing to add');
    }
  }
  // clearform(e) {
  //   // e.preventDefault();
  //   console.log('e', e);
  // }
  handleDelete(id) {
    axios
      .delete(`https://shadow-glittery-bosworth.glitch.me/todos/${id}`)
      .then((res) => {
        this.handleGetTodos();
      })
      .catch((err) => console.error(err));
  }
  handleGetTodos(e) {
    const { page } = this.state;
    return axios
      .get(
        'https://shadow-glittery-bosworth.glitch.me/todos?_sort=id&_order=desc',
        {
          params: { _limit: 3, _page: page },
        }
      )
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
    setInterval(() => {
      this.handleGetTodos();
    }, 500);
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
          <div id="addtododiv">
            <h1 id="heading">ADD YOUR TODO</h1>
            <input
              id="inputtodo"
              value={query}
              onChange={this.handleChange}
              type="text"
              required
              placeholder="Add Something"
            />
            <button
              onClick={(e) => {
                this.handleAdd();
              }}
            >
              ADD TODO
            </button>
          </div>
          <div id="displaydiv">
            {todo?.map((item) => (
              <div
                id="tododiv"
                style={{
                  color: item.status == true ? 'white' : 'black',
                  backgroundColor: item.status == true ? 'black' : '',
                }}
                key={item.id}
              >
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={item.status}
                  onChange={this.handleChecked.bind(this, item.id, item.status)}
                />
                <div
                  id="titlediv"
                  style={{
                    textDecoration: item.status == true ? 'line-through' : '',
                  }}
                >
                  {item.title}
                </div>
                <button
                  id="deletebtn"
                  onClick={this.handleDelete.bind(this, item.id)}
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
          <div id="nextprevdiv">
            <button
              disabled={this.state.page === 1 ? true : false}
              style={{
                cursor: this.state.page === 1 ? 'not-allowed' : 'Pointer',
              }}
              onClick={() => this.setState({ page: this.state.page - 1 })}
            >
              &#8678; Prev
            </button>{' '}
            <button
              disabled={todo.length < 1 ? true : false}
              style={{ cursor: todo.length < 1 ? 'not-allowed' : 'Pointer' }}
              onClick={() => this.setState({ page: this.state.page + 1 })}
            >
              Next &#x21E8;
            </button>
          </div>
        </div>
      </>
    );
  }
}
