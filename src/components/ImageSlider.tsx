"use client";
import { useEffect, useState } from 'react';
import './ImageSlider.css';

interface ImageSliderProps {
  images?: string[];
}

const defaultImages = [
  '/hero-pg.png',
  '/banner.png',
  '/achievement.png',
  '/about-bg.png',
  '/extra-image.png',
];

export default function ImageSlider({ images = defaultImages }: ImageSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000); // change every 7 seconds for smoother pacing
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="image-slider">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`slide-${i}`}
          className={i === index ? 'active' : ''}
        />
      ))}
    </div>
  );
}
