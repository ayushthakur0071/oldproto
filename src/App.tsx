import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Scan } from './pages/Scan';
import { Recipes } from './pages/Recipes';
import { Donate } from './pages/Donate';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

import { Profile } from './pages/Profile';
import { SettingsPage as Settings } from './pages/Settings';
import { Support } from './pages/Support';

import { AiPower } from './pages/AiPower';
import { OurMission } from './pages/OurMission';
import { CharityHub } from './pages/CharityHub';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ai-power" element={<AiPower />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/charity-hub" element={<CharityHub />} />

        {/* Protected App Routes */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="scan" element={<Scan />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="donate" element={<Donate />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="analytics" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
