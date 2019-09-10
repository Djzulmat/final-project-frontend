import React from "react";

import "./Home.css";

const Home = () => {
  return (
    <div className="main">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1496&q=80"
            className="img-fluid"
            alt="Responsive image"
          />
        </div>
        <div className="col-md-6">
          <h1 className="intro">
            Looking after your health today, gives you the better hope for
            tomorrow
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
