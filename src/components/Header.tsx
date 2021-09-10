import React from "react";
import { IoLogoBuffer as Logo } from "@react-icons/all-files/io5/IoLogoBuffer";
import { AiOutlineUser as UserIcon } from "@react-icons/all-files/ai/AiOutlineUser";

const Header = () => {
  return (
    <header>
      <div>
        <Logo />
        Company
      </div>

      <div>
        <UserIcon />
      </div>
    </header>
  );
};

export default Header;
