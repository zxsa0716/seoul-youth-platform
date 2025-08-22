import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Brain, Star, TrendingUp, Shield, Home, Users, Heart, Award, Target, Eye, Settings, Download, Share2, MessageCircle, Search, Filter, Zap, Activity, Clock, Wifi, Cpu, BarChart3, Navigation, Globe, Play, Pause, RotateCcw, Layers, Compass, Battery, Signal, Volume2, Maximize, Minimize } from 'lucide-react';

// 서울시 자치구 실제 좌표 및 데이터
const seoul3DData = [
  { 
    id: 1, name: '강남구', lat: 37.5172, lng: 127.0473, 
    score: 95, rank: 1, height: 120, color: '#FF6B6B',
    population: 561052, households: 65923, rent: 85, safety: 384,
    libraries: 44, hospitals: 1520, cctv: 8352, crime: 6763,
    trend: 4, glow: true, pulse: true
  },
  { 
    id: 2, name: '서초구', lat: 37.4837, lng: 127.0324, 
    score: 92, rank: 2, height: 115, color: '#4ECDC4',
    population: 442704, households: 72345, rent: 95, safety: 567,
    libraries: 32, hospitals: 1234, cctv: 6789, crime: 4567,
    trend: 3, glow: true, pulse: false
  },
  { 
    id: 3, name: '송파구', lat: 37.5145, lng: 127.1059, 
    score: 89, rank: 3, height: 110, color: '#45B7D1',
    population: 686251, households: 78234, rent: 68, safety: 489,
    libraries: 28, hospitals: 1098, cctv: 5876, crime: 4123,
    trend: 2, glow: true, pulse: false
  },
  { 
    id: 4, name: '용산구', lat: 37.5384, lng: 126.9650, 
    score: 87, rank: 4, height: 105, color: '#96CEB4',
    population: 244203, households: 39270, rent: 78, safety: 618,
    libraries: 20, hospitals: 440, cctv: 3609, crime: 3021,
    trend: 1, glow: false, pulse: false
  },
  { 
    id: 5, name: '성동구', lat: 37.5633, lng: 127.0369, 
    score: 85, rank: 5, height: 100, color: '#FFEAA7',
    population: 310717, households: 44946, rent: 52, safety: 253,
    libraries: 10, hospitals: 638, cctv: 4638, crime: 2023,
    trend: 2, glow: false, pulse: false
  },
  { 
    id: 6, name: '종로구', lat: 37.5735, lng: 126.9788, 
    score: 84, rank: 6, height: 98, color: '#DDA0DD',
    population: 155709, households: 27308, rent: 65, safety: 506,
    libraries: 43, hospitals: 676, cctv: 2339, crime: 2981,
    trend: 0, glow: false, pulse: false
  },
  { 
    id: 7, name: '중구', lat: 37.5641, lng: 126.9979, 
    score: 83, rank: 7, height: 95, color: '#74B9FF',
    population: 126364, households: 24544, rent: 72, safety: 465,
    libraries: 37, hospitals: 771, cctv: 3118, crime: 3348,
    trend: -1, glow: false, pulse: false
  },
  { 
    id: 8, name: '마포구', lat: 37.5663, lng: 126.9019, 
    score: 82, rank: 8, height: 92, color: '#00B894',
    population: 385783, households: 58934, rent: 58, safety: 623,
    libraries: 18, hospitals: 892, cctv: 4567, crime: 3456,
    trend: 1, glow: false, pulse: false
  },
  { 
    id: 9, name: '성북구', lat: 37.5894, lng: 127.0167, 
    score: 81, rank: 9, height: 90, color: '#FD79A8',
    population: 462961, households: 64985, rent: 40, safety: 921,
    libraries: 26, hospitals: 765, cctv: 4906, crime: 2411,
    trend: 2, glow: false, pulse: false
  },
  { 
    id: 10, name: '광진구', lat: 37.5384, lng: 127.0822, 
    score: 80, rank: 10, height: 88, color: '#6C5CE7',
    population: 361781, households: 66140, rent: 45, safety: 341,
    libraries: 14, hospitals: 784, cctv: 4636, crime: 3424,
    trend: 1, glow: false, pulse: false
  },
  { 
    id: 11, name: '동대문구', lat: 37.5744, lng: 127.0396, 
    score: 78, rank: 11, height: 85, color: '#A29BFE',
    population: 365445, households: 65290, rent: 42, safety: 542,
    libraries: 19, hospitals: 866, cctv: 3846, crime: 2957,
    trend: 0, glow: false, pulse: false
  },
  { 
    id: 12, name: '영등포구', lat: 37.5263, lng: 126.8963, 
    score: 77, rank: 12, height: 82, color: '#00CEC9',
    population: 408819, households: 61234, rent: 55, safety: 567,
    libraries: 20, hospitals: 987, cctv: 4987, crime: 3567,
    trend: 1, glow: false, pulse: false
  }
];

