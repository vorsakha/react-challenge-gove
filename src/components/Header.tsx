import { IoLogoBuffer as Logo } from "@react-icons/all-files/io5/IoLogoBuffer";
import { AiOutlineUser as UserIcon } from "@react-icons/all-files/ai/AiOutlineUser";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white flex flex-row justify-between items-center h-16">
      <Link
        to="/"
        className="flex flex-row gap-2 text-3xl items-center font-bold pl-4"
      >
        <Logo />
        Pharma Inc
      </Link>

      <div className="text-2xl pr-4">
        <div className="rounded-full bg-gray-200 p-3">
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
