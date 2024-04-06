import type React from "react"

type Props = { children: React.ReactElement[] | React.ReactElement }

export const Container: React.FC<Props> = ({ children }: Props) => {
  return <div className="flex max-w-screen-xl max-auto mt-10">{children}</div>
}
