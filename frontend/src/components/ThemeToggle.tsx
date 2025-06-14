import { FaMoon, FaSun } from 'react-icons/fa'

interface Props {
  dark: boolean
  toggle: () => void
}

export default function ThemeToggle({ dark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="ml-auto grid size-8 place-items-center rounded-md hover:scale-110 transition-transform duration-150"
    >
      {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
