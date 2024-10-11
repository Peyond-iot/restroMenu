import React from 'react';

interface RatingProps {
    rating: number;
  }

const Rating: React.FC<RatingProps> = ({ rating }) =>{
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;
    
    // Array to store JSX for stars
    let stars = [];
    
    // Loop to push full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
  
    // If there is a half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-4 h-4 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
                <linearGradient id="half-fill" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="transparent" />
                </linearGradient>
            </defs>
            <path
                d="M12 17.3l-5.38 2.83a1.44 1.44 0 0 1-2.1-1.52l1.03-6.02L1.62 9.24a1.44 1.44 0 0 1 .8-2.46l6.06-.88L10.9 1.2a1.44 1.44 0 0 1 2.58 0l2.42 4.9 6.06.88c1.06.15 1.48 1.46.8 2.46l-4.38 4.27 1.03 6.02c.18 1.07-.94 1.88-1.98 1.52L12 17.3z"
                fill="url(#half-fill)"
                stroke="#EF4444"
                strokeWidth="0.8"
            />
        </svg>
      );
    }
  
    // Fill the remaining stars as empty
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="transparent" stroke="#EF4444" strokeWidth="1.5" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
  
    return (
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        <div className="flex items-center space-x-1 rtl:space-x-reverse">{stars}</div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{rating}/5</span>
      </div>
    );
}

export default Rating;
