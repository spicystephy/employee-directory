import React from "react";
// import "./index.css"

function EmployeeList({ props }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row align-items-center">
          <p className="col">Image</p>
          <p className="col">First Name & Last Name</p>
          <p className="col">Phone Number</p>
          <p className="col">Email</p>
          <p className="col">Gender</p>
        </div>
        {/* <th>Image</th>
      <th>Name</th>
      <th>Phone #</th>
      <th>Email</th>
      <th>Gender</th> */}
      </div>

      <div className="container-fluid">
        {props.employees.length === 0 ? (
          <h2> Try again!</h2>
        ) : (
          props.employees.filter(this.filterEmployees).map((employee) => (
            <ul className="list-group list-group-horizontal">
              <li className="list-group-item">
                <img src={employee.image} alt={employee.name} />
              </li>
              <li className="list-group-item">{employee.name}</li>
              <li className="list-group-item">{employee.phone}</li>
              <li className="list-group-item">{employee.email}</li>
              <li className="list-group-item">{employee.gender}</li>
            </ul>
          ))
        )}
      </div>
    </>
  );
}

export default EmployeeList;
