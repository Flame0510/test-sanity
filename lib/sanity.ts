import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  throw new Error('Sanity Project ID or Dataset is not configured')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
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
