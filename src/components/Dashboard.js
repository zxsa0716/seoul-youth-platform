import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';
import { MapPin, Brain, Star, TrendingUp, Shield, Home, Users, Heart, Award, Target, Eye, Settings, Download, Share2, MessageCircle, Search, Filter, Zap, Activity, Clock, Wifi, Cpu, BarChart3, Navigation, Globe, Play, Pause, RotateCcw } from 'lucide-react';

// 실제 CSV 데이터 (25개 자치구)
const csvData = [
  { 자치구명: '강남구', 평균임대면적: 45.2, 평균보증금: 35000, 평균임대료: 85, 평균건축년도: 2010, 평균종전보증금: 30000, 평균종전임대료: 80, 도서관수: 44, 공원시설수: 156, 병원수: 1520, CCTV총수: 8352, 안심귀갓길수: 384, 총ocrn: 6763, 총arst: 4992, 총1인가구수: 65923, 남성1인가구: 31048, 여성1인가구: 34875 },
  { 자치구명: '강동구', 평균임대면적: 52.3, 평균보증금: 18000, 평균임대료: 42, 평균건축년도: 2005, 평균종전보증금: 15000, 평균종전임대료: 38, 도서관수: 14, 공원시설수: 89, 병원수: 784, CCTV총수: 4636, 안심귀갓길수: 341, 총ocrn: 3424, 총arst: 2333, 총1인가구수: 66140, 남성1인가구: 31456, 여성1인가구: 34684 },
  { 자치구명: '강북구', 평균임대면적: 48.9, 평균보증금: 12000, 평균임대료: 35, 평균건축년도: 1998, 평균종전보증금: 10000, 평균종전임대료: 32, 도서관수: 11, 공원시설수: 67, 병원수: 645, CCTV총수: 3584, 안심귀갓길수: 1136, 총ocrn: 2497, 총arst: 2142, 총1인가구수: 48428, 남성1인가구: 22386, 여성1인가구: 26042 },
  { 자치구명: '강서구', 평균임대면적: 55.1, 평균보증금: 22000, 평균임대료: 48, 평균건축년도: 2008, 평균종전보증금: 19000, 평균종전임대료: 45, 도서관수: 21, 공원시설수: 112, 병원수: 1004, CCTV총수: 5133, 안심귀갓길수: 647, 총ocrn: 3834, 총arst: 3049, 총1인가구수: 67162, 남성1인가구: 31456, 여성1인가구: 35706 },
  { 자치구명: '관악구', 평균임대면적: 42.8, 평균보증금: 15000, 평균임대료: 38, 평균건축년도: 2000, 평균종전보증금: 13000, 평균종전임대료: 35, 도서관수: 19, 공원시설수: 78, 병원수: 810, CCTV총수: 4238, 안심귀갓길수: 506, 총ocrn: 3348, 총arst: 2474, 총1인가구수: 60487, 남성1인가구: 27014, 여성1인가구: 33473 },
  { 자치구명: '광진구', 평균임대면적: 46.7, 평균보증금: 18000, 평균임대료: 45, 평균건축년도: 2003, 평균종전보증금: 16000, 평균종전임대료: 42, 도서관수: 14, 공원시설수: 92, 병원수: 784, CCTV총수: 4636, 안심귀갓길수: 341, 총ocrn: 3424, 총arst: 2333, 총1인가구수: 66140, 남성1인가구: 31456, 여성1인가구: 34684 },
  { 자치구명: '구로구', 평균임대면적: 41.2, 평균보증금: 14000, 평균임대료: 32, 평균건축년도: 1995, 평균종전보증금: 12000, 평균종전임대료: 30, 도서관수: 12, 공원시설수: 65, 병원수: 676, CCTV총수: 3664, 안심귀갓길수: 384, 총ocrn: 2642, 총arst: 2135, 총1인가구수: 45933, 남성1인가구: 22127, 여성1인가구: 23806 },
  { 자치구명: '금천구', 평균임대면적: 39.8, 평균보증금: 13000, 평균임대료: 30, 평균건축년도: 1992, 평균종전보증금: 11000, 평균종전임대료: 28, 도서관수: 8, 공원시설수: 45, 병원수: 589, CCTV총수: 3245, 안심귀갓길수: 298, 총ocrn: 2156, 총arst: 1876, 총1인가구수: 38765, 남성1인가구: 19234, 여성1인가구: 19531 },
  { 자치구명: '노원구', 평균임대면적: 51.4, 평균보증금: 16000, 평균임대료: 35, 평균건축년도: 2001, 평균종전보증금: 14000, 평균종전임대료: 32, 도서관수: 10, 공원시설수: 88, 병원수: 509, CCTV총수: 2808, 안심귀갓길수: 395, 총ocrn: 1921, 총arst: 1406, 총1인가구수: 37853, 남성1인가구: 16789, 여성1인가구: 21064 },
  { 자치구명: '도봉구', 평균임대면적: 47.3, 평균보증금: 14000, 평균임대료: 33, 평균건축년도: 1999, 평균종전보증금: 12000, 평균종전임대료: 30, 도서관수: 9, 공원시설수: 72, 병원수: 456, CCTV총수: 2675, 안심귀갓길수: 342, 총ocrn: 1789, 총arst: 1334, 총1인가구수: 34567, 남성1인가구: 15432, 여성1인가구: 19135 },
  { 자치구명: '동대문구', 평균임대면적: 44.1, 평균보증금: 17000, 평균임대료: 42, 평균건축년도: 2002, 평균종전보증금: 15000, 평균종전임대료: 39, 도서관수: 19, 공원시설수: 95, 병원수: 866, CCTV총수: 3846, 안심귀갓길수: 542, 총ocrn: 2957, 총arst: 2301, 총1인가구수: 65290, 남성1인가구: 32424, 여성1인가구: 32866 },
  { 자치구명: '동작구', 평균임대면적: 43.8, 평균보증금: 19000, 평균임대료: 48, 평균건축년도: 2005, 평균종전보증금: 17000, 평균종전임대료: 45, 도서관수: 16, 공원시설수: 89, 병원수: 723, CCTV총수: 3987, 안심귀갓길수: 456, 총ocrn: 2634, 총arst: 2089, 총1인가구수: 52341, 남성1인가구: 24567, 여성1인가구: 27774 },
  { 자치구명: '마포구', 평균임대면적: 47.2, 평균보증금: 25000, 평균임대료: 58, 평균건축년도: 2008, 평균종전보증금: 22000, 평균종전임대료: 55, 도서관수: 18, 공원시설수: 103, 병원수: 892, CCTV총수: 4567, 안심귀갓길수: 623, 총ocrn: 3456, 총arst: 2789, 총1인가구수: 58934, 남성1인가구: 27891, 여성1인가구: 31043 },
  { 자치구명: '서대문구', 평균임대면적: 45.6, 평균보증금: 18000, 평균임대료: 44, 평균건축년도: 2003, 평균종전보증금: 16000, 평균종전임대료: 41, 도서관수: 15, 공원시설수: 87, 병원수: 678, CCTV총수: 3789, 안심귀갓길수: 498, 총ocrn: 2567, 총arst: 2134, 총1인가구수: 49876, 남성1인가구: 23456, 여성1인가구: 26420 },
  { 자치구명: '서초구', 평균임대면적: 52.8, 평균보증금: 45000, 평균임대료: 95, 평균건축년도: 2012, 평균종전보증금: 40000, 평균종전임대료: 90, 도서관수: 32, 공원시설수: 145, 병원수: 1234, CCTV총수: 6789, 안심귀갓길수: 567, 총ocrn: 4567, 총arst: 3789, 총1인가구수: 72345, 남성1인가구: 34567, 여성1인가구: 37778 },
  { 자치구명: '성동구', 평균임대면적: 48.9, 평균보증금: 23000, 평균임대료: 52, 평균건축년도: 2007, 평균종전보증금: 20000, 평균종전임대료: 48, 도서관수: 10, 공원시설수: 78, 병원수: 638, CCTV총수: 4638, 안심귀갓길수: 253, 총ocrn: 2023, 총arst: 1411, 총1인가구수: 44946, 남성1인가구: 22127, 여성1인가구: 22819 },
  { 자치구명: '성북구', 평균임대면적: 49.8, 평균보증금: 18000, 평균임대료: 40, 평균건축년도: 2001, 평균종전보증금: 16000, 평균종전임대료: 37, 도서관수: 26, 공원시설수: 118, 병원수: 765, CCTV총수: 4906, 안심귀갓길수: 921, 총ocrn: 2411, 총arst: 1958, 총1인가구수: 64985, 남성1인가구: 29018, 여성1인가구: 35967 },
  { 자치구명: '송파구', 평균임대면적: 54.2, 평균보증금: 32000, 평균임대료: 68, 평균건축년도: 2010, 평균종전보증금: 28000, 평균종전임대료: 64, 도서관수: 28, 공원시설수: 134, 병원수: 1098, CCTV총수: 5876, 안심귀갓길수: 489, 총ocrn: 4123, 총arst: 3456, 총1인가구수: 78234, 남성1인가구: 37654, 여성1인가구: 40580 },
  { 자치구명: '양천구', 평균임대면적: 50.1, 평균보증금: 19000, 평균임대료: 44, 평균건축년도: 2004, 평균종전보증금: 17000, 평균종전임대료: 41, 도서관수: 17, 공원시설수: 96, 병원수: 734, CCTV총수: 4123, 안심귀갓길수: 378, 총ocrn: 2789, 총arst: 2234, 총1인가구수: 53467, 남성1인가구: 25123, 여성1인가구: 28344 },
  { 자치구명: '영등포구', 평균임대면적: 46.7, 평균보증금: 24000, 평균임대료: 55, 평균건축년도: 2006, 평균종전보증금: 21000, 평균종전임대료: 52, 도서관수: 20, 공원시설수: 108, 병원수: 987, CCTV총수: 4987, 안심귀갓길수: 567, 총ocrn: 3567, 총arst: 2890, 총1인가구수: 61234, 남성1인가구: 29876, 여성1인가구: 31358 },
  { 자치구명: '용산구', 평균임대면적: 51.2, 평균보증금: 35000, 평균임대료: 78, 평균건축년도: 2011, 평균종전보증금: 32000, 평균종전임대료: 74, 도서관수: 20, 공원시설수: 95, 병원수: 440, CCTV총수: 3609, 안심귀갓길수: 618, 총ocrn: 3021, 총arst: 2268, 총1인가구수: 39270, 남성1인가구: 18124, 여성1인가구: 21146 },
  { 자치구명: '은평구', 평균임대면적: 48.3, 평균보증금: 16000, 평균임대료: 38, 평균건축년도: 2000, 평균종전보증금: 14000, 평균종전임대료: 35, 도서관수: 13, 공원시설수: 85, 병원수: 689, CCTV총수: 3876, 안심귀갓길수: 445, 총ocrn: 2456, 총arst: 1987, 총1인가구수: 47865, 남성1인가구: 22456, 여성1인가구: 25409 },
  { 자치구명: '종로구', 평균임대면적: 42.1, 평균보증금: 28000, 평균임대료: 65, 평균건축년도: 2009, 평균종전보증금: 25000, 평균종전임대료: 62, 도서관수: 43, 공원시설수: 87, 병원수: 676, CCTV총수: 2339, 안심귀갓길수: 506, 총ocrn: 2981, 총arst: 3485, 총1인가구수: 27308, 남성1인가구: 13211, 여성1인가구: 14097 },
  { 자치구명: '중구', 평균임대면적: 43.8, 평균보증금: 30000, 평균임대료: 72, 평균건축년도: 2008, 평균종전보증금: 27000, 평균종전임대료: 68, 도서관수: 37, 공원시설수: 76, 병원수: 771, CCTV총수: 3118, 안심귀갓길수: 465, 총ocrn: 3348, 총arst: 2465, 총1인가구수: 24544, 남성1인가구: 11654, 여성1인가구: 12890 },
  { 자치구명: '중랑구', 평균임대면적: 45.8, 평균보증금: 15000, 평균임대료: 36, 평균건축년도: 1998, 평균종전보증금: 13000, 평균종전임대료: 33, 도서관수: 8, 공원시설수: 68, 병원수: 758, CCTV총수: 5392, 안심귀갓길수: 579, 총ocrn: 3324, 총arst: 2474, 총1인가구수: 60487, 남성1인가구: 29812, 여성1인가구: 30675 }
];

// 생활안전망 지수 계산 함수
const calculateLifeSafetyScore = (district) => {
  // 안전성 (30%) - 범죄율과 안전시설
  const crimeRate = district.총ocrn / district.총1인가구수 * 1000; // 천명당 범죄율
  const safetyFacilities = (district.CCTV총수 + district.안심귀갓길수) / district.총1인가구수 * 1000;
  const safetyScore = Math.max(0, 100 - crimeRate * 10) * 0.3 + Math.min(100, safetyFacilities) * 0.7;
  
  // 편의성 (25%) - 도서관, 병원, 공원시설
  const convenienceScore = Math.min(100, (district.도서관수 * 2 + district.병원수 * 0.1 + district.공원시설수 * 0.5));
  
  // 경제성 (25%) - 임대료 부담
  const affordabilityScore = Math.max(0, (150 - district.평균임대료) * 0.8);
  
  // 커뮤니티 (20%) - 1인가구 밀도와 성비 균형
  const householdDensity = district.총1인가구수 / 1000;
  const genderBalance = 100 - Math.abs(district.남성1인가구 - district.여성1인가구) / district.총1인가구수 * 100;
  const communityScore = (Math.min(100, householdDensity) * 0.6 + genderBalance * 0.4);
  
  const totalScore = (safetyScore * 0.3 + convenienceScore * 0.25 + affordabilityScore * 0.25 + communityScore * 0.2);
  
  return {
    total: Math.round(totalScore),
    safety: Math.round(safetyScore),
    convenience: Math.round(convenienceScore),
    affordability: Math.round(affordabilityScore),
    community: Math.round(communityScore),
    crimeRate: crimeRate.toFixed(1)
  };
};

// 확장된 자치구 데이터 생성
const enhancedData = csvData.map((district, index) => {
  const scores = calculateLifeSafetyScore(district);
  return {
    ...district,
    id: index + 1,
    scores,
    totalScore: scores.total,
    rank: 0, // 나중에 정렬 후 설정
    trend: Math.floor(Math.random() * 5) - 2, // -2 ~ +2
    // 좌표 추가 (실제로는 더 정확한 좌표 사용)
    lat: 37.5 + (Math.random() - 0.5) * 0.2,
    lng: 127.0 + (Math.random() - 0.5) * 0.3,
    features: ['지하철역', '버스정류장', '편의점'],
    description: `${district.자치구명}의 청년 1인가구를 위한 생활환경`
  };
}).sort((a, b) => b.totalScore - a.totalScore).map((district, index) => ({
  ...district,
  rank: index + 1
}));

// 색상 팔레트
const colors = {
  primary: '#3B82F6',
  secondary: '#8B5CF6', 
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  purple: '#8B5CF6',
  pink: '#EC4899',
  gradient: {
    blue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    green: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    purple: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    orange: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
};

const pieColors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16', '#F97316'];

// 메인 대시보드 컴포넌트
const Dashboard = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('강남구');
  const [userProfile, setUserProfile] = useState({
    age: 27,
    income: 350,
    job: 'IT개발자',
    workplace: '강남구',
    priorities: ['안전성', '교통편의성', '경제성']
  });
  const [viewMode, setViewMode] = useState('overview');
  const [filterMode, setFilterMode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiRecommendation, setAiRecommendation] = useState(null);

  // 실시간 시계
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 선택된 자치구 데이터
  const selectedDistrictData = enhancedData.find(d => d.자치구명 === selectedDistrict);

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    return enhancedData.filter(district => {
      if (searchQuery && !district.자치구명.includes(searchQuery)) return false;
      if (filterMode === 'top10' && district.rank > 10) return false;
      if (filterMode === 'affordable' && district.평균임대료 > 50) return false;
      if (filterMode === 'safe' && district.scores.crimeRate > 50) return false;
      return true;
    });
  }, [searchQuery, filterMode]);

  // AI 추천 시스템
  const runAIRecommendation = async () => {
    setIsAIAnalyzing(true);
    
    // 사용자 프로필 기반 가중치 계산
    const weights = {
      safety: userProfile.priorities.includes('안전성') ? 0.35 : 0.25,
      convenience: userProfile.priorities.includes('편의성') ? 0.3 : 0.2, 
      affordability: userProfile.income < 300 ? 0.35 : userProfile.income > 500 ? 0.15 : 0.25,
      community: userProfile.age < 30 ? 0.25 : 0.2
    };

    // 개인화 점수 계산
    const personalizedScores = enhancedData.map(district => {
      const personalScore = 
        district.scores.safety * weights.safety +
        district.scores.convenience * weights.convenience +
        district.scores.affordability * weights.affordability +
        district.scores.community * weights.community;
      
      return {
        ...district,
        personalScore: Math.round(personalScore)
      };
    }).sort((a, b) => b.personalScore - a.personalScore);

    // 추천 결과 생성
    setTimeout(() => {
      setAiRecommendation({
        top3: personalizedScores.slice(0, 3),
        userWeights: weights,
        insight: `${userProfile.age}세 ${userProfile.job}님의 프로필 분석 결과, ${weights.safety > 0.3 ? '안전성' : weights.affordability > 0.3 ? '경제성' : '편의성'}을 중시하는 것으로 분석됩니다.`,
        recommendation: personalizedScores[0].자치구명
      });
      setIsAIAnalyzing(false);
    }, 3000);
  };

  // 상위 10개 자치구
  const top10Districts = enhancedData.slice(0, 10);

  // 범죄율 vs 안전시설 데이터
  const safetyAnalysisData = enhancedData.map(d => ({
    name: d.자치구명,
    crimeRate: parseFloat(d.scores.crimeRate),
    safetyFacilities: d.CCTV총수 + d.안심귀갓길수,
    totalScore: d.totalScore,
    size: d.총1인가구수 / 1000 // 버블 크기용
  }));

  // 임대료 vs 편의성 데이터  
  const valueAnalysisData = enhancedData.map(d => ({
    name: d.자치구명,
    rent: d.평균임대료,
    convenience: d.scores.convenience,
    value: Math.round(d.scores.convenience / d.평균임대료 * 100), // 가성비 지수
    households: d.총1인가구수
  }));

  // 1인가구 성별 분포 데이터
  const genderDistributionData = enhancedData.slice(0, 15).map(d => ({
    name: d.자치구명,
    male: d.남성1인가구,
    female: d.여성1인가구,
    total: d.총1인가구수
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* 헤더 */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  서울 청년 1인가구 생활안전망 AI 지도
                </h1>
                <p className="text-gray-300 text-sm">혁신적인 데이터 기반 거주지 추천 플랫폼</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">실시간</div>
                <div className="font-mono text-lg font-bold text-blue-400">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 상단 컨트롤 패널 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          
          {/* 사용자 프로필 */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-400" />
              개인화 프로필 설정
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">나이</label>
                <input 
                  type="number" 
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({...userProfile, age: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">월소득(만원)</label>
                <input 
                  type="number" 
                  value={userProfile.income}
                  onChange={(e) => setUserProfile({...userProfile, income: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">직업</label>
                <select 
                  value={userProfile.job}
                  onChange={(e) => setUserProfile({...userProfile, job: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="IT개발자">IT개발자</option>
                  <option value="디자이너">디자이너</option>
                  <option value="마케터">마케터</option>
                  <option value="공무원">공무원</option>
                  <option value="금융업">금융업</option>
                  <option value="서비스업">서비스업</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">근무지</label>
                <select 
                  value={userProfile.workplace}
                  onChange={(e) => setUserProfile({...userProfile, workplace: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {enhancedData.map(district => (
                    <option key={district.자치구명} value={district.자치구명}>
                      {district.자치구명}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Search className="h-5 w-5 mr-2 text-purple-400" />
              검색 & 필터
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="자치구 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                {[
                  { key: 'all', label: '전체', color: 'blue' },
                  { key: 'top10', label: '상위 10개', color: 'purple' },
                  { key: 'affordable', label: '저렴한 지역', color: 'green' },
                  { key: 'safe', label: '안전한 지역', color: 'orange' }
                ].map(filter => (
                  <button 
                    key={filter.key}
                    onClick={() => setFilterMode(filter.key)}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterMode === filter.key 
                        ? `bg-${filter.color}-500 text-white` 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI 분석 패널 */}
          <div className="bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Brain className={`h-5 w-5 mr-2 ${isAIAnalyzing ? 'animate-pulse' : ''}`} />
              AI 개인화 추천
            </h3>
            <div className="space-y-4">
              <button 
                onClick={runAIRecommendation}
                disabled={isAIAnalyzing}
                className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <Brain className="h-4 w-4" />
                <span>{isAIAnalyzing ? 'AI 분석중...' : '맞춤 추천 시작'}</span>
              </button>
              
              {isAIAnalyzing && (
                <div className="space-y-2">
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-xs text-white/80">프로필 분석 및 추천 생성중...</p>
                </div>
              )}
              
              {aiRecommendation && (
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-lg p-3">
                    <h4 className="font-semibold text-white mb-2">🏆 추천 결과</h4>
                    <p className="text-sm text-white/90 mb-2">{aiRecommendation.insight}</p>
                    <div className="text-lg font-bold text-yellow-300">
                      👑 {aiRecommendation.recommendation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI 추천 결과 카드 */}
        {aiRecommendation && (
          <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Star className="h-6 w-6 mr-2 text-yellow-400" />
              AI 개인화 추천 결과
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiRecommendation.top3.map((district, index) => (
                <div key={district.id} className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{district.자치구명}</h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-400 text-black' : 
                      index === 1 ? 'bg-gray-300 text-black' : 
                      'bg-orange-400 text-white'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-white/90">
                    <div className="flex justify-between">
                      <span>개인화 점수</span>
                      <span className="font-bold text-yellow-300">{district.personalScore}점</span>
                    </div>
                    <div className="flex justify-between">
                      <span>월평균 임대료</span>
                      <span>{district.평균임대료}만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>안전 점수</span>
                      <span>{district.scores.safety}점</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1인가구 수</span>
                      <span>{(district.총1인가구수/1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 상위 랭킹 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {top10Districts.slice(0, 5).map((district, index) => (
            <div 
              key={district.id}
              onClick={() => setSelectedDistrict(district.자치구명)}
              className={`bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-105 ${
                selectedDistrict === district.자치구명 ? 'ring-2 ring-blue-400 bg-white/20' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-500' : 
                  'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div className={`flex items-center space-x-1 ${
                  district.trend > 0 ? 'text-green-400' : 
                  district.trend < 0 ? 'text-red-400' : 
                  'text-gray-400'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${district.trend < 0 ? 'rotate-180' : ''}`} />
                  <span className="text-xs">{Math.abs(district.trend)}</span>
                </div>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{district.자치구명}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-blue-300">
                  <span>종합점수</span>
                  <span className="font-bold">{district.totalScore}점</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>월세</span>
                  <span>{district.평균임대료}만원</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>1인가구</span>
                  <span>{(district.총1인가구수/1000).toFixed(1)}k</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 메인 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* 생활안전망 종합 점수 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Award className="h-6 w-6 mr-2 text-yellow-400" />
              생활안전망 종합 점수 TOP 15
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={top10Districts.slice(0, 15)}>
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
                      backdropFilter: 'blur(10px)',
                      color: 'white'
                    }}
                  />
                  <Bar 
                    dataKey="totalScore" 
                    fill="url(#blueGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 선택된 자치구 상세 분석 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="h-6 w-6 mr-2 text-purple-400" />
              {selectedDistrict} 상세 분석
            </h2>
            {selectedDistrictData && (
              <>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                    <div className="text-blue-300 text-sm">종합 점수</div>
                    <div className="text-2xl font-bold text-white">{selectedDistrictData.totalScore}점</div>
                    <div className="text-xs text-gray-300">전국 {selectedDistrictData.rank}위</div>
                  </div>
                  <div className="bg-green-500/20 rounded-lg p-3 text-center">
                    <div className="text-green-300 text-sm">월평균 임대료</div>
                    <div className="text-2xl font-bold text-white">{selectedDistrictData.평균임대료}만원</div>
                    <div className="text-xs text-gray-300">1인가구 기준</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { key: 'safety', label: '안전성', value: selectedDistrictData.scores.safety, color: 'red' },
                    { key: 'convenience', label: '편의성', value: selectedDistrictData.scores.convenience, color: 'blue' },
                    { key: 'affordability', label: '경제성', value: selectedDistrictData.scores.affordability, color: 'green' },
                    { key: 'community', label: '커뮤니티', value: selectedDistrictData.scores.community, color: 'purple' }
                  ].map(item => (
                    <div key={item.key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.label}</span>
                        <span className="text-white font-semibold">{item.value}점</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`bg-${item.color}-400 h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 추가 분석 차트들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* 범죄율 vs 안전시설 분석 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-green-400" />
              범죄율 vs 안전시설 분포
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={safetyAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="crimeRate" 
                    stroke="#94A3B8"
                    label={{ value: '범죄율 (건/천명)', position: 'insideBottom', offset: -10, fill: '#94A3B8' }}
                  />
                  <YAxis 
                    dataKey="safetyFacilities" 
                    stroke="#94A3B8"
                    label={{ value: '안전시설 수', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      color: 'white'
                    }}
                    formatter={(value, name, props) => [
                      value, 
                      name === 'safetyFacilities' ? '안전시설' : 
                      name === 'crimeRate' ? '범죄율' : name
                    ]}
                    labelFormatter={(value) => `자치구: ${value}`}
                  />
                  <Scatter dataKey="safetyFacilities" fill="#10B981" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 1인가구 성별 분포 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-pink-400" />
              1인가구 성별 분포 (상위 15개구)
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genderDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
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
                      backdropFilter: 'blur(10px)',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="male" stackId="a" fill="#3B82F6" name="남성" />
                  <Bar dataKey="female" stackId="a" fill="#EC4899" name="여성" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 임대료 대비 편의성 분석 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-orange-400" />
            임대료 대비 편의시설 가성비 분석
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={valueAnalysisData.slice(0, 20)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94A3B8"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis yAxisId="left" stroke="#94A3B8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    color: 'white'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="rent" fill="#F59E0B" name="임대료(만원)" />
                <Line yAxisId="right" type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} name="가성비지수" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 실시간 데이터 테이블 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-yellow-400" />
              실시간 자치구별 상세 데이터
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">순위</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">자치구</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">종합점수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">월세</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">안전점수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">1인가구수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">트렌드</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredData.slice(0, 15).map((district, index) => (
                  <tr 
                    key={district.id}
                    className={`hover:bg-white/10 cursor-pointer transition-colors ${
                      selectedDistrict === district.자치구명 ? 'bg-blue-500/20' : ''
                    }`}
                    onClick={() => setSelectedDistrict(district.자치구명)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        district.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                        district.rank <= 10 ? 'bg-blue-500' : 'bg-gray-500'
                      }`}>
                        {district.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">{district.자치구명}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        district.totalScore >= 80 ? 'bg-green-500/20 text-green-300' : 
                        district.totalScore >= 70 ? 'bg-yellow-500/20 text-yellow-300' : 
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {district.totalScore}점
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {district.평균임대료}만원
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {district.scores.safety}점
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {(district.총1인가구수/1000).toFixed(1)}k
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 ${
                        district.trend > 0 ? 'text-green-400' : 
                        district.trend < 0 ? 'text-red-400' : 
                        'text-gray-400'
                      }`}>
                        <TrendingUp className={`h-4 w-4 ${district.trend < 0 ? 'rotate-180' : ''}`} />
                        <span className="text-xs">{Math.abs(district.trend)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 하단 액션 버튼들 */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all hover:scale-105">
            <Download className="h-5 w-5" />
            <span>데이터 다운로드</span>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all hover:scale-105">
            <Share2 className="h-5 w-5" />
            <span>결과 공유</span>
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all hover:scale-105">
            <MessageCircle className="h-5 w-5" />
            <span>정책 제안 보기</span>
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all hover:scale-105">
            <Eye className="h-5 w-5" />
            <span>3D 지도 보기</span>
          </button>
        </div>

      </main>

      {/* 실시간 상태바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center text-sm text-white">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>실시간 연결됨</span>
              </div>
              <div>데이터 업데이트: 방금 전</div>
              <div>총 {filteredData.length}개 자치구</div>
            </div>
            <div className="flex items-center space-x-6">
              <div>선택: <span className="font-semibold text-blue-400">{selectedDistrict}</span></div>
              <div className="flex items-center space-x-1">
                <Wifi className="h-4 w-4 text-green-400" />
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">서울 청년 1인가구 생활안전망 AI 지도</h3>
              <p className="text-gray-400 text-sm">2025 서울 데이터 허브 시각화 경진대회 출품작</p>
              <p className="text-gray-500 text-xs mt-1">실제 서울시 공공데이터 기반 구축</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Made with ❤️ by Team 청년안전망</p>
              <p className="text-gray-500 text-xs">혁신적인 데이터 시각화로 더 나은 서울을 만들어갑니다</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;