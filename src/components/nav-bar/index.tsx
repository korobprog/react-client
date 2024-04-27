import React from "react"
import { NavButton } from "../nav-button"
import { BsPostcard } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa"
import { ProfileUser } from "../profile-user"

export const NavBar = () => {
  return (
    <>
      <nav className="nav-bar_nav">
        <ul className="flex flex-col gap-5">
          <li>
            <NavButton href="/" icon={<BsPostcard />}>
              Посты
            </NavButton>
          </li>
          <li>
            <NavButton href="following" icon={<FiUsers />}>
              Подписки
            </NavButton>
          </li>
          <li>
            <NavButton href="followers" icon={<FaUsers />}>
              Подписчики
            </NavButton>
          </li>
        </ul>
        <ProfileUser />
      </nav>
    </>
  )
}
