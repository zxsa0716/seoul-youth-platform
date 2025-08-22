import React, { useState } from 'react';
import { Menu, Globe, Monitor, Brain, Target, Activity, Smartphone, BarChart3 } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Hologram3D from './components/Hologram3D';
import PolicySystem from './components/PolicySystem';
import AIRecommendation from './components/AIRecommendation';
import CSVAnalysis from './components/CSVAnalysis';
import IntegratedPlatform from './components/IntegratedPlatform';
import MasterPlatform from './components/MasterPlatform';
import FinalSystem from './components/FinalSystem';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('final');

  const views = [
    { id: 'final', name: '최종 완성 시스템', component: FinalSystem, icon: Monitor },
    { id: 'dashboard', name: '메인 대시보드', component: Dashboard, icon: BarChart3 },
    { id: '3d', name: '3D 홀로그램', component: Hologram3D, icon: Globe },
    { id: 'policy', name: '정책 시뮬레이션', component: PolicySystem, icon: Target },
    { id: 'ai', name: 'AI 추천엔진', component: AIRecommendation, icon: Brain },
    { id: 'csv', name: 'CSV 분석', component: CSVAnalysis, icon: Activity },
    { id: 'integrated', name: '통합 플랫폼', component: IntegratedPlatform, icon: Smartphone },
    { id: 'master', name: '마스터 플랫폼', component: MasterPlatform, icon: Monitor }
  ];

  const CurrentComponent = views.find(v => v.id === currentView)?.component || FinalSystem;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* 네비게이션 헤더 */}
      <header className="bg-black/30 backdrop-blur-md border-b border-cyan-400/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Globe className="w-10 h-10 text-cyan-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Seoul Youth Platform</h1>
                <p className="text-cyan-300 text-sm">청년 1인가구 생활안전망 통합 시스템</p>
              </div>
            </div>
            
            <nav className="flex space-x-2">
              {views.map(view => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setCurrentView(view.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      currentView === view.id
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50'
                        : 'bg-black/30 text-gray-400 hover:bg-cyan-500/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:block">{view.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main>
        <CurrentComponent />
      </main>
    </div>
  );
};

export default App;