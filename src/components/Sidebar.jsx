import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Product Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/compare"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Compare Products
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
