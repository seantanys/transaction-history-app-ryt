import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createSelectors } from '../utils';

import {  zustandStorage } from '../storage';

interface PrivacyState {
    isPrivate: boolean;
    setIsPrivate: (isPrivate: boolean) => void;
    isBiometricSupported: boolean;
    setIsBiometricSupported: (isBiometricSupported: boolean) => void;
    biometricType: 'face' | 'fingerprint' | null;
    setBiometricType: (biometricType: 'face' | 'fingerprint' | null) => void;
}

const usePrivacyStore = create<PrivacyState>()(
    persist(
        (set) => ({
            isPrivate: true,
            setIsPrivate: (isPrivate) => set({ isPrivate }),
            isBiometricSupported: false,
            setIsBiometricSupported: (isBiometricSupported) =>
                set({ isBiometricSupported }),
            biometricType: null,
            setBiometricType: (biometricType) => set({ biometricType }),
        }),
        {
            name: 'privacy-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);

export const usePrivacy = createSelectors(usePrivacyStore);