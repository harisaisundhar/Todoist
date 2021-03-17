import React, { Component } from 'react';

const API_KEY = "http://localhost:8000/tasks"
class Friends extends React.Component {
    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.todo && this.props.todo.map(todo => {
                        return <tr key={todo._id}>
                            <td>{todo.name}</td>
                            <td>{todo.status}</td>
                            <td>{todo._id}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        );
    }
}
  
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      name: '',
      status: ''
    };
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:8000/tasks', {
      "method": "GET"
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        todos: data,
        tit: data.title
      })
      console.log(data)
    })
    .catch(console.log)
  }


  create(e) {
    e.preventDefault();
    console.log(this.todos)
    const dataToSend = JSON.stringify({ "name": this.state.name, "status": this.state.status })

    fetch("http://localhost:8000/tasks", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: dataToSend
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
  }
  update(e) {
    // update entity - PUT
    e.preventDefault();
    const dataToSend = JSON.stringify({ "name": this.state.name, "status": this.state.status })

    // this will update entries with PUT
    fetch(`http://localhost:8000/tasks/${this.state.name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: dataToSend
        })
        .then(response => response.json())
        .then(response => { console.log(response);
        })
        .catch(err => { console.log(err); });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
    // deletes entities
    fetch(`http://localhost:8000/tasks/${this.state.name}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {

    return (
       <div className="container">
        <div className="col-xs-12">
            <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">TODOIST</h1>
              <form className="d-flex flex-column">
                <legend className="text-center">Add-Update-Delete Todo</legend>
                <label htmlFor="name">
                  Todo Name:
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.handleChange({ name: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="notes">
                  Todo status:
                  <input
                    name="status"
                    id="status"
                    type="text"
                    className="form-control"
                    value={this.state.status}
                    onChange={(e) => this.handleChange({ status: e.target.value })}
                    required
                    />
                </label>
                <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                  Add
                </button>
                <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                    Update
                </button>
                <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                    Delete
                </button>
              </form>
              <Friends todo={this.state.todos} />
            </div>
          </div>
        </div>
        
        </div>
       </div>
    );
  }
}

export default App;
