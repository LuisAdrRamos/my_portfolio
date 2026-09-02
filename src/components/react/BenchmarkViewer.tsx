import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

type BenchmarkData = {
  hardware: {
    primary: {
      name: string;
      vram: string;
      arch: string;
      backend: string;
    };
  };
  benchmarks: Array<{
    model: string;
    results: Record<string, {
      tokensPerSec: number;
      vramGB: number;
      ttftMs: number;
    }>;
  }>;
};

const BenchmarkViewer = () => {
  const [data, setData] = useState<BenchmarkData | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'speed' | 'vram'>('speed');

  useEffect(() => {
    fetch('/data/benchmarks.json')
      .then(res => res.json())
      .then((jsonData: BenchmarkData) => {
        setData(jsonData);
        if (jsonData.benchmarks.length > 0) {
          setSelectedModel(jsonData.benchmarks[0].model);
        }
      })
      .catch(err => console.error("Error loading benchmarks:", err));
  }, []);

  const chartData = useMemo(() => {
    if (!data || !selectedModel) return [];
    
    const modelData = data.benchmarks.find(b => b.model === selectedModel);
    if (!modelData) return [];

    return Object.entries(modelData.results).map(([quantization, metrics]) => ({
      name: quantization.replace('GGUF_', '').replace('_', ' '),
      speed: metrics.tokensPerSec,
      vram: metrics.vramGB,
      ttft: metrics.ttftMs
    }));
  }, [data, selectedModel]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-96 glass-panel rounded-2xl">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-t-2 border-accent-cyan rounded-full animate-spin"></div>
          <span className="text-text-muted font-code">Loading telemetry data...</span>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 border border-border-subtle rounded-lg shadow-xl text-sm font-code">
          <p className="text-accent-cyan font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-text-primary">
              <span className="text-text-muted">{entry.name}: </span>
              {entry.value} {entry.name === 'speed' ? 't/s' : 'GB'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Hardware Specs Card */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-border-subtle h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle">
            <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-purple"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
            </div>
            <div>
              <h3 className="text-text-primary font-heading font-bold text-lg">AI Research Lab</h3>
              <p className="text-text-muted text-sm font-code">Primary Node</p>
            </div>
          </div>
          
          <div className="space-y-4 font-code text-sm flex-grow">
            <div>
              <p className="text-text-muted mb-1 text-xs uppercase tracking-wider">GPU / Accelerator</p>
              <p className="text-accent-cyan font-medium">{data.hardware.primary.name}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1 text-xs uppercase tracking-wider">VRAM / Memory</p>
              <p className="text-text-primary font-medium">{data.hardware.primary.vram}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1 text-xs uppercase tracking-wider">Architecture</p>
              <p className="text-text-primary font-medium">{data.hardware.primary.arch}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1 text-xs uppercase tracking-wider">Inference Backend</p>
              <p className="text-text-primary font-medium">{data.hardware.primary.backend}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Viewer */}
      <div className="w-full lg:w-2/3 glass-panel p-6 rounded-2xl border border-border-subtle">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          
          {/* Model Selector */}
          <div className="flex flex-wrap gap-2">
            {data.benchmarks.map(b => (
              <button
                key={b.model}
                onClick={() => setSelectedModel(b.model)}
                className={`px-4 py-2 rounded-lg font-code text-sm transition-all ${
                  selectedModel === b.model 
                  ? 'bg-accent-cyan/20 border-accent-cyan text-accent-cyan border' 
                  : 'bg-bg-secondary border-border-subtle text-text-secondary border hover:text-text-primary hover:border-accent-cyan/50'
                }`}
              >
                {b.model}
              </button>
            ))}
          </div>

          {/* Metric Toggle */}
          <div className="flex bg-bg-secondary rounded-lg p-1 border border-border-subtle">
            <button
              onClick={() => setActiveTab('speed')}
              className={`px-4 py-1.5 rounded-md text-xs font-code transition-all ${
                activeTab === 'speed' ? 'bg-accent-mint text-bg-primary font-bold' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Throughput (t/s)
            </button>
            <button
              onClick={() => setActiveTab('vram')}
              className={`px-4 py-1.5 rounded-md text-xs font-code transition-all ${
                activeTab === 'vram' ? 'bg-accent-amber text-bg-primary font-bold' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              VRAM (GB)
            </button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-72 w-full mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedModel}-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'Fira Code, monospace' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'Fira Code, monospace' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <RechartsTooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} content={<CustomTooltip />} />
                  <Bar 
                    dataKey={activeTab} 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={activeTab === 'speed' ? '#2dd4bf' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default BenchmarkViewer;
