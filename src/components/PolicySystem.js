import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Sankey, TreeMap, FunnelChart, Funnel, LabelList } from 'recharts';
import { Brain, TrendingUp, Target, Users, Home, Shield, Heart, Award, Lightbulb, Zap, Settings, Eye, Download, Share2, MessageCircle, MapPin, Clock, DollarSign, Building, Bus, Hospital, BookOpen, Camera, AlertTriangle, CheckCircle, XCircle, ArrowUp, ArrowDown, ArrowRight, Play, Pause, RotateCcw, Maximize, Calendar, Globe, Wifi, Battery, Signal, Cpu } from 'lucide-react';

// 정책 시뮬레이션 데이터
const policySimulations = [
  {
    id: 1,
    name: '청년 주거 지원 확대',
    category: '주거',
    description: '청년 1인가구 대상 주거비 지원 50% 확대',
    currentBudget: 1200,
    proposedBudget: 1800,
    targetDistricts: ['구로구', '금천구', '중랑구', '도봉구'],
    expectedImpact: {
      housingAffordability: +25,
      youthSatisfaction: +30,
      populationRetention: +15,
      economicActivity: +10
    },
    timeline: '6개월',
    difficulty: 'medium',
    priority: 'high',
    implementationSteps: [
      '예산 편성 및 승인',
      '지원 대상자 선정 기준 마련',
      '온라인 신청 시스템 구축',
      '파일럿 지역 시범 운영',
      '전면 시행 및 모니터링'
    ]
  },
  {
    id: 2,
    name: '24시간 안전망 구축',
    category: '안전',
    description: 'CCTV 증설 및 안심귀갓길 확대',
    currentBudget: 800,
    proposedBudget: 1200,
    targetDistricts: ['강북구', '관악구', '은평구'],
    expectedImpact: {
      safetyScore: +40,
      nighttimeActivity: +25,
      womenSafety: +35,
      tourismGrowth: +15
    },
    timeline: '12개월',
    difficulty: 'low',
    priority: 'high',
    implementationSteps: [
      'CCTV 설치 위치 선정',
      '안심귀갓길 노선 설계',
      '시설 설치 및 운영',
      '모니터링 시스템 구축',
      '주민 만족도 조사'
    ]
  },
  {
    id: 3,
    name: '청년 커뮤니티 허브 조성',
    category: '커뮤니티',
    description: '자치구별 청년 전용 공간 및 프로그램 운영',
    currentBudget: 600,
    proposedBudget: 1000,
    targetDistricts: ['성북구', '동대문구', '마포구'],
    expectedImpact: {
      socialConnection: +45,
      mentalHealth: +30,
      localEconomy: +20,
      culturalActivity: +35
    },
    timeline: '18개월',
    difficulty: 'high',
    priority: 'medium',
    implementationSteps: [
      '부지 확보 및 설계',
      '프로그램 기획 및 운영진 구성',
      '시설 건설 및 인테리어',
      '프로그램 시범 운영',
      '정식 개관 및 홍보'
    ]
  },
  {
    id: 4,
    name: '스마트 교통 연결망',
    category: '교통',
    description: '심야 버스 확대 및 스마트 환승 시스템',
    currentBudget: 1500,
    proposedBudget: 2200,
    targetDistricts: ['강서구', '양천구', '노원구'],
    expectedImpact: {
      transportAccess: +35,
      workLifeBalance: +25,
      airQuality: +15,
      economicEfficiency: +20
    },
    timeline: '24개월',
    difficulty: 'high',
    priority: 'medium',
    implementationSteps: [
      '교통 수요 분석',
      '노선 및 시간표 최적화',
      '스마트 정류장 설치',
      '통합 결제 시스템 구축',
      '서비스 정식 운영'
    ]
  }
];

// 예측 모델 데이터
const predictionData = {
  populationTrend: [
    { year: 2024, baseline: 100, withPolicies: 100 },
    { year: 2025, baseline: 98, withPolicies: 105 },
    { year: 2026, baseline: 95, withPolicies: 112 },
    { year: 2027, baseline: 92, withPolicies: 118 },
    { year: 2028, baseline: 89, withPolicies: 125 },
    { year: 2029, baseline: 86, withPolicies: 132 }
  ],
  satisfactionTrend: [
    { year: 2024, housing: 65, safety: 70, transport: 60, community: 55 },
    { year: 2025, housing: 72, safety: 78, transport: 68, community: 65 },
    { year: 2026, housing: 78, safety: 85, transport: 75, community: 75 },
    { year: 2027, housing: 83, safety: 90, transport: 82, community: 82 },
    { year: 2028, housing: 87, safety: 93, transport: 87, community: 88 },
    { year: 2029, housing: 90, safety: 95, transport: 90, community: 92 }
  ]
};

