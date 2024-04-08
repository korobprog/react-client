import { Input as NextInput } from "@nextui-org/react"
import type React from "react"
import type { Control } from "react-hook-form"
import { useController } from "react-hook-form"

type Props = {
  name: string
  label: string
  type?: string
  control: Control<any>
  required?: string
  andContent?: JSX.Element
  placeholder?: string
}

export const Input: React.FC<Props> = ({
  name,
  label,
  type,
  control,
  required = "",
  andContent,
  placeholder,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })
  return (
    <NextInput
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
    />
  )
}
