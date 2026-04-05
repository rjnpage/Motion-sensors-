import React, { useState, useEffect } from "react";
import { 
  Smartphone, 
  Hand, 
  Settings, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Code2, 
  Layout, 
  Package, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";

interface ProjectStatus {
  status: string;
  app_name: string;
  platform: string;
  features: string[];
}

export default function App() {
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch status:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Hand className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {status?.app_name || "Air Gesture Control Pro"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-500 uppercase tracking-wider">Live Preview</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-5xl font-extrabold tracking-tight leading-tight">
                Control your phone <br />
                <span className="text-cyan-500">without touching it.</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                A production-ready Android application built with Kotlin and Jetpack Compose. 
                Leverages advanced sensor fusion and CameraX for seamless air gesture detection.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                <Smartphone className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-medium">Android Native</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                <Code2 className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Kotlin MVVM</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                <Layout className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">Jetpack Compose</span>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Project Status</h3>
                <span className="text-xs text-gray-500 font-mono">v1.0.0-alpha</span>
              </div>
              <div className="space-y-6">
                <StatusItem icon={<CheckCircle2 className="text-green-500" />} label="Android Project Structure" value="Complete" />
                <StatusItem icon={<CheckCircle2 className="text-green-500" />} label="Accessibility Service" value="Implemented" />
                <StatusItem icon={<CheckCircle2 className="text-green-500" />} label="Sensor Fusion Logic" value="Active" />
                <StatusItem icon={<CheckCircle2 className="text-green-500" />} label="CameraX Integration" value="Ready" />
                <StatusItem icon={<Zap className="text-yellow-500" />} label="Build Verification" value="Pending Gradle" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight">Core Features</h3>
            <div className="h-px flex-1 mx-8 bg-white/10" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Hand className="w-6 h-6 text-cyan-500" />}
              title="Air Gesture Detection"
              description="Real-time detection using front camera and proximity sensors for waves, swipes, and palms."
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-purple-500" />}
              title="Motion Control"
              description="Accelerometer and Gyroscope integration for shake-to-flashlight and flip-to-silent actions."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6 text-green-500" />}
              title="Accessibility Integration"
              description="Native Accessibility Service to perform system-level actions like Home, Back, and Media control."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-500" />}
              title="Low Latency"
              description="Optimized background services and CameraX analysis for near-instant gesture response."
            />
            <FeatureCard 
              icon={<Smartphone className="w-6 h-6 text-blue-500" />}
              title="Modern UI"
              description="Futuristic Jetpack Compose dashboard with live preview and customization toggles."
            />
            <FeatureCard 
              icon={<Settings className="w-6 h-6 text-gray-400" />}
              title="Custom Mapping"
              description="Map specific gestures to custom actions like opening apps or answering calls."
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
          <div className="flex items-center gap-4">
            <Package className="w-6 h-6 text-cyan-500" />
            <h3 className="text-xl font-bold">Technical Implementation</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Android Architecture</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  MVVM Pattern with StateFlow
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  Jetpack Compose for Declarative UI
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  Hilt for Dependency Injection
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Key APIs</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  CameraX ImageAnalysis API
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  SensorManager (Proximity & Motion)
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  AccessibilityService API
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2026 Air Gesture Control Pro. Native Android Implementation.</p>
        </div>
      </footer>
    </div>
  );
}

function StatusItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm text-gray-300">{label}</span>
      </div>
      <span className="text-sm font-mono text-cyan-500">{value}</span>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 hover:bg-white/[0.08] transition-colors"
    >
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
