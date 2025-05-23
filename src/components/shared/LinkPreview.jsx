// components/shared/LinkPreview.jsx
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';

export default function LinkPreview({ url }) {
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

    if (!meta) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
            >
                {url}
            </a>
        );
    }

    return (
        <Card className="flex max-w-md">
            {meta.image && (
                <img
                    src={meta.image}
                    alt={meta.title}
                    className="w-20 h-20 object-cover rounded-l"
                />
            )}
            <CardContent className="p-2 flex-1">
                <CardTitle className="text-sm line-clamp-1">{meta.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                    {meta.description}
                </CardDescription>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-xs mt-1 inline-block"
                >
                    {new URL(url).hostname}
                </a>
            </CardContent>
        </Card>
    );
}
