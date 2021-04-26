import React from "react";
// import "./index.css";

function SearchBar(props) {
  // the props list includes handleformsubmit, handleInputChange, apple
  
  return (
    <div className="container-fluid">
      <form className="d-flex">
        <input
          className="form-control me-2 w-50"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={props.search}
          onChange={props.handleInputChange}
          
        />
        <datalist id="employees">
          {props.employees.map(employee => (
            <option value={employee} key={employee} />
          ))};
        </datalist>
        <button
          type="submit"
          onClick={props.handleFormSubmit}
          className="btn btn-outline-success"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
