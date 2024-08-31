'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MyComponent() {
  const router = useRouter();
  const { query } = router;

  // Initialize state from the URL query or use a default value
  const [value, setValue] = useState(query.value || '');

  // Update the URL when the state changes
  useEffect(() => {
    if (value) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...query, value },
        },
        undefined,
        { shallow: true }
      );
    } else {
      // If the value is empty, remove it from the query string
      const { value, ...rest } = query;
      router.push(
        {
          pathname: router.pathname,
          query: rest,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Current value: {value}</p>
    </div>
  );
}