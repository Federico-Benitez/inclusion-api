import React from "react";
import NavBar from "../Navbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
