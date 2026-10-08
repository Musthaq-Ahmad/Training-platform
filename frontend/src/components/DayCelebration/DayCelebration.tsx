import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import styles from './DayCelebration.module.css';

const CELEBRATION_DURATION_MS = 2600;
const BURST_DELAYS_MS = [0, 180, 360];
const BURST_SIZES = [60, 50, 40];
const CONFETTI_COLORS = [
  'var(--color-accent-purple)',
  'var(--color-accent-purple-soft)',
  'var(--color-accent-purple-lightest)',
  'var(--color-status-success)',
  'var(--color-status-success-alt)',
  'var(--color-status-warning)',
  'var(--color-status-error-icon)',
  'var(--color-google-blue)',
  'var(--color-google-green)',
  'var(--color-google-red)',
  'var(--color-google-yellow)',
];

type DayCelebrationProps = {
  onDismiss: () => void;
};

type ConfettiParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  rotationVelocity: number;
  tilt: number;
  tiltVelocity: number;
  color: string;
  round: boolean;
  life: number;
};

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export default function DayCelebration({ onDismiss }: DayCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDismissRef = useRef(onDismiss);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    onDismissRef.current = onDismiss;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let animationFrame: number | null = null;
    const particles: ConfettiParticle[] = [];
    const burstTimers: number[] = [];
    const rootStyles = window.getComputedStyle(document.documentElement);
    const themeColors = CONFETTI_COLORS.map((token) =>
      rootStyles.getPropertyValue(token.slice(4, -1)).trim()
    ).filter(Boolean);

    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.vx *= 0.985;
        particle.vy = particle.vy * 0.985 + 0.35;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationVelocity;
        particle.tilt += particle.tiltVelocity;
        particle.life += 1;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.scale(1, Math.cos(particle.tilt));
        context.globalAlpha = Math.max(0, Math.min(1, (height + 40 - particle.y) / 120));
        context.fillStyle = particle.color;

        if (particle.round) {
          context.beginPath();
          context.arc(0, 0, particle.width / 2, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillRect(
            -particle.width / 2,
            -particle.height / 2,
            particle.width,
            particle.height
          );
        }
        context.restore();
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        if (particle.y > height + 40 || particle.life > 180) particles.splice(index, 1);
      }

      animationFrame = particles.length ? window.requestAnimationFrame(animate) : null;
      if (animationFrame === null) context.clearRect(0, 0, width, height);
    };

    const startAnimation = () => {
      if (animationFrame === null && particles.length) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const burst = (side: 'left' | 'right', count: number) => {
      const fromLeft = side === 'left';
      const baseAngle = fromLeft ? -Math.PI / 3 : (-Math.PI * 2) / 3;

      for (let index = 0; index < count; index += 1) {
        const angle = baseAngle + randomBetween(-0.35, 0.35);
        const speed = height * randomBetween(0.018, 0.034);
        particles.push({
          x: fromLeft ? -10 : width + 10,
          y: height * randomBetween(0.55, 0.85),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          width: randomBetween(6, 13),
          height: randomBetween(9, 18),
          rotation: randomBetween(0, Math.PI * 2),
          rotationVelocity: randomBetween(-0.175, 0.175),
          tilt: randomBetween(0, Math.PI * 2),
          tiltVelocity: randomBetween(0.08, 0.23),
          color: themeColors[Math.floor(Math.random() * themeColors.length)] || '#7c41e4',
          round: Math.random() < 0.25,
          life: 0,
        });
      }

      startAnimation();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    BURST_DELAYS_MS.forEach((delay, index) => {
      burstTimers.push(
        window.setTimeout(() => {
          const count = BURST_SIZES[index];
          burst('left', count);
          burst('right', count);
        }, delay)
      );
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      burstTimers.forEach((timer) => window.clearTimeout(timer));
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      context.clearRect(0, 0, width, height);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => onDismissRef.current(), CELEBRATION_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.celebration}>
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className={styles.confettiCanvas}
          data-testid="day-celebration-confetti"
          aria-hidden="true"
        />
      )}
      <section className={styles.card} role="status" aria-live="polite">
        <div className={styles.checkmark} aria-hidden="true">
          <Check size={32} strokeWidth={3.5} />
        </div>
        <h2>Day submitted!</h2>
        <p>Nice work. Your progress is saved.</p>
      </section>
    </div>
  );
}
