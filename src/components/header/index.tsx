/* eslint-disable @typescript-eslint/no-restricted-imports */
import React, { useContext, useState } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
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
import { FaBookOpenReader } from "react-icons/fa6"

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
      <NavbarItem>
        <ReactRouterLink to="/" color="success">
          <FaBookOpenReader className="h-7 w-7" />
        </ReactRouterLink>
      </NavbarItem>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              {isAuthenticate ? (
                <User
                  name={name}
                  isFocusable
                  description={
                    <ReactRouterLink to={`/user/${id}`}>
                      {email}
                    </ReactRouterLink>
                  }
                  avatarProps={{
                    src: `${BASE_URL}${avatarUrl}`,
                  }}
                />
              ) : (
                <div className="max-w-[300px] w-full flex items-center gap-3">
                  <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                </div>
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="tem">
                <NavbarItem
                  className="lg:flex text-3xl cursor-pointer"
                  onClick={() => toggleTheme()}
                >
                  {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
                </NavbarItem>
              </DropdownItem>
              <DropdownItem key="profile" className="h-4 gap-2"></DropdownItem>
              <DropdownItem key="settings">
                <ReactRouterLink to={`/user/${id}`}>
                  Мой профиль
                </ReactRouterLink>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <Button
                  color="default"
                  variant="light"
                  onClick={hadleLogout}
                  className="z-0"
                >
                  Выход
                  <CiLogout className="w-5 h-5" />
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarMenuItem></NavbarMenuItem>
      </NavbarContent>
    </Navbar>
  )
}
