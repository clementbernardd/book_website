import { Heart, Leaf, Wind, Flame, Moon, Sparkles } from 'lucide-react';
import type { IconKind } from '@/lib/taxonomy';

const MAP: Record<IconKind, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  wave: Wind,
  heart: Heart,
  leaf: Leaf,
  balloon: Sparkles,
  flame: Flame,
  moon: Moon,
};

interface EmotionIconProps {
  kind: IconKind;
  size?: number;
  className?: string;
}

export default function EmotionIcon({ kind, size = 24, className }: EmotionIconProps) {
  const Cmp = MAP[kind];
  return <Cmp size={size} strokeWidth={1.5} className={className} />;
}
