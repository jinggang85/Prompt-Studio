/**
 * @file App.tsx
 * @description Root router setup. Uses HashRouter and provides a wildcard fallback route
 * to Home to avoid blank screens when hash anchors are treated as routes (e.g., #builder).
 */

import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Fallback: any unknown path renders Home to prevent blank screen */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}
