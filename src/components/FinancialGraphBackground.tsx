import { useEffect, useRef } from 'react';

const BRAND_COLOR = '#9f81b9';
const PROFIT_COLOR = '#9f81b9'; // Updated from green to brand color
const LOSS_COLOR = '#ef4444';   // Red
const GRID_COLOR = 'rgba(159, 129, 185, 0.08)';

export function FinancialGraphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    // Heartbeat Data for Background Lines
    const createHeartbeatLine = (baseY: number, count: number) => {
      const points: { x: number, y: number, sentiment: 'profit' | 'loss' | 'neutral' }[] = [];
      for (let i = 0; i <= count + 15; i++) {
        const x = (i / count) * width;
        let y = baseY;
        let sentiment: 'profit' | 'loss' | 'neutral' = 'neutral';

        const rand = Math.random();
        if (rand > 0.96) {
          y -= 50 + Math.random() * 70;
          sentiment = 'profit';
        } else if (rand > 0.92) {
          y += 20 + Math.random() * 40;
          sentiment = 'loss';
        }

        points.push({ x, y, sentiment });
      }
      return points;
    };

    const lines = [
      { points: createHeartbeatLine(height * 0.4, 40), alpha: 0.2, scrollSpeed: 0.4 },
      { points: createHeartbeatLine(height * 0.5, 50), alpha: 0.15, scrollSpeed: 0.6 }
    ];

    // Ultra-Sleek, Long Candlesticks (Thinner Width, Maintained Length)
    const candlesticks = Array.from({ length: 40 }, (_, i) => ({
      x: (i / 40) * width,
      w: 8 + Math.random() * 8, // Thinner Width (8-16px)
      h: 120 + Math.random() * 200, // Maintained Length (120-320px)
      isProfit: Math.random() > 0.5,
      phase: Math.random() * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * height * 0.3
    }));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const mx = (mouseRef.current.x - width / 2) * 0.012;
      const my = (mouseRef.current.y - height / 2) * 0.012;

      // 1. Grid Interaction
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 0.5;
      const step = 100;
      for (let x = -step; x < width + step; x += step) {
        ctx.beginPath();
        const dx = (x - (time * 0.008) % step) + mx * 0.4;
        ctx.moveTo(dx, 0);
        ctx.lineTo(dx, height);
        ctx.stroke();
      }
      for (let y = 0; y < height + step; y += step) {
        ctx.beginPath();
        const dy = (y + my * 0.4) % height;
        ctx.moveTo(0, dy);
        ctx.lineTo(width, dy);
        ctx.stroke();
      }

      // 2. Background Heartbeat Lines
      lines.forEach((line, idx) => {
        const sx = mx * (1 + idx);
        const sy = my * (1 + idx);
        const autoScroll = (time * line.scrollSpeed * 0.04) % width;

        // Area Gradient
        const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
        grad.addColorStop(0, `rgba(159, 129, 185, ${line.alpha * 0.2})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, height);
        line.points.forEach((p, i) => {
          const dx = (p.x - autoScroll + width) % width + sx;
          const dy = p.y + sy + Math.sin(time * 0.001 + i) * 3;
          ctx.lineTo(dx, dy);
        });
        ctx.lineTo(width, height);
        ctx.fill();

        // Segments
        for (let i = 0; i < line.points.length - 1; i++) {
          const p1 = line.points[i];
          const p2 = line.points[i + 1];
          const dx1 = (p1.x - autoScroll + width) % width + sx;
          const dx2 = (p2.x - autoScroll + width) % width + sx;
          if (dx2 < dx1) continue;

          const dy1 = p1.y + sy + Math.sin(time * 0.001 + i) * 3;
          const dy2 = p2.y + sy + Math.sin(time * 0.001 + i + 1) * 3;

          ctx.beginPath();
          ctx.moveTo(dx1, dy1);
          ctx.lineTo(dx2, dy2);
          ctx.strokeStyle = dy2 < dy1 - 5 ? PROFIT_COLOR : dy2 > dy1 + 5 ? LOSS_COLOR : BRAND_COLOR;
          ctx.globalAlpha = line.alpha * 1.5;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // 3. Enhanced Candlesticks (Foreground layer)
      candlesticks.forEach((c) => {
        const autoScroll = (time * 0.025) % width;
        const cx = (c.x - autoScroll + width) % width + mx * 0.9;

        // Floating movement
        const floatY = Math.sin(time * 0.0015 + c.phase) * 15;
        const cy = height * 0.7 - c.h / 2 + my * 0.9 + floatY + c.yOffset;

        // Dynamic resizing (Pulse)
        const hPulse = Math.sin(time * 0.002 + c.phase) * 8;
        const finalH = c.h + hPulse;

        ctx.strokeStyle = c.isProfit ? PROFIT_COLOR : LOSS_COLOR;
        ctx.fillStyle = c.isProfit ? PROFIT_COLOR : LOSS_COLOR;

        // Highlight active feeling
        ctx.globalAlpha = 0.25 + Math.abs(hPulse) * 0.02;

        // Wick
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx + c.w / 2, cy - 15 - Math.abs(hPulse));
        ctx.lineTo(cx + c.w / 2, cy + finalH + 15 + Math.abs(hPulse));
        ctx.stroke();

        // Body with Glow
        ctx.save();
        if (Math.abs(hPulse) > 4) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = c.isProfit ? PROFIT_COLOR : LOSS_COLOR;
        }

        if (c.isProfit) {
          ctx.lineWidth = 3;
          ctx.strokeRect(cx, cy, c.w, finalH);
        } else {
          ctx.fillRect(cx, cy, c.w, finalH);
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
