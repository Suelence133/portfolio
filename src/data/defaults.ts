// 首次加载写入的默认内容
// 内容风格：生活化个人展示，不含求职方向 / 实习经历 / 商业项目
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
  tagline: '喜欢拍照、写字和慢慢生活的软件工程学生',
  bio: '我是晏夙萱，就读于大连海事大学软件工程专业。课余时间我喜欢用相机记录海边的光，把读过的书写成笔记，也偶尔下厨做一道从没做过的菜。这个网站是我的小角落，用来放那些不值得发朋友圈、但舍不得删掉的瞬间。',
  avatar: '#E07A5F',
  email: '3252189403@qq.com',
  location: '大连',
  school: '大连海事大学',
  major: '软件工程',
};

export const defaultTimeline: TimelineItem[] = [
  {
    id: 'tl-1',
    year: '2024',
    title: '开始认真拍照',
    desc: '入手第一台二手相机，之后几乎每个周末都往海边跑。',
  },
  {
    id: 'tl-2',
    year: '2025',
    title: '坚持写读书笔记',
    desc: '一年读完了二十多本书，把喜欢的段落抄在纸质本上。',
  },
  {
    id: 'tl-3',
    year: '2026',
    title: '搭了这个小站',
    desc: '把散落在各处的照片和文字，收拢到一个属于自己的页面。',
  },
];

export const defaultSkills: Skill[] = [
  { id: 'sk-1', name: 'Python', category: '编程', level: 75 },
  { id: 'sk-2', name: 'TypeScript', category: '编程', level: 62 },
  { id: 'sk-3', name: 'HTML / CSS', category: '编程', level: 70 },
  { id: 'sk-4', name: 'Git', category: '编程', level: 58 },
  { id: 'sk-5', name: '摄影', category: '兴趣', level: 80 },
  { id: 'sk-6', name: '阅读', category: '兴趣', level: 85 },
  { id: 'sk-7', name: '手账', category: '兴趣', level: 70 },
  { id: 'sk-8', name: '烹饪', category: '生活', level: 65 },
  { id: 'sk-9', name: '徒步', category: '生活', level: 75 },
  { id: 'sk-10', name: '收纳整理', category: '生活', level: 55 },
];

export const defaultWorks: Work[] = [
  {
    id: 'wk-1',
    title: '海边的 100 个清晨',
    desc: '连续一百天在日出前后拍同一片海，最后挑出最喜欢的一组。',
    tags: ['摄影', '日常'],
    cover: '#E07A5F',
    date: '2026-08',
  },
  {
    id: 'wk-2',
    title: '读完的二十本书',
    desc: '把一年里读完的书做成笔记合集，附上当时抄下的句子。',
    tags: ['阅读', '笔记'],
    cover: '#F2CC8F',
    date: '2026-05',
  },
  {
    id: 'wk-3',
    title: '一个人的城市漫游',
    desc: '不带导航地穿过老城区，用手账记下沿路遇到的店铺和猫。',
    tags: ['旅行', '手账'],
    cover: '#D9896A',
    date: '2026-03',
  },
  {
    id: 'wk-4',
    title: '厨房实验记录',
    desc: '从零开始做菜的第 30 次，终于把糖醋比例调对了。',
    tags: ['生活', '烹饪'],
    cover: '#E8B273',
    date: '2026-09',
  },
];

export const defaultPosts: Post[] = [
  {
    id: 'po-1',
    title: '第一次给自己做一顿完整的饭',
    summary: '三菜一汤，厨房像战场，但真的很好吃。',
    date: '2026-09-12',
    content:
      '周末没什么事，决定给自己做一顿完整的饭。\n\n菜单是番茄炒蛋、蒜蓉西兰花、可乐鸡翅和冬瓜汤。听起来很简单，实际上从洗菜到上桌花了两个半小时，中途还把盐当成了糖。\n\n最后端上桌的时候，桌子有点乱，鸡翅颜色也深了些，但坐下来吃第一口的时候，突然觉得做饭这件事挺治愈的——你只要专心处理眼前的东西，别的事情就暂时进不来。\n\n下次想试试做鱼。',
  },
  {
    id: 'po-2',
    title: '关于慢下来这件事',
    summary: '把日程表留白之后，反而做成了更多事。',
    date: '2026-07-30',
    content:
      '有一阵子我把每天排得很满，从早到晚都有事做，看起来很充实，但晚上躺下时总觉得自己什么都没真正做完。\n\n后来我试着每天留两个小时什么都不安排。发呆、散步、看一会儿窗外。奇怪的是，这段时间过后，剩下的几件事反而完成得更顺。\n\n慢下来不是偷懒，是给脑子留一点喘息的地方。',
  },
  {
    id: 'po-3',
    title: '相机教会我的三件事',
    summary: '耐心、取舍，以及接受不完美。',
    date: '2026-06-18',
    content:
      '第一，要等。好光线不会按你的时间出现，很多时候只是多站了十分钟。\n\n第二，要舍得。一张照片里塞不进所有东西，把不必要的拿掉，主体才会清楚。生活大概也是这样。\n\n第三，接受拍坏。一百张里能挑出三张满意的就很不错了，剩下九十七张不是失败，是练习。',
  },
];
