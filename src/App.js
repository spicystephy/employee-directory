import React from "react";
import API from "./utils/API";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
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
    console.log(value);
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
    const { employees } = this.state;
    return (
      <table>
        <SearchBar
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          employees={[1,2,3]}
        />
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Phone #</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <h2> No Employees!</h2>
            </tr>
          ) : (
            employees.filter(this.filterEmployees).map((employee) => (
              // <tr key={employee.name + i}>
              <tr>
                <td>
                  <img src={employee.image} alt={employee.name} />
                </td>
                <td>{employee.name}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>{employee.gender}</td>
              </tr>
            ))
          )}
        </tbody>
        {/* <SearchResults
        results={[1,2,3]} /> */}
      </table>
    );
  }
}
export default App;

// for(const key in employee) => {
//   if (key === "image") continue;
//   if (employee[key].includes(this.state.search)){
//     return true;
//     }
//    }
