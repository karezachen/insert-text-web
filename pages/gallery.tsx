import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [inputValue, setInputValue] = useState('');

  const executePythonScript = async () => {
    try {
      const response = await fetch(`/api/update?Text=${encodeURIComponent(inputValue)}`, {
        method: 'GET',
      });

      window.location.reload();
    } catch (error) {
      console.error('执行 Python 脚本时出错:', error);
    }
  };

  return (
    <div className="gallery-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="输入文字..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={executePythonScript}>生成设计图</button>
      </div>
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img key={index} src={`/output/${image}`} alt={`Image ${index}`} className="gallery-image" />
          <p className="image-index">第 {index + 1} 张</p>
        </div>
      ))}
      <style jsx>{`
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .input-container {
          margin-bottom: 16px;
        }

        @media (max-width: 400px) {
          .gallery-container {
            grid-template-columns: repeat(2, 1fr)
          }
        }

        .gallery-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .gallery-item {
          position: relative;
        }

        .image-index {
          position: absolute;
          bottom: 0%;
          left: 50%;
          transform: translate(-50%, 50%);
          margin: 0;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 4px;
          font-size: 12px;
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
