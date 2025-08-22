import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { Brain, TrendingUp, Target, Users, Home, Shield, Heart, Award, MapPin, Clock, Activity, Globe, Wifi, Battery, Signal, Cpu, Star, Bell, Eye, Download, Share2, MessageCircle, Play, Pause, RotateCcw, Maximize, Volume2, Mic, Search, CheckCircle, ArrowRight, Zap, Settings, Filter, Upload, FileText, AlertTriangle, RefreshCw } from 'lucide-react';

// CSV 동적 분석 및 처리 시스템
const SeoulCSVDynamicSystem = () => {
  const [csvData, setCsvData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState('upload');

  // 실시간 시계
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // CSV 파일 읽기 및 처리
  const loadAndProcessCSV = async () => {
    setIsLoading(true);
    try {
      // 실제 업로드된 CSV 파일 읽기
      const csvContent = await fetch('/seoul_integrated_final.csv').then(res => res.text());
      
      // CSV 파싱
      const Papa = await import('papaparse');
      const parsed = Papa.parse(csvContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        delimitersToGuess: [',', '\t', '|', ';']
      });

      if (parsed.errors.length > 0) {
        console.error('CSV 파싱 오류:', parsed.errors);
      }

      // 데이터 정제 및 처리
      const cleanedData = parsed.data.map((row, index) => {
        // 헤더 공백 제거 및 정규화
        const cleanRow = {};
        Object.keys(row).forEach(key => {
          const cleanKey = key.trim();
          cleanRow[cleanKey] = row[key];
        });

        return {
          id: index + 1,
          자치구명: cleanRow.자치구명 || `자치구${index + 1}`,
          평균임대면적: parseFloat(cleanRow.평균임대면적) || 0,
          평균보증금: parseFloat(cleanRow.평균보증금) || 0,
          평균임대료: parseFloat(cleanRow.평균임대료) || 0,
          평균건축년도: parseFloat(cleanRow.평균건축년도) || 2000,
          평균종전보증금: parseFloat(cleanRow.평균종전보증금) || 0,
          평균종전임대료: parseFloat(cleanRow.평균종전임대료) || 0,
          도서관수: parseInt(cleanRow.도서관수) || 0,
          공원시설수: parseInt(cleanRow.공원시설수) || 0,
          병원수: parseInt(cleanRow.병원수) || 0,
          CCTV총수: parseInt(cleanRow.CCTV총수) || 0,
          안심귀갓길수: parseInt(cleanRow.안심귀갓길수) || 0,
          총ocrn: parseFloat(cleanRow.총ocrn) || 0,
          총arst: parseFloat(cleanRow.총arst) || 0,
          총1인가구수: parseInt(cleanRow.총1인가구수) || 0,
          남성1인가구: parseInt(cleanRow.남성1인가구) || 0,
          여성1인가구: parseInt(cleanRow.여성1인가구) || 0
        };
      }).filter(row => row.자치구명 && row.자치구명 !== '자치구명'); // 헤더 행 제거

      setCsvData(cleanedData);
      
      // 생활안전망 지수 계산
      const processedWithScores = calculateLifeSafetyScores(cleanedData);
      setProcessedData(processedWithScores);
      
      // 분석 결과 생성
      const analysis = generateAnalysisResults(processedWithScores);
      setAnalysisResults(analysis);
      
      setActiveView('dashboard');
      
    } catch (error) {
      console.error('CSV 처리 오류:', error);
      alert('CSV 파일 처리 중 오류가 발생했습니다. 파일 형식을 확인해주세요.');
    }
    setIsLoading(false);
  };

  // 생활안전망 지수 계산 함수
  const calculateLifeSafetyScores = (data) => {
    return data.map((district, index) => {
      // 안전성 점수 (30%)
      const crimeRate = district.총1인가구수 > 0 ? (district.총ocrn / district.총1인가구수) * 1000 : 0;
      const safetyFacilities = district.CCTV총수 + district.안심귀갓길수;
      const safetyScore = Math.max(0, 100 - crimeRate * 10) * 0.7 + Math.min(100, safetyFacilities / 100) * 0.3;
      
      // 편의성 점수 (25%)
      const convenienceScore = Math.min(100, 
        (district.도서관수 * 3 + district.병원수 * 0.1 + district.공원시설수 * 0.8)
      );
      
      // 경제성 점수 (25%) - 임대료가 낮을수록 높은 점수
      const avgRent = district.평균임대료 || 50;
      const affordabilityScore = Math.max(0, (150 - avgRent) * 0.8);
      
      // 커뮤니티 점수 (20%)
      const householdDensity = district.총1인가구수 / 1000;
      const genderBalance = district.총1인가구수 > 0 ? 
        100 - Math.abs(district.남성1인가구 - district.여성1인가구) / district.총1인가구수 * 100 : 50;
      const communityScore = Math.min(100, householdDensity * 0.6 + genderBalance * 0.4);
      
      // 총 점수 계산
      const totalScore = Math.round(
        safetyScore * 0.3 + 
        convenienceScore * 0.25 + 
        affordabilityScore * 0.25 + 
        communityScore * 0.2
      );

      return {
        ...district,
        scores: {
          safety: Math.round(safetyScore),
          convenience: Math.round(convenienceScore),
          affordability: Math.round(affordabilityScore),
          community: Math.round(communityScore),
          total: totalScore
        },
        crimeRate: crimeRate.toFixed(2),
        rank: 0, // 나중에 정렬 후 설정
        trend: Math.floor(Math.random() * 5) - 2 // -2 ~ +2 랜덤 트렌드
      };
    }).sort((a, b) => b.scores.total - a.scores.total)
      .map((district, index) => ({ ...district, rank: index + 1 }));
  };

  // 분석 결과 생성
  const generateAnalysisResults = (data) => {
    const stats = {
      총자치구수: data.length,
      평균점수: data.reduce((sum, d) => sum + d.scores.total, 0) / data.length,
      최고점수: Math.max(...data.map(d => d.scores.total)),
      최저점수: Math.min(...data.map(d => d.scores.total)),
      안전한지역: data.filter(d => d.scores.safety >= 80).length,
      경제적지역: data.filter(d => d.scores.affordability >= 70).length,
      편의시설우수: data.filter(d => d.scores.convenience >= 80).length
    };

    const recommendations = {
      상위3지역: data.slice(0, 3).map(d => ({
        name: d.자치구명,
        score: d.scores.total,
        strengths: getDistrictStrengths(d)
      })),
      개선필요지역: data.slice(-3).map(d => ({
        name: d.자치구명,
        score: d.scores.total,
        improvements: getImprovementSuggestions(d)
      }))
    };

    return { stats, recommendations, trends: generateTrendAnalysis(data) };
  };

  // 자치구 강점 분석
  const getDistrictStrengths = (district) => {
    const strengths = [];
    if (district.scores.safety >= 80) strengths.push('우수한 안전성');
    if (district.scores.convenience >= 80) strengths.push('풍부한 편의시설');
    if (district.scores.affordability >= 70) strengths.push('합리적 임대료');
    if (district.scores.community >= 75) strengths.push('활발한 커뮤니티');
    return strengths.length > 0 ? strengths : ['균형잡힌 생활환경'];
  };

  // 개선 제안
  const getImprovementSuggestions = (district) => {
    const suggestions = [];
    if (district.scores.safety < 60) suggestions.push('안전시설 확충 필요');
    if (district.scores.convenience < 60) suggestions.push('편의시설 증설 요구');
    if (district.scores.affordability < 50) suggestions.push('주거비 지원 필요');
    if (district.scores.community < 60) suggestions.push('커뮤니티 프로그램 확대');
    return suggestions.length > 0 ? suggestions : ['지속적인 모니터링 필요'];
  };

  // 트렌드 분석
  const generateTrendAnalysis = (data) => {
    return {
      improving: data.filter(d => d.trend > 0).length,
      declining: data.filter(d => d.trend < 0).length,
      stable: data.filter(d => d.trend === 0).length,
      hottestTrend: data.find(d => d.trend === Math.max(...data.map(x => x.trend)))?.자치구명 || 'N/A'
    };
  };

  // 업로드 화면
  const UploadView = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-8">
        <FileText className="w-20 h-20 text-white" />
      </div>
      
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">CSV 데이터 분석 시스템</h2>
        <p className="text-xl text-gray-300 mb-8">seoul_integrated_final.csv 파일을 분석하여 생활안전망 지수를 계산합니다</p>
      </div>

      <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-blue-400/30 p-8 max-w-2xl">
        <h3 className="text-xl font-bold text-blue-300 mb-4">📊 분석 가능한 데이터</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
          <div>• 자치구별 임대면적/보증금/임대료</div>
          <div>• 도서관/공원/병원 시설 현황</div>
          <div>• CCTV/안심귀갓길 안전시설</div>
          <div>• 범죄 발생률 및 검거율</div>
          <div>• 1인가구 인구 통계 (성별)</div>
          <div>• 건축년도 및 주거환경</div>
        </div>
      </div>

      <button 
        onClick={loadAndProcessCSV}
        disabled={isLoading}
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 text-white py-4 px-8 rounded-xl font-bold text-xl transition-all flex items-center space-x-3"
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>CSV 분석중...</span>
          </>
        ) : (
          <>
            <Brain className="w-6 h-6" />
            <span>CSV 데이터 분석 시작</span>
          </>
        )}
      </button>

      {isLoading && (
        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-yellow-400/30 p-4 max-w-md">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 text-yellow-400 animate-spin" />
            <div>
              <div className="text-yellow-300 font-semibold">데이터 처리중</div>
              <div className="text-gray-300 text-sm">CSV 파싱 → 데이터 정제 → 지수 계산</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 대시보드 뷰
  const DashboardView = () => {
    if (!processedData || !analysisResults) return null;

    return (
      <div className="space-y-8">
        {/* 상단 요약 통계 */}
        <div className="grid grid-cols-6 gap-6">
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-blue-400/30 p-4 text-center">
            <div className="text-blue-300 text-sm">총 자치구</div>
            <div className="text-3xl font-bold text-white">{analysisResults.stats.총자치구수}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-green-400/30 p-4 text-center">
            <div className="text-green-300 text-sm">평균 점수</div>
            <div className="text-3xl font-bold text-white">{analysisResults.stats.평균점수.toFixed(1)}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-purple-400/30 p-4 text-center">
            <div className="text-purple-300 text-sm">최고 점수</div>
            <div className="text-3xl font-bold text-white">{analysisResults.stats.최고점수}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-orange-400/30 p-4 text-center">
            <div className="text-orange-300 text-sm">안전한 지역</div>
            <div className="text-3xl font-bold text-white">{analysisResults.stats.안전한지역}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-pink-400/30 p-4 text-center">
            <div className="text-pink-300 text-sm">경제적 지역</div>
            <div className="text-3xl font-bold text-white">{analysisResults.stats.경제적지역}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-cyan-400/30 p-4 text-center">
            <div className="text-cyan-300 text-sm">편의시설 우수</div>
            <div className="text-3xl font-bold text-white">{analysisResults.stats.편의시설우수}</div>
          </div>
        </div>

        {/* 메인 차트 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 생활안전망 종합 점수 */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2 text-yellow-400" />
              생활안전망 종합 점수 (상위 15개구)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData.slice(0, 15)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="자치구명" 
                    stroke="#94A3B8"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  />
                  <Bar 
                    dataKey="scores.total" 
                    fill="url(#scoreGradient)"
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => setSelectedDistrict(data.자치구명)}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 선택된 자치구 상세 분석 */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-6 w-6 mr-2 text-purple-400" />
              {selectedDistrict || processedData[0]?.자치구명} 상세 분석
            </h3>
            
            {(() => {
              const district = selectedDistrict 
                ? processedData.find(d => d.자치구명 === selectedDistrict)
                : processedData[0];
              
              if (!district) return <div>데이터를 찾을 수 없습니다.</div>;

              const radarData = [
                { subject: '안전성', A: district.scores.safety, fullMark: 100 },
                { subject: '편의성', A: district.scores.convenience, fullMark: 100 },
                { subject: '경제성', A: district.scores.affordability, fullMark: 100 },
                { subject: '커뮤니티', A: district.scores.community, fullMark: 100 }
              ];

              return (
                <>
                  <div className="h-64 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tickCount={5}
                          tick={{ fontSize: 10, fill: '#6B7280' }}
                        />
                        <Radar
                          name={district.자치구명}
                          dataKey="A"
                          stroke="#8B5CF6"
                          fill="#8B5CF6"
                          fillOpacity={0.3}
                          strokeWidth={3}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500/20 rounded-lg p-3">
                      <div className="text-blue-300 text-sm">종합 점수</div>
                      <div className="text-2xl font-bold text-white">{district.scores.total}점</div>
                      <div className="text-xs text-gray-300">전체 {district.rank}위</div>
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-3">
                      <div className="text-green-300 text-sm">월평균 임대료</div>
                      <div className="text-2xl font-bold text-white">{district.평균임대료}만원</div>
                      <div className="text-xs text-gray-300">1인가구 기준</div>
                    </div>
                    <div className="bg-purple-500/20 rounded-lg p-3">
                      <div className="text-purple-300 text-sm">1인가구 수</div>
                      <div className="text-xl font-bold text-white">{(district.총1인가구수/1000).toFixed(1)}k</div>
                      <div className="text-xs text-gray-300">남{district.남성1인가구} 여{district.여성1인가구}</div>
                    </div>
                    <div className="bg-orange-500/20 rounded-lg p-3">
                      <div className="text-orange-300 text-sm">범죄율</div>
                      <div className="text-xl font-bold text-white">{district.crimeRate}</div>
                      <div className="text-xs text-gray-300">건/천명</div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* 추가 분석 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 범죄율 vs 안전시설 */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">범죄율 vs 안전시설 분포</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="crimeRate" 
                    stroke="#94A3B8"
                    label={{ value: '범죄율', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    dataKey={(d) => d.CCTV총수 + d.안심귀갓길수}
                    stroke="#94A3B8"
                    label={{ value: '안전시설', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                    formatter={(value, name) => [value, '안전시설 수']}
                    labelFormatter={(value) => `${value}구`}
                  />
                  <Scatter dataKey={(d) => d.CCTV총수 + d.안심귀갓길수} fill="#10B981" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 1인가구 성별 분포 */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">1인가구 성별 분포 (상위 10개구)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="자치구명" 
                    stroke="#94A3B8"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="남성1인가구" stackId="a" fill="#3B82F6" name="남성" />
                  <Bar dataKey="여성1인가구" stackId="a" fill="#EC4899" name="여성" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 추천 및 개선 제안 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 상위 추천 지역 */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-green-400/30 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2 text-green-400" />
              추천 거주지 TOP 3
            </h3>
            <div className="space-y-4">
              {analysisResults.recommendations.상위3지역.map((rec, index) => (
                <div key={index} className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-white">{rec.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">
                        {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                      </span>
                      <span className="text-xl font-bold text-green-400">{rec.score}점</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rec.strengths.map((strength, i) => (
                      <span key={i} className="px-2 py-1 bg-green-600/30 text-green-300 rounded-full text-xs">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 개선 필요 지역 */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-orange-400/30 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-orange-400" />
              개선 필요 지역
            </h3>
            <div className="space-y-4">
              {analysisResults.recommendations.개선필요지역.map((rec, index) => (
                <div key={index} className="bg-orange-500/20 border border-orange-400/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-white">{rec.name}</h4>
                    <span className="text-lg font-bold text-orange-400">{rec.score}점</span>
                  </div>
                  <div className="space-y-1">
                    {rec.improvements.map((improvement, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4 text-orange-400" />
                        <span className="text-gray-300 text-sm">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative">
      
      {/* 배경 효과 */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '400px 400px, 400px 400px, 50px 50px, 50px 50px'
          }}
        />
      </div>

      {/* 헤더 */}
      <header className="relative z-10 bg-black/30 backdrop-blur-md border-b border-cyan-400/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  서울 청년 1인가구 CSV 동적 분석 시스템
                </h1>
                <p className="text-cyan-300 text-sm">실시간 CSV 데이터 처리 • AI 기반 생활안전망 분석</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-cyan-400">ANALYSIS TIME</div>
                <div className="font-mono text-lg font-bold text-white">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              
              {processedData && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveView('upload')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeView === 'upload'
                        ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50'
                        : 'bg-black/30 text-gray-400 hover:bg-blue-500/20'
                    }`}
                  >
                    업로드
                  </button>
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeView === 'dashboard'
                        ? 'bg-green-500/30 text-green-300 border border-green-400/50'
                        : 'bg-black/30 text-gray-400 hover:bg-green-500/20'
                    }`}
                  >
                    대시보드
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8 min-h-screen">
        {activeView === 'upload' && <UploadView />}
        {activeView === 'dashboard' && <DashboardView />}
      </main>

      {/* 하단 상태바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-cyan-400/30 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>CSV 분석 엔진 준비됨</span>
              </div>
              {processedData && (
                <>
                  <div>분석된 자치구: {processedData.length}개</div>
                  <div>최고 점수: {Math.max(...processedData.map(d => d.scores.total))}점</div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-6 text-white">
              <div>상태: <span className="text-green-400 font-semibold">정상 작동</span></div>
              <div className="flex items-center space-x-1">
                <Signal className="w-4 h-4 text-green-400" />
                <span>연결 안정</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoulCSVDynamicSystem;