'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/lib/types'

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const emptyForm = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  meta_description: '',
  content: '',
  cover_image: '',
  published: false,
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setLoading(true)
    const res = await fetch('/api/posts')
    if (res.ok) {
      const data = await res.json()
      setPosts(data.posts)
    }
    setLoading(false)
  }

  function startNew() {
    setForm(emptyForm)
    setEditingId(null)
    setSlugTouched(false)
    setMessage('')
  }

  function startEdit(post: Post) {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      meta_description: post.meta_description || '',
      content: post.content,
      cover_image: post.cover_image || '',
      published: post.published,
    })
    setEditingId(post.id)
    setSlugTouched(true)
    setMessage('')
  }

  function handleTitleChange(value: string) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      meta_description: form.meta_description,
      content: form.content,
      cover_image: form.cover_image,
      published: form.published,
    }

    const res = editingId
      ? await fetch(`/api/posts/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

    if (res.ok) {
      setMessage(editingId ? 'Post updated!' : 'Post created!')
      startNew()
      fetchPosts()
    } else {
      const data = await res.json()
      setMessage(`Error: ${data.error}`)
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchPosts()
      if (editingId === id) startNew()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-cactus-800">
          Admin Dashboard
        </h1>
        <button
          onClick={startNew}
          className="text-sm bg-sand-200 hover:bg-sand-300 px-3 py-1.5 rounded-md"
        >
          + New Post
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-sand-200 rounded-lg p-4 mb-8 space-y-4"
      >
        <h2 className="font-semibold text-cactus-800">
          {editingId ? 'Edit Post' : 'New Post'}
        </h2>

        <div>
          <label className="block text-sm font-medium text-sand-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-sand-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cactus-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sand-700 mb-1">
            Slug (URL)
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true)
              setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
            }}
            className="w-full border border-sand-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cactus-400"
            required
          />
          <p className="text-xs text-sand-500 mt-1">
            /post/{form.slug || '...'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-sand-700 mb-1">
            Cover Image URL (optional)
          </label>
          <input
            type="text"
            value={form.cover_image}
            onChange={(e) =>
              setForm((f) => ({ ...f, cover_image: e.target.value }))
            }
            placeholder="https://..."
            className="w-full border border-sand-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cactus-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sand-700 mb-1">
            Excerpt (short summary shown on homepage)
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) =>
              setForm((f) => ({ ...f, excerpt: e.target.value }))
            }
            rows={2}
            className="w-full border border-sand-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cactus-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sand-700 mb-1">
            SEO Meta Description (optional — shown in Google search results.
            If blank, the excerpt is used.)
          </label>
          <textarea
            value={form.meta_description}
            onChange={(e) =>
              setForm((f) => ({ ...f, meta_description: e.target.value }))
            }
            rows={2}
            maxLength={160}
            placeholder="A concise, keyword-rich summary under 160 characters..."
            className="w-full border border-sand-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cactus-400"
          />
          <p className="text-xs text-sand-500 mt-1">
            {form.meta_description.length}/160 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-sand-700 mb-1">
            Content (HTML supported — use &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;,
            &lt;img&gt;, etc.)
          </label>
          <textarea
            value={form.content}
            onChange={(e) =>
              setForm((f) => ({ ...f, content: e.target.value }))
            }
            rows={12}
            className="w-full border border-sand-300 rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cactus-400"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) =>
              setForm((f) => ({ ...f, published: e.target.checked }))
            }
            className="w-4 h-4"
          />
          <label htmlFor="published" className="text-sm text-sand-700">
            Published (visible on site)
          </label>
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.startsWith('Error') ? 'text-red-600' : 'text-cactus-700'
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-cactus-700 text-white rounded-md px-4 py-2 hover:bg-cactus-800 disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={startNew}
              className="bg-sand-200 rounded-md px-4 py-2 hover:bg-sand-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="font-semibold text-cactus-800 mb-3">All Posts</h2>
      {loading ? (
        <p className="text-sand-600">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-sand-600">No posts yet.</p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-sand-200 rounded-md p-3 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-sand-900">{post.title}</p>
                <p className="text-xs text-sand-500">
                  {post.published ? '✅ Published' : '📝 Draft'} &middot; /
                  {post.slug}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(post)}
                  className="text-sm text-cactus-700 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
