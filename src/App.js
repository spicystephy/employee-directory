import React from "react";
import API from "./utils/API";
import SearchBar from "./components/searchBar/SearchBar";
import Header from "./components/header/Header";

// import "./App.css";

class App extends React.Component {
  state = {
    search: "",
    employees: [],
    results: [],
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = async () => {
    const { data } = await API.getUsers();
    const employees = data.results.map((item) => ({
      name: `${item.name.first} ${item.name.last}`,
      email: item.email,
      phone: item.cell,
      image: item.picture.thumbnail,
      gender: item.gender,
    }));
    this.setState({ employees });
  };

  handleInputChange = (e) => {
    const value = e.target.value;
    // const name = e.target.name;
    this.setState({ search: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.getEmployees(this.state.search)
      .then((res) => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch((err) => this.setState({ error: err.message }));
  };

  filterEmployees = (employee) => {
    if (employee.name.includes(this.state.search)) {
      return true;
    }
    if (employee.phone.includes(this.state.search)) {
      return true;
    }
    if (employee.email.includes(this.state.search)) {
      return true;
    }
    if (employee.gender.includes(this.state.search)) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <>
        <Header />
        <SearchBar
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          employees={[1, 2, 3]}
        />
        <div className="container-fluid">
          <div className="row align-items-center">
            <p className="col">Image</p>
            <p className="col">First Name & Last Name</p>
            <p className="col">Phone Number</p>
            <p className="col">Email</p>
            <p className="col">Gender</p>
          </div>
          <div className="container-fluid w-100">
            {this.state.employees.length === 0 ? (
              <h2> Try again!</h2>
            ) : (
              this.state.employees
                .filter(this.filterEmployees)
                .map((employee) => (
                  <ul className="list-group list-group-horizontal w-100">
                    <li className="list-group-item">
                      <img src={employee.image} alt={employee.name} />
                    </li>
                    <li className="list-group-item flex-fill">{employee.name}</li>
                    <li className="list-group-item flex-fill">{employee.phone}</li>
                    <li className="list-group-item flex-fill">{employee.email}</li>
                    <li className="list-group-item flex-fill">{employee.gender}</li>
                  </ul>
                ))
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
