import { type IconProps } from '~/assets'

export function SneakerIcon(props: IconProps = {}) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 18C2 16.8954 2.89543 16 4 16H7L9 14H15L17 16H20C21.1046 16 22 16.8954 22 18V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16L8 10C8.55228 9.44772 9.44772 9.44772 10 10L12 12L14 10C14.5523 9.44772 15.4477 9.44772 16 10L17 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="6"
        y1="19"
        x2="18"
        y2="19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}