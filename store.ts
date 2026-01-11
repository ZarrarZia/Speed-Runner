/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { create } from 'zustand';
import { GameStatus, RUN_SPEED_BASE, CharacterId, CHARACTERS, LEVEL_CONFIG, MAX_LEVEL, LEVEL_WORDS } from './types';

interface GameState {
  status: GameStatus;
  score: number;
  lives: number;
  maxLives: number;
  speed: number;
  collectedLetters: number[];
  level: number;
  levelProgress: number; // 0 to 1
  laneCount: number;
  gemsCollected: number;
  distance: number;

  // Dynamic Speed Adjustment
  increaseSpeed: (amount: number) => void;

  // Character
  selectedCharacter: CharacterId;
  selectCharacter: (id: CharacterId) => void;

  // Inventory / Abilities
  hasDoubleJump: boolean;
  hasImmortality: boolean;
  isImmortalityActive: boolean;

  // Actions
  startGame: () => void;
  restartGame: () => void;
  goHome: () => void;
  takeDamage: () => void;
  addScore: (amount: number) => void;
  collectGem: (value: number) => void;
  collectLetter: (index: number) => void;
  setStatus: (status: GameStatus) => void;
  setDistance: (dist: number) => void;
  setLevelProgress: (progress: number) => void;

  // Shop / Abilities
  buyItem: (type: 'DOUBLE_JUMP' | 'MAX_LIFE' | 'HEAL' | 'IMMORTAL', cost: number) => boolean;
  pauseGame: () => void;
  advanceLevel: () => void;
  openShop: () => void;
  closeShop: () => void;
  activateImmortality: () => void;
}


export const useStore = create<GameState>((set, get) => ({
  status: GameStatus.SPLASH,
  selectedCharacter: CHARACTERS[0].id,
  score: 0,
  lives: 3,
  maxLives: 3,
  speed: 0,
  collectedLetters: [],
  level: 1,
  levelProgress: 0,
  laneCount: 3,
  gemsCollected: 0,
  distance: 0,

  hasDoubleJump: false,
  hasImmortality: false,
  isImmortalityActive: false,

  startGame: () => set({
    status: GameStatus.PLAYING,
    score: 0,
    lives: 3,
    maxLives: 3,
    speed: RUN_SPEED_BASE,
    collectedLetters: [],
    level: 1,
    levelProgress: 0,
    laneCount: 3,
    gemsCollected: 0,
    distance: 0,
    hasDoubleJump: false,
    hasImmortality: false,
    isImmortalityActive: false
  }),

  restartGame: () => set({
    status: GameStatus.PLAYING,
    score: 0,
    lives: 3,
    maxLives: 3,
    speed: RUN_SPEED_BASE,
    collectedLetters: [],
    level: 1,
    levelProgress: 0,
    laneCount: 3,
    gemsCollected: 0,
    distance: 0,
    hasDoubleJump: false,
    hasImmortality: false,
    isImmortalityActive: false
  }),

  goHome: () => set({
    status: GameStatus.MENU,
  }),

  pauseGame: () => {
    const { status } = get();
    if (status === GameStatus.PLAYING) {
      set({ status: GameStatus.PAUSED });
    } else if (status === GameStatus.PAUSED) {
      set({ status: GameStatus.PLAYING });
    }
  },

  takeDamage: () => {
    const { lives, isImmortalityActive } = get();
    if (isImmortalityActive) return; // No damage if skill is active

    if (lives > 1) {
      set({ lives: lives - 1 });
    } else {
      set({ lives: 0, status: GameStatus.GAME_OVER, speed: 0 });
    }
  },

  addScore: (amount) => set((state) => ({ score: state.score + amount })),

  collectGem: (value) => set((state) => ({
    score: state.score + value,
    gemsCollected: state.gemsCollected + 1
  })),

  setDistance: (dist) => set({ distance: dist }),

  collectLetter: (index) => {
    const { collectedLetters, level, speed } = get();
    const targetWord = LEVEL_WORDS[level] || 'SPEED';
    const targetLength = targetWord.length;

    if (!collectedLetters.includes(index)) {
      const newLetters = [...collectedLetters, index];
      const speedIncrease = RUN_SPEED_BASE * 0.10;
      const nextSpeed = speed + speedIncrease;

      set({
        collectedLetters: newLetters,
        speed: nextSpeed,
        score: get().score + 1000 // Bonus for letter
      });

      // Check if full word collected
      if (newLetters.length === targetLength) {
        set({
          score: get().score + 5000,
          collectedLetters: [] // Reset for next word
        });
      }
    }
  },

  increaseSpeed: (amount) => set((state) => ({ speed: state.speed + amount })),

  advanceLevel: () => {
    const { level, laneCount } = get();

    if (level >= MAX_LEVEL) {
      return;
    }

    const nextLevel = level + 1;
    const config = LEVEL_CONFIG[nextLevel];

    set({
      level: nextLevel,
      laneCount: Math.min(laneCount + 2, 9), // Expand lanes
      status: GameStatus.PLAYING,
      speed: RUN_SPEED_BASE * config.speedMultiplier,
      levelProgress: 0
    });
  },

  setLevelProgress: (progress) => set({ levelProgress: progress }),

  openShop: () => set({ status: GameStatus.SHOP }),

  closeShop: () => set({ status: GameStatus.PLAYING }),

  buyItem: (type, cost) => {
    const { score, maxLives, lives } = get();

    if (score >= cost) {
      set({ score: score - cost });

      switch (type) {
        case 'DOUBLE_JUMP':
          set({ hasDoubleJump: true });
          break;
        case 'MAX_LIFE':
          set({ maxLives: maxLives + 1, lives: lives + 1 });
          break;
        case 'HEAL':
          set({ lives: Math.min(lives + 1, maxLives) });
          break;
        case 'IMMORTAL':
          set({ hasImmortality: true });
          break;
      }
      return true;
    }
    return false;
  },

  activateImmortality: () => {
    const { hasImmortality, isImmortalityActive } = get();
    if (hasImmortality && !isImmortalityActive) {
      set({ isImmortalityActive: true });

      // Lasts 5 seconds
      setTimeout(() => {
        set({ isImmortalityActive: false });
      }, 5000);
    }
  },

  setStatus: (status) => set({ status }),
  selectCharacter: (id) => set({ selectedCharacter: id }),
}));