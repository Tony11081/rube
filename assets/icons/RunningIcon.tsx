import { type IconProps } from '~/assets'

export function RunningIcon(props: IconProps = {}) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="17"
        cy="4"
        r="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15.5 7C14 7 13 8 13 9.5V11L10 13L8 11.5L6 12.5L8.5 15L12 13.5V16L14.5 18L16 16.5V14L18 12.5L16.5 11V9.5C17.5 8.5 18.5 8 19.5 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 21L5.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 21L19 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}