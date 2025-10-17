import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const DecorativeBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Create particles
    const particleCount = 200;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.3,
        color: `rgba(19, 117, 106, ${Math.random() * 0.8 + 0.2})`
      });
    }

    particlesRef.current = particles;

    // Animate particles with GSAP
    particles.forEach((particle, index) => {
      // Animate position
      gsap.to(particle, {
        x: `+=${(Math.random() - 0.5) * width}`,
        y: `+=${(Math.random() - 0.5) * height}`,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      });

      // Animate size
      gsap.to(particle, {
        size: particle.size * 2,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random()
      });

      // Animate opacity
      gsap.to(particle, {
        opacity: 0.1,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 1.5
      });
    });

    // Create wireframe lines
    const lines = [];
    for (let i = 0; i < 15; i++) {
      const line = {
        x1: Math.random() * width,
        y1: Math.random() * height,
        x2: Math.random() * width,
        y2: Math.random() * height,
        opacity: Math.random() * 0.3 + 0.1
      };
      lines.push(line);

      // Animate lines
      gsap.to(line, {
        x1: `+=${(Math.random() - 0.5) * width * 0.5}`,
        y1: `+=${(Math.random() - 0.5) * height * 0.5}`,
        x2: `+=${(Math.random() - 0.5) * width * 0.5}`,
        y2: `+=${(Math.random() - 0.5) * height * 0.5}`,
        duration: 8 + Math.random() * 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      });

      gsap.to(line, {
        opacity: 0.05,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random()
      });
    }

    // Render loop using GSAP ticker
    const render = () => {
      ctx.fillStyle = '#0F1617';
      ctx.fillRect(0, 0, width, height);

      // Draw lines
      lines.forEach(line => {
        ctx.strokeStyle = `rgba(19, 117, 106, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });

      // Draw particles
      particles.forEach(particle => {
        // Wrap around screen
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.fillStyle = `rgba(19, 117, 106, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Use GSAP ticker for smooth 60fps animation
    gsap.ticker.add(render);

    // Resize handler
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(render);
      gsap.killTweensOf(particles);
      gsap.killTweensOf(lines);
    };
  }, []);

  return <canvas ref={canvasRef} className="scene scene--full" id="scene" />;
};

export default DecorativeBackground;
