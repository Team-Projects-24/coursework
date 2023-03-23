import Link from "next/link";
import { useRouter } from "next/router";
import { createElement } from "react";
import { IconType } from "react-icons";

/**
 * @author Tom Whitticase
 *
 * @description This is the nav button component. It is used to display a nav buttons which when clicked direct the user to a new page.
 */

interface INavButtonProps {
  href: string;
  text: string;
  icon: IconType;
}

export default function NavButton({ href, text, icon }: INavButtonProps) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const isActive = currentRoute.startsWith(href);

  return (
    <>
      {/* desktop nav button */}
      <div
        className={`mobile-only:hidden flex rounded-r-lg items-center ${
          isActive && "border-l-4 border-l-yellow-main bg-dark-main"
        }`}
      >
        <Link className="px-4 py-2" href={href}>
          <div className="flex gap-2 items-center">
            {createElement(icon, {
              width: 12,
              height: 12,
              color: "white",
            })}
            {text}
          </div>
        </Link>
      </div>
      {/* mobile nav button */}
      <div
        className={`desktop-only:hidden p-1 rounded-t-lg flex items-center ${
          isActive && "border-b-yellow-main border-b-2 bg-dark-main"
        }`}
      >
        <Link className="p-[0.15rem] w-14" href={href}>
          <div className="flex flex-col gap-2 items-center">
            {createElement(icon, {
              width: 12,
              height: 12,
              color: "white",
            })}
            <div className="text-[0.6rem]">{text}</div>
          </div>
        </Link>
      </div>
    </>
  );
}
