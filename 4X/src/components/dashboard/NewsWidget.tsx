import Image from 'next/image'
import { Clock, Tag } from 'lucide-react'
import type { NewsArticle } from '@/types/news'

interface NewsWidgetProps {
  articles: NewsArticle[]
}

export function NewsWidget({ articles }: NewsWidgetProps) {
  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Market News</h2>
        <p className="text-gray-500 text-center py-8">No news articles available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Market News</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map(article => (
          <a 
            key={article.id} 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {article.isPremium && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Premium
                </div>
              )}
            </div>
            
            <h3 className="font-medium line-clamp-2 group-hover:text-blue-600">
              {article.title}
            </h3>
            
            <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                <span>{article.category}</span>
              </div>
            </div>
            
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {article.description}
            </p>
          </a>
        ))}
      </div>
      
      <div className="mt-6 text-right">
        <a href="/news" className="text-sm text-blue-600 hover:text-blue-800">
          View all news →
        </a>
      </div>
    </div>
  )
} 