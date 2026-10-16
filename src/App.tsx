import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import RequireAuth from './admin/RequireAuth';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import ProfileManage from './admin/ProfileManage';
import SkillsManage from './admin/SkillsManage';
import WorksManage from './admin/WorksManage';
import PostsManage from './admin/PostsManage';

// 路由配置：前台 / 与后台 /admin 隔离，后台统一由 RequireAuth 守卫
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostDetail />} />

      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileManage />} />
        <Route path="skills" element={<SkillsManage />} />
        <Route path="works" element={<WorksManage />} />
        <Route path="posts" element={<PostsManage />} />
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
