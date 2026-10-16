// 个人信息 + 经历时间线 接口
import type { Profile, TimelineItem } from '../types';
import { defaultProfile, defaultTimeline } from '../data/defaults';
import { STORAGE_KEYS, read, write, ensureSeed, uid } from './client';

export function getProfile(): Profile {
  ensureSeed();
  return read<Profile>(STORAGE_KEYS.profile, defaultProfile);
}

export function saveProfile(data: Profile): void {
  write(STORAGE_KEYS.profile, data);
}

export function getTimeline(): TimelineItem[] {
  ensureSeed();
  return read<TimelineItem[]>(STORAGE_KEYS.timeline, defaultTimeline);
}

export function saveTimeline(list: TimelineItem[]): void {
  write(STORAGE_KEYS.timeline, list);
}

export function createTimelineItem(): TimelineItem {
  return { id: uid(), year: String(new Date().getFullYear()), title: '', desc: '' };
}
