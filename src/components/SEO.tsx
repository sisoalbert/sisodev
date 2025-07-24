import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: object;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
  type = 'website',
  structuredData,
  canonical
}) => {
  const location = useLocation();
  const baseUrl = 'https://sisodev.com'; // Update with your actual domain
  const defaultTitle = 'SisoDev - Software Engineering Blog & Tutorials';
  const defaultDescription = 'Discover cutting-edge software engineering insights, tutorials, and best practices. Expert content on web development, React, TypeScript, Firebase, and modern programming techniques.';
  const defaultImage = `${baseUrl}/logo.svg`;
  const defaultKeywords = [
    'software engineering', 'web development', 'React', 'TypeScript', 'Firebase',
    'programming', 'coding', 'tutorials', 'tech blog', 'developer resources',
    'full stack development', 'JavaScript', 'frontend', 'backend', 'AI programming'
  ];

  const seoTitle = title ? `${title} | SisoDev` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = url || `${baseUrl}${location.pathname}`;
  const seoKeywords = [...defaultKeywords, ...keywords];
  const seoCanonical = canonical || seoUrl;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Remove existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-seo]');
    existingMetas.forEach(meta => meta.remove());

    // Remove existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"]');
    existingStructuredData.forEach(script => script.remove());

    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();

    // Create meta tags
    const metaTags = [
      // Basic SEO
      { name: 'description', content: seoDescription },
      { name: 'keywords', content: seoKeywords.join(', ') },
      { name: 'author', content: author || 'SisoDev Team' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      
      // Open Graph
      { property: 'og:type', content: type },
      { property: 'og:title', content: seoTitle },
      { property: 'og:description', content: seoDescription },
      { property: 'og:image', content: seoImage },
      { property: 'og:url', content: seoUrl },
      { property: 'og:site_name', content: 'SisoDev' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoTitle },
      { name: 'twitter:description', content: seoDescription },
      { name: 'twitter:image', content: seoImage },
      { name: 'twitter:creator', content: '@sisodev' },
      { name: 'twitter:site', content: '@sisodev' },
      
      // LLM Search Optimization
      { name: 'ai:content_type', content: type },
      { name: 'ai:topic_category', content: keywords.length > 0 ? keywords[0] : 'software engineering' },
      { name: 'ai:expertise_level', content: 'intermediate to advanced' },
      { name: 'ai:content_format', content: type === 'article' ? 'tutorial, guide, technical article' : 'website' },
      { name: 'ai:target_audience', content: 'software developers, engineers, tech professionals' },
      
      // Technical SEO
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#3b82f6' },
    ];

    // Add article-specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        metaTags.push({ property: 'article:published_time', content: publishedTime });
      }
      if (modifiedTime) {
        metaTags.push({ property: 'article:modified_time', content: modifiedTime });
      }
      if (author) {
        metaTags.push({ property: 'article:author', content: author });
      }
      metaTags.push({ property: 'article:section', content: 'Technology' });
      keywords.forEach(tag => {
        metaTags.push({ property: 'article:tag', content: tag });
      });
    }

    // Create and append meta tags
    metaTags.forEach(({ name, property, content, 'http-equiv': httpEquiv }) => {
      const meta = document.createElement('meta');
      meta.setAttribute('data-seo', 'true');
      
      if (name) meta.name = name;
      if (property) meta.setAttribute('property', property);
      if (httpEquiv) meta.setAttribute('http-equiv', httpEquiv);
      if (content) meta.content = content;
      
      document.head.appendChild(meta);
    });

    // Add canonical link
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = seoCanonical;
    document.head.appendChild(canonicalLink);

    // Add structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    } else {
      // Default website structured data
      const defaultStructuredData = {
        '@context': 'https://schema.org',
        '@type': type === 'article' ? 'Article' : 'WebSite',
        name: seoTitle,
        description: seoDescription,
        url: seoUrl,
        image: seoImage,
        ...(type === 'website' && {
          publisher: {
            '@type': 'Organization',
            name: 'SisoDev',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.svg`
            }
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }),
        ...(type === 'article' && {
          headline: title,
          author: {
            '@type': 'Person',
            name: author || 'SisoDev Team'
          },
          publisher: {
            '@type': 'Organization',
            name: 'SisoDev',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.svg`
            }
          },
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': seoUrl
          }
        })
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(defaultStructuredData);
      document.head.appendChild(script);
    }

  }, [seoTitle, seoDescription, seoImage, seoUrl, seoKeywords, author, publishedTime, modifiedTime, type, structuredData, seoCanonical]);

  return null;
};

export default SEO;