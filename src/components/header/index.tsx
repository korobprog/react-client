/* eslint-disable @typescript-eslint/no-restricted-imports */
import React, { useContext, useState } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { FaRegMoon, FaUsers } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"
import { AcmeLogo } from "./AcmeLogo"
import { NavButton } from "../nav-button"
import { BsPostcard } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"

export const Header = () => {
  const menuItems = [
    {
      link: "/",
      name: "Посты",
      icon: <BsPostcard />,
    },
    {
      link: "following",
      name: "Подписки",
      icon: <FiUsers />,
    },
    {
      link: "followers",
      name: "Подписчики",
      icon: <FaUsers />,
    },
    {
      link: "profileuser",
      name: "Профиль",
      icon: <FaUsers />,
    },
  ]
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticate = useSelector(selectIsAuthenticated)
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    current => !current,
    false,
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const hadleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">BookSocial</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">BookSocial</p>
        </NavbarBrand>
        <NavbarItem>
          <Link
            color="foreground"
            href="https://karavan-book-tracker.web.app/ "
            target="_blank"
          >
            BookTracker
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="https://sankirtana-map.web.app/"
            aria-current="page"
            color="foreground"
            target="_blank"
          >
            MapBooks
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              color="foreground"
              className="w-full"
              href={item.link}
              size="lg"
              onPress={() => setIsMenuOpen()}
              underline="focus"
            >
              <div className="flex flex-row gap-3">
                {item.icon}
                {item.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticate && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={hadleLogout}
            >
              <CiLogout /> <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
