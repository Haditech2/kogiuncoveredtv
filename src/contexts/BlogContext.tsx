import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  userId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
  slug: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'date' | 'slug' | 'likes' | 'comments'>) => void;
  editPost: (id: string, updatedPost: Partial<BlogPost>) => void;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  searchPosts: (query: string) => BlogPost[];
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'date'>) => void;
  toggleLike: (postId: string, userId: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

// Sample initial posts
const initialPosts: BlogPost[] = [
  {
    id: '1',
    authorId: '1',
    title: "Exploring the Rich Cultural Heritage of Kogi State",
    excerpt: "Discover the diverse cultures, traditions, and historical landmarks that make Kogi State unique.",
    author: "Amina Yusuf",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    tags: ["Culture", "Heritage", "Kogi State"],
    imageUrl: "/placeholder.svg",
    slug: "exploring-kogi-cultural-heritage",
    content: `
# Exploring the Rich Cultural Heritage of Kogi State

Kogi State, often referred to as the 'Confluence State', is a melting pot of diverse cultures and traditions. In this article, we'll explore the unique cultural heritage that makes Kogi State a fascinating destination.

## The People and Their Traditions

Kogi State is home to various ethnic groups including the Igala, Ebira, and Okun people, each with their distinct cultural practices:

- **Igala Kingdom**: Known for their rich history and traditional institutions
- **Ebira People**: Celebrated for their vibrant festivals and masquerades
- **Okun People**: Renowned for their artistic expressions and traditional crafts

## Historical Landmarks

From the famous Lord Lugard's House in Lokoja to the confluence of Rivers Niger and Benue, Kogi State is rich in historical sites that tell the story of Nigeria's past.

## Preserving Our Heritage

As we move forward, it's crucial to document and preserve these cultural treasures for future generations. Kogiuncovered is committed to telling these important stories.
    `
  },
  {
    id: '2',
    title: "Economic Growth and Development in Kogi State",
    excerpt: "An in-depth look at the economic potential and development initiatives in Kogi State.",
    author: "Ibrahim Musa",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    tags: ["Economy", "Development", "Kogi State"],
    imageUrl: "/placeholder.svg",
    slug: "kogi-economic-growth",
    content: `
# Economic Growth and Development in Kogi State

Kogi State, strategically located in the heart of Nigeria, holds immense economic potential. This article explores the various sectors driving growth and development in the state.

## Key Economic Sectors

### Agriculture
Kogi State's fertile land supports the cultivation of crops like yam, cassava, and cashew, making agriculture a cornerstone of the local economy. The state government has implemented several agricultural initiatives to boost food production and support local farmers.

### Solid Minerals
With significant deposits of coal, limestone, and iron ore, the mining sector presents numerous opportunities for investment and job creation. The state is working to attract both local and international investors to harness these resources responsibly.

### Tourism
From the scenic Mount Patti to the confluence of Nigeria's two great rivers, Kogi's tourism potential remains largely untapped. The state is investing in infrastructure to make these attractions more accessible to visitors.

## Infrastructure Development

Recent infrastructure projects include:
- Road networks connecting major cities
- Improved electricity supply
- Upgraded healthcare facilities
- Educational institutions

## Investment Opportunities

The Kogi State government has created an enabling environment for businesses through:
- Streamlined business registration processes
- Tax incentives for investors
- Public-private partnerships
- Industrial parks and free trade zones

## Looking Ahead

With its strategic location, abundant natural resources, and ongoing development initiatives, Kogi State is poised to become an economic powerhouse in Nigeria's Middle Belt region.
    `
  },
  {
    id: '3',
    title: "Unveiling Kogi State's Tourism Potential",
    excerpt: "Discover the hidden gems and tourist attractions that make Kogi State a must-visit destination in Nigeria.",
    author: "Fatima Abubakar",
    date: "Dec 5, 2024",
    readTime: "8 min read",
    tags: ["Tourism", "Travel", "Kogi State"],
    imageUrl: "/placeholder.svg",
    slug: "kogi-tourism-potential",
    content: `
# Unveiling Kogi State's Tourism Potential

Kogi State, blessed with natural wonders and rich cultural heritage, is emerging as a prime tourist destination in Nigeria. This article takes you on a journey through some of the state's most captivating attractions.

## Must-Visit Attractions

### 1. The Confluence of Rivers Niger and Benue
Witness the spectacular meeting point of Nigeria's two great rivers in Lokoja, offering breathtaking views and historical significance as the spot where the country's name was coined.

### 2. Mount Patti
A scenic hill in Lokoja that provides a panoramic view of the city and the confluence. The mountain is accessible by road and offers hiking opportunities for adventure enthusiasts.

### 3. Lord Lugard's Residence
This colonial-era building was the residence of Nigeria's first Governor-General, Lord Frederick Lugard. It now serves as a museum showcasing colonial artifacts and historical documents.

## Cultural Festivals

Kogi State comes alive with vibrant festivals throughout the year:

- **Echane Festival**: Celebrated by the Igala people to mark the beginning of the farming season
- **Ovia Osese Festival**: A colorful masquerade festival of the Ebira people
- **Ogani U'Kongbo Festival**: Showcasing the rich cultural heritage of the Okun people

## Eco-Tourism Opportunities

The state's diverse ecosystem supports various eco-tourism activities:
- Bird watching at the River Niger-Benue basin
- Fishing and boat cruises
- Nature walks and hiking trails

## Local Cuisine

Don't miss the opportunity to savor local delicacies such as:
- Pounded yam with egusi soup
- Omi Ukpoka (a traditional soup)
- Fresh fish from the rivers

## Travel Tips

- Best time to visit: November to February (dry season)
- Local guides are available at major tourist sites
- Respect local customs and traditions
- Try to learn a few basic phrases in the local languages

## Conclusion

With its rich cultural heritage, natural attractions, and warm hospitality, Kogi State offers a unique and authentic Nigerian experience. Whether you're a history buff, nature lover, or cultural enthusiast, Kogi has something special for everyone.
    `,
    likes: [],
    comments: [],
    authorId: '1'
  }
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    // Load posts from localStorage or use initial posts
    const savedPosts = typeof window !== 'undefined' ? localStorage.getItem('blogPosts') : null;
    const parsedPosts: unknown = savedPosts ? JSON.parse(savedPosts) : initialPosts;
    const postsToNormalize = Array.isArray(parsedPosts) ? parsedPosts : initialPosts;
    
    // Ensure all posts have likes and comments arrays
    return postsToNormalize.map((post) => {
      const normalizedPost = post as Partial<BlogPost>;

      return {
        ...normalizedPost,
        likes: normalizedPost.likes || [],
        comments: normalizedPost.comments || [],
        authorId: normalizedPost.authorId || '1' // Default author ID
      } as BlogPost;
    });
  });

  // Save posts to localStorage whenever they change (use same key as initial load)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
  }, [posts]);

  const addPost = (post: Omit<BlogPost, 'id' | 'date' | 'slug' | 'likes' | 'comments'>) => {
    const slug = post.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '')
      .concat('-', uuidv4().slice(0, 8));

    const newPost: BlogPost = {
      ...post,
      authorId: post.authorId || '1',
      id: uuidv4(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      slug,
      likes: [],
      comments: [],
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const getPostBySlug = (slug: string) => {
    return posts.find(post => post.slug === slug);
  };

  const editPost = (id: string, updatedPost: Partial<BlogPost>) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const searchPosts = (query: string) => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  };

  const addComment = (postId: string, comment: Omit<Comment, 'id' | 'date'>) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => {
        if (post.id === postId) {
          const newComment: Comment = {
            ...comment,
            id: uuidv4(),
            date: new Date().toISOString(),
          };
          return {
            ...post,
            comments: [...(post.comments || []), newComment],
          };
        }
        return post;
      });
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      }
      
      return updatedPosts;
    });
  };

  const toggleLike = (postId: string, userId: string) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likes?.includes(userId) || false;
          const updatedLikes = isLiked
            ? post.likes?.filter(id => id !== userId) || []
            : [...(post.likes || []), userId];
            
          return {
            ...post,
            likes: updatedLikes,
          };
        }
        return post;
      });
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      }
      
      return updatedPosts;
    });
  };

  return (
    <BlogContext.Provider value={{ 
      posts, 
      addPost, 
      editPost, 
      getPostBySlug, 
      searchPosts, 
      addComment, 
      toggleLike 
    }}>
      {children}
    </BlogContext.Provider>
  );
};