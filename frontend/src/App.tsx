import { useEffect, useState } from 'react'
import ThemeToggle from './components/ThemeToggle'
import useTextarea from './utils/useTextarea'
import { timeAgo } from './utils/time'
import Skeleton from './components/ui/Skeleton'
import { FaHeart, FaTrash } from 'react-icons/fa'
import { Toaster, toast } from 'react-hot-toast'
import './App.css'

interface Post {
  id: number
  content: string
  created_at: string
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [dark, setDark] = useState(false)
  const [liked, setLiked] = useState<Set<number>>(new Set())

  const submitPost = async () => {
    if (!content.trim()) {
      toast.error('投稿内容を入力してください')
      return
    }
    if (content.length > 140) {
      toast.error('140字以内で入力してください')
      return
    }
    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    clear()
    fetchPosts()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { value: content, onChange, onKeyDown, clear } = useTextarea(submitPost)

  const handleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const fetchPosts = async (showLoading = true) => {
    if (showLoading) setLoading(true)
    const res = await fetch('http://localhost:5000/posts')
    const data = await res.json()
    setPosts(data)
    if (showLoading) setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
    const stored = localStorage.getItem('theme-dark')
    setDark(stored === 'true')
    const id = setInterval(() => fetchPosts(false), 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme-dark', String(dark))
  }, [dark])

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
    <div className={`${dark ? 'dark' : ''} min-h-screen bg-surface text-accent antialiased font-sans`}>
      <div className="container mx-auto px-4 lg:px-0 max-w-xl py-10 space-y-6 text-[15px] leading-6 sm:text-base lg:text-lg">
        <header className="bg-gradient-to-r from-main to-sub1 text-white shadow-lg px-6 py-3 rounded-b-xl flex items-center justify-between">
          <h1 className="font-bold text-xl text-white">Tsubuyaki</h1>
          <ThemeToggle dark={dark} toggle={() => setDark(!dark)} />
        </header>
        <form onSubmit={submit} className="flex gap-2">
          <textarea
            value={content}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="What's happening?"
            className="flex-1 rounded-md border border-gray p-2 focus:ring-2 focus:ring-main focus:outline-none"
          />
          <button className="bg-main text-white hover:bg-main/90 px-4 py-2 rounded-md transition-colors">
            Post
          </button>
        </form>
        <ul className="grid grid-cols-1 gap-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))
            : posts.map((post) => (
                <article
                  key={post.id}
                  className="animate-fade-slide bg-white/70 dark:bg-white/5 backdrop-blur-md ring-1 ring-gray/30 shadow-md rounded-xl p-4 flex items-start gap-3"
                >
                  <div className="bg-gradient-to-br from-main to-sub1 text-white size-10 rounded-full grid place-items-center font-bold">
                    U
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base leading-relaxed">{post.content}</p>
                    <time className="text-xs text-gray">{timeAgo(post.created_at)}</time>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <FaHeart
                      onClick={() => handleLike(post.id)}
                      className={
                        `size-4 cursor-pointer transition-transform duration-150 ${
                          liked.has(post.id) ? 'text-red-500 scale-110' : 'hover:scale-110'
                        }`
                      }
                    />
                    <FaTrash
                      onClick={() => handleDelete(post.id)}
                      className="size-4 cursor-pointer hover:scale-110 transition-transform duration-150"
                    />
                  </div>
                </article>
              ))}
        </ul>
        <Toaster position="top-right" />
      </div>
    </div>
  )
}
