// 首次加载写入的默认内容
// 内容风格：真实生活化个人展示，不含求职方向 / 实习经历 / 商业项目
import type { Profile, TimelineItem, Skill, Work, Post } from '../types';

/** 头像与封面可选色板（暖色系） */
export const WARM_COLORS: string[] = [
  '#E07A5F',
  '#D9896A',
  '#C97B63',
  '#E8B273',
  '#F2CC8F',
  '#EBD3B4',
];

export const defaultProfile: Profile = {
  name: '晏夙萱',
  tagline: '喜欢阅读、做手工和专注生活的天秤座女生',
  bio: '我是晏夙萱，大连海事大学软件工程专业 2027 届。课余时间大多花在看电影和读书上，也喜欢一边追剧一边钩织毯子、织围巾——手指忙着的时候，脑子反而最安静。最近在追 KPL，主队是重庆狼队。这个小站用来放我看过的片单、读过的书和做完的手工，也留给以后的自己翻。',
  avatar: '/avatar.jpg',
  email: '3252189403@qq.com',
  location: '大连',
  school: '大连海事大学',
  major: '软件工程',
};

export const defaultTimeline: TimelineItem[] = [
  {
    id: 'tl-1',
    year: '2024',
    title: '开始钩织',
    desc: '从一条最简单的毯子开始，之后围巾、杯垫、小挂件一路做了下来。',
  },
  {
    id: 'tl-2',
    year: '2025',
    title: '入坑 KPL',
    desc: '开始看职业联赛，主队重庆狼队，比赛日常成了每周的固定节目。',
  },
  {
    id: 'tl-3',
    year: '2026',
    title: '搭了这个小站',
    desc: '把看过的剧、读过的书和做完的手工收拢到一个属于自己的页面。',
  },
];

export const defaultSkills: Skill[] = [
  { id: 'sk-1', name: 'Java', category: '专业', level: 75 },
  { id: 'sk-2', name: 'C++', category: '专业', level: 70 },
  { id: 'sk-3', name: 'Android 开发', category: '专业', level: 80 },
  { id: 'sk-4', name: 'SQL', category: '专业', level: 80 },
  { id: 'sk-5', name: 'Office 办公软件', category: '专业', level: 85 },
  { id: 'sk-6', name: '英语（四六级）', category: '专业', level: 80 },
  { id: 'sk-7', name: '剪辑', category: '工具', level: 65 },
  { id: 'sk-8', name: '墨刀', category: '工具', level: 75 },
  { id: 'sk-9', name: 'Xmind', category: '工具', level: 80 },
  { id: 'sk-10', name: 'Axure', category: '工具', level: 80 },
  { id: 'sk-11', name: '阅读', category: '兴趣', level: 88 },
  { id: 'sk-12', name: '钩织 / 针织', category: '兴趣', level: 95 },
  { id: 'sk-13', name: '手账 / 日记', category: '兴趣', level: 80 },
  { id: 'sk-14', name: '追剧 / 看电影', category: '兴趣', level: 90 },
];

export const defaultWorks: Work[] = [
  {
    id: 'wk-1',
    title: '追剧清单',
    desc: '《还珠格格》《情深深雨蒙蒙》《绝望的主妇》《致命女人》《绝命毒师》《风骚律师》——反复重看的那几部。',
    tags: ['追剧', '日常'],
    cover: '/work-huanzhugege.jpg',
    date: '2026-09',
  },
  {
    id: 'wk-2',
    title: 'KPL 观赛记录',
    desc: '主队重庆狼队。记下每一场看得心跳加速的比赛和最后那波团战。',
    tags: ['电竞', 'KPL'],
    cover: '/work-kpl.jpg',
    date: '2026-08',
  },
  {
    id: 'wk-3',
    title: '读过的书',
    desc: '《人性的弱点》《棋王树王孩子王》《小狗钱钱》——人文社科、小说和一点经济学。',
    tags: ['阅读', '笔记'],
    cover: '/work-book.jpg',
    date: '2026-06',
  },
  {
    id: 'wk-4',
    title: '手工记录',
    desc: '钩织的毯子、织到一半的围巾，还有手账本里贴满的票根和照片。',
    tags: ['手工', '手账'],
    cover: '/work-knitting.jpg',
    date: '2026-04',
  },
];

export const defaultPosts: Post[] = [
  {
    id: 'po-1',
    title: '钩完第一条毯子，我学会了慢下来',
    summary: '三个星期，拆了两次，最后成品比想象中更软。',
    date: '2026-09-20',
    content:
      '第一条毯子钩了差不多三个星期。中途因为数错针拆过两次，拆到第二次的时候真的有点想放弃，心想买一条也就几十块钱。\n\n但还是重新起了针。后来每天睡前钩两行，不看进度，只管手上的动作。奇怪的是，那段时间睡得比平时好。\n\n成品比我想象的软，边角有点不齐，但我一点都不想改。它可能不完美，但它是一针一针来的——这件事本身就让人安心。',
  },
  {
    id: 'po-2',
    title: '重看老剧，看到的是现在的自己',
    summary: '小时候看的是热闹，现在看的是人。',
    date: '2026-08-05',
    content:
      '最近又把《还珠格格》和《情深深雨蒙蒙》翻出来看。小时候只记得热闹和台词，现在再看，注意力全在人物的选择上——谁在忍，谁在装，谁明明知道结果还是往前走了一步。\n\n《绝望的主妇》和《致命女人》也是这样，第一遍看情节，第二遍才开始看人。\n\n同一部剧，隔几年重看会得到完全不同的东西。变的不是剧，是我。',
  },
  {
    id: 'po-3',
    title: '手账和日记，我为什么两个都写',
    summary: '一个记事，一个记心情，谁也替代不了谁。',
    date: '2026-07-12',
    content:
      '手账是贴票根、贴照片、画格子的那本，翻起来很好看，但写得慢，通常一周才补一次。\n\n日记是随手写的那本，想到什么写什么，字丑，有时候只有一句话。\n\n试过只留一本，结果发现不行——手账让我记得那段时间做了什么，日记让我记得当时的心情。两个放在一起，那段日子才是完整的。',
  },
  {
    id: 'po-4',
    title: '《小狗钱钱》教会我的小事',
    summary: '不是理财技巧，是"先记下来"这个动作。',
    date: '2026-05-28',
    content:
      '这本书很薄，讲的东西也不复杂，但有一句话我一直记得：把想要的东西写下来，并且每天看一遍。\n\n我照做了，写在一个小本子的第一页。没过几天，我发现自己开始自动过滤掉一些不必要的开销——不是因为克制，是因为那页纸一直在提醒我真正想要的是什么。\n\n道理很简单，难的是真的动手写。',
  },
];
