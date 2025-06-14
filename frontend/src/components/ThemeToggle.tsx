import { MdDarkMode, MdLightMode } from 'react-icons/md'

interface Props {
  dark: boolean
  toggle: () => void
}

export default function ThemeToggle({ dark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="grid size-8 place-items-center rounded-md hover:scale-110 transition-transform duration-150"
    >
      {dark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
