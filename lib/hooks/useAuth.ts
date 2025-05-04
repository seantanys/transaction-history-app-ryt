import { create } from 'zustand';

import { createSelectors } from '../utils';

interface AuthState {
    username: string | null;
    status: 'signOut' | 'signIn';
    signIn: (username: string) => void;
    signOut: () => void;
  }

  const _useAuth = create<AuthState>((set, get) => ({
    username: null,
    status: 'signOut',
    signIn: (username) => {
      set({ username, status: 'signIn' });
    },
    signOut: () => {
      set({ username: null, status: 'signOut' });
    },
  }));

export const useAuth = createSelectors(_useAuth);
export const signIn = (username: string) => {
    _useAuth.getState().signIn(username);
  }
export const signOut = () => {
    _useAuth.getState().signOut();
  }