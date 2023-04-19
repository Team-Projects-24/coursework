import { useEffect, useState } from "react";
import { FaChartBar, FaChessKing } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaFileAlt, FaProjectDiagram, FaUsers } from "react-icons/fa";
import useUserStore from "stores/userStore";
import NavButton from "./NavButton";

/**
 * @author Tom Whitticase
 *
 * @description This component is the navigation bar for the app.
 */

export default function Nav() {
  const { user } = useUserStore();

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [user]);

  const NavButtons = () => {
    return (
      <>
        {/* <NavButton href="/dashboard" text="Dashboard" icon={FaChartBar} />
        <NavButton href="/projects" text="Projects" icon={FaProjectDiagram} /> */}
        <NavButton href="/chat" text="Chat" icon={FaFileAlt} />
        <NavButton href="/analytics" text="Analytics" icon={FaChartBar} />
        <NavButton href="/admin" text="Admin" icon={FaChessKing} />

        {/* <NavButton href="/tasks" text="Tasks" icon={FaTasks} />
        <NavButton href="/documents" text="Documents" icon={FaFileAlt} /> */}
        {isAdmin && <NavButton href="/users" text="Users" icon={FaUsers} />}
      </>
    );
  };

  return (
    <>
      {/* desktop nav */}
      <div className="mobile-only:hidden z-[100] relative h-full bg-dark-light text-white flex flex-col w-44 p-2">
        {NavButtons()}
      </div>
      {/* mobile nav */}
      <div className="desktop-only:hidden z-[100] fixed bottom-0 bg-dark-light text-white flex gap-1 justify-center w-full h-18 p-2">
        {NavButtons()}
      </div>
    </>
  );
}