// 3D 지도 컨테이너 컴포넌트
const Hologram3DMap = ({ selectedDistrict, onDistrictSelect, isPlaying, onPlayToggle }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 60, y: 0, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [particles, setParticles] = useState([]);
  const [dataStreams, setDataStreams] = useState([]);

  // 파티클 시스템 초기화
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 600,
      z: Math.random() * 200,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      vz: (Math.random() - 0.5) * 2,
      life: Math.random(),
      color: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);

    // 데이터 스트림 생성
    const streams = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      start: seoul3DData[Math.floor(Math.random() * seoul3DData.length)],
      end: seoul3DData[Math.floor(Math.random() * seoul3DData.length)],
      progress: Math.random(),
      speed: 0.01 + Math.random() * 0.02,
      color: '#00F5FF'
    }));
    setDataStreams(streams);
  }, []);

  // 자동 회전 애니메이션
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: (prev.y + 0.5) % 360
      }));

      // 파티클 업데이트
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        z: particle.z + particle.vz,
        life: particle.life - 0.01,
        // 경계 체크
        vx: particle.x > 800 || particle.x < 0 ? -particle.vx : particle.vx,
        vy: particle.y > 600 || particle.y < 0 ? -particle.vy : particle.vy,
        vz: particle.z > 200 || particle.z < 0 ? -particle.vz : particle.vz
      })).filter(p => p.life > 0));

      // 데이터 스트림 업데이트
      setDataStreams(prev => prev.map(stream => ({
        ...stream,
        progress: (stream.progress + stream.speed) % 1
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)
        `,
        boxShadow: 'inset 0 0 100px rgba(0, 255, 255, 0.1)'
      }}
    >
      {/* 홀로그램 스캔라인 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"
          style={{
            animation: 'scan 3s linear infinite',
            background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), transparent)'
          }}
        />
      </div>

      {/* 3D 지도 컨테이너 */}
      <div 
        className="absolute inset-0 perspective-1000 transform-gpu"
        style={{
          perspective: '1200px',
          transform: `scale(${zoom})`
        }}
      >
        {/* 메인 3D 맵 */}
        <div 
          className="absolute inset-0 transform-gpu transition-transform duration-300"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* 파티클 배경 */}
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                transform: `translateZ(${particle.z}px)`,
                backgroundColor: particle.color,
                opacity: particle.life,
                boxShadow: `0 0 ${particle.life * 10}px ${particle.color}`
              }}
            />
          ))}

          {/* 데이터 스트림 */}
          {dataStreams.map(stream => {
            const startX = (stream.start.lng - 126.7) * 800;
            const startY = (127.2 - stream.start.lat) * 600;
            const endX = (stream.end.lng - 126.7) * 800;
            const endY = (127.2 - stream.end.lat) * 600;
            const currentX = startX + (endX - startX) * stream.progress;
            const currentY = startY + (endY - startY) * stream.progress;

            return (
              <div
                key={stream.id}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${currentX}px`,
                  top: `${currentY}px`,
                  backgroundColor: stream.color,
                  boxShadow: `0 0 15px ${stream.color}`,
                  transform: 'translateZ(50px)',
                  opacity: 0.8
                }}
              />
            );
          })}

          {/* 자치구 3D 블록들 */}
          {seoul3DData.map((district) => {
            const x = (district.lng - 126.7) * 800;
            const y = (127.2 - district.lat) * 600;
            const isSelected = selectedDistrict === district.name;
            const isHovered = hoveredDistrict === district.name;
            
            return (
              <div
                key={district.id}
                className={`absolute cursor-pointer transform-gpu transition-all duration-500 ${
                  isSelected ? 'z-50' : 'z-10'
                }`}
                style={{
                  left: `${Math.max(0, Math.min(85, x))}%`,
                  top: `${Math.max(0, Math.min(85, y))}%`,
                  transform: `
                    translate(-50%, -50%) 
                    translateZ(${district.height}px)
                    ${isSelected || isHovered ? 'scale(1.3)' : 'scale(1)'}
                    ${isSelected ? 'rotateY(180deg)' : ''}
                  `,
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => onDistrictSelect(district.name)}
                onMouseEnter={() => setHoveredDistrict(district.name)}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                {/* 메인 3D 블록 */}
                <div 
                  className={`relative rounded-xl transform-gpu transition-all duration-300 ${
                    isSelected ? 'animate-pulse' : ''
                  } ${district.glow ? 'animate-pulse' : ''}`}
                  style={{
                    width: `${40 + district.rank * 2}px`,
                    height: `${40 + district.rank * 2}px`,
                    background: `linear-gradient(135deg, ${district.color}, ${district.color}aa, ${district.color}44)`,
                    boxShadow: `
                      0 ${district.height * 0.3}px ${district.height * 0.5}px rgba(0,0,0,0.4),
                      inset 0 2px 0 rgba(255,255,255,0.3),
                      ${district.glow ? `0 0 30px ${district.color}` : ''},
                      ${isSelected ? `0 0 50px #FFD700, 0 0 100px #FFD700` : ''}
                    `,
                    border: isSelected ? '3px solid #FFD700' : '2px solid rgba(255,255,255,0.2)',
                    // height: `${district.height}px`,
                    animation: district.pulse ? 'pulse 2s infinite' : 'none'
                  }}
                >
                  {/* 홀로그램 면들 */}
                  <div 
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(45deg, transparent 30%, ${district.color}22 50%, transparent 70%)`,
                      transform: 'translateZ(2px)'
                    }}
                  />
                  
                  {/* 상단 면 */}
                  <div 
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `radial-gradient(circle, ${district.color}55, ${district.color}22)`,
                      transform: `rotateX(90deg) translateZ(${district.height/2}px)`,
                      transformOrigin: 'center top'
                    }}
                  />

                  {/* 랭킹 표시 */}
                  <div 
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10"
                    style={{
                      background: district.rank <= 3 ? 
                        'linear-gradient(135deg, #FFD700, #FFA500)' : 
                        'linear-gradient(135deg, #FFFFFF, #E5E5E5)',
                      color: district.rank <= 3 ? '#000' : '#333',
                      boxShadow: `0 0 20px ${district.rank <= 3 ? '#FFD700' : '#FFFFFF'}`,
                      transform: 'translateZ(10px)'
                    }}
                  >
                    {district.rank}
                  </div>
                  
                  {/* 트렌드 화살표 */}
                  <div 
                    className={`absolute -top-2 -left-2 w-4 h-4 rounded-full flex items-center justify-center ${
                      district.trend > 0 ? 'bg-green-400' : 
                      district.trend < 0 ? 'bg-red-400' : 'bg-gray-400'
                    }`}
                    style={{
                      boxShadow: `0 0 15px ${
                        district.trend > 0 ? '#10B981' : 
                        district.trend < 0 ? '#EF4444' : '#6B7280'
                      }`,
                      transform: 'translateZ(8px)'
                    }}
                  >
                    <TrendingUp className={`w-2 h-2 text-white ${district.trend < 0 ? 'rotate-180' : ''}`} />
                  </div>

                  {/* 스코어 표시 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm drop-shadow-lg" style={{
                      textShadow: '0 0 10px rgba(255,255,255,0.8)'
                    }}>
                      {district.score}
                    </span>
                  </div>

                  {/* 호버/선택 시 글로우 효과 */}
                  {(isHovered || isSelected) && (
                    <div 
                      className="absolute inset-0 rounded-xl animate-pulse"
                      style={{
                        background: `radial-gradient(circle, ${district.color}44, transparent)`,
                        transform: 'translateZ(-1px) scale(1.5)',
                        filter: 'blur(5px)'
                      }}
                    />
                  )}
                </div>

                {/* 데이터 홀로그램 */}
                {(isSelected || isHovered) && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50"
                    style={{ transform: 'translateZ(50px)' }}
                  >
                    <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 border border-cyan-400/50 min-w-64">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-white text-lg">{district.name}</h3>
                        <div className="text-cyan-400 text-sm">#{district.rank}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <div className="text-cyan-300">종합점수</div>
                          <div className="text-white font-bold text-xl">{district.score}점</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-cyan-300">월세</div>
                          <div className="text-white font-bold">{district.rent}만원</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-cyan-300">인구</div>
                          <div className="text-white">{(district.population/10000).toFixed(1)}만명</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-cyan-300">1인가구</div>
                          <div className="text-white">{(district.households/1000).toFixed(1)}k</div>
                        </div>
                      </div>

                      {/* 실시간 데이터 스트림 시뮬레이션 */}
                      <div className="mt-3 pt-3 border-t border-cyan-400/30">
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400">실시간 데이터 스트리밍</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 자치구 라벨 */}
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                    {district.name}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 3D 그리드 배경 */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(0deg, rgba(0,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'translateZ(-50px)',
              opacity: 0.3
            }}
          />
        </div>
      </div>

      {/* 홀로그램 UI 컨트롤 */}
      <div className="absolute top-4 right-4 space-y-3">
        {/* 재생 컨트롤 */}
        <button 
          onClick={onPlayToggle}
          className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all ${
            isPlaying ? 'bg-red-500/20 hover:bg-red-500/30' : 'bg-blue-500/20 hover:bg-blue-500/30'
          }`}
          style={{
            boxShadow: `0 0 20px ${isPlaying ? '#EF4444' : '#3B82F6'}`
          }}
        >
          {isPlaying ? 
            <Pause className="w-5 h-5 text-white" /> : 
            <Play className="w-5 h-5 text-white" />
          }
        </button>

        {/* 리셋 버튼 */}
        <button 
          onClick={() => setRotation({ x: 60, y: 0, z: 0 })}
          className="p-3 bg-gray-500/20 hover:bg-gray-500/30 backdrop-blur-md border border-white/20 rounded-full transition-all"
          style={{ boxShadow: '0 0 20px #6B7280' }}
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>

        {/* 줌 컨트롤 */}
        <div className="flex flex-col space-y-2">
          <button 
            onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
            className="p-2 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-md border border-white/20 rounded text-white text-sm font-bold"
          >
            +
          </button>
          <button 
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md border border-white/20 rounded text-white text-sm font-bold"
          >
            -
          </button>
        </div>
      </div>

      {/* 홀로그램 HUD */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-cyan-400/30 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">NEURAL LINK ACTIVE</span>
              </div>
              <div className="text-cyan-400 text-sm">
                ROTATION: Y{rotation.y.toFixed(0)}° X{rotation.x}° Z{rotation.z}°
              </div>
              <div className="text-cyan-400 text-sm">
                ZOOM: {(zoom * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-blue-400">
                <Cpu className="w-4 h-4" />
                <span>GPU: 94%</span>
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <Wifi className="w-4 h-4" />
                <span>NET: 1Gb/s</span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Battery className="w-4 h-4" />
                <span>PWR: 98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 실시간 상태 표시 */}
      <div className="absolute top-4 left-4">
        <div className="bg-green-500/20 backdrop-blur-md text-green-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 border border-green-400/30">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>HOLOGRAM MODE</span>
        </div>
      </div>

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(600px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

// 실시간 AI 분석 패널
const AIAnalysisPanel = ({ selectedDistrict, userData }) => {
  const [analysisState, setAnalysisState] = useState('idle'); // idle, analyzing, complete
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('대기중');
  const [brainwaves, setBrainwaves] = useState([]);

  const stages = [
    '신경망 초기화',
    '데이터 패턴 스캔',
    '머신러닝 모델 로딩',
    '예측 알고리즘 실행',
    '결과 최적화',
    '홀로그램 렌더링'
  ];

  // 뇌파 시뮬레이션
  useEffect(() => {
    if (analysisState === 'analyzing') {
      const waves = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        amplitude: Math.sin(i * 0.1) * 50 + Math.random() * 20,
        frequency: Math.random() * 5 + 1
      }));
      setBrainwaves(waves);
    }
  }, [analysisState]);

  const startAnalysis = () => {
    setAnalysisState('analyzing');
    setAnalysisProgress(0);
    
    let stage = 0;
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      if (progress >= 100) {
        stage++;
        if (stage >= stages.length) {
          setAnalysisState('complete');
          setAnalysisProgress(100);
          setCurrentStage('분석 완료');
          clearInterval(interval);
          return;
        }
        progress = 0;
      }
      
      setAnalysisProgress(progress);
      setCurrentStage(stages[stage]);
    }, 300);
  };

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-purple-400/30 p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Brain className={`w-6 h-6 mr-2 text-purple-400 ${analysisState === 'analyzing' ? 'animate-pulse' : ''}`} />
        AI 신경망 분석 시스템
      </h3>
      
      {/* 뇌파 시각화 */}
      {analysisState === 'analyzing' && (
        <div className="h-20 mb-4 relative overflow-hidden rounded-lg bg-black/40">
          <svg width="100%" height="100%" className="absolute inset-0">
            <path
              d={`M 0 40 ${brainwaves.map((wave, i) => 
                `L ${i * 4} ${40 + Math.sin(Date.now() * 0.01 + i * 0.1) * wave.amplitude * 0.3}`
              ).join(' ')}`}
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent"></div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-purple-300 text-sm">분석 상태: {currentStage}</span>
          <span className="text-purple-300 text-sm">{Math.round(analysisProgress)}%</span>
        </div>
        
        <div className="w-full bg-black/40 rounded-full h-3 border border-purple-400/30">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${analysisProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>

        {analysisState === 'analyzing' && (
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-purple-500/20 rounded-lg p-3 border border-purple-400/20">
              <div className="flex items-center space-x-2 mb-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300">Neural CPU</span>
              </div>
              <div className="text-white font-bold">97.3%</div>
            </div>
            <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/20">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300">Quantum Sync</span>
              </div>
              <div className="text-white font-bold">99.8%</div>
            </div>
          </div>
        )}

        <button 
          onClick={startAnalysis}
          disabled={analysisState === 'analyzing'}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
            analysisState === 'analyzing' 
              ? 'bg-purple-500/30 text-purple-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
          }`}
          style={{
            boxShadow: analysisState !== 'analyzing' ? '0 0 30px rgba(139, 92, 246, 0.5)' : 'none'
          }}
        >
          <Brain className="w-5 h-5" />
          <span>
            {analysisState === 'idle' && '신경망 분석 시작'}
            {analysisState === 'analyzing' && '분석 진행중...'}
            {analysisState === 'complete' && '분석 완료 ✓'}
          </span>
        </button>

        {analysisState === 'complete' && (
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 mt-4">
            <h4 className="text-green-400 font-semibold mb-2">🧠 AI 분석 결과</h4>
            <div className="text-sm text-green-300 space-y-1">
              <p>• 선택 지역: <span className="text-white font-semibold">{selectedDistrict}</span></p>
              <p>• 개인화 매칭률: <span className="text-white font-semibold">94.7%</span></p>
              <p>• 예상 만족도: <span className="text-white font-semibold">높음</span></p>
              <p>• 추천 신뢰도: <span className="text-white font-semibold">97.3%</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 실시간 데이터 스트림 패널
const DataStreamPanel = ({ data }) => {
  const [streamData, setStreamData] = useState([]);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        district: data[Math.floor(Math.random() * data.length)].name,
        metric: ['안전지수', '편의성', '경제성', '커뮤니티'][Math.floor(Math.random() * 4)],
        value: Math.floor(Math.random() * 100) + 1,
        change: (Math.random() - 0.5) * 10
      };

      setStreamData(prev => [newEntry, ...prev.slice(0, 9)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isStreaming, data]);

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-cyan-400/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Activity className="w-6 h-6 mr-2 text-cyan-400" />
          실시간 데이터 스트림
        </h3>
        <button 
          onClick={() => setIsStreaming(!isStreaming)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            isStreaming 
              ? 'bg-red-500/20 text-red-400 border border-red-400/30' 
              : 'bg-green-500/20 text-green-400 border border-green-400/30'
          }`}
        >
          {isStreaming ? '정지' : '재생'}
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {streamData.map(entry => (
          <div 
            key={entry.id}
            className="bg-cyan-500/10 border border-cyan-400/20 rounded-lg p-3 animate-pulse"
            style={{ animationDuration: '1s', animationIterationCount: '1' }}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-cyan-400 text-sm font-medium">{entry.district}</div>
                <div className="text-gray-300 text-xs">{entry.metric}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{entry.value}</div>
                <div className={`text-xs ${entry.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {entry.change > 0 ? '+' : ''}{entry.change.toFixed(1)}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">{entry.timestamp}</div>
          </div>
        ))}
      </div>

      {streamData.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>데이터 스트림 대기중...</p>
        </div>
      )}
    </div>
  );
};

