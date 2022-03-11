import { Outlet } from "react-router";
import React from "react";

export default function WrapperLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
