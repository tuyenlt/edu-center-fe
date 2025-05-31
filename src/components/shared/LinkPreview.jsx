// components/shared/LinkPreview.jsx
import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

export default function LinkPreview({ url, className }) {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`
        );
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        if (!cancelled) setMeta(data);
      } catch (err) {
        console.error('Failed to fetch link preview', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div
      className={`flex w-[calc(50%-12px)] items-center border border-blue-300 rounded-lg px-4 py-3 shadow-sm hover:shadow transition mb-1 ${className}`}
    >
      {/* Stripe bên trái */}
      <div className="w-1 h-12 bg-blue-400 rounded-l-md mr-4" />

      {/* Nội dung link */}
      <div className="flex-1 overflow-hidden">
        <div className="font-medium text-sm">{meta?.title || 'Link'}</div>
        <a
          href={url}
          className="text-gray-600 text-sm truncate block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      </div>

      {/* Icon menu */}
    </div>
  );
}
