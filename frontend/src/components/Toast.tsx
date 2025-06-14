import { Transition } from '@headlessui/react'

interface Props {
  message: string
  show: boolean
}

export default function Toast({ message, show }: Props) {
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
    >
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded bg-red-500 px-4 py-2 text-white">
        {message}
      </div>
    </Transition>
  )
}
