// composables/useArrivals.js - Simple with caching
import { ref } from 'vue';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';

export function useArrivals(baseURL = import.meta.env.VITE_API_BASE_URL ) {
  const arrivals = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const lastUpdated = ref(null);

  const http = rateLimit(axios.create({ baseURL }), { 
    maxRequests: 2,
    perMilliseconds: 5000
  });

  // Simple in-memory cache
  const cache = new Map();
  const CACHE_DURATION = 30000; // 30 seconds

  const fetchArrivals = async (code) => {
    if (!code) return;

    const cacheKey = `arrivals:${code}`;
    const cached = cache.get(cacheKey);

    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      arrivals.value = cached.data;
      lastUpdated.value = cached.lastUpdated;
      return;
    }

    // Fetch fresh data
    loading.value = true;
    error.value = null;

    try {
      const response = await http.get(`/stations/${code}`);
      const sorted = response.data.sort((a, b) => 
        a.Group.localeCompare(b.Group)
      );
      
      arrivals.value = sorted;
      lastUpdated.value = new Date().toLocaleTimeString();

      // Cache the result
      cache.set(cacheKey, {
        data: sorted,
        lastUpdated: lastUpdated.value,
        timestamp: Date.now()
      });
    } catch (e) {
      error.value = e.message;
      arrivals.value = [];
    } finally {
      loading.value = false;
    }
  };

  const clearCache = () => {
    cache.clear();
  };

  return {
    arrivals,
    loading,
    error,
    lastUpdated,
    fetchArrivals,
    clearCache
  };
}