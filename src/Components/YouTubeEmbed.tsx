import { useEffect, useRef } from 'react';

interface YouTubeEmbedProps {
  src: string;
  title?: string;
  className?: string;
}

export default function YouTubeEmbed({ src, title = "YouTube video player", className = "" }: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hideEndscreen = () => {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        try {
          const iframeDoc = iframeRef.current.contentDocument;
          // Hide all endscreen elements
          const style = iframeDoc.createElement('style');
          style.textContent = `
            .ytp-endscreen-container { display: none !important; }
            .ytp-endscreen { display: none !important; }
            .ytp-endscreen-element { display: none !important; }
            .ytp-suggestion { display: none !important; }
          `;
          iframeDoc.head.appendChild(style);
        } catch {
          // Silently fail if we can't access iframe due to CORS
          console.log('Cannot access iframe document due to CORS policy');
        }
      }
    };

    // Attempt to hide endscreen after iframe loads
    const timer = setTimeout(hideEndscreen, 2000);
    
    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div ref={containerRef} className={className}>
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ pointerEvents: 'auto' }}
      ></iframe>
    </div>
  );
}
