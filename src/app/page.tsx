import { NoWebGLFallback } from '@/components/NoWebGLFallback';
import { Book3D } from '@/components/Book3D';

export default function HomePage() {
  return (
    <>
      {/* Semantic Accessible & SEO Content for Screen Readers and Web Crawlers */}
      <NoWebGLFallback />

      {/* Interactive 3D Three.js Book Experience */}
      <Book3D />
    </>
  );
}
