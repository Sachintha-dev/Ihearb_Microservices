import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const userId = "12345678";

const Header = () => {
  return (
    <div>
      <head>
        <style>
          {`.navbar {
              height: 60px;
          }

          ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
            justify-content: space-between; /* add space between items */
            gap: 200px; 

          }

            li {
              margin-left: 10;
              padding: 10;
            }


            
            }`}
        </style>
      </head>

      <nav class="navbar navbar-expand-lg navbar-dark bg-primary text-white">
        <ul>
          <li>
            <a class="flex-sm-fill text-sm-center nav-link active" href="#">
              Home
            </a>
          </li>
          <li>
            <a class="flex-sm-fill text-sm-center nav-link" href="#">
              Brands
            </a>
          </li>
          <li>
            <a class="">
              <Link
                to={`/cart/${userId}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                MyCart
              </Link>
            </a>
          </li>
          <li>
            <form className="form-inline my-7 my-lg-0">
              <input type="search" placeholder="Search" aria-label="Search" />
              <button type="submit">
                <img
                  style={{ height: 20, width: 20 }}
                  className="fa fa-search"
                  src="https://icon2.cleanpng.com/20190707/gk/kisspng-computer-icons-scalable-vector-graphics-portable-n-search-prism-learning-solutions-search-icon-svg-5d22318be57ae7.30338433156252199594.jpg"
                ></img>
              </button>
              &nbsp;
            </form>
          </li>

          <li>
            <a class="flex-sm-fill text-sm-center nav-link active">
              <button
                className="btn btn-info"
                type="submit"
                style={{ color: "white" }}
              >
                SignIn
              </button>
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Settings
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>

              <a className="dropdown-item" href="#">
                Something else here
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
