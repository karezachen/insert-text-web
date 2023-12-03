// pages/gallery.tsx
import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <img key={index} src={`/output/${image}`} alt={`Image ${index}`} className="gallery-image" />
      ))}
      <style jsx>{`
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        @media (max-width: 400px) {
          .gallery-container {
            grid-template-columns: repeat(2, 1fr)
          }
        }

        .gallery-image {
          width: 100%;
          height: auto;
          object-fit: cover; // 保持图片比例并填充容器
        }
      `}</style>
    </div>
  );
};

export const getStaticProps: GetStaticProps<GalleryProps> = async () => {
  const directory = path.join(process.cwd(), 'public', 'output');
  const filenames = fs.readdirSync(directory);

  return {
    props: {
      images: filenames,
    },
  };
};

export default Gallery;
