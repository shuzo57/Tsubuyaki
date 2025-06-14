import { useEffect, useState } from 'react'
import './App.css'

interface Post {
  id: number
  content: string
  created_at: string
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')

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
    <div>
      <h1>Tsubuyaki</h1>
      <form onSubmit={submit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
        />
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="post">
            {post.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
