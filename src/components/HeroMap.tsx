import React, { useEffect, useRef } from 'react';

export default function HeroMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const W = canvas.width;
    const H = canvas.height;

    // Route points (pickup → destination)
    const routePoints = [
      { x: 0.15, y: 0.75 },
      { x: 0.28, y: 0.62 },
      { x: 0.42, y: 0.55 },
      { x: 0.55, y: 0.45 },
      { x: 0.68, y: 0.38 },
      { x: 0.80, y: 0.28 },
    ];

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Background grid
      ctx.strokeStyle = 'rgba(40,120,255,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Road network
      const roads = [
        [[0.05, 0.3], [0.95, 0.3]],
        [[0.05, 0.55], [0.95, 0.55]],
        [[0.05, 0.75], [0.95, 0.75]],
        [[0.2, 0.05], [0.2, 0.95]],
        [[0.45, 0.05], [0.45, 0.95]],
        [[0.7, 0.05], [0.7, 0.95]],
      ];
      ctx.strokeStyle = 'rgba(40,120,255,0.12)';
      ctx.lineWidth = 1.5;
      roads.forEach(([[x1, y1], [x2, y2]]) => {
        ctx.beginPath();
        ctx.moveTo(x1 * W, y1 * H);
        ctx.lineTo(x2 * W, y2 * H);
        ctx.stroke();
      });

      // City blocks
      const blocks = [
        [0.22, 0.1, 0.22, 0.18],
        [0.47, 0.1, 0.2, 0.18],
        [0.72, 0.1, 0.2, 0.18],
        [0.22, 0.32, 0.22, 0.2],
        [0.47, 0.32, 0.2, 0.2],
        [0.72, 0.32, 0.2, 0.2],
        [0.22, 0.57, 0.22, 0.16],
        [0.47, 0.57, 0.2, 0.16],
      ];
      blocks.forEach(([x, y, w, h]) => {
        ctx.fillStyle = 'rgba(40,120,255,0.04)';
        ctx.strokeStyle = 'rgba(40,120,255,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x * W, y * H, w * W, h * H, 4);
        ctx.fill();
        ctx.stroke();
      });

      // Route line (animated draw)
      const progress = (Math.sin(t * 0.6) + 1) / 2;
      const totalProgress = 0.3 + progress * 0.7;

      const grad = ctx.createLinearGradient(
        routePoints[0].x * W, routePoints[0].y * H,
        routePoints[routePoints.length - 1].x * W, routePoints[routePoints.length - 1].y * H
      );
      grad.addColorStop(0, '#28D7F2');
      grad.addColorStop(1, '#2878FF');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([]);
      ctx.shadowColor = '#28D7F2';
      ctx.shadowBlur = 10;

      const segTotal = routePoints.length - 1;
      const drawSeg = totalProgress * segTotal;
      const fullSegs = Math.floor(drawSeg);
      const partial = drawSeg - fullSegs;

      ctx.beginPath();
      ctx.moveTo(routePoints[0].x * W, routePoints[0].y * H);
      for (let i = 0; i < fullSegs; i++) {
        ctx.lineTo(routePoints[i + 1].x * W, routePoints[i + 1].y * H);
      }
      if (fullSegs < segTotal) {
        const from = routePoints[fullSegs];
        const to = routePoints[fullSegs + 1];
        ctx.lineTo(lerp(from.x, to.x, partial) * W, lerp(from.y, to.y, partial) * H);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Pickup pin
      const px = routePoints[0].x * W;
      const py = routePoints[0].y * H;
      ctx.beginPath();
      ctx.arc(px, py, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#28D7F2';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Destination pin
      const dx = routePoints[routePoints.length - 1].x * W;
      const dy = routePoints[routePoints.length - 1].y * H;
      ctx.beginPath();
      ctx.arc(dx, dy, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#2878FF';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Driver dot (animated)
      const driverProgress = Math.min(totalProgress, 0.85);
      const dSeg = driverProgress * segTotal;
      const dFull = Math.floor(dSeg);
      const dPart = dSeg - dFull;
      let driverX: number, driverY: number;
      if (dFull < segTotal) {
        driverX = lerp(routePoints[dFull].x, routePoints[dFull + 1].x, dPart) * W;
        driverY = lerp(routePoints[dFull].y, routePoints[dFull + 1].y, dPart) * H;
      } else {
        driverX = routePoints[segTotal].x * W;
        driverY = routePoints[segTotal].y * H;
      }

      // Pulse ring
      const pulse = (Math.sin(t * 2) + 1) / 2;
      ctx.beginPath();
      ctx.arc(driverX, driverY, 14 + pulse * 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(40,120,255,${0.4 - pulse * 0.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(driverX, driverY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#2878FF';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Driver emoji
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🏍', driverX, driverY);

      t += 0.015;
      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={360}
      className="w-full h-full object-cover opacity-90"
      style={{ maxWidth: '480px', maxHeight: '360px' }}
    />
  );
}
