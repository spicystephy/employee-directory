import React from "react";
import API from "./utils/API";
import SearchBar from "./components/searchBar/SearchBar";
import EmployeeList from "./components/employeeList/EmployeeList";
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
    const name = e.target.name;
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
    const { employees } = this.state.length;
    return (
      <>
      <Header/>
        <SearchBar
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          employees={[1, 2, 3]}
        />

        <EmployeeList
          employees={this.state.employees}
          getEmployees={this.getEmployees}
        />
      </>
    );
  }
}
export default App;
