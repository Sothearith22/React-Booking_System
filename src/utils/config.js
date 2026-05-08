export const config = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  API_KEY: import.meta.env.VITE_API_KEY || '',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
};