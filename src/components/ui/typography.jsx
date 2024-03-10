import { cn } from "../../lib/utils"

export function H1({ children, className, ...props }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, ...props }) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className, ...props }) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}
