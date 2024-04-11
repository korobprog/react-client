import type React from "react"

type Props = {
  children: string
  size?: string
}

export const Typography: React.FC<Props> = ({ children, size = "" }) => {
  return <p className={`${size}`}>{children}</p>
}
