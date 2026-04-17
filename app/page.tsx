'use client'

import { useEffect, useState } from 'react'
import { fetchPages } from '@/lib/sanity'

interface Page {
  _id: string
  title: string
  body: string
}

export default function Home() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true)
        const data = await fetchPages()
        setPages(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pages')
      } finally {
        setLoading(false)
      }
    }

    loadPages()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg text-gray-700">Loading pages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Make sure your .env.local is configured correctly with valid Sanity credentials.
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sanity + Next.js Test
          </h1>
          <p className="text-xl text-gray-600">
            Fetching dynamic content from Sanity CMS
          </p>
        </header>

        {pages.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Pages Found
              </h2>
              <p className="text-gray-600 mb-4">
                Your Sanity CMS doesn't have any pages yet.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-left">
                <p className="text-sm text-blue-800 font-mono">
                  <strong>Next steps:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
                  <li>Go to Sanity Studio</li>
                  <li>Create a new "Page" document</li>
                  <li>Add a title and body</li>
                  <li>Publish the page</li>
                  <li>Refresh this page</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pages.map((page) => (
              <article
                key={page._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {page.title}
                </h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {page.body}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">ID: {page._id}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-gray-300 text-center text-gray-600">
          <p className="text-sm">
            Built with{' '}
            <span className="text-red-500">♥️</span> using Next.js 15 & Sanity CMS
          </p>
        </footer>
      </div>
    </main>
  )
}
