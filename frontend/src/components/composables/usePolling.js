// composables/usePolling.js
import { ref, onUnmounted } from 'vue';

/**
 * Composable for managing polling intervals
 * @param {Function} callback - Function to call on each interval
 * @param {Number} intervalMs - Interval in milliseconds (default: 5000)
 * @returns {Object} Polling control methods and state
 */
export function usePolling(callback, intervalMs = 5000) {
  const isPolling = ref(false);
  let intervalId = null;

  const startPolling = () => {
    if (isPolling.value) return;
    
    callback(); // Call immediately
    intervalId = setInterval(callback, intervalMs);
    isPolling.value = true;
  };

  const stopPolling = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      isPolling.value = false;
    }
  };

  const restartPolling = () => {
    stopPolling();
    startPolling();
  };

  // Cleanup on component unmount
  onUnmounted(() => {
    stopPolling();
  });

  return {
    isPolling,
    startPolling,
    stopPolling,
    restartPolling
  };
}