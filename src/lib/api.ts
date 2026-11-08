const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://openapi.programming-hero.com/api/bazardor';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;
  
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

  const result = await response.json();
  const rawData = Array.isArray(result) ? result : (result.data || result.products || result);

  if (Array.isArray(rawData)) {
    return rawData.map((item: any) => {
      // API response mapping
      const productName = item.nameBn || item.name || 'পণ্য';
      const todayPrice = Number(item.today ?? item.price ?? 0);
      
      // Change extraction ({ dir: "up", pct: 2.1 })
      let changePct = 0;
      let trendVal: 'up' | 'down' | 'same' = 'same';

      if (item.change && typeof item.change === 'object') {
        changePct = Math.abs(Number(item.change.pct ?? 0));
        if (item.change.dir === 'up') trendVal = 'up';
        else if (item.change.dir === 'down') trendVal = 'down';
        else trendVal = 'same';
      } else {
        const rawChange = Number(item.change ?? 0);
        changePct = Math.abs(rawChange);
        trendVal = rawChange > 0 ? 'up' : rawChange < 0 ? 'down' : 'same';
      }

      return {
        ...item,
        id: String(item.id || item.slug || Math.random()),
        name: productName,
        category: item.categoryNameBn || item.category || 'সাধারণ',
        categorySlug: item.category || 'all',
        price: todayPrice,
        unit: item.unit || 'কেজি',
        change: changePct,
        trend: trendVal,
      };
    }) as unknown as T;
  }

  return rawData as T;
}