# Modern Blog Site Specification

## Overview
A clean, minimal blog site with Froala-like aesthetic featuring ample whitespace, soft shadows, rounded corners, readable typography, and subtle hover states.

## Sitemap
- **Homepage** (`/`) - Hero section + latest articles grid
- **Articles** (`/articles`) - Full article listing with filters
- **Article Detail** (`/article/[slug]`) - Individual article page
- **About** (`/about`) - About the blog/author
- **Contact** (`/contact`) - Contact form
- **404** (`/404`) - Not found page

## Page Goals
- **Homepage**: Engage visitors, showcase latest content
- **Articles**: Easy content discovery and navigation
- **Article Detail**: Optimal reading experience
- **About**: Build trust and connection
- **Contact**: Enable communication

## Key Sections
### Homepage
- Navigation header with search
- Hero section with CTA
- Featured articles grid
- Footer with links

### Article Detail
- Breadcrumb navigation
- Article header (title, meta, tags)
- Content with typography styling
- Related articles
- Comments section (future)

## Component List
✅ **BlogHeader** - Navigation with search
✅ **HeroSection** - Homepage hero with CTA
✅ **BlogCard** - Article preview card
✅ **BlogGrid** - Articles grid layout
- **ArticleContent** - Full article layout
- **Sidebar** - Categories, tags, recent posts
- **Footer** - Links and copyright
- **SearchBar** - Article search functionality
- **TagFilter** - Filter by tags/categories
- **Breadcrumbs** - Navigation breadcrumbs

## Accessibility Checklist (WCAG 2.1 AA)
- [ ] Semantic HTML structure
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Focus indicators
- [ ] Alt text for images
- [ ] Proper heading hierarchy
- [ ] Skip to content link

## Performance Budget
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Bundle Size**: < 200KB gzipped
- **Image Optimization**: WebP format, lazy loading

## Design Tokens
### Colors
- **Primary**: hsl(var(--primary))
- **Background**: hsl(var(--background))
- **Foreground**: hsl(var(--foreground))
- **Muted**: hsl(var(--muted))
- **Border**: hsl(var(--border))

### Typography
- **Headings**: Inter, bold, 1.2 line-height
- **Body**: Inter, normal, 1.6 line-height
- **Code**: JetBrains Mono, monospace

### Spacing
- **Container**: max-width 1200px, padding 2rem
- **Sections**: py-16 (64px vertical)
- **Cards**: p-6 (24px padding)

### Shadows & Borders
- **Card Shadow**: shadow-sm hover:shadow-lg
- **Border Radius**: rounded-lg (8px)
- **Transitions**: duration-300 ease-out

## Content Guidelines
### Article Structure
1. **Compelling headline** (60 chars max)
2. **Engaging excerpt** (150-160 chars)
3. **Clear introduction** paragraph
4. **Structured body** with headings
5. **Actionable conclusion**

### Writing Style
- **Conversational** yet professional
- **Scannable** with bullet points
- **Code examples** with syntax highlighting
- **Visual elements** to break up text

### SEO Requirements
- **Meta descriptions** for all pages
- **Open Graph** tags
- **Structured data** markup
- **Internal linking** strategy

## Mobile-First Design
- **Breakpoints**: sm:640px, md:768px, lg:1024px
- **Touch targets**: minimum 44px
- **Readable text**: 16px base size
- **Optimized images** for different screen sizes