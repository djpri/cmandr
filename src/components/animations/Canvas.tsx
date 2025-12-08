import React, { useRef, useEffect } from 'react';

const SpinningCog: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.save();
    ctx.clearRect(0, 0, 27, 27);
    ctx.translate(13.5, 13.5); // to get it in the origin
    ctx.rotate(rotation * Math.PI / 64); //rotate in origin
    ctx.translate(-13.5, -13.5); //put it back
    ctx.restore();
  };

  let rotation = 0;
  const rotationRef = useRef<number>();

  useEffect(() => {
    rotationRef.current = window.setInterval(() => {
      rotation += 1;
      draw();
    }, 10);

    return () => {
      clearInterval(rotationRef.current);
    };
  }, []);

  return <canvas width={27} height={27} ref={canvasRef} />;
};

export default SpinningCog;
