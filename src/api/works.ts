// 作品接口
import type { Work } from '../types';
import { defaultWorks } from '../data/defaults';
import { STORAGE_KEYS, read, write, ensureSeed, uid } from './client';

export function getWorks(): Work[] {
  ensureSeed();
  return read<Work[]>(STORAGE_KEYS.works, defaultWorks);
}

export function saveWorks(list: Work[]): void {
  write(STORAGE_KEYS.works, list);
}

export function addWork(data: Omit<Work, 'id'>): Work {
  const item: Work = { id: uid(), ...data };
  const list = getWorks();
  list.push(item);
  saveWorks(list);
  return item;
}

export function updateWork(id: string, data: Omit<Work, 'id'>): void {
  saveWorks(getWorks().map((w) => (w.id === id ? { id, ...data } : w)));
}

export function deleteWork(id: string): void {
  saveWorks(getWorks().filter((w) => w.id !== id));
}
