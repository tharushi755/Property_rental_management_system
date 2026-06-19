import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (property) => {
    if (!wishlist.find(item => item.id === property.id)) {
      setWishlist([...wishlist, property]);
      alert(`${property.title} added to wishlist!`);
    }
  };

  const removeFromWishlist = (propertyId) => {
    setWishlist(wishlist.filter(item => item.id !== propertyId));
    alert('Removed from wishlist');
  };

  const isInWishlist = (propertyId) => {
    return wishlist.some(item => item.id === propertyId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}