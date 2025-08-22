import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, ScatterChart, Scatter, Treemap, FunnelChart, Funnel } from 'recharts';
import { Brain, TrendingUp, Target, Users, Home, Shield, Heart, Award, MapPin, Clock, Activity, Globe, Wifi, Battery, Signal, Cpu, Star, Bell, Eye, Download, Share2, MessageCircle, Play, Pause, RotateCcw, Maximize, Volume2, Mic, Search, CheckCircle, ArrowRight, Zap, Settings, Filter, Upload, FileText, AlertTriangle, RefreshCw, Smartphone, Monitor, Headphones, Send, ThumbsUp, ThumbsDown, Camera, Video, Phone, Calendar, Navigation, Compass, Layers, Lightbulb } from 'lucide-react';

// 궁극의 마스터 플랫폼
const SeoulUltimateMasterPlatform = () => {
  const [currentMode, setCurrentMode] = useState('overview'); // overview, 3d, ai, policy, live, mobile
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isARMode, setIsARMode] = useState(false);
  const [notifications, setNotifications] = useState(12);
  const [systemHealth, setSystemHealth] = useState(98.7);
  const [totalUsers, setTotalUsers] = useState(15847);
  const [aiAnalyses, setAiAnalyses] = useState(89234);

  // 실시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setTotalUsers(prev => prev + Math.floor(Math.random() * 3));
      setAiAnalyses(prev => prev + Math.floor(Math.random() * 5));
      setSystemHealth(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 플랫폼 모드들
  const platformModes = [
    { 
      id: 'overview', 
      name: '통합 대시보드', 
      icon: Monitor, 
      color: 'blue',
      description: '모든 시스템을 한눈에'
    },
    { 
      id: '3d', 
      name: '3D 홀로지도', 
      icon: Globe, 
      color: 'purple',
      description: '몰입형 3D 시각화'
    },
    { 
      id: 'ai', 
      name: 'AI 추천엔진', 
      icon: Brain, 
      color: 'green',
      description: 'Claude AI 개인화'
    },
    { 
      id: 'policy', 
      name: '정책 시뮬레이터', 
      icon: Target, 
      color: 'orange',
      description: '미래 예측 모델링'
    },
    { 
      id: 'live', 
      name: '실시간 모니터링', 
      icon: Activity, 
      color: 'red',
      description: '라이브 데이터 스트림'
    },
    { 
      id: 'mobile', 
      name: '모바일 앱', 
      icon: Smartphone, 
      color: 'cyan',
      description: '언제 어디서나'
    }
  ];

  // 혁신 기능들
  const innovativeFeatures = [
    {
      name: 'AI 음성 비서',
      description: '자연어로 대화하며 맞춤 추천',
      status: 'active',
      usage: 8947,
      icon: Mic,
      color: 'blue'
    },
    {
      name: 'AR 지도 오버레이',
      description: '증강현실로 실제 거리 정보 표시',
      status: 'beta',
      usage: 2341,
      icon: Camera,
      color: 'purple'
    },
    {
      name: '실시간 매물 연동',
      description: '부동산 앱과 실시간 연동',
      status: 'active',
      usage: 15623,
      icon: Home,
      color: 'green'
    },
    {
      name: '소셜 네트워킹',
      description: '같은 지역 청년들과 커뮤니티',
      status: 'active',
      usage: 7892,
      icon: Users,
      color: 'pink'
    },
    {
      name: '예측적 이주 분석',
      description: 'AI가 예측하는 미래 인구 이동',
      status: 'preview',
      usage: 1205,
      icon: TrendingUp,
      color: 'orange'
    },
    {
      name: '가상 투어',
      description: 'VR로 미리 체험하는 동네',
      status: 'coming',
      usage: 0,
      icon: Video,
      color: 'cyan'
    }
  ];

  // 실시간 통계
  const liveStats = [
    { label: '활성 사용자', value: totalUsers.toLocaleString(), change: '+12.3%', icon: Users },
    { label: 'AI 분석 완료', value: aiAnalyses.toLocaleString(), change: '+34.7%', icon: Brain },
    { label: '시스템 상태', value: `${systemHealth.toFixed(1)}%`, change: '+0.3%', icon: Cpu },
    { label: '만족도', value: '94.2%', change: '+2.1%', icon: Heart },
    { label: '정책 제안', value: '156개', change: '+8개', icon: Lightbulb },
    { label: '실시간 알림', value: `${notifications}개`, change: '신규', icon: Bell }
  ];

  // 통합 대시보드 뷰
  const OverviewDashboard = () => (
    <div className="space-y-8">
      
      {/* 실시간 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {liveStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-4 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-6 h-6 text-blue-400" />
                <span className="text-green-400 text-xs font-semibold">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* 혁신 기능 패널 */}
      <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-purple-400/30 p-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-purple-400" />
          혁신 기능 현황
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovativeFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`border rounded-xl p-4 transition-all hover:scale-105 ${
                feature.status === 'active' ? 'border-green-400/50 bg-green-500/10' :
                feature.status === 'beta' ? 'border-yellow-400/50 bg-yellow-500/10' :
                feature.status === 'preview' ? 'border-blue-400/50 bg-blue-500/10' :
                'border-gray-400/50 bg-gray-500/10'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-8 h-8 text-${feature.color}-400`} />
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    feature.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    feature.status === 'beta' ? 'bg-yellow-500/20 text-yellow-400' :
                    feature.status === 'preview' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {feature.status.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-white font-bold mb-2">{feature.name}</h4>
                <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">사용량</span>
                  <span className={`font-bold text-${feature.color}-400`}>
                    {feature.usage.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 시스템 아키텍처 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 플랫폼 모드 네비게이션 */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-cyan-400/30 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Navigation className="w-6 h-6 mr-2 text-cyan-400" />
            플랫폼 모드
          </h3>
          <div className="space-y-3">
            {platformModes.map(mode => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    currentMode === mode.id
                      ? `bg-${mode.color}-500/30 border border-${mode.color}-400/50`
                      : 'bg-black/30 hover:bg-black/50 border border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-6 h-6 text-${mode.color}-400`} />
                    <div className="text-left">
                      <div className="text-white font-semibold">{mode.name}</div>
                      <div className="text-gray-400 text-sm">{mode.description}</div>
                    </div>
                  </div>
                  {currentMode === mode.id && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 시스템 상태 모니터 */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-green-400/30 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-green-400" />
            시스템 상태
          </h3>
          <div className="space-y-4">
            {[
              { name: 'CPU 사용률', value: 74, color: 'blue' },
              { name: '메모리 사용량', value: 68, color: 'green' },
              { name: '네트워크 상태', value: 99, color: 'purple' },
              { name: 'AI 엔진 상태', value: 97, color: 'orange' },
              { name: '데이터베이스', value: 95, color: 'pink' }
            ].map(metric => (
              <div key={metric.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">{metric.name}</span>
                  <span className={`font-bold text-${metric.color}-400`}>{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`bg-${metric.color}-400 h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-green-400/30">
            <div className="flex items-center justify-between">
              <span className="text-green-300">전체 시스템 상태</span>
              <span className="text-2xl font-bold text-green-400">{systemHealth.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI 성능 메트릭 */}
      <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Brain className="w-7 h-7 mr-3" />
          AI 성능 메트릭
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">97.3%</div>
            <div className="text-purple-200">추천 정확도</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">1.2초</div>
            <div className="text-purple-200">평균 응답시간</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">94.8%</div>
            <div className="text-purple-200">사용자 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">89,234</div>
            <div className="text-purple-200">분석 완료</div>
          </div>
        </div>
      </div>
    </div>
  );

  // 모바일 앱 뷰
  const MobileAppView = () => (
    <div className="max-w-md mx-auto">
      <div className="bg-black rounded-3xl p-6 border-4 border-gray-800 shadow-2xl">
        {/* 모바일 상단바 */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-white text-lg font-bold">Seoul Life</div>
          <div className="flex items-center space-x-2">
            <Signal className="w-4 h-4 text-green-400" />
            <Wifi className="w-4 h-4 text-green-400" />
            <Battery className="w-4 h-4 text-green-400" />
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-blue-500 rounded-xl p-4 text-center">
            <Search className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-white font-semibold">지역 검색</div>
          </button>
          <button className="bg-purple-500 rounded-xl p-4 text-center">
            <Brain className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-white font-semibold">AI 추천</div>
          </button>
          <button className="bg-green-500 rounded-xl p-4 text-center">
            <MapPin className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-white font-semibold">내 위치</div>
          </button>
          <button className="bg-orange-500 rounded-xl p-4 text-center">
            <Heart className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-white font-semibold">관심 지역</div>
          </button>
        </div>

        {/* 추천 카드 */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">오늘의 추천</h3>
          {['성동구', '마포구', '영등포구'].map((district, index) => (
            <div key={district} className="bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white font-semibold">{district}</div>
                  <div className="text-gray-400 text-sm">매칭률 {90 + index * 2}%</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">{(8.5 + index * 0.3).toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 네비게이션 */}
        <div className="flex justify-around mt-6 pt-4 border-t border-gray-700">
          <button className="text-blue-400">
            <Home className="w-6 h-6 mx-auto mb-1" />
            <div className="text-xs">홈</div>
          </button>
          <button className="text-gray-400">
            <Search className="w-6 h-6 mx-auto mb-1" />
            <div className="text-xs">검색</div>
          </button>
          <button className="text-gray-400">
            <Heart className="w-6 h-6 mx-auto mb-1" />
            <div className="text-xs">관심</div>
          </button>
          <button className="text-gray-400">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <div className="text-xs">커뮤니티</div>
          </button>
        </div>
      </div>
    </div>
  );

  // 음성 인터페이스
  const VoiceInterface = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 rounded-3xl p-8 text-center max-w-md">
        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Mic className="w-16 h-16 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">음성 어시스턴트</h3>
        <p className="text-white/80 mb-6">"서울에서 살기 좋은 곳을 추천해줘"라고 말해보세요</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => setIsVoiceMode(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
          >
            중지
          </button>
        </div>
      </div>
    </div>
  );

  // AR 모드 인터페이스
  const ARInterface = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 rounded-3xl p-8 text-center max-w-md">
        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Camera className="w-16 h-16 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">AR 지도 모드</h3>
        <p className="text-white/80 mb-6">카메라를 통해 실제 거리에 생활안전망 정보를 표시합니다</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => setIsARMode(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
          >
            종료
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      
      {/* 애니메이션 배경 */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-20 animate-pulse"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '600px 600px, 600px 600px, 600px 600px, 80px 80px, 80px 80px'
          }}
        />
      </div>

      {/* 메가 헤더 */}
      <header className="relative z-10 bg-black/30 backdrop-blur-md border-b border-cyan-400/30">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* 메인 로고 */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Globe className="w-10 h-10 text-white z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-600/30 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Seoul Ultimate Platform
                </h1>
                <p className="text-cyan-300 text-lg">청년 1인가구 생활안전망 궁극의 마스터 시스템</p>
              </div>
            </div>

            {/* 혁신 기능 버튼들 */}
            <div className="flex items-center space-x-4">
              
              {/* 음성 어시스턴트 */}
              <button
                onClick={() => setIsVoiceMode(true)}
                className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-xl transition-all flex items-center space-x-2"
              >
                <Mic className="w-5 h-5" />
                <span>음성</span>
              </button>

              {/* AR 모드 */}
              <button
                onClick={() => setIsARMode(true)}
                className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-300 px-4 py-2 rounded-xl transition-all flex items-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>AR</span>
              </button>

              {/* 알림 */}
              <button className="relative bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 px-4 py-2 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {notifications}
                  </div>
                )}
              </button>

              {/* 시스템 시간 */}
              <div className="text-right">
                <div className="text-sm text-cyan-400">PLATFORM TIME</div>
                <div className="font-mono text-xl font-bold text-white">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>

              {/* 시스템 상태 */}
              <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-xl border border-green-400/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">OPTIMAL</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="relative z-10 max-w-full mx-auto px-6 py-8">
        
        {/* 모드별 컨텐츠 렌더링 */}
        {currentMode === 'overview' && <OverviewDashboard />}
        {currentMode === 'mobile' && <MobileAppView />}
        
        {/* 다른 모드들은 기존 컴포넌트 임베드 */}
        {currentMode === '3d' && (
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">3D 홀로그램 지도</h2>
            <p className="text-gray-300 mb-6">이전에 만든 3D 홀로그램 지도 컴포넌트가 여기에 렌더링됩니다.</p>
            <div className="w-full h-96 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl flex items-center justify-center">
              <Globe className="w-24 h-24 text-blue-400 animate-spin" />
            </div>
          </div>
        )}

        {currentMode === 'ai' && (
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">AI 추천 엔진</h2>
            <p className="text-gray-300 mb-6">Claude AI 기반 개인화 추천 시스템이 여기에 렌더링됩니다.</p>
            <div className="w-full h-96 bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-xl flex items-center justify-center">
              <Brain className="w-24 h-24 text-green-400 animate-pulse" />
            </div>
          </div>
        )}

        {currentMode === 'policy' && (
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">정책 시뮬레이터</h2>
            <p className="text-gray-300 mb-6">AI 기반 정책 예측 및 시뮬레이션 시스템이 여기에 렌더링됩니다.</p>
            <div className="w-full h-96 bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-xl flex items-center justify-center">
              <Target className="w-24 h-24 text-orange-400 animate-bounce" />
            </div>
          </div>
        )}

        {currentMode === 'live' && (
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">실시간 모니터링</h2>
            <p className="text-gray-300 mb-6">실시간 데이터 스트림 및 모니터링 시스템이 여기에 렌더링됩니다.</p>
            <div className="w-full h-96 bg-gradient-to-br from-red-900/50 to-pink-900/50 rounded-xl flex items-center justify-center">
              <Activity className="w-24 h-24 text-red-400 animate-pulse" />
            </div>
          </div>
        )}

      </main>

      {/* 궁극의 하단 제어판 */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-cyan-400/30 z-20">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* 좌측 상태 */}
            <div className="flex items-center space-x-8 text-white">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>시스템: 최적화됨</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>AI: 활성</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-400" />
                <span>사용자: {totalUsers.toLocaleString()}</span>
              </div>
            </div>

            {/* 중앙 모드 표시 */}
            <div className="bg-black/40 px-6 py-2 rounded-full border border-white/20">
              <span className="text-white font-semibold">
                현재 모드: {platformModes.find(m => m.id === currentMode)?.name}
              </span>
            </div>

            {/* 우측 제어 */}
            <div className="flex items-center space-x-6 text-white">
              <div>데이터 처리: <span className="text-cyan-400 font-mono">2.1GB/s</span></div>
              <div>응답 시간: <span className="text-green-400 font-mono">1.2ms</span></div>
              <div className="flex items-center space-x-1">
                <Signal className="w-5 h-5 text-green-400" />
                <span>연결 안정</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 플로팅 액션 버튼 */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-30">
        <button className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110">
          <Download className="w-6 h-6" />
        </button>
        <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110">
          <Share2 className="w-6 h-6" />
        </button>
        <button className="w-14 h-14 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* 음성 인터페이스 오버레이 */}
      {isVoiceMode && <VoiceInterface />}
      
      {/* AR 인터페이스 오버레이 */}
      {isARMode && <ARInterface />}
    </div>
  );
};

export default SeoulUltimateMasterPlatform;