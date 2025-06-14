import { useEffect, useState } from 'react'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

interface Post {
  id: number
  content: string
  created_at: string
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [dark, setDark] = useState(false)

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/posts')
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    setContent('')
    fetchPosts()
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
            onChange={(e) => setContent(e.target.value)}
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
              {post.content}
            </article>
          ))}
        </ul>
      </div>
    </div>
  )
}
