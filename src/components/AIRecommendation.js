import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { Brain, TrendingUp, Target, Users, Home, Shield, Heart, Award, Lightbulb, Zap, Settings, Eye, Download, Share2, MessageCircle, MapPin, Clock, DollarSign, Building, Bus, Hospital, BookOpen, Camera, AlertTriangle, CheckCircle, XCircle, ArrowUp, ArrowDown, ArrowRight, Play, Pause, RotateCcw, Maximize, Calendar, Globe, Wifi, Battery, Signal, Cpu, Activity, Volume2, Mic, Search, Filter, Layers, Navigation, Compass, Star, Bell, Phone, Video, Send, ThumbsUp, ThumbsDown, RefreshCw, Smartphone, Monitor, Headphones } from 'lucide-react';

// 실시간 데이터 스트림
const realTimeData = {
  currentStats: {
    totalUsers: 1247,
    activeDistricts: 25,
    aiAnalyses: 8934,
    policyRequests: 156,
    satisfactionRate: 94.2
  },
  liveAlerts: [
    { id: 1, type: 'warning', message: '강북구 1인가구 증가율 급상승 감지', timestamp: '2분 전', priority: 'high' },
    { id: 2, type: 'info', message: '마포구 새로운 청년 정책 효과 분석 완료', timestamp: '5분 전', priority: 'medium' },
    { id: 3, type: 'success', message: '송파구 생활안전망 지수 개선 확인', timestamp: '12분 전', priority: 'low' },
    { id: 4, type: 'error', message: '중구 데이터 수집 오류 발생', timestamp: '18분 전', priority: 'high' }
  ],
  socialSentiment: [
    { platform: 'Twitter', positive: 68, neutral: 24, negative: 8, total: 2847 },
    { platform: 'Instagram', positive: 72, neutral: 22, negative: 6, total: 1923 },
    { platform: 'Facebook', positive: 65, neutral: 28, negative: 7, total: 3421 },
    { platform: 'YouTube', positive: 71, neutral: 20, negative: 9, total: 1567 }
  ],
  userActivity: [
    { time: '00:00', searches: 23, analyses: 8, policies: 2 },
    { time: '03:00', searches: 12, analyses: 4, policies: 1 },
    { time: '06:00', searches: 45, analyses: 15, policies: 3 },
    { time: '09:00', searches: 89, analyses: 32, policies: 8 },
    { time: '12:00', searches: 156, analyses: 67, policies: 15 },
    { time: '15:00', searches: 134, analyses: 89, policies: 23 },
    { time: '18:00', searches: 178, analyses: 145, policies: 34 },
    { time: '21:00', searches: 123, analyses: 98, policies: 28 }
  ]
};

