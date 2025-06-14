interface Props {
  dark: boolean
  toggle: () => void
}

export default function ThemeToggle({ dark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="ml-auto rounded border px-2 py-1 text-sm dark:bg-gray-700"
    >
      {dark ? 'Light' : 'Dark'} Mode
    </button>
  )
}
