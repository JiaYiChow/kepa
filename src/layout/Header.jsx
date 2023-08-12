import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function Header() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu>
      <Menu.Item
        as={Link}
        to="/kepa"
        name="kePa - the Keyboard Pipa"
        active={activeItem === "logo"}
      />
      <Menu.Item
        as={Link}
        to="/kepa/my-recordings"
        name="My Recordings"
        active={activeItem === "myRecordings"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/kepa/login"
          name="Login"
          active={activeItem === "login"}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
}