// AI 어시스턴트 컴포넌트
const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: '안녕하세요! 서울 청년 1인가구 생활안전망 AI 어시스턴트입니다. 무엇을 도와드릴까요?', timestamp: new Date() },
    { id: 2, type: 'user', text: '강남구의 1인가구 현황을 알려주세요', timestamp: new Date() },
    { id: 3, type: 'ai', text: '강남구는 현재 65,923개의 1인가구가 거주하고 있으며, 전체 자치구 중 3위를 기록하고 있습니다. 평균 임대료는 85만원으로 높은 편이지만, 생활안전망 종합점수는 95점으로 최상위권입니다.', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const aiResponses = [
    '분석 결과를 종합하면, 해당 지역의 생활안전망 지수가 상당히 양호합니다.',
    '데이터를 기반으로 한 AI 예측에 따르면, 향후 6개월 내 개선이 예상됩니다.',
    '현재 정책 효과가 긍정적으로 나타나고 있어, 지속적인 모니터링을 추천합니다.',
    '사용자 프로필을 분석한 결과, 맞춤형 추천 지역을 제안드릴 수 있습니다.',
    '실시간 데이터 분석 결과, 해당 지역의 안전지수가 향상되었습니다.'
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // 음성 인식 시뮬레이션
      setTimeout(() => {
        setInputText('음성으로 입력된 메시지입니다');
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-blue-400/30 p-6 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-400" />
          AI 어시스턴트
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">온라인</span>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-100'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                <span className="text-sm ml-2">AI가 분석중...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="질문을 입력하세요..."
          className="flex-1 px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleVoiceInput}
          className={`p-2 rounded-lg transition-all ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-gray-600 hover:bg-gray-500 text-white'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim()}
          className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:opacity-50 text-white rounded-lg transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 실시간 알림 패널
const LiveAlertPanel = () => {
  const [alerts, setAlerts] = useState(realTimeData.liveAlerts);
  const [filter, setFilter] = useState('all');

  const filteredAlerts = useMemo(() => {
    if (filter === 'all') return alerts;
    return alerts.filter(alert => alert.priority === filter);
  }, [alerts, filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 새로운 알림 시뮬레이션
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          type: ['info', 'warning', 'success', 'error'][Math.floor(Math.random() * 4)],
          message: '새로운 실시간 이벤트가 감지되었습니다',
          timestamp: '방금 전',
          priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'border-yellow-400/30 bg-yellow-500/10';
      case 'error': return 'border-red-400/30 bg-red-500/10';
      case 'success': return 'border-green-400/30 bg-green-500/10';
      default: return 'border-blue-400/30 bg-blue-500/10';
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-red-400/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Bell className="w-5 h-5 mr-2 text-red-400" />
          실시간 알림
        </h3>
        <div className="flex space-x-1">
          {['all', 'high', 'medium', 'low'].map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                filter === level
                  ? 'bg-red-500/30 text-red-300'
                  : 'bg-black/30 text-gray-400 hover:bg-red-500/20'
              }`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredAlerts.map(alert => (
          <div 
            key={alert.id} 
            className={`border rounded-lg p-3 transition-all hover:scale-105 ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{alert.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400 text-xs">{alert.timestamp}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    alert.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    alert.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {alert.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>해당 우선순위의 알림이 없습니다</p>
        </div>
      )}
    </div>
  );
};

// 소셜 미디어 감정 분석
const SocialSentimentAnalysis = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const sentimentData = selectedPlatform === 'all' 
    ? realTimeData.socialSentiment
    : realTimeData.socialSentiment.filter(item => item.platform === selectedPlatform);

  const totalData = sentimentData.reduce((acc, curr) => ({
    positive: acc.positive + (curr.positive * curr.total / 100),
    neutral: acc.neutral + (curr.neutral * curr.total / 100),
    negative: acc.negative + (curr.negative * curr.total / 100),
    total: acc.total + curr.total
  }), { positive: 0, neutral: 0, negative: 0, total: 0 });

  const chartData = [
    { name: '긍정', value: Math.round(totalData.positive), color: '#10B981' },
    { name: '중립', value: Math.round(totalData.neutral), color: '#6B7280' },
    { name: '부정', value: Math.round(totalData.negative), color: '#EF4444' }
  ];

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-purple-400/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Heart className="w-5 h-5 mr-2 text-purple-400" />
          소셜 미디어 감정 분석
        </h3>
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-3 py-1 bg-black/40 border border-white/20 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">전체 플랫폼</option>
          {realTimeData.socialSentiment.map(item => (
            <option key={item.platform} value={item.platform}>{item.platform}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 파이 차트 */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 통계 */}
        <div className="space-y-3">
          <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/20">
            <div className="text-green-300 text-sm">긍정 반응</div>
            <div className="text-2xl font-bold text-white">
              {((totalData.positive / totalData.total) * 100).toFixed(1)}%
            </div>
          </div>
          
          <div className="bg-red-500/20 rounded-lg p-3 border border-red-400/20">
            <div className="text-red-300 text-sm">부정 반응</div>
            <div className="text-2xl font-bold text-white">
              {((totalData.negative / totalData.total) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/20">
            <div className="text-blue-300 text-sm">총 언급 수</div>
            <div className="text-xl font-bold text-white">
              {totalData.total.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* 플랫폼별 상세 */}
      <div className="mt-4 space-y-2">
        {realTimeData.socialSentiment.map(platform => (
          <div key={platform.platform} className="flex items-center justify-between bg-black/30 rounded-lg p-2">
            <span className="text-white font-medium">{platform.platform}</span>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-400">{platform.positive}%</span>
              <span className="text-gray-400">{platform.neutral}%</span>
              <span className="text-red-400">{platform.negative}%</span>
              <span className="text-gray-300">({platform.total})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 실시간 사용자 활동 모니터
const UserActivityMonitor = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-green-400/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-400" />
          실시간 사용자 활동
        </h3>
        <div className="flex space-x-1">
          {['1h', '6h', '24h'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-green-500/30 text-green-300'
                  : 'bg-black/30 text-gray-400 hover:bg-green-500/20'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={realTimeData.userActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: 'none',
                borderRadius: '12px',
                color: 'white'
              }}
            />
            <Area type="monotone" dataKey="searches" stackId="1" stroke="#3B82F6" fill="rgba(59, 130, 246, 0.3)" name="검색" />
            <Area type="monotone" dataKey="analyses" stackId="1" stroke="#10B981" fill="rgba(16, 185, 129, 0.3)" name="분석" />
            <Area type="monotone" dataKey="policies" stackId="1" stroke="#F59E0B" fill="rgba(245, 158, 11, 0.3)" name="정책조회" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 실시간 통계 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/20 text-center">
          <div className="text-blue-300 text-sm">총 검색</div>
          <div className="text-2xl font-bold text-white">
            {realTimeData.userActivity.reduce((sum, item) => sum + item.searches, 0)}
          </div>
        </div>
        <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/20 text-center">
          <div className="text-green-300 text-sm">AI 분석</div>
          <div className="text-2xl font-bold text-white">
            {realTimeData.userActivity.reduce((sum, item) => sum + item.analyses, 0)}
          </div>
        </div>
        <div className="bg-orange-500/20 rounded-lg p-3 border border-orange-400/20 text-center">
          <div className="text-orange-300 text-sm">정책 조회</div>
          <div className="text-2xl font-bold text-white">
            {realTimeData.userActivity.reduce((sum, item) => sum + item.policies, 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

// 시스템 상태 모니터
const SystemStatusMonitor = () => {
  const [systemStats, setSystemStats] = useState({
    cpu: 74,
    memory: 68,
    network: 99,
    storage: 45,
    uptime: '15일 7시간 23분'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(95, Math.min(100, prev.network + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-cyan-400/30 p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <Monitor className="w-5 h-5 mr-2 text-cyan-400" />
        시스템 상태 모니터
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'CPU 사용률', value: systemStats.cpu, icon: Cpu, color: 'blue' },
          { label: '메모리', value: systemStats.memory, icon: Activity, color: 'green' },
          { label: '네트워크', value: systemStats.network, icon: Wifi, color: 'purple' },
          { label: '저장공간', value: systemStats.storage, icon: Battery, color: 'yellow' }
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 text-${stat.color}-400`} />
                  <span className="text-gray-300 text-sm">{stat.label}</span>
                </div>
                <span className={`font-bold ${
                  stat.value > 80 ? 'text-red-400' : 
                  stat.value > 60 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {stat.value}%
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stat.value > 80 ? 'bg-red-400' : 
                    stat.value > 60 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-cyan-400/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">시스템 가동시간</span>
          <span className="text-cyan-400 font-mono">{systemStats.uptime}</span>
        </div>
      </div>
    </div>
  );
};

// 메인 통합 플랫폼 컴포넌트
const SeoulIntegratedAIPlatform = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeModule, setActiveModule] = useState('dashboard');
  const [notifications, setNotifications] = useState(8);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const modules = [
    { id: 'dashboard', name: '대시보드', icon: Monitor, color: 'blue' },
    { id: 'realtime', name: '실시간 모니터링', icon: Activity, color: 'green' },
    { id: 'ai', name: 'AI 어시스턴트', icon: Brain, color: 'purple' },
    { id: 'alerts', name: '알림 센터', icon: Bell, color: 'red' },
    { id: 'social', name: '소셜 분석', icon: Heart, color: 'pink' },
    { id: 'system', name: '시스템', icon: Settings, color: 'gray' }
  ];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative`}>
      
      {/* 홀로그램 배경 효과 */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '600px 600px, 600px 600px, 50px 50px, 50px 50px'
          }}
        />
      </div>

      {/* 상단 네비게이션 */}
      <header className="relative z-10 bg-black/30 backdrop-blur-md border-b border-cyan-400/30">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* 로고 및 타이틀 */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center relative">
                <Globe className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-cyan-400/30 rounded-xl animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Seoul Youth Smart City Platform
                </h1>
                <p className="text-cyan-300 text-sm">통합 AI 모니터링 • 실시간 분석 • 정책 시뮬레이션</p>
              </div>
            </div>

            {/* 모듈 네비게이션 */}
            <div className="flex space-x-1">
              {modules.map(module => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 relative ${
                      activeModule === module.id
                        ? `bg-${module.color}-500/30 text-${module.color}-300 border border-${module.color}-400/50`
                        : 'bg-black/30 text-gray-400 border border-gray-600/30 hover:border-cyan-400/30'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{module.name}</span>
                    {module.id === 'alerts' && notifications > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                        {notifications}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 시스템 상태 */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-cyan-400">SYSTEM TIME</div>
                <div className="font-mono text-lg font-bold text-white">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">ONLINE</span>
                </div>
                
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 bg-black/30 hover:bg-black/50 border border-gray-600/30 hover:border-cyan-400/30 rounded-lg transition-all"
                >
                  <Maximize className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main className="relative z-10 p-6">
        
        {/* 상단 실시간 통계 */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {[
            { label: '활성 사용자', value: realTimeData.currentStats.totalUsers, icon: Users, change: '+12%' },
            { label: '모니터링 지역', value: realTimeData.currentStats.activeDistricts, icon: MapPin, change: '100%' },
            { label: 'AI 분석 완료', value: realTimeData.currentStats.aiAnalyses, icon: Brain, change: '+34%' },
            { label: '정책 요청', value: realTimeData.currentStats.policyRequests, icon: Target, change: '+8%' },
            { label: '만족도', value: `${realTimeData.currentStats.satisfactionRate}%`, icon: Star, change: '+2.1%' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-green-400 text-xs font-medium">{stat.change}</div>
                  </div>
                  <Icon className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 모듈별 컨텐츠 */}
        {activeModule === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <UserActivityMonitor />
              <SocialSentimentAnalysis />
            </div>
            <div className="space-y-6">
              <AIAssistant />
              <SystemStatusMonitor />
            </div>
          </div>
        )}

        {activeModule === 'realtime' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UserActivityMonitor />
            <SocialSentimentAnalysis />
            <LiveAlertPanel />
            <SystemStatusMonitor />
          </div>
        )}

        {activeModule === 'ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AIAssistant />
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-purple-400/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4">AI 성능 지표</h3>
                <div className="space-y-4">
                  {[
                    { label: '응답 정확도', value: 97.3, color: 'green' },
                    { label: '처리 속도', value: 94.8, color: 'blue' },
                    { label: '학습 효율', value: 89.2, color: 'purple' },
                    { label: '사용자 만족도', value: 95.7, color: 'orange' }
                  ].map(metric => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{metric.label}</span>
                        <span className={`text-${metric.color}-400 font-bold`}>{metric.value}%</span>
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
              </div>
              <SystemStatusMonitor />
            </div>
          </div>
        )}

        {activeModule === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LiveAlertPanel />
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-yellow-400/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4">알림 설정</h3>
                <div className="space-y-3">
                  {[
                    { label: '긴급 알림', enabled: true },
                    { label: '정책 업데이트', enabled: true },
                    { label: '시스템 상태', enabled: false },
                    { label: '사용자 활동', enabled: true },
                    { label: '소셜 미디어', enabled: false }
                  ].map(setting => (
                    <div key={setting.label} className="flex items-center justify-between">
                      <span className="text-white">{setting.label}</span>
                      <button className={`w-12 h-6 rounded-full transition-all ${
                        setting.enabled ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                          setting.enabled ? 'transform translate-x-6' : ''
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <SystemStatusMonitor />
            </div>
          </div>
        )}

        {activeModule === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SocialSentimentAnalysis />
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-pink-400/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4">트렌딩 키워드</h3>
                <div className="space-y-2">
                  {[
                    { keyword: '#청년1인가구', mentions: 2847, sentiment: 'positive' },
                    { keyword: '#서울생활', mentions: 1923, sentiment: 'positive' },
                    { keyword: '#주거문제', mentions: 1567, sentiment: 'negative' },
                    { keyword: '#안전귀가', mentions: 1234, sentiment: 'positive' },
                    { keyword: '#정책제안', mentions: 987, sentiment: 'neutral' }
                  ].map(trend => (
                    <div key={trend.keyword} className="flex items-center justify-between bg-black/30 rounded-lg p-2">
                      <span className="text-white font-medium">{trend.keyword}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">{trend.mentions}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          trend.sentiment === 'positive' ? 'bg-green-400' :
                          trend.sentiment === 'negative' ? 'bg-red-400' : 'bg-gray-400'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <UserActivityMonitor />
            </div>
          </div>
        )}

        {activeModule === 'system' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SystemStatusMonitor />
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-gray-400/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4">시스템 로그</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {[
                    { time: '14:23:45', message: 'AI 모델 업데이트 완료', type: 'success' },
                    { time: '14:22:18', message: '데이터베이스 백업 시작', type: 'info' },
                    { time: '14:21:03', message: '사용자 1247번 로그인', type: 'info' },
                    { time: '14:19:56', message: '정책 시뮬레이션 완료', type: 'success' },
                    { time: '14:18:22', message: '네트워크 지연 감지', type: 'warning' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <span className="text-gray-400 font-mono">{log.time}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        log.type === 'success' ? 'bg-green-400' :
                        log.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                      <span className="text-white">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
              <LiveAlertPanel />
            </div>
          </div>
        )}

      </main>

      {/* 하단 상태바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-cyan-400/30 z-20">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <Signal className="w-4 h-4 text-green-400" />
                <span>연결 상태: 안정</span>
              </div>
              <div>마지막 동기화: 방금 전</div>
              <div>활성 모듈: {modules.find(m => m.id === activeModule)?.name}</div>
            </div>
            <div className="flex items-center space-x-6 text-white">
              <div>서버 응답시간: <span className="text-green-400 font-mono">23ms</span></div>
              <div>데이터 처리량: <span className="text-cyan-400 font-mono">1.2GB/s</span></div>
              <div className="flex items-center space-x-1">
                <Battery className="w-4 h-4 text-green-400" />
                <span>시스템 상태: 최적</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoulIntegratedAIPlatform;