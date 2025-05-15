"use client"

import { Badge } from "@/components/ui/badge"

interface ExperienceFiltersProps {
  categories: string[]
  activeCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function ExperienceFilters({
  categories,
  activeCategory,
  onSelectCategory,
}: ExperienceFiltersProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={activeCategory === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSelectCategory(null)}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Duration</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <input
              type="checkbox"
              id="short"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="short" className="text-sm">
              1-3 days
            </label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <input
              type="checkbox"
              id="medium"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="medium" className="text-sm">
              4-7 days
            </label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <input
              type="checkbox"
              id="long"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="long" className="text-sm">
              8-14 days
            </label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <input
              type="checkbox"
              id="extended"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="extended" className="text-sm">
              15+ days
            </label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Rating</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <input
              type="checkbox"
              id="rating3"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="rating3" className="flex items-center text-sm">
              <span>3+</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-4 w-4 text-yellow-500"
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <input
              type="checkbox"
              id="rating4"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="rating4" className="flex items-center text-sm">
              <span>4+</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-4 w-4 text-yellow-500"
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <input
              type="checkbox"
              id="rating4.5"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="rating4.5" className="flex items-center text-sm">
              <span>4.5+</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-4 w-4 text-yellow-500"
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
} 