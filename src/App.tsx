import React, { useState, useRef, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Clock, 
  CheckSquare, 
  TrendingDown, 
  Smile, 
  Calendar, 
  ClipboardCheck, 
  AlertOctagon, 
  RotateCcw, 
  Cpu, 
  Layers, 
  Grid, 
  Edit3, 
  Languages, 
  Sparkles, 
  Play, 
  Square, 
  Volume2, 
  BookOpen, 
  Download, 
  RefreshCw, 
  FileText, 
  Layout, 
  Eye, 
  Settings,
  HelpCircle,
  Minimize2,
  Maximize2,
  Check,
  ChevronRight
} from 'lucide-react';
import { 
  initialKpis, 
  initialSections, 
  initialHubItems, 
  initialTimeline, 
  presenterScripts 
} from './data';
import { SlideSection, KpiCard, TimelineData } from './types';

export default function App() {
  // Application State
  const [kpis, setKpis] = useState<KpiCard[]>(initialKpis);
  const [sections, setSections] = useState<SlideSection[]>(initialSections);
  const [hub, setHub] = useState(initialHubItems);
  const [timeline, setTimeline] = useState<TimelineData[]>(initialTimeline);
  
  // Theme and Aspect Ratio configurations
  const [theme, setTheme] = useState<'light' | 'navy' | 'dark'>('light');
  const [language, setLanguage] = useState<'bilingual' | 'zh' | 'en'>('bilingual');
  const [showGridlines, setShowGridlines] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Workflow walkthrough tour
  const [tourStep, setTourStep] = useState<number>(-1); // -1 means inactive, 0-4 correspond to steps
  const [tourPlaying, setTourPlaying] = useState<boolean>(false);
  const [speechSubtitles, setSpeechSubtitles] = useState<string>('');
  const [speechSubtitlesEn, setSpeechSubtitlesEn] = useState<string>('');

  // Editable fields in sidebar
  const [activeEditType, setActiveEditType] = useState<'section' | 'kpi' | 'hub' | 'timeline' | null>(null);
  const [editSectionIndex, setEditSectionIndex] = useState<number>(0);
  const [editKpiIndex, setEditKpiIndex] = useState<number>(0);
  const [editHubItemIndex, setEditHubItemIndex] = useState<number>(0);
  const [editTimelineIndex, setEditTimelineIndex] = useState<number>(0);

  // Auto-tour animation timers
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (tourPlaying && tourStep >= 0) {
      const texts = [
        {
          id: "sched",
          zh: "① 审计准备阶段：自动智能推荐排程并关联历史检查表与先例参考...",
          en: "Step 1: Prep & Smart Scheduling. Automatically schedules reviews and bundles historical pre-checks."
        },
        {
          id: "exec",
          zh: "② 审计执行阶段：采用 NLP 自动校验条款文本，提供智能不合规预警...",
          en: "Step 2: Live Audit Execution. Parses clause patterns via NLP and triggers compliance checker exceptions."
        },
        {
          id: "severity",
          zh: "③ AI 评级判断：自动生成标准化中英缺陷文本，通过 ML 推荐补救方案...",
          en: "Step 3: Finding & Severity. Computes risk severity mapping using ML, drafting structured remediation actions."
        },
        {
          id: "closedloop",
          zh: "④ 闭环干预阶段：生成跟踪看板并自动触发未闭环预警，确保整改达成...",
          en: "Step 4: Active Closed-Loop. Spawns tracker cards and pushes regular notifications until confirmation."
        },
        {
          id: "hub",
          zh: "⑤ 整个数据中枢及各阶段相互协作，将信息流回写入审计知识库与数据湖，实现全链路自我训练更新。",
          en: "Step 5: The underlying Core Intelligence Core continuously indexes all files, OCR tokens and feedback loops."
        }
      ];

      setSpeechSubtitles(texts[tourStep]?.zh || '');
      setSpeechSubtitlesEn(texts[tourStep]?.en || '');
      
      const targetIds = ["sched", "exec", "severity", "closedloop", "hub"];
      setSelectedNodeId(targetIds[tourStep]);

      timer = setTimeout(() => {
        if (tourStep < 4) {
          setTourStep(prev => prev + 1);
        } else {
          setTourPlaying(false);
          setTourStep(-1);
          setSelectedNodeId(null);
          setSpeechSubtitles('');
          setSpeechSubtitlesEn('');
        }
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [tourPlaying, tourStep]);

  const startTour = () => {
    setTourStep(0);
    setTourPlaying(true);
  };

  const stopTour = () => {
    setTourPlaying(false);
    setTourStep(-1);
    setSelectedNodeId(null);
    setSpeechSubtitles('');
    setSpeechSubtitlesEn('');
  };

  // Helper translations dict for dynamic headings
  const t = {
    titleZh: "Smart Audit – AI Enabled Audit Closed-loop",
    titleEn: "Smart Audit – AI Enabled Audit Closed-loop",
    subtitleZh: "首家基于深度 NLP 的自动流程合规校验与智能严重性推荐底座",
    subtitleEn: "Pioneering NLP compliance auditing and ML-driven closed-loop corrective action system",
    phasePre: "Pre-Audit · 智能早研",
    phaseDuring: "During-Audit · 智能执行",
    phasePost: "Post-Audit · 智能反馈",
    timelineSec: "时间线标注",
    addBtn: "增添行",
    delBtn: "删除",
    resetBtn: "恢复配置",
    exportBtn: "下载文本数据",
    showGrid: "PPT 对齐指示线",
    blueprintTitle: "PowerPoint Widescreen (16:9) Layout Framework",
    editSuite: "幻灯片元素实时内容修改",
    noteworthy: "💡 提示：点击幻灯片中的任何分区，都可在右侧/下方控制面板立即修改文字！",
    narratorTranscript: "主讲人演练提词方案"
  };

  // Reset to original data
  const handleResetData = () => {
    setKpis(initialKpis);
    setSections(initialSections);
    setHub(initialHubItems);
    setTimeline(initialTimeline);
  };

  // Export Slide Data to JSON configuration file
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ kpis, sections, hub, timeline }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "smart_audit_slide_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Live fields editing action handlers
  const updateSectionField = (index: number, key: 'titleZh' | 'titleEn' | 'timelineZh' | 'timelineEn', val: string) => {
    setSections(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: val };
      return next;
    });
  };

  const updateSectionItem = (secIndex: number, itemIndex: number, key: 'textZh' | 'textEn', val: string) => {
    setSections(prev => {
      const next = [...prev];
      const updatedItems = [...next[secIndex].items];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], [key]: val };
      next[secIndex] = { ...next[secIndex], items: updatedItems };
      return next;
    });
  };

  const addSectionItem = (secIndex: number) => {
    setSections(prev => {
      const next = [...prev];
      const updatedItems = [...next[secIndex].items, { textZh: "新增审计检查项描述", textEn: "New audit checkpoint criteria text" }];
      next[secIndex] = { ...next[secIndex], items: updatedItems };
      return next;
    });
  };

  const removeSectionItem = (secIndex: number, itemIndex: number) => {
    setSections(prev => {
      const next = [...prev];
      if (next[secIndex].items.length <= 1) return prev;
      const updatedItems = next[secIndex].items.filter((_, idx) => idx !== itemIndex);
      next[secIndex] = { ...next[secIndex], items: updatedItems };
      return next;
    });
  };

  const updateSubBlockField = (secIndex: number, key: 'titleZh' | 'titleEn' | 'timelineZh' | 'timelineEn', val: string) => {
    setSections(prev => {
      const next = [...prev];
      if (next[secIndex].subBlock) {
        next[secIndex].subBlock = {
          ...next[secIndex].subBlock!,
          [key]: val
        };
      }
      return next;
    });
  };

  const updateSubBlockItem = (secIndex: number, itemIndex: number, key: 'textZh' | 'textEn', val: string) => {
    setSections(prev => {
      const next = [...prev];
      if (next[secIndex].subBlock) {
        const updatedItems = [...next[secIndex].subBlock!.items];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], [key]: val };
        next[secIndex].subBlock = {
          ...next[secIndex].subBlock!,
          items: updatedItems
        };
      }
      return next;
    });
  };

  const updateKpiCard = (index: number, key: 'titleZh' | 'titleEn' | 'valueZh' | 'valueEn', val: string) => {
    setKpis(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: val };
      return next;
    });
  };

  const updateHubItem = (index: number, key: 'textZh' | 'textEn', val: string) => {
    setHub(prev => {
      const nextItems = [...prev.items];
      nextItems[index] = { ...nextItems[index], [key]: val };
      return { ...prev, items: nextItems };
    });
  };

  const updateHubHead = (key: 'titleZh' | 'titleEn' | 'subtitleZh' | 'subtitleEn', val: string) => {
    setHub(prev => {
      return { ...prev, [key]: val };
    });
  };

  const updateTimelineCard = (index: number, key: 'period' | 'titleZh' | 'titleEn', val: string) => {
    setTimeline(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: val };
      return next;
    });
  };

  const updateTimelineItem = (timeIndex: number, itemIndex: number, isZh: boolean, val: string) => {
    setTimeline(prev => {
      const next = [...prev];
      if (isZh) {
        const updated = [...next[timeIndex].itemsZh];
        updated[itemIndex] = val;
        next[timeIndex] = { ...next[timeIndex], itemsZh: updated };
      } else {
        const updated = [...next[timeIndex].itemsEn];
        updated[itemIndex] = val;
        next[timeIndex] = { ...next[timeIndex], itemsEn: updated };
      }
      return next;
    });
  };

  // Rendering logic for Icons
  const renderLucideIcon = (name: string, sizeClass = "w-4 h-4") => {
    const props = { className: sizeClass };
    switch (name) {
      case "Clock": return <Clock {...props} />;
      case "CheckSquare": return <CheckSquare {...props} />;
      case "TrendingDown": return <TrendingDown {...props} />;
      case "Smile": return <Smile {...props} />;
      case "Calendar": return <Calendar {...props} />;
      case "ClipboardCheck": return <ClipboardCheck {...props} />;
      case "AlertOctagon": return <AlertOctagon {...props} />;
      case "RotateCcw": return <RotateCcw {...props} />;
      case "Cpu": return <Cpu {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  // Generate Theme Specific Backgrounds and Text Colors
  const getThemeStyles = () => {
    switch (theme) {
      case 'navy':
        return {
          wrapper: 'bg-slate-950 text-slate-100',
          slideBg: 'bg-gradient-to-br from-slate-900 to-indigo-950 border-indigo-500/30',
          titleColor: 'text-indigo-100',
          subtitleColor: 'text-indigo-400',
          cardBg: 'bg-slate-900/80 backdrop-blur-sm border-indigo-500/20 text-slate-100',
          activeNode: 'ring-4 ring-cyan-400 ring-offset-4 ring-offset-slate-900 shadow-2xl shadow-cyan-500/20',
          gridLineColor: 'border-yellow-500/5',
          guidelineColor: 'border-rose-500/15',
          hubBg: 'bg-slate-920/80 border-cyan-800/20',
          stepBgActive: 'bg-indigo-900/90 text-indigo-100 border-indigo-400',
          stepBgInactive: 'bg-slate-900/60 text-slate-400 border-slate-800'
        };
      case 'dark':
        return {
          wrapper: 'bg-neutral-950 text-neutral-100',
          slideBg: 'bg-neutral-900 border-neutral-800',
          titleColor: 'text-neutral-50',
          subtitleColor: 'text-neutral-400',
          cardBg: 'bg-neutral-950/90 border-neutral-800 text-neutral-100',
          activeNode: 'ring-4 ring-amber-400 ring-offset-4 ring-offset-neutral-900 shadow-2xl shadow-amber-500/20',
          gridLineColor: 'border-amber-500/5',
          guidelineColor: 'border-red-500/15',
          hubBg: 'bg-neutral-950/50 border-neutral-800',
          stepBgActive: 'bg-neutral-800 text-amber-300 border-amber-500',
          stepBgInactive: 'bg-neutral-900 text-neutral-400 border-neutral-950'
        };
      case 'light':
      default:
        return {
          wrapper: 'bg-slate-50 text-slate-900',
          slideBg: 'bg-white border-slate-200 shadow-xl',
          titleColor: 'text-slate-900',
          subtitleColor: 'text-slate-500',
          cardBg: 'bg-slate-50/50 border-slate-100/80 text-slate-800',
          activeNode: 'ring-3 ring-blue-600 ring-offset-2 ring-offset-white shadow-xl shadow-blue-500/10',
          gridLineColor: 'border-slate-200/40',
          guidelineColor: 'border-amber-400/20',
          hubBg: 'bg-slate-50/50 border-slate-100',
          stepBgActive: 'bg-slate-100 text-blue-700 border-blue-600',
          stepBgInactive: 'bg-slate-50 text-slate-400 border-slate-200'
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className={`min-h-screen font-sans transition-all duration-300 ${themeStyle.wrapper} pb-16`}>
      {/* Upper Control Bar */}
      <header className="sticky top-0 z-50 border-b border-inherit backdrop-blur-md bg-stone-900/10 dark:bg-black/20 p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md text-white">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-lg tracking-tight">Smart Audit PPT Console</h1>
                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500">Live Workspace</span>
              </div>
              <p className="text-xs text-inherit opacity-75">Interactive Blueprint Presentation Frame & Slide Custodian</p>
            </div>
          </div>

          {/* Settings Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Bilingual Buttons */}
            <div className="bg-stone-500/10 p-0.5 rounded-lg flex items-center border border-stone-550/10">
              <button 
                onClick={() => setLanguage('bilingual')} 
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all ${language === 'bilingual' ? 'bg-blue-600 text-white shadow-sm' : 'hover:opacity-80'}`}
                id="btn-lang-bilingual"
              >
                中英双语
              </button>
              <button 
                onClick={() => setLanguage('zh')} 
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all ${language === 'zh' ? 'bg-blue-600 text-white shadow-sm' : 'hover:opacity-80'}`}
                id="btn-lang-zh"
              >
                中文
              </button>
              <button 
                onClick={() => setLanguage('en')} 
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all ${language === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'hover:opacity-80'}`}
                id="btn-lang-en"
              >
                Eng
              </button>
            </div>

            {/* Themes Selector */}
            <div className="bg-stone-500/10 p-0.5 rounded-lg flex items-center border border-stone-550/10">
              <button 
                onClick={() => setTheme('light')} 
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all ${theme === 'light' ? 'bg-stone-200 dark:bg-stone-800 text-blue-600 dark:text-blue-400 font-bold' : 'hover:opacity-85'}`}
                id="btn-theme-light"
              >
                象牙白原版
              </button>
              <button 
                onClick={() => setTheme('navy')} 
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all ${theme === 'navy' ? 'bg-indigo-950 text-cyan-400 font-bold' : 'hover:opacity-85'}`}
                id="btn-theme-navy"
              >
                智享深蓝
              </button>
              <button 
                onClick={() => setTheme('dark')} 
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all ${theme === 'dark' ? 'bg-stone-900 text-amber-400 font-bold' : 'hover:opacity-85'}`}
                id="btn-theme-dark"
              >
                极简暗矿
              </button>
            </div>

            {/* Gridline display toggle */}
            <button 
              onClick={() => setShowGridlines(!showGridlines)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${showGridlines ? 'bg-amber-500/10 border-amber-400/40 text-amber-600 dark:text-amber-400' : 'bg-transparent border-slate-350/50 opacity-60'}`}
              title="Toggle PPT Layout Alignment Guidelines"
              id="btn-toggle-gridlines"
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">{showGridlines ? "隐藏对齐网格" : "显示对齐网格"}</span>
            </button>

            {/* Fullscreen view toggle */}
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg border border-slate-350/50 text-xs hover:bg-stone-500/10 transition-all flex items-center gap-1.5"
              id="btn-toggle-fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: PowerPoint Slide Canvas Stage */}
        <div className={`col-span-12 transition-all duration-300 ${isFullscreen ? 'lg:col-span-12' : 'lg:col-span-12'}`}>
          
          {/* Instruction Note */}
          <div className="mb-4 bg-blue-500/5 border border-blue-500/10 rounded-lg p-3 text-xs flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4 shrink-0 animate-bounce" />
            <p className="font-medium">{t.noteworthy}</p>
          </div>

          {/* Interactive Presenter Control Bar inside Canvas Area */}
          <div className="mb-3 flex items-center justify-between bg-stone-900 text-white px-4 py-2.5 rounded-xl text-xs shadow-md">
            <div className="flex items-center gap-3">
              <span className="inline-flex bg-red-600 w-2.5 h-2.5 rounded-full animate-ping"></span>
              <span className="font-bold uppercase tracking-wider text-stone-300">演讲导览系统:</span>
              <p className="text-stone-300 hidden md:inline">点击播放将模拟审计生命周期流转，高亮对应的系统模块</p>
            </div>
            
            <div className="flex items-center gap-2">
              {tourPlaying ? (
                <button 
                  onClick={stopTour} 
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all"
                  id="btn-stop-tour"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>停止演示</span>
                </button>
              ) : (
                <button 
                  onClick={startTour} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-md flex items-center gap-1.5 transition-all"
                  id="btn-start-tour"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>自动触发汇报漫游</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Subtitles for Speech rehearsal */}
          <AnimatePresence>
            {speechSubtitles && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-800 dark:text-amber-300"
              >
                <div className="flex items-start gap-2.5">
                  <Volume2 className="w-5 h-5 shrink-0 text-amber-500 animate-pulse mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">主讲广播与方案旁白提示 · Narrator Script:</h5>
                    <p className="text-sm font-medium leading-relaxed">{speechSubtitles}</p>
                    <p className="text-xs cite leading-relaxed opacity-80 mt-1 italic font-mono">{speechSubtitlesEn}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 16:9 Presentation Slide Card Stage */}
          <div className="relative overflow-hidden w-full rounded-2xl shadow-2xl border transition-all duration-500 block" id="ppt-slideshow-container">
            
            {/* The Actual Slide itself wrapped in widescreen ratio */}
            <div className={`w-full relative aspect-[16/9] ${themeStyle.slideBg} p-6 sm:p-8 flex flex-col justify-between overflow-y-auto select-none transition-colors duration-300`}>
              
              {/* PPT Blueprint Gridline Guideline Elements (highly loyal to style in image) */}
              {showGridlines && (
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                  {/* Subtle 12x12 Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:4%_4%]" />
                  
                  {/* Horizontal Guideline center (Yellow/Orange dashed) */}
                  <div className={`absolute top-1/2 left-0 right-0 border-t border-dashed ${themeStyle.gridLineColor} h-0`} />
                  
                  {/* Vertical Guideline center */}
                  <div className={`absolute left-1/2 top-0 bottom-0 border-l border-dashed ${themeStyle.gridLineColor} w-0`} />
                  
                  {/* Outer margin safety box indicator (orange dotted) */}
                  <div className={`absolute inset-4 sm:inset-6 border border-dashed ${themeStyle.guidelineColor} rounded-lg`} />
                  
                  {/* Cross alignment indicators matching image lines */}
                  <div className={`absolute left-[10%] top-0 bottom-0 border-l border-dashed border-rose-500/5`} />
                  <div className={`absolute left-[24%] top-0 bottom-0 border-l border-dashed border-rose-500/5`} />
                  <div className={`absolute left-[48%] top-0 bottom-0 border-l border-dashed border-rose-500/5`} />
                  <div className={`absolute left-[72%] top-0 bottom-0 border-l border-dashed border-rose-500/5`} />
                  <div className={`absolute left-[88%] top-0 bottom-0 border-l border-dashed border-rose-500/5`} />

                  {/* Horizontal dotted alignment points */}
                  <div className="absolute top-[12%] left-0 right-0 border-t border-dotted border-amber-500/5" />
                  <div className="absolute top-[23%] left-0 right-0 border-t border-dotted border-amber-500/5" />
                  <div className="absolute top-[35%] left-0 right-0 border-t border-dotted border-amber-500/5" />
                  <div className="absolute top-[62%] left-0 right-0 border-t border-dotted border-amber-500/5" />
                  <div className="absolute top-[72%] left-0 right-0 border-t border-dotted border-amber-500/5" />

                  {/* Tiny watermarks / tech coordinates */}
                  <span className="absolute bottom-2 left-6 text-[8px] font-mono opacity-25 tracking-widest text-inherit">ALIGNMENT SCHEMATIC: 1920 X 1080 (16:9)</span>
                  <span className="absolute top-2 right-12 text-[8px] font-mono opacity-25 tracking-widest text-inherit">WIDESCREEN MASTER SLIDE</span>
                </div>
              )}

              {/* SLIDE HEADER AREA */}
              <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-inherit pb-4" id="slide-header">
                <div>
                  <div className="flex items-center gap-2">
                    {/* Brand Badge tag resembling top-right QES */}
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-600 text-white uppercase tracking-wider">AI+ QES</span>
                    <span className="text-xs opacity-50 font-mono tracking-widest font-semibold">ENTERPRISE SYSTEM</span>
                  </div>
                  
                  {/* Main Title of Slide */}
                  <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight mt-0.5 flex flex-wrap items-center gap-x-2">
                    <span className="text-blue-600 dark:text-blue-400">Smart Audit</span>
                    <span className="text-inherit opacity-90">– AI Enabled Audit Closed-loop</span>
                  </h2>
                </div>
                
                {/* Secondary subtitle tracker */}
                <div className="text-right text-[10px] sm:text-xs opacity-70 italic max-w-sm">
                  {language === 'en' ? t.subtitleEn : t.subtitleZh}
                </div>
              </div>

              {/* SLIDE VALUE INDICATORS / KPI ROW */}
              <div className="relative z-20 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 my-4" id="slide-kpi">
                {kpis.map((kpi, idx) => (
                  <div 
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEditType('kpi');
                      setEditKpiIndex(idx);
                    }}
                    className={`p-2 rounded-lg border flex items-center justify-start transition-all duration-300 cursor-pointer ${themeStyle.cardBg} hover:rotate-1 hover:scale-105`}
                  >
                    <div className="flex items-center gap-2 text-left min-w-0">
                      <div className="p-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                        {renderLucideIcon(kpi.icon, "w-4 h-4")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-bold tracking-tight">
                          {language === 'en' ? kpi.titleEn : kpi.titleZh}
                        </p>
                        <p className="text-[10px] opacity-60 font-mono">
                          {language === 'bilingual' ? kpi.titleEn : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CORE AUDIT WORKFLOW STAGES (COLS 1 - 4) */}
              <div className="relative z-20 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 my-2 items-stretch" id="slide-columns-workflow">
                {sections.map((section, idx) => {
                  const isSelected = selectedNodeId === section.id;
                  
                  return (
                    <div 
                      key={section.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveEditType('section');
                        setEditSectionIndex(idx);
                        setSelectedNodeId(section.id);
                      }}
                      className={`relative rounded-xl border p-3 sm:p-4 transition-all duration-305 flex flex-col justify-between cursor-pointer ${
                        isSelected ? themeStyle.activeNode : `${themeStyle.cardBg} hover:shadow-md`
                      }`}
                    >
                      {/* Left vertical timeline category bracket reference Pre/During/Post */}
                      <div className="absolute top-2 right-2 text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-500/10 opacity-70">
                        {section.phase}
                      </div>

                      {/* Header block with visual number circle */}
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shrink-0 shadow-sm">
                            {section.number}
                          </span>
                          <div className="p-1 rounded bg-blue-500/5 text-blue-600 dark:text-blue-400 shrink-0">
                            {renderLucideIcon(section.icon, "w-4 h-4")}
                          </div>
                          <h4 className="font-extrabold text-[11px] sm:text-xs md:text-[13px] tracking-tight leading-tight text-left">
                            {language === 'en' ? section.titleEn : section.titleZh}
                          </h4>
                        </div>

                        {/* List check indicators matching exact text */}
                        <ul className="space-y-1.5 text-left mb-3">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-1 py-0.5">
                              {/* Small round point similar to ppt items list */}
                              <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                              <div className="text-[10px] sm:text-[11px] leading-tight font-medium">
                                <span className="block opacity-90">{item.textZh}</span>
                                {language !== 'zh' && (
                                  <span className="block opacity-60 font-mono text-[9px] mt-0.5 leading-none">{item.textEn}</span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sub Blocks nesting e.g. 🔧 Checklist Validator as specified */}
                      {section.subBlock && (
                        <div className="mt-2 border-t border-inherit pt-2">
                          <div className="flex items-center gap-1 mb-1 bg-stone-500/5 p-1 rounded">
                            <span className="text-xs">🔧</span>
                            <span className="font-extrabold text-[10px] text-blue-600 dark:text-blue-400">
                              {language === 'en' ? section.subBlock.titleEn : section.subBlock.titleZh}
                            </span>
                          </div>
                          
                          <ul className="space-y-1 text-left pl-1">
                            {section.subBlock.items.map((sub, sIdx) => (
                              <li key={sIdx} className="text-[9px] flex items-start gap-1">
                                <span className="text-[9px] text-blue-400 shrink-0">•</span>
                                <div className="leading-tight">
                                  <span className="block opacity-85">{sub.textZh}</span>
                                  {language !== 'zh' && (
                                    <span className="block opacity-50 font-mono text-[8px]">{sub.textEn}</span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                          
                          {/* Sub Timeline validation badge */}
                          <div className="mt-1 text-[8px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded max-w-max">
                            {language === 'en' ? section.subBlock.timelineEn : section.subBlock.timelineZh}
                          </div>
                        </div>
                      )}

                      {/* Column Footer: Timeline badge and indicator */}
                      <div className="mt-3 border-t border-inherit pt-2 flex items-center justify-between">
                        <span className="text-[9px] tracking-wide font-semibold opacity-50">Milestone</span>
                        <span className="text-[9px] sm:text-[10px] font-extrabold font-mono text-indigo-600 dark:text-teal-400 bg-indigo-500/10 dark:bg-teal-400/10 px-1.5 py-0.5 rounded">
                          {language === 'en' ? section.timelineEn : section.timelineZh}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SPLIT FOUNDATION ROW: TIMELINE PATHWAY & HUB DATA */}
              <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-3 mt-2 sm:mt-3 items-stretch" id="slide-timeline-and-hub">
                
                {/* 5. ROADMAP CARDS LAYER (FY25/26 -> FY27/28+) */}
                <div className="md:col-span-8 flex flex-col justify-between border border-inherit rounded-xl p-3 bg-stone-500/5 text-left">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Layers className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-80">智能能力推演演进图 (Strategic Roadmap)</span>
                    </div>

                    {/* Step-up timeline bars resembling exact layouts in image */}
                    <div className="grid grid-cols-4 gap-2 items-end">
                      {timeline.map((step, sIdx) => (
                        <div 
                          key={sIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveEditType('timeline');
                            setEditTimelineIndex(sIdx);
                          }}
                          className={`relative p-2 rounded-lg border cursor-pointer group transition-all duration-300 ${
                            sIdx === 0 ? 'min-h-[135px]' : sIdx === 1 ? 'min-h-[170px]' : sIdx === 2 ? 'min-h-[205px]' : 'min-h-[240px]'
                          } flex flex-col justify-between hover:scale-103 ${
                            sIdx === 1 ? 'bg-sky-500/5 border-sky-400/30' : 'bg-stone-500/5 border-stone-400/10'
                          }`}
                        >
                          {/* Level Stair Highlight Header line */}
                          <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${
                            sIdx === 0 ? 'bg-slate-400' : sIdx === 1 ? 'bg-sky-550' : sIdx === 2 ? 'bg-amber-500' : 'bg-rose-500'
                          }`} style={{ backgroundColor: sIdx === 0 ? '#94a3b8' : sIdx === 1 ? '#0ea5e9' : sIdx === 2 ? '#f59e0b' : '#f43f5e' }} />

                          <div className="pt-1.5">
                            <span className="text-[10px] font-extrabold font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1 rounded block w-max">
                              {step.period}
                            </span>
                            <div className="text-[9px] font-extrabold leading-tight tracking-tight mt-1 opacity-90 break-words line-clamp-2">
                              {language === 'en' ? step.titleEn : step.titleZh}
                            </div>
                          </div>

                          <ul className="space-y-1 mt-1 border-t border-inherit/30 pt-1">
                            {(language === 'en' ? step.itemsEn : step.itemsZh).map((li, liIdx) => (
                              <li key={liIdx} className="text-[8px] leading-snug opacity-75 break-words">
                                • {li}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. AUDIT INTELLIGENCE HUB (审计智能中枢) */}
                <div 
                  id="hub"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEditType('hub');
                    setSelectedNodeId("hub");
                  }}
                  className={`md:col-span-4 rounded-xl border p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                    selectedNodeId === 'hub' ? themeStyle.activeNode : `bg-blue-600/5 dark:bg-cyan-950/20 border-blue-500/20 hover:shadow-md`
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
                      <h4 className="font-extrabold text-xs tracking-tight">
                        5. {language === 'en' ? hub.titleEn : hub.titleZh}
                      </h4>
                    </div>

                    <p className="text-[8px] sm:text-[9px] opacity-60 mb-2 leading-tight italic border-b border-inherit pb-1">
                      {language === 'en' ? hub.subtitleEn : hub.subtitleZh}
                    </p>

                    {/* Highly rich structured panel displaying all items fully */}
                    <div className="space-y-1.5 pr-1">
                      {hub.items.map((hItem, hidx) => (
                        <div key={hidx} className="flex items-start gap-1 p-0.5 hover:bg-stone-500/5 rounded transition-all">
                          <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0 mt-0.5" />
                          <div className="text-[9px] leading-snug">
                            <p className="font-semibold text-inherit opacity-90">{hItem.textZh}</p>
                            {language !== 'zh' && (
                              <p className="text-[8px] opacity-50 font-mono leading-none mt-0.5">{hItem.textEn}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core footer notes */}
                  <div className="mt-2 bg-slate-550/10 p-1.5 rounded flex items-center justify-between">
                    <span className="text-[8px] font-extrabold uppercase py-0.5 px-1 rounded bg-stone-500/10 opacity-75">
                      长期发展基座 (Platform Bedrock)
                    </span>
                    <span className="text-[8px] font-extrabold font-mono text-amber-600">No Time Bounds</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Dynamic Interactive Slide editing and workspace tools */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 mt-2 items-start" id="slide-tools-dashboard">
          
          {/* Form Content Editor on the left */}
          <div className="col-span-12 md:col-span-7 bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-extrabold text-base mb-2.5 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-blue-600" />
              <span>{t.editSuite}</span>
            </h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              您可以使用下方交互式文本框即时修改并微调幻灯片的所有中英文说明，或者点击上方的幻灯片区块激活直接编辑。修改会在上方16:9幻灯片中即时生效呈现。
            </p>

            {/* Quick Presets Selectors */}
            <div className="flex flex-wrap gap-2 mb-4 border-b pb-4">
              <button 
                onClick={() => { setActiveEditType('section'); setEditSectionIndex(0); }} 
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${activeEditType==='section' && editSectionIndex===0 ? 'bg-blue-600 border-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-stone-800'}`}
              >
                1. 智能审计计划
              </button>
              <button 
                onClick={() => { setActiveEditType('section'); setEditSectionIndex(1); }} 
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${activeEditType==='section' && editSectionIndex===1 ? 'bg-blue-600 border-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-stone-800'}`}
              >
                2. 审计执行
              </button>
              <button 
                onClick={() => { setActiveEditType('section'); setEditSectionIndex(2); }} 
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${activeEditType==='section' && editSectionIndex===2 ? 'bg-blue-600 border-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-stone-800'}`}
              >
                3. 发现与严重性引擎
              </button>
              <button 
                onClick={() => { setActiveEditType('section'); setEditSectionIndex(3); }} 
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${activeEditType==='section' && editSectionIndex===3 ? 'bg-blue-600 border-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-stone-800'}`}
              >
                4. 闭环干预
              </button>
              <button 
                onClick={() => setActiveEditType('hub')} 
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${activeEditType==='hub' ? 'bg-blue-600 border-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-stone-800'}`}
              >
                5. 智能中枢
              </button>
              <button 
                onClick={() => setActiveEditType('timeline')} 
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${activeEditType==='timeline' ? 'bg-blue-600 border-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-stone-800'}`}
              >
                演进路线图
              </button>
            </div>

            {/* Editing Work area according to activeEditType */}
            <div>
              {(!activeEditType || activeEditType === 'section') && (
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-stone-950 p-3.5 rounded-xl border">
                    <h4 className="font-bold text-xs text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-widest">
                      活跃编辑区块: {editSectionIndex + 1}. {sections[editSectionIndex]?.titleZh}
                    </h4>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] font-extrabold mb-1">模块标题 (中文)</label>
                        <input 
                          type="text" 
                          value={sections[editSectionIndex]?.titleZh || ''} 
                          onChange={(e) => updateSectionField(editSectionIndex, 'titleZh', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900 border-slate-300 dark:border-stone-800 focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold mb-1">Module Title (EN)</label>
                        <input 
                          type="text" 
                          value={sections[editSectionIndex]?.titleEn || ''} 
                          onChange={(e) => updateSectionField(editSectionIndex, 'titleEn', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900 border-slate-300 dark:border-stone-800 focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] font-extrabold mb-1">时间标记 (中文)</label>
                        <input 
                          type="text" 
                          value={sections[editSectionIndex]?.timelineZh || ''} 
                          onChange={(e) => updateSectionField(editSectionIndex, 'timelineZh', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900 border-slate-300 dark:border-stone-800" 
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold mb-1">Milestone (EN)</label>
                        <input 
                          type="text" 
                          value={sections[editSectionIndex]?.timelineEn || ''} 
                          onChange={(e) => updateSectionField(editSectionIndex, 'timelineEn', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900 border-slate-300 dark:border-stone-800" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bullet lists editing */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">审计流程细项 bullet items:</span>
                      <button 
                        onClick={() => addSectionItem(editSectionIndex)}
                        className="text-[10px] bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded font-bold"
                      >
                        + 增加细项
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {sections[editSectionIndex]?.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="p-3 bg-slate-50 dark:bg-stone-950 rounded-lg border flex items-start gap-2 justify-between">
                          <div className="flex-1 space-y-2">
                            <input 
                              type="text"
                              value={item.textZh}
                              onChange={(e) => updateSectionItem(editSectionIndex, itemIdx, 'textZh', e.target.value)}
                              className="w-full text-xs p-1.5 rounded border bg-white dark:bg-stone-900"
                              placeholder="中文具体要求"
                            />
                            <input 
                              type="text"
                              value={item.textEn}
                              onChange={(e) => updateSectionItem(editSectionIndex, itemIdx, 'textEn', e.target.value)}
                              className="w-full text-[11px] p-1.5 rounded border bg-white dark:bg-stone-900 font-mono"
                              placeholder="English text"
                            />
                          </div>
                          
                          <button 
                            onClick={() => removeSectionItem(editSectionIndex, itemIdx)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-500/5"
                            title="Delete checkpoint"
                          >
                            <Minimize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Checklist subblock specifier if exists in active */}
                  {sections[editSectionIndex]?.subBlock && (
                    <div className="border p-3.5 rounded-xl bg-orange-500/5 dark:bg-orange-500/3 border-amber-500/10 mt-4">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span>🔧</span>
                        <h5 className="font-bold text-xs text-amber-700 dark:text-amber-400">嵌套子模块: 检查表校验器</h5>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <div>
                          <label className="block text-[10px] font-bold">子模块标题</label>
                          <input 
                            type="text"
                            value={sections[editSectionIndex].subBlock?.titleZh || ''}
                            onChange={(e) => updateSubBlockField(editSectionIndex, 'titleZh', e.target.value)}
                            className="w-full text-xs p-1.5 rounded border bg-white dark:bg-stone-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold">子模块标题 (EN)</label>
                          <input 
                            type="text"
                            value={sections[editSectionIndex].subBlock?.titleEn || ''}
                            onChange={(e) => updateSubBlockField(editSectionIndex, 'titleEn', e.target.value)}
                            className="w-full text-xs p-1.5 rounded border bg-white dark:bg-stone-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 mt-2">
                        {sections[editSectionIndex].subBlock?.items.map((sub, sIdx) => (
                          <div key={sIdx} className="grid grid-cols-2 gap-2">
                            <input 
                              type="text" 
                              value={sub.textZh} 
                              onChange={(e) => updateSubBlockItem(editSectionIndex, sIdx, 'textZh', e.target.value)}
                              className="p-1 rounded text-[11px] border bg-white dark:bg-stone-900"
                            />
                            <input 
                              type="text" 
                              value={sub.textEn} 
                              onChange={(e) => updateSubBlockItem(editSectionIndex, sIdx, 'textEn', e.target.value)}
                              className="p-1 rounded text-[10px] border bg-white dark:bg-stone-900 font-mono"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeEditType === 'kpi' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-stone-950 p-3.5 rounded-xl border">
                    <h4 className="font-bold text-xs text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
                      精品效益卡 (KPI Value card) #{editKpiIndex + 1}
                    </h4>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] font-bold">指标名称 (中文)</label>
                        <input 
                          type="text" 
                          value={kpis[editKpiIndex]?.titleZh || ''} 
                          onChange={(e) => updateKpiCard(editKpiIndex, 'titleZh', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900 border-slate-300 dark:border-stone-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold">Indicator (EN)</label>
                        <input 
                          type="text" 
                          value={kpis[editKpiIndex]?.titleEn || ''} 
                          onChange={(e) => updateKpiCard(editKpiIndex, 'titleEn', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900 border-slate-300 dark:border-stone-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold">比率/预估收益(中文)</label>
                        <input 
                          type="text" 
                          value={kpis[editKpiIndex]?.valueZh || ''} 
                          onChange={(e) => updateKpiCard(editKpiIndex, 'valueZh', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900 border-slate-300 dark:border-stone-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold">Benefit Rate (EN)</label>
                        <input 
                          type="text" 
                          value={kpis[editKpiIndex]?.valueEn || ''} 
                          onChange={(e) => updateKpiCard(editKpiIndex, 'valueEn', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900 border-slate-300 dark:border-stone-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeEditType === 'hub' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-stone-950 p-4 rounded-xl border space-y-3">
                    <h4 className="font-extrabold text-xs text-amber-600 uppercase tracking-widest mb-1">
                      5. 审计智能中枢配置
                    </h4>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold">中枢标题 (中文)</label>
                        <input 
                          type="text" 
                          value={hub.titleZh} 
                          onChange={(e) => updateHubHead('titleZh', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold">Hub Title (EN)</label>
                        <input 
                          type="text" 
                          value={hub.titleEn} 
                          onChange={(e) => updateHubHead('titleEn', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold">副标题说明 (中文)</label>
                        <input 
                          type="text" 
                          value={hub.subtitleZh} 
                          onChange={(e) => updateHubHead('subtitleZh', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold">Subtitle (EN)</label>
                        <input 
                          type="text" 
                          value={hub.subtitleEn} 
                          onChange={(e) => updateHubHead('subtitleEn', e.target.value)}
                          className="w-full text-xs p-2 rounded border bg-white dark:bg-stone-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold">核心底座能力 (Core Capability items):</span>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto">
                      {hub.items.map((item, keyIdx) => (
                        <div key={keyIdx} className="p-2.5 bg-slate-50 dark:bg-stone-950 rounded-lg border flex flex-col gap-2">
                          <input 
                            type="text" 
                            value={item.textZh} 
                            onChange={(e) => updateHubItem(keyIdx, 'textZh', e.target.value)}
                            className="text-xs p-1 rounded border bg-white dark:bg-stone-900"
                          />
                          <input 
                            type="text" 
                            value={item.textEn} 
                            onChange={(e) => updateHubItem(keyIdx, 'textEn', e.target.value)}
                            className="text-[11px] p-1 rounded border bg-white dark:bg-stone-900 font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeEditType === 'timeline' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-stone-950 p-4 rounded-xl border space-y-3">
                    <h4 className="font-extrabold text-xs text-teal-600 uppercase tracking-widest mb-1">
                      主力战略路线图 (Roadmap Steps)
                    </h4>

                    <div className="grid grid-cols-2 gap-2">
                      {timeline.map((step, tIdx) => (
                        <button 
                          key={tIdx} 
                          onClick={() => setEditTimelineIndex(tIdx)}
                          className={`text-xs p-2 rounded-lg border font-bold ${editTimelineIndex === tIdx ? 'bg-sky-500/10 border-sky-500 text-sky-600' : 'bg-transparent'}`}
                        >
                          {step.period} - {step.titleZh.slice(0, 8)}...
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t pt-3">
                      <div>
                        <label className="block text-[9px] font-bold">年份区间</label>
                        <input 
                          type="text" 
                          value={timeline[editTimelineIndex]?.period || ''}
                          onChange={(e) => updateTimelineCard(editTimelineIndex, 'period', e.target.value)}
                          className="w-full text-xs p-1.5 rounded border bg-white dark:bg-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold">中文标签</label>
                        <input 
                          type="text" 
                          value={timeline[editTimelineIndex]?.titleZh || ''}
                          onChange={(e) => updateTimelineCard(editTimelineIndex, 'titleZh', e.target.value)}
                          className="w-full text-xs p-1.5 rounded border bg-white dark:bg-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold">Title (EN)</label>
                        <input 
                          type="text" 
                          value={timeline[editTimelineIndex]?.titleEn || ''}
                          onChange={(e) => updateTimelineCard(editTimelineIndex, 'titleEn', e.target.value)}
                          className="w-full text-xs p-1.5 rounded border bg-white dark:bg-stone-900 animate-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-2">
                      <span className="text-[10px] font-bold block mb-1">核心里程碑节点 (Bullet milestone text):</span>
                      {timeline[editTimelineIndex]?.itemsZh.map((li, liIdx) => (
                        <div key={liIdx} className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            value={li}
                            onChange={(e) => updateTimelineItem(editTimelineIndex, liIdx, true, e.target.value)}
                            className="p-1 rounded text-xs border bg-white dark:bg-stone-900"
                            placeholder="中文里程碑内容"
                          />
                          <input 
                            type="text" 
                            value={timeline[editTimelineIndex]?.itemsEn[liIdx] || ''}
                            onChange={(e) => updateTimelineItem(editTimelineIndex, liIdx, false, e.target.value)}
                            className="p-1 rounded text-[11px] border bg-white dark:bg-stone-900 font-mono"
                            placeholder="English item"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* General bottom slide controls inside form */}
            <div className="mt-5 flex flex-wrap gap-2 justify-between border-t pt-4">
              <button 
                onClick={handleResetData}
                className="text-xs px-3.5 py-2 rounded-lg border border-red-500/10 hover:bg-red-500/5 text-red-500/90 font-medium transition-all"
                id="btn-reset-data"
              >
                {t.resetBtn}
              </button>
              
              <button 
                onClick={handleExportData}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5"
                id="btn-export-data"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.exportBtn}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Narrative Notes and Presenter Speech Desk */}
          <div className="col-span-12 md:col-span-5 space-y-6">
            
            {/* presenter narrative prompts side-by-side */}
            <div className="bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-extrabold text-base mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>{t.narratorTranscript}</span>
              </h3>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                为便于您在演示或方案演练中脱颖而出，以下提供了对该闭环审计幻灯片5大支柱的中英文主讲旁白。可配合上方的“自动漫游演示”共同使用。
              </p>

              {/* Presenter scripts selectors view */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {presenterScripts.map((scr, idx) => (
                  <div 
                    key={scr.id}
                    onClick={() => {
                      setSelectedNodeId(scr.id);
                      const sIdx = sections.findIndex(s => s.id === scr.id);
                      if (sIdx !== -1) {
                        setActiveEditType('section');
                        setEditSectionIndex(sIdx);
                      } else if (scr.id === 'hub') {
                        setActiveEditType('hub');
                      }
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedNodeId === scr.id 
                        ? 'bg-indigo-500/10 border-indigo-400' 
                        : 'bg-slate-50/50 dark:bg-stone-950/20 border-slate-100 hover:bg-slate-100 dark:hover:bg-stone-850'
                    }`}
                  >
                    <h5 className="font-bold text-[11px] text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1.5">
                      {scr.title}
                    </h5>
                    <p className="text-xs font-medium leading-relaxed mb-2 opacity-90">{scr.zh}</p>
                    <p className="text-[10px] font-mono leading-relaxed opacity-60 italic">{scr.en}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Export presentation slide tips */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 font-bold font-mono text-7xl select-none">PPT</div>
              
              <h4 className="font-extrabold text-sm mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>一键如何导出为 PPT 或 PDF 报告</span>
              </h4>
              
              <p className="text-xs text-indigo-100 mb-3.5 leading-relaxed">
                本页面按 1920x1080 (16:9) 国际标准幻灯片比例进行精确像素对齐渲染：
              </p>

              <ol className="text-xs space-y-2 text-indigo-100 pl-4 list-decimal">
                <li>点击右上角 <b>“隐藏对齐网格”</b>，可隐藏辅助基准线。</li>
                <li>在浏览器窗口按键盘快捷键 <kbd className="bg-white/10 px-1 py-0.5 rounded font-mono text-[10px]">Ctrl + P</kbd> (Mac 用户为 Cmd + P)。</li>
                <li>在打印设置中将目标打印机设为 <b>“另存为 PDF”</b>，并将布局设为 <b>“横向”</b>。</li>
                <li>展开更多设置，将纸张尺寸设为 <b>“A4 (或信纸)”</b>，边距选择 <b>“无”</b>，并勾选 <b>“背景图形”</b> 即可完美转换为幻灯片印刷件或电子报告册。</li>
              </ol>
            </div>

          </div>

        </div>

      </main>

      {/* Slide footer status notes */}
      <footer className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-200 dark:border-stone-800 text-center text-xs opacity-60">
        <p>© 2026 Smart Audit - AI Enabled Audit Closed-loop Portal. Strictly Loyal to user original blueprint specs.</p>
        <p className="mt-1 font-mono text-[10px]">Development Frame Stack: React 19 + TypeScript 5 + TailwindCSS v4 + Motion React</p>
      </footer>
    </div>
  );
}
