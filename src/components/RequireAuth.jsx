import React, { Component } from "react";
import { Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
  return useSelector(state => state.auth.authenticated) || false;
};

export default function RequireAuth() {
  return useAuth() ? <Outlet /> : <Navigate to="/" />;
}
