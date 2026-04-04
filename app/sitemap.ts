import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Your live website URL
  const baseUrl = 'https://caravantrips.uz'

  // Fetch all live tours from your database
  const { data: tours } = await supabase
    .from('tours')
    .select('slug')

  // Create a sitemap entry for every single tour dynamically
  const tourUrls = tours?.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  // Combine the home page with all the dynamic tour pages
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Home page is the highest priority
    },
    ...tourUrls,
  ]
}