const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bazardor-json.vercel.app';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
  }

  return response.json();
}