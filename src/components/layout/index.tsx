import React, { useEffect } from "react"
import { Header } from "../header"
import { Container } from "../container"
import { NavBar } from "../nav-bar"
import { Outlet, useNavigate } from "react-router-dom"
import { selectIsAuthenticated } from "../../features/user/userSlice"
import { useSelector } from "react-redux"
import "./index.css"

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4 sm:inline-flex nav-bar_nav">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  )
}
