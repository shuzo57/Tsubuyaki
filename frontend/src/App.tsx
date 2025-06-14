import { useEffect, useState } from 'react'
import ThemeToggle from './components/ThemeToggle'
import Toast from './components/Toast'
import useTextarea from './utils/useTextarea'
import { timeAgo } from './utils/time'
import './App.css'

interface Post {
  id: number
  content: string
  created_at: string
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [dark, setDark] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  const submitPost = async () => {
    if (!content.trim()) {
      showToast('投稿内容を入力してください')
      return
    }
    if (content.length > 140) {
      showToast('140字以内で入力してください')
      return
    }
    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    clear()
    fetchPosts()
  }

  const { value: content, onChange, onKeyDown, clear } = useTextarea(submitPost)

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/posts')
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (posts.length) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [posts])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    submitPost()
  }

  return (
    <div className={dark ? 'dark bg-gray-900 min-h-screen text-white' : 'bg-gray-100 min-h-screen'}>
      <div className="mx-auto max-w-[600px] p-4">
        <header className="mb-4 flex items-center">
          <h1 className="text-xl font-bold">Tsubuyaki</h1>
          <ThemeToggle dark={dark} toggle={() => setDark(!dark)} />
        </header>
        <form onSubmit={submit} className="mb-4 flex gap-2">
          <textarea
            value={content}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="What's happening?"
            className="flex-1 rounded border p-2"
          />
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Post
          </button>
        </form>
        <ul className="grid grid-cols-2 gap-4">
          {posts.map((post) => (
            <article key={post.id} className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <p>{post.content}</p>
              <time className="mt-2 block text-xs text-gray-500 dark:text-gray-400">
                {timeAgo(post.created_at)}
              </time>
            </article>
          ))}
        </ul>
        <Toast message={toast} show={!!toast} />
      </div>
    </div>
  )
}
