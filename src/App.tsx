import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Skeleton } from './components/common/Skeleton';

// Code-split pages for performance
const Overview = lazy(() => import('./pages/Overview').then((m) => ({ default: m.Overview })));
const Climate = lazy(() => import('./pages/Climate').then((m) => ({ default: m.Climate })));
const Pollution = lazy(() => import('./pages/Pollution').then((m) => ({ default: m.Pollution })));
const Transport = lazy(() => import('./pages/Transport').then((m) => ({ default: m.Transport })));
const MapPage = lazy(() => import('./pages/MapPage').then((m) => ({ default: m.MapPage })));
const Utilities = lazy(() => import('./pages/Utilities').then((m) => ({ default: m.Utilities })));
const Emergency = lazy(() => import('./pages/Emergency').then((m) => ({ default: m.Emergency })));
const CivicServices = lazy(() => import('./pages/CivicServices').then((m) => ({ default: m.CivicServices })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

const PageLoader: React.FC = () => (
  <div className="space-y-4 p-6 max-w-5xl mx-auto animate-pulse">
    <Skeleton className="h-20 w-full" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
    </div>
    <Skeleton className="h-72 w-full" />
  </div>
);

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="climate" element={<Climate />} />
            <Route path="pollution" element={<Pollution />} />
            <Route path="transport" element={<Transport />} />
            <Route path="map" element={<MapPage />} />
            <Route path="utilities" element={<Utilities />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="civic-services" element={<CivicServices />} />
            <Route path="projects" element={<Projects />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
