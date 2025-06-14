import { useState, useCallback } from 'react'

export default function useTextarea(onSubmit: () => void) {
  const [value, setValue] = useState('')

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    },
    []
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        onSubmit()
      }
    },
    [onSubmit]
  )

  const clear = useCallback(() => setValue(''), [])

  return {
    value,
    setValue,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    clear,
  }
}
