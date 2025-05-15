"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Filter, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Define the ExperienceFilters component inline to resolve import issues
const ExperienceFilters = ({
  categories,
  activeCategory,
  onSelectCategory,
}: {
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}) => {
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
  );
};

// Sample travel experiences data
const experiences = [
  {
    id: 1,
    title: "Hiking in the Swiss Alps",
    location: "Switzerland",
    description: "Experience breathtaking mountain views as you trek through well-marked trails in the Swiss Alps.",
    image: "/images/matterhorn.jpg",
    rating: 4.8,
    reviews: 156,
    category: "Adventure",
    tags: ["Hiking", "Mountains", "Nature"],
    duration: "3-5 days",
  },
  {
    id: 2,
    title: "Sailing the Greek Islands",
    location: "Greece",
    description: "Island hop through the crystal-clear waters of the Aegean Sea, exploring hidden coves and charming villages.",
    image: "/images/thasos.jpg",
    rating: 4.7,
    reviews: 189,
    category: "Beach",
    tags: ["Islands", "Sailing", "Relaxation"],
    duration: "7-10 days",
  },
  {
    id: 3,
    title: "Food Tour in Barcelona",
    location: "Spain",
    description: "Indulge in Spanish cuisine as you explore tapas bars, food markets, and restaurants in this culinary hotspot.",
    image: "/images/barcelona.jpg",
    rating: 4.6,
    reviews: 178,
    category: "Food & Drink",
    tags: ["Cuisine", "Tapas", "Market"],
    duration: "1-2 days",
  },
];

// Categories for filter
const categories = [
  "Adventure",
  "Beach",
  "Cultural",
  "Food & Drink",
  "Nature",
  "Wildlife",
  "City",
  "Mountains",
  "Historical",
  "Relaxation"
];

export default function ExplorePage() {
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query) {
      setFilteredExperiences(experiences);
      return;
    }
    
    const filtered = experiences.filter(exp => 
      exp.title.toLowerCase().includes(query.toLowerCase()) || 
      exp.location.toLowerCase().includes(query.toLowerCase()) ||
      exp.description.toLowerCase().includes(query.toLowerCase()) ||
      exp.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredExperiences(filtered);
  };

  const filterByCategory = (category: string | null) => {
    setActiveCategory(category);
    
    if (!category) {
      setFilteredExperiences(experiences);
      return;
    }
    
    const filtered = experiences.filter(exp => 
      exp.category === category || exp.tags.includes(category)
    );
    
    setFilteredExperiences(filtered);
  };

  return (
    <main className="container py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Explore Experiences</h1>
        <p className="text-muted-foreground">
          Discover amazing travel experiences and activities from around the world
        </p>
        
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search experiences..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterVisible(!filterVisible)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Tabs defaultValue="grid">
              <TabsList className="grid w-16 grid-cols-2">
                <TabsTrigger value="grid">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </TabsTrigger>
                <TabsTrigger value="map">
                  <Map className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {filterVisible && (
          <div className="rounded-lg border p-4">
            <ExperienceFilters
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={filterByCategory}
            />
          </div>
        )}
        
        <Tabs defaultValue="grid" className="w-full">
          <TabsContent value="grid" className="mt-6">
            {filteredExperiences.length === 0 ? (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="mt-4 text-lg font-semibold">No experiences found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredExperiences.map((experience) => (
                  <Card key={experience.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <div className="absolute right-2 top-2 z-10">
                        <Badge variant="secondary" className="bg-black/60 hover:bg-black/70 text-white">
                          {experience.category}
                        </Badge>
                      </div>
                      <Image
                        src={experience.image}
                        alt={experience.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={experience.id === 1}
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-1">{experience.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1 h-4 w-4"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {experience.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {experience.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {experience.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="flex justify-between p-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-1 h-4 w-4 text-yellow-500"
                        >
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">
                          {experience.rating} 
                          <span className="ml-1 text-muted-foreground">
                            ({experience.reviews})
                          </span>
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {experience.duration}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="map" className="mt-6">
            <div className="flex h-[600px] items-center justify-center rounded-lg border">
              <div className="text-center">
                <Map className="mx-auto h-8 w-8 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Map View</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Map view is coming soon!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
} 