// 메인 3D 홀로그램 컴포넌트
const Seoul3DHologramMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('강남구');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hologramMode, setHologramMode] = useState('analysis'); // analysis, stream, neural

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 홀로그램 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
      
      {/* 홀로그램 그리드 */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* 헤더 */}
      <header className="relative z-10 bg-black/50 backdrop-blur-md border-b border-cyan-400/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center relative">
                <Globe className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-cyan-400/30 rounded-xl animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  서울 청년 1인가구 3D 홀로그램 지도
                </h1>
                <p className="text-cyan-300 text-sm">Neural Network Powered • Real-time Holographic Visualization</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-cyan-400">SYSTEM TIME</div>
                <div className="font-mono text-lg font-bold text-white">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {['analysis', 'stream', 'neural'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setHologramMode(mode)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      hologramMode === mode
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50'
                        : 'bg-black/30 text-gray-400 border border-gray-600/30 hover:border-cyan-400/30'
                    }`}
                  >
                    {mode.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        
        {/* 3D 홀로그램 지도 및 사이드 패널 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 3D 지도 (메인) */}
          <div className="lg:col-span-3">
            <Hologram3DMap 
              selectedDistrict={selectedDistrict}
              onDistrictSelect={setSelectedDistrict}
              isPlaying={isPlaying}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
            />
          </div>

          {/* 사이드 패널 */}
          <div className="space-y-6">
            
            {/* 홀로그램 모드별 패널 */}
            {hologramMode === 'analysis' && (
              <AIAnalysisPanel 
                selectedDistrict={selectedDistrict}
                userData={{}}
              />
            )}
            
            {hologramMode === 'stream' && (
              <DataStreamPanel data={seoul3DData} />
            )}
            
            {hologramMode === 'neural' && (
              <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-green-400/30 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Cpu className="w-6 h-6 mr-2 text-green-400" />
                  신경망 상태
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/20">
                      <div className="text-green-300 text-sm">노드 활성</div>
                      <div className="text-2xl font-bold text-white">2,847</div>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/20">
                      <div className="text-blue-300 text-sm">연결 강도</div>
                      <div className="text-2xl font-bold text-white">94.7%</div>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 rounded-lg p-4">
                    <div className="text-green-400 text-sm mb-2">Neural Activity</div>
                    <div className="flex space-x-1 h-16">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-green-400/20 rounded-sm relative overflow-hidden"
                        >
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-green-400 transition-all duration-1000"
                            style={{ 
                              height: `${Math.sin(Date.now() * 0.005 + i) * 50 + 50}%`,
                              animationDelay: `${i * 100}ms`
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 홀로그램 랭킹 */}
            <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                실시간 홀로랭킹
              </h3>
              <div className="space-y-3">
                {seoul3DData.slice(0, 6).map((district, index) => (
                  <div 
                    key={district.id}
                    onClick={() => setSelectedDistrict(district.name)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      selectedDistrict === district.name 
                        ? 'bg-cyan-500/30 border border-cyan-400/50' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index < 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-500'
                        }`}
                        style={{ boxShadow: index < 3 ? '0 0 15px #FFD700' : 'none' }}
                      >
                        {district.rank}
                      </div>
                      <div>
                        <div className="text-white font-medium">{district.name}</div>
                        <div className="text-gray-400 text-xs">{district.score}점</div>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      district.trend > 0 ? 'text-green-400' : 
                      district.trend < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      <TrendingUp className={`w-4 h-4 ${district.trend < 0 ? 'rotate-180' : ''}`} />
                      <span className="text-xs">{Math.abs(district.trend)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 홀로그램 컨트롤 패널 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Quantum Processor', value: '94.7%', icon: Cpu, color: 'blue' },
            { title: 'Neural Network', value: '2,847 nodes', icon: Brain, color: 'purple' },
            { title: 'Data Stream', value: '1.2 TB/s', icon: Activity, color: 'green' },
            { title: 'Hologram Sync', value: '99.8%', icon: Zap, color: 'yellow' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-black/60 backdrop-blur-md rounded-xl border border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-${stat.color}-400 text-sm`}>{stat.title}</div>
                    <div className="text-white font-bold text-xl">{stat.value}</div>
                  </div>
                  <Icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* 홀로그램 푸터 */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-md border-t border-cyan-400/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white">서울 청년 1인가구 3D 홀로그램 지도</h3>
              <p className="text-cyan-400 text-sm">Neural Network • Quantum Computing • Holographic Visualization</p>
            </div>
            <div className="text-right">
              <p className="text-cyan-400 text-sm">Made with 🧠 by Team 청년안전망</p>
              <p className="text-gray-500 text-xs">2025 서울 데이터 허브 시각화 경진대회</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Seoul3DHologramMap;