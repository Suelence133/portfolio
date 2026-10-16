// 随笔接口
import type { Post } from '../types';
import { defaultPosts } from '../data/defaults';
import { STORAGE_KEYS, read, write, ensureSeed, uid } from './client';

export function getPosts(): Post[] {
  ensureSeed();
  return read<Post[]>(STORAGE_KEYS.posts, defaultPosts);
}

export function savePosts(list: Post[]): void {
  write(STORAGE_KEYS.posts, list);
}

export function getPostById(id: string): Post | undefined {
  return getPosts().find((p) => p.id === id);
}

export function addPost(data: Omit<Post, 'id'>): Post {
  const item: Post = { id: uid(), ...data };
  const list = getPosts();
  list.push(item);
  savePosts(list);
  return item;
}

export function updatePost(id: string, data: Omit<Post, 'id'>): void {
  savePosts(getPosts().map((p) => (p.id === id ? { id, ...data } : p)));
}

export function deletePost(id: string): void {
  savePosts(getPosts().filter((p) => p.id !== id));
}
