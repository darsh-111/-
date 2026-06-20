import { useState } from 'react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop';

function SafeImage({ src, alt, className, style }) {
    const [s, setS] = useState(src);
    return (
        <img
            className={className}
            src={s}
            alt={alt}
            onError={() => setS(FALLBACK_IMG)}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(.4,0,.2,1)', ...style }}
        />
    );
}

export default SafeImage;
export { SafeImage };
