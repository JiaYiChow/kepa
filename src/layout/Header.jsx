import React, { useState } from "react";
import { Input, Menu } from "semantic-ui-react";

export default function Header() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu secondary>
      <Menu.Item
        name="kePa - the Keyboard Pipa"
        active={activeItem === "logo"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="My Recordings"
        active={activeItem === "myRecordings"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="Login"
          active={activeItem === "login"}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
}
