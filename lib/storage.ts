import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

class WebStorage {
  private storage: Storage;

  constructor() {
    this.storage = globalThis.localStorage;
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return this.storage.getItem(key);
    } catch {
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      this.storage.setItem(key, value);
    } catch {}
  }

  async removeItem(key: string): Promise<void> {
    try {
      this.storage.removeItem(key);
    } catch {}
  }
}

// Use AsyncStorage for React Native, WebStorage for web
export const storage = Platform.OS === 'web' ? new WebStorage() : AsyncStorage;
