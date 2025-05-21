import { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";
import Link from "next/link";

type Variant =
  | "primary"
  | "danger"
  | "ghost"
  | "plain"
  | "icon-primary"
  | "icon-danger"
  | "icon-success";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: Variant;
  href?: string;
  title?: string;
}

const Button: FC<Props> = ({
  text,
  isLoading = false,
  loadingText = "Loading...",
  variant = "primary",
  href,
  title,
  className,
  ...rest
}) => {
  const classes = clsx(
    "py-2 rounded font-medium transition-colors duration-200 cursor-pointer inline-flex items-center justify-center",
    {
      "px-4 bg-sky-600 text-white hover:bg-sky-700": variant === "primary",
      "px-4 bg-red-600 text-white hover:bg-red-700": variant === "danger",
      "px-4 bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100":
        variant === "ghost",
      "px-2 bg-transparent text-gray-600 hover:text-sky-700":
        variant === "plain",
      "px-2 bg-sky-200 text-sky-500 rounded-md hover:text-sky-600 hover:bg-sky-300":
        variant === "icon-primary",
      "px-2 bg-red-200 text-red-500 rounded-md hover:text-red-600 hover:bg-red-300":
        variant === "icon-danger",
      "px-2 bg-green-200 text-green-500 rounded-md hover:text-green-600 hover:bg-green-300":
        variant === "icon-success",
    },
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes} title={title}>
        {text}
      </Link>
    );
  }
  return (
    <button className={classes} disabled={isLoading} title={title} {...rest}>
      {isLoading ? loadingText : text}
    </button>
  );
};

export default Button;
