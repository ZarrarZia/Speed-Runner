/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export enum GameStatus {
  SPLASH = 'SPLASH',
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  SHOP = 'SHOP',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY'
}

export enum ObjectType {
  OBSTACLE = 'OBSTACLE',
  GEM = 'GEM',
  LETTER = 'LETTER',
  SHOP_PORTAL = 'SHOP_PORTAL',
  ALIEN = 'ALIEN',
  MISSILE = 'MISSILE'
}

export interface GameObject {
  id: string;
  type: ObjectType;
  position: [number, number, number]; // x, y, z
  active: boolean;
  value?: string; // For letters (G, E, M...)
  color?: string;
  targetIndex?: number; // Index in the target word
  points?: number; // Score value for gems
  hasFired?: boolean; // For Aliens
}

export const LANE_WIDTH = 2.2;
export const JUMP_HEIGHT = 2.5;
export const JUMP_DURATION = 0.6; // seconds
export const RUN_SPEED_BASE = 22.5;
export const SPAWN_DISTANCE = 120;
export const REMOVE_DISTANCE = 20; // Behind player

// Words for each level
// Words for each level - Flavor text for UI
export const LEVEL_WORDS: Record<number, string> = {
  1: 'SPEED',
  2: 'HYPER',
  3: 'ULTRA',
  4: 'MEGA',
  5: 'GIGA',
  6: 'OMEGA'
};

export interface LevelConfig {
  duration: number; // Seconds
  speedMultiplier: number;
  obstacleDensity: number; // 1.0 is base
}

export const MAX_LEVEL = 6;

export const LEVEL_CONFIG: Record<number, LevelConfig> = {
  1: { duration: 30, speedMultiplier: 1.0, obstacleDensity: 1.0 },
  2: { duration: 30, speedMultiplier: 1.2, obstacleDensity: 1.2 },
  3: { duration: 35, speedMultiplier: 1.4, obstacleDensity: 1.4 },
  4: { duration: 40, speedMultiplier: 1.6, obstacleDensity: 1.6 },
  5: { duration: 45, speedMultiplier: 1.8, obstacleDensity: 1.8 },
  6: { duration: Infinity, speedMultiplier: 2.0, obstacleDensity: 2.0 } // Endless
};

// Generic Neon Colors for Letters
export const LETTER_COLORS = [
  '#2979ff', // Blue
  '#ff1744', // Red
  '#ffea00', // Yellow
  '#00e676', // Green
  '#d500f9', // Purple
  '#ff9100', // Orange
];

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: any; // Lucide icon component
  oneTime?: boolean; // If true, remove from pool after buying
}

// Character Definitions
export type CharacterId = 'NEON_BLAZE' | 'CRIMSON_ROGERS' | 'GOLDEN_GLIDER';

export interface CharacterConfig {
  id: CharacterId;
  name: string;
  description: string;
  color: string; // Main hull color
  glow: string; // Glow/Joint color
  speedBonus?: number; // Visual or Logic (future)
}

export const CHARACTERS: CharacterConfig[] = [
  {
    id: 'NEON_BLAZE',
    name: 'NEON BLAZE',
    description: 'Standard issue cyber-runner. Balanced and reliable.',
    color: '#00aaff',
    glow: '#00ffff'
  },
  {
    id: 'CRIMSON_ROGERS',
    name: 'CRIMSON ROGERS',
    description: 'Heavy assault unit. Built for aggression.',
    color: '#d50000',
    glow: '#ff5252'
  },
  {
    id: 'GOLDEN_GLIDER',
    name: 'GOLDEN GLIDER',
    description: 'Elite prototype. Lightweight and flashy.',
    color: '#ffd700',
    glow: '#ffea00'
  }
];