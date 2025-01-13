// Create a new file for storage management
const MAX_ITEMS = 50; // Adjust based on your needs
const STORAGE_KEY_PREFIX = 'image_';

export const StorageManager = {
  // Get all image keys
  getImageKeys: () => {
    return Object.keys(localStorage).filter(key => key.startsWith(STORAGE_KEY_PREFIX));
  },

  // Get timestamp for a key
  getTimestamp: (key) => {
    try {
      const metadata = JSON.parse(localStorage.getItem(`${key}_meta`));
      return metadata?.timestamp || 0;
    } catch {
      return 0;
    }
  },

  // Remove oldest items
  cleanupStorage: () => {
    const imageKeys = StorageManager.getImageKeys();
    if (imageKeys.length > MAX_ITEMS) {
      const sortedKeys = imageKeys.sort((a, b) => 
        StorageManager.getTimestamp(a) - StorageManager.getTimestamp(b)
      );
      
      // Remove oldest items
      const keysToRemove = sortedKeys.slice(0, sortedKeys.length - MAX_ITEMS);
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_meta`);
      });
    }
  },

  // Save image with metadata
  saveImage: (key, imageData) => {
    try {
      StorageManager.cleanupStorage();
      localStorage.setItem(key, imageData);
      localStorage.setItem(`${key}_meta`, JSON.stringify({
        timestamp: Date.now()
      }));
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      // If still fails after cleanup, remove all cached images
      StorageManager.getImageKeys().forEach(key => {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_meta`);
      });
      return false;
    }
  }
}; 