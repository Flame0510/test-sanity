import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function fetchPages() {
  const query = `
    *[_type == "page"] {
      _id,
      title,
      body
    }
  `
  try {
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Failed to fetch pages:', error)
    throw error
  }
}

export async function fetchPage(id: string) {
  const query = `
    *[_type == "page" && _id == $id][0] {
      _id,
      title,
      body
    }
  `
  try {
    const data = await client.fetch(query, { id })
    return data
  } catch (error) {
    console.error('Failed to fetch page:', error)
    throw error
  }
}
