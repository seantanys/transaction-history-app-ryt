import { create } from 'zustand';

import { createSelectors } from '../utils';

interface AuthState {
    username: string | null;
    status: 'signOut' | 'signIn';
    signIn: () => void;
    signOut: () => void;
  }

  const _useAuth = create<AuthState>((set, get) => ({
    username: null,
    status: 'signOut',
    signIn: () => {
      set({ status: 'signIn' });
    },
    signOut: () => {
      set({ username: null, status: 'signOut' });
    },
  }));

export const useAuth = createSelectors(_useAuth);
export const signIn = () => {
    _useAuth.getState().signIn();
  }
export const signOut = () => {
    _useAuth.getState().signOut();
  }