// 技能接口
import type { Skill } from '../types';
import { defaultSkills } from '../data/defaults';
import { STORAGE_KEYS, read, write, ensureSeed, uid } from './client';

export function getSkills(): Skill[] {
  ensureSeed();
  return read<Skill[]>(STORAGE_KEYS.skills, defaultSkills);
}

export function saveSkills(list: Skill[]): void {
  write(STORAGE_KEYS.skills, list);
}

/** 新增一条技能 */
export function addSkill(data: Omit<Skill, 'id'>): Skill {
  const item: Skill = { id: uid(), ...data };
  const list = getSkills();
  list.push(item);
  saveSkills(list);
  return item;
}

/** 更新一条技能 */
export function updateSkill(id: string, data: Omit<Skill, 'id'>): void {
  saveSkills(getSkills().map((s) => (s.id === id ? { id, ...data } : s)));
}

/** 删除一条技能 */
export function deleteSkill(id: string): void {
  saveSkills(getSkills().filter((s) => s.id !== id));
}
