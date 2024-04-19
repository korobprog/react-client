/* eslint-disable @typescript-eslint/no-restricted-imports */
import React, { useContext, useState } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Avatar,
  Button,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  User,
} from "@nextui-org/react"
import { FaExternalLinkAlt, FaRegMoon, FaUsers } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import {
  logout,
  selectCurrent,
  selectIsAuthenticated,
} from "../../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"
import { BsPostcard } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import { BASE_URL } from "../../constants"
import { Link as ReactRouterLink } from "react-router-dom"

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
      link: "https://karavan-book-tracker.web.app/",
      name: "BookTracker",
      icon: <FaExternalLinkAlt />,
    },
    {
      link: "https://sankirtana-map.web.app/",
      name: "MapsBooks",
      icon: <FaExternalLinkAlt />,
    },
  ]
  const current = useSelector(selectCurrent)
  if (!current) {
    return null
  }
  const { avatarUrl, id, email, name } = current
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme, toggleTheme } = useContext(ThemeContext)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isAuthenticate = useSelector(selectIsAuthenticated)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    current => !current,
    false,
  )
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" isBlock color="success">
            BookS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            isBlock
            showAnchorIcon
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
            isBlock
            showAnchorIcon
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
            <ReactRouterLink to={item.link} onClick={() => setIsMenuOpen()}>
              <div className="flex flex-row  gap-3 pb-3">
                {item.icon}
                {item.name}
              </div>
            </ReactRouterLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticate && (
            <User
              name={name}
              isFocusable
              description={
                <Link href={`/user/${id}`} size="sm">
                  {email}
                </Link>
              }
              avatarProps={{
                src: `${BASE_URL}${avatarUrl}`,
              }}
            />
          )}
        </NavbarItem>
        <NavbarMenuItem>
          <Button
            color="default"
            variant="light"
            onClick={hadleLogout}
            className="z-0"
          >
            <CiLogout className="w-5 h-5" />
          </Button>
        </NavbarMenuItem>
      </NavbarContent>
    </Navbar>
  )
}
