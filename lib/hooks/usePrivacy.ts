import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createSelectors } from '../utils';

import {  zustandStorage } from '../storage';

interface PrivacyState {
    isPrivate: boolean;
    setIsPrivate: (isPrivate: boolean) => void;
}

const usePrivacyStore = create<PrivacyState>()(
    persist(
        (set) => ({
            isPrivate: false,
            setIsPrivate: (isPrivate) => set({ isPrivate }),
        }),
        {
            name: 'privacy-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);

export const usePrivacy = createSelectors(usePrivacyStore);