// 실시간 예산 최적화
const budgetOptimization = [
  { category: '주거지원', current: 30, optimized: 35, roi: 4.2 },
  { category: '안전시설', current: 20, optimized: 25, roi: 3.8 },
  { category: '교통인프라', current: 25, optimized: 20, roi: 2.9 },
  { category: '커뮤니티', current: 15, optimized: 12, roi: 3.5 },
  { category: '문화시설', current: 10, optimized: 8, roi: 2.1 }
];

// 정책 시뮬레이터 컴포넌트
const PolicySimulator = ({ selectedPolicy, onPolicySelect }) => {
  const [simulationState, setSimulationState] = useState('idle');
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [results, setResults] = useState(null);

  const runSimulation = () => {
    setSimulationState('running');
    setSimulationProgress(0);
    
    const steps = [
      '정책 매개변수 설정',
      '인구 이동 모델 실행', 
      '경제 영향 분석',
      '사회적 효과 측정',
      '예산 효율성 계산',
      '결과 최적화'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          currentStep++;
          if (currentStep >= steps.length) {
            setSimulationState('complete');
            setResults({
              effectivenessScore: 87 + Math.random() * 10,
              budgetEfficiency: 92 + Math.random() * 8,
              timeToImpact: 8 + Math.random() * 4,
              riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
            });
            clearInterval(interval);
            return 100;
          }
          return 0;
        }
        return newProgress;
      });
    }, 200);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl border border-blue-400/30 p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Brain className="w-6 h-6 mr-2 text-blue-400" />
        AI 정책 시뮬레이터
      </h3>

      {selectedPolicy && (
        <div className="mb-6">
          <div className="bg-black/40 rounded-xl p-4 border border-blue-400/20">
            <h4 className="text-lg font-semibold text-blue-300 mb-2">{selectedPolicy.name}</h4>
            <p className="text-gray-300 text-sm mb-3">{selectedPolicy.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-400">현재 예산:</span>
                <span className="text-white font-bold ml-2">{selectedPolicy.currentBudget}억원</span>
              </div>
              <div>
                <span className="text-blue-400">제안 예산:</span>
                <span className="text-white font-bold ml-2">{selectedPolicy.proposedBudget}억원</span>
              </div>
              <div>
                <span className="text-blue-400">구현 기간:</span>
                <span className="text-white font-bold ml-2">{selectedPolicy.timeline}</span>
              </div>
              <div>
                <span className="text-blue-400">우선순위:</span>
                <span className={`font-bold ml-2 ${
                  selectedPolicy.priority === 'high' ? 'text-red-400' :
                  selectedPolicy.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {selectedPolicy.priority.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {simulationState === 'running' && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">시뮬레이션 진행률</span>
              <span className="text-white">{Math.round(simulationProgress)}%</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-3 border border-blue-400/30">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 relative overflow-hidden"
                style={{ width: `${simulationProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              시뮬레이션 결과
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-green-300">정책 효과성</div>
                <div className="text-2xl font-bold text-white">{results.effectivenessScore.toFixed(1)}점</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-blue-300">예산 효율성</div>
                <div className="text-2xl font-bold text-white">{results.budgetEfficiency.toFixed(1)}%</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-yellow-300">효과 발현</div>
                <div className="text-2xl font-bold text-white">{results.timeToImpact.toFixed(1)}개월</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-purple-300">위험도</div>
                <div className={`text-xl font-bold ${
                  results.riskLevel === 'low' ? 'text-green-400' :
                  results.riskLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {results.riskLevel.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={runSimulation}
          disabled={simulationState === 'running' || !selectedPolicy}
          className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
            simulationState === 'running' || !selectedPolicy
              ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
          }`}
          style={{
            boxShadow: simulationState !== 'running' && selectedPolicy ? '0 0 30px rgba(59, 130, 246, 0.5)' : 'none'
          }}
        >
          <Zap className="w-5 h-5" />
          <span>
            {simulationState === 'idle' && '정책 시뮬레이션 실행'}
            {simulationState === 'running' && '시뮬레이션 진행중...'}
            {simulationState === 'complete' && '새로운 시뮬레이션 ↻'}
          </span>
        </button>
      </div>
    </div>
  );
};

// 예측 대시보드 컴포넌트
const PredictionDashboard = () => {
  const [timeHorizon, setTimeHorizon] = useState(5); // 년
  const [selectedMetric, setSelectedMetric] = useState('population');

  return (
    <div className="space-y-6">
      {/* 예측 제어 패널 */}
      <div className="bg-black/40 backdrop-blur-md rounded-xl border border-purple-400/30 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
            예측 모델 설정
          </h3>
          <div className="flex space-x-2">
            {[3, 5, 10].map(years => (
              <button
                key={years}
                onClick={() => setTimeHorizon(years)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  timeHorizon === years
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50'
                    : 'bg-black/30 text-gray-400 hover:bg-purple-500/20'
                }`}
              >
                {years}년
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 인구 트렌드 예측 */}
      <div className="bg-black/40 backdrop-blur-md rounded-xl border border-green-400/30 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-green-400" />
          청년 1인가구 인구 예측 (기준년도 대비)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData.populationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="baseline" 
                stackId="1"
                stroke="#EF4444" 
                fill="rgba(239, 68, 68, 0.3)" 
                name="현재 정책 유지"
              />
              <Area 
                type="monotone" 
                dataKey="withPolicies" 
                stackId="2"
                stroke="#10B981" 
                fill="rgba(16, 185, 129, 0.3)" 
                name="정책 개선 후"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-red-500/20 rounded-lg p-3 border border-red-400/20">
            <div className="text-red-300 text-sm">현재 정책 유지시</div>
            <div className="text-2xl font-bold text-white">-14% 감소</div>
            <div className="text-xs text-red-400">2029년 기준</div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/20">
            <div className="text-green-300 text-sm">정책 개선 후</div>
            <div className="text-2xl font-bold text-white">+32% 증가</div>
            <div className="text-xs text-green-400">2029년 기준</div>
          </div>
        </div>
      </div>

      {/* 만족도 예측 */}
      <div className="bg-black/40 backdrop-blur-md rounded-xl border border-blue-400/30 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-blue-400" />
          생활 만족도 예측 변화
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={predictionData.satisfactionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Bar dataKey="housing" fill="#3B82F6" name="주거" />
              <Bar dataKey="safety" fill="#10B981" name="안전" />
              <Bar dataKey="transport" fill="#F59E0B" name="교통" />
              <Bar dataKey="community" fill="#8B5CF6" name="커뮤니티" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 예산 최적화 컴포넌트
const BudgetOptimizer = () => {
  const [optimizedBudget, setOptimizedBudget] = useState(budgetOptimization);
  const [totalBudget, setTotalBudget] = useState(100);

  const handleBudgetChange = (category, newValue) => {
    const updated = optimizedBudget.map(item => 
      item.category === category ? { ...item, optimized: newValue } : item
    );
    setOptimizedBudget(updated);
  };

  const totalOptimized = optimizedBudget.reduce((sum, item) => sum + item.optimized, 0);

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-yellow-400/30 p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
        AI 예산 최적화 시스템
      </h3>

      <div className="space-y-4">
        {optimizedBudget.map(item => (
          <div key={item.category} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">{item.category}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{item.current}%</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="text-yellow-400 font-bold">{item.optimized}%</span>
                <span className="text-xs text-green-400">ROI {item.roi}x</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1 bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-gray-400 h-2 rounded-full"
                  style={{ width: `${item.current}%` }}
                />
              </div>
              <div className="flex-1 bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.optimized}%` }}
                />
              </div>
            </div>
            
            <input
              type="range"
              min="0"
              max="50"
              value={item.optimized}
              onChange={(e) => handleBudgetChange(item.category, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-yellow-400/30">
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 font-semibold">총 예산 배분:</span>
          <span className={`font-bold text-lg ${
            totalOptimized === 100 ? 'text-green-400' : 
            totalOptimized > 100 ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {totalOptimized}%
          </span>
        </div>
        {totalOptimized !== 100 && (
          <p className="text-red-400 text-sm mt-2">
            예산 총합이 100%가 되도록 조정해주세요.
          </p>
        )}
      </div>
    </div>
  );
};

// 메인 정책 제안 컴포넌트
const SeoulPolicyPredictionSystem = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [activeTab, setActiveTab] = useState('simulation');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
      {/* 배경 그리드 */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* 헤더 */}
      <header className="relative z-10 bg-black/30 backdrop-blur-md border-b border-purple-400/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  서울시 청년 1인가구 정책 예측 & 제안 시스템
                </h1>
                <p className="text-purple-300 text-sm">AI 기반 정책 시뮬레이션 • 예측 모델링 • 예산 최적화</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-purple-400">POLICY ENGINE</div>
                <div className="font-mono text-lg font-bold text-white">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex space-x-1">
                {['simulation', 'prediction', 'budget'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50'
                        : 'bg-black/30 text-gray-400 border border-gray-600/30 hover:border-purple-400/30'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        
        {/* 정책 개요 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {policySimulations.map(policy => (
            <div
              key={policy.id}
              onClick={() => setSelectedPolicy(policy)}
              className={`bg-black/40 backdrop-blur-md rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105 p-4 ${
                selectedPolicy?.id === policy.id 
                  ? 'border-purple-400/50 bg-purple-500/20' 
                  : 'border-white/20 hover:border-purple-400/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  policy.category === '주거' ? 'bg-blue-500/20' :
                  policy.category === '안전' ? 'bg-green-500/20' :
                  policy.category === '커뮤니티' ? 'bg-purple-500/20' :
                  'bg-orange-500/20'
                }`}>
                  {policy.category === '주거' && <Home className="w-5 h-5 text-blue-400" />}
                  {policy.category === '안전' && <Shield className="w-5 h-5 text-green-400" />}
                  {policy.category === '커뮤니티' && <Users className="w-5 h-5 text-purple-400" />}
                  {policy.category === '교통' && <Bus className="w-5 h-5 text-orange-400" />}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  policy.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  policy.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {policy.priority.toUpperCase()}
                </div>
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{policy.name}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{policy.description}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">예산 증액</span>
                  <span className="text-white font-semibold">
                    +{policy.proposedBudget - policy.currentBudget}억원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">구현 기간</span>
                  <span className="text-white font-semibold">{policy.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">대상 지역</span>
                  <span className="text-white font-semibold">{policy.targetDistricts.length}개구</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 탭별 컨텐츠 */}
        {activeTab === 'simulation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 정책 시뮬레이터 */}
            <div className="lg:col-span-1">
              <PolicySimulator 
                selectedPolicy={selectedPolicy}
                onPolicySelect={setSelectedPolicy}
              />
            </div>

            {/* 예상 효과 시각화 */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* 선택된 정책 상세 */}
              {selectedPolicy && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-orange-400" />
                    {selectedPolicy.name} - 예상 효과 분석
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(selectedPolicy.expectedImpact).map(([key, value]) => {
                      const labels = {
                        housingAffordability: '주거 부담 완화',
                        youthSatisfaction: '청년 만족도',
                        populationRetention: '인구 유지율',
                        economicActivity: '경제 활동',
                        safetyScore: '안전 지수',
                        nighttimeActivity: '야간 활동',
                        womenSafety: '여성 안전',
                        tourismGrowth: '관광 성장',
                        socialConnection: '사회적 연결',
                        mentalHealth: '정신 건강',
                        localEconomy: '지역 경제',
                        culturalActivity: '문화 활동',
                        transportAccess: '교통 접근성',
                        workLifeBalance: '워라밸',
                        airQuality: '대기 질',
                        economicEfficiency: '경제 효율성'
                      };
                      
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300 text-sm">{labels[key]}</span>
                            <span className={`font-bold ${value > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {value > 0 ? '+' : ''}{value}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                value > 0 ? 'bg-green-400' : 'bg-red-400'
                              }`}
                              style={{ width: `${Math.abs(value)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 구현 단계 */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="text-lg font-semibold text-white mb-3">구현 로드맵</h4>
                    <div className="space-y-3">
                      {selectedPolicy.implementationSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 정책 비교 차트 */}
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4">정책별 예산 대비 효과 비교</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={policySimulations}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} angle={-45} textAnchor="end" height={100} />
                      <YAxis yAxisId="left" stroke="#94A3B8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Bar yAxisId="left" dataKey="proposedBudget" fill="#8B5CF6" name="제안 예산(억원)" />
                      <Line yAxisId="right" type="monotone" dataKey="priority" stroke="#F59E0B" strokeWidth={3} name="우선순위" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prediction' && <PredictionDashboard />}

        {activeTab === 'budget' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BudgetOptimizer />
            
            <div className="space-y-6">
              {/* ROI 분석 */}
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-green-400/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  투자 수익률 (ROI) 분석
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetOptimization}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="category" stroke="#94A3B8" fontSize={12} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Bar dataKey="roi" fill="#10B981" name="ROI (배수)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 예산 배분 파이차트 */}
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-blue-400/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4">최적화된 예산 배분</h3>
                <div className="space-y-3">
                  {budgetOptimization.map((item, index) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                        />
                        <span className="text-white">{item.category}</span>
                      </div>
                      <span className="text-blue-400 font-bold">{item.optimized}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 하단 액션 패널 */}
        <div className="mt-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">정책 제안 패키지 생성</h3>
              <p className="text-gray-300 text-sm">선택된 정책들을 종합하여 서울시 제출용 보고서를 생성합니다.</p>
            </div>
            
            <div className="flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all">
                <Download className="w-5 h-5" />
                <span>정책 보고서 다운로드</span>
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all">
                <Share2 className="w-5 h-5" />
                <span>서울시청 전송</span>
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all">
                <MessageCircle className="w-5 h-5" />
                <span>정책 브리핑 예약</span>
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* 하단 상태바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-purple-400/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>정책 엔진 활성</span>
              </div>
              <div>마지막 업데이트: 방금 전</div>
              <div>활성 정책: {policySimulations.length}개</div>
            </div>
            <div className="flex items-center space-x-6 text-white">
              <div>선택 정책: <span className="font-semibold text-purple-400">{selectedPolicy?.name || '없음'}</span></div>
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>AI 신뢰도: 97.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoulPolicyPredictionSystem;