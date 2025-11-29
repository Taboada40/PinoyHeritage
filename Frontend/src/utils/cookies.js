// Cookie utility functions for better performance and session management

/**
 * Set a cookie with optional expiry
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Days until expiry (default 7)
 */
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {any} Parsed cookie value or null
 */
export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      try {
        return JSON.parse(decodeURIComponent(cookie.substring(nameEQ.length)));
      } catch (e) {
        return cookie.substring(nameEQ.length);
      }
    }
  }
  return null;
};

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Cache user session in cookie for faster access
 * @param {object} user - User object
 */
export const cacheUserSession = (user) => {
  if (user) {
    setCookie('user_session', {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }, 7);
  }
};

/**
 * Get cached user session from cookie
 * @returns {object|null} Cached user session
 */
export const getCachedUserSession = () => {
  return getCookie('user_session');
};

/**
 * Clear user session cookie on logout
 */
export const clearUserSession = () => {
  deleteCookie('user_session');
  deleteCookie('cart_cache');
};

/**
 * Cache cart items for offline/quick access
 * @param {number} userId - User ID
 * @param {array} items - Cart items
 */
export const cacheCartItems = (userId, items) => {
  if (userId && items) {
    setCookie(`cart_cache_${userId}`, {
      items: items,
      timestamp: Date.now()
    }, 1); // Cache for 1 day
  }
};

/**
 * Get cached cart items
 * @param {number} userId - User ID
 * @returns {object|null} Cached cart data with items and timestamp
 */
export const getCachedCartItems = (userId) => {
  if (!userId) return null;
  const cached = getCookie(`cart_cache_${userId}`);
  
  // Check if cache is still valid (less than 5 minutes old for quick loads)
  if (cached && cached.timestamp) {
    const age = Date.now() - cached.timestamp;
    const fiveMinutes = 5 * 60 * 1000;
    if (age < fiveMinutes) {
      return cached;
    }
  }
  return null;
};

/**
 * Clear cart cache for a user
 * @param {number} userId - User ID
 */
export const clearCartCache = (userId) => {
  if (userId) {
    deleteCookie(`cart_cache_${userId}`);
  }
};
