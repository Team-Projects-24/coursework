import { useRouter } from "next/router";
import React from "react";
import Header from "./Header";
import Nav from "./Nav";

/**
 * @author Tom Whitticase
 *
 * @description This is the layout component. It is used to display the header and nav on the page.
 */

const routesWithNoLayout = ["/register", "/login", "/404", "/"];
interface IProps {
  children: JSX.Element;
}
export default function Layout({ children }: IProps) {
  const router = useRouter();
  //do not display layout for some specific pages and when 404 not found
  return routesWithNoLayout.includes(router.pathname) ? (
    children
  ) : (
    <>
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="mobile-only:absolute h-full">
          <Nav />
        </div>

        <div className="overflow-x-auto w-full mobile-only:pb-[4rem]">
          {children}
        </div>
      </div>
    </>
  );
}
