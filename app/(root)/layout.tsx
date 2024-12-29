import MobileNav from "@/components/shared/MobileNav";
import SideBar from "@/components/shared/SideBar";
import { Toaster } from "@/components/ui/toaster";
import React, { JSX } from "react";

/**
 * Layout component that wraps its children with a main HTML element.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The children elements to be wrapped.
 * @returns {JSX.Element} The main element containing children.
 */
const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <main className="root">
      <SideBar />
      <MobileNav />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
