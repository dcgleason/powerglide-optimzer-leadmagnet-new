import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, XCircle, ArrowRight, Timer, Database, Rocket, Terminal, Users, Mail, CheckCircle } from 'lucide-react';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/ADBb0uh97mzQffpWRRjg3RQOUJGh7rmIV_tFEDf3fEojwKI6UzJdfeJbKQFcKSXbPWvZVl7O6kWyY-ti7ihQG1oLrvrDEn6fA7daVATo0gsOFZAt5IqYWjp-cU5n__jdbOXWbTYMAD1EtWkLd8nO15bQ_3z6LhYlzGXiIUCIYUXaMZKH9Lvh8LS8OElNKGkw1FADTU2enXci6djE8vLTDtCd-jB9THf3AZdTKegE4JCbiSzuWuf4HTFPxnU9pQQY9BTnRl7e2CbFCVOOxQ";

const QUESTIONS = [
  "Do performance issues show up in specific forms, lists, or reports more than others?",
  "Does slowness get worse on larger tables or high-volume data sets?",
  "Did performance get worse after a release, script change, or new workflow?",
  "Are reports, background scripts, or custom logic pulling large amounts of data?",
  "Do your developers know which queries are taking the longest?",
  "Have you reviewed whether filters and conditions match available indexes?",
  "Can your team separate query-related slowness from broader node or platform issues?"
];

type Step = 'landing' | 'assessment' | 'results';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);

  const handleStart = () => {
    setStep('assessment');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
    } else {
      setTimeout(() => setStep('results'), 300);
    }
  };

  const handleRestart = () => {
    setStep('landing');
  };

  return (
    <div className="min-h-screen font-sans text-on-surface selection:bg-primary/30 selection:text-on-surface">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <LandingScreen key="landing" onStart={handleStart} />
          )}
          
          {step === 'assessment' && (
            <AssessmentScreen 
              key="assessment" 
              questionIndex={currentQuestionIndex} 
              onAnswer={handleAnswer} 
            />
          )}
          
          {step === 'results' && (
            <ResultsScreen 
              key="results" 
              answers={answers} 
              onRestart={handleRestart}
              leadFormSubmitted={leadFormSubmitted}
              setLeadFormSubmitted={setLeadFormSubmitted}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-container-high/50 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={LOGO_URL} alt="PowerGlide Logo" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:flex gap-8 items-center font-medium tracking-tight">
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Solutions</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Architecture</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Ecosystem</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">Resources</a>
          <button className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:opacity-80 transition-all active:scale-95">
            Get Access
          </button>
        </div>
      </div>
    </nav>
  );
}

function LandingScreen({ onStart }: { onStart: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-start max-w-4xl pt-8"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-8">
        Is your ServiceNow instance sometimes slow? Find out why:
      </h1>
      <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-12 max-w-2xl">
        Most performance issues aren't ServiceNow's fault—they're hidden in unoptimized queries and script drags. Take 2 minutes to diagnose your environment's health.
      </p>
      <button 
        onClick={onStart}
        className="bg-primary text-black px-10 py-5 rounded-full text-lg font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all group inline-flex items-center active:scale-95"
      >
        Start the check
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-32 w-full">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">The Diagnostic Scope</span>
        <h2 className="text-3xl font-bold tracking-tight mb-8">What this checks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Timer className="w-8 h-8 text-primary" />}
            title="Specific slow transactions"
            desc="Identifying the exact moments where user experience grinds to a halt."
          />
          <FeatureCard 
            icon={<Database className="w-8 h-8 text-primary" />}
            title="Large-table behavior"
            desc="Analyzing how queries scale as your Task and Audit tables grow into the millions."
          />
          <FeatureCard 
            icon={<Rocket className="w-8 h-8 text-primary" />}
            title="Post-release slowdowns"
            desc="Spotting performance regression patterns following your major platform updates."
          />
          <div className="bg-surface-container-low p-8 rounded-2xl flex flex-col md:flex-row gap-8 md:col-span-2 border border-primary/10">
            <div className="flex-1">
              <Terminal className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-2">Script and report load</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Isolating inefficient client scripts and unindexed report queries that block the main thread.</p>
            </div>
            <div className="flex-1 bg-surface-container-high rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl font-black text-primary">7</span>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">Critical Metrics</p>
              </div>
            </div>
          </div>
          <FeatureCard 
            icon={<Users className="w-8 h-8 text-primary" />}
            title="Team query visibility"
            desc="Measuring if your dev team can actually see the bottlenecks they create."
          />
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-surface-container-low p-8 rounded-2xl flex flex-col gap-4 border border-primary/10">
      {icon}
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function AssessmentScreen({ questionIndex, onAnswer }: { questionIndex: number, onAnswer: (score: number) => void, key?: string }) {
  const progress = ((questionIndex) / QUESTIONS.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-2xl mx-auto pt-12"
    >
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Assessment Progress</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Step {questionIndex + 1} of {QUESTIONS.length}</span>
        </div>
        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_12px_rgba(119,201,43,0.6)]"
            initial={{ width: `${((questionIndex - 1) / QUESTIONS.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 border border-white/40 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 leading-snug text-center">
          {QUESTIONS[questionIndex]}
        </h2>
        
        <div className="flex flex-col gap-4">
          <AnswerButton label="Yes" icon={<CheckCircle2 className="w-6 h-6" />} onClick={() => onAnswer(2)} />
          <AnswerButton label="Sometimes" icon={<Circle className="w-6 h-6" />} onClick={() => onAnswer(1)} />
          <AnswerButton label="No" icon={<XCircle className="w-6 h-6" />} onClick={() => onAnswer(0)} />
        </div>
      </div>
    </motion.div>
  );
}

function AnswerButton({ label, icon, onClick }: { label: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full py-6 rounded-2xl border-2 border-outline-variant hover:border-primary hover:bg-primary/5 font-bold text-lg transition-all active:scale-95 text-left px-8 flex justify-between items-center group bg-white/50"
    >
      {label}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
        {icon}
      </span>
    </button>
  );
}

function ResultsScreen({ answers, onRestart, leadFormSubmitted, setLeadFormSubmitted }: { answers: number[], onRestart: () => void, leadFormSubmitted: boolean, setLeadFormSubmitted: (v: boolean) => void, key?: string }) {
  const score = answers.reduce((a, b) => a + b, 0);
  
  let label = "";
  let copy = "";
  let steps: string[] = [];
  let riskLevel: 'low' | 'medium' | 'high' = 'low';

  if (score <= 4) {
    label = "Query issues are less likely the main cause";
    copy = "Your answers suggest query design is less likely to be the main source of slowness. Broader platform issues like jobs, nodes, integrations, or infrastructure patterns may be worth checking next.";
    steps = [
      "Review scheduled jobs and overlap during peak hours",
      "Check node-level behavior and instability",
      "Look at broader platform health signals before focusing on queries"
    ];
    riskLevel = 'low';
  } else if (score <= 9) {
    label = "Query design may be part of the issue";
    copy = "Your answers suggest query design may be contributing to slowness, but it may not be the whole story. Start by isolating the slowest transactions and reviewing how custom logic and table size are affecting runtime.";
    steps = [
      "Identify the slowest forms, lists, reports, or scripts",
      "Review large-table access patterns",
      "Check for post-release regressions tied to custom work"
    ];
    riskLevel = 'medium';
  } else {
    label = "Query-related issues are likely creating meaningful drag";
    copy = "Your answers suggest query design is likely a meaningful source of performance drag. This is a strong sign that slow transactions, table access, script behavior, or indexing should be reviewed before the issue gets bigger.";
    steps = [
      "Review the worst-performing queries first",
      "Map slow transactions to the tables and scripts involved",
      "Benchmark changes before and after fixes"
    ];
    riskLevel = 'high';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto pt-12"
    >
      <div className="text-center mb-16">
        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block ${
          riskLevel === 'high' ? 'bg-error-container text-on-error-container' : 
          riskLevel === 'medium' ? 'bg-orange-100 text-orange-800' : 
          'bg-green-100 text-green-800'
        }`}>
          {riskLevel === 'high' ? 'High Risk Detected' : riskLevel === 'medium' ? 'Moderate Risk Detected' : 'Low Risk Detected'}
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Your Query Health Score: {score}/14</h2>
        <p className="text-on-surface-variant text-lg font-medium">{label}</p>
      </div>

      <div className="bg-surface-container-highest rounded-3xl p-8 md:p-12 mb-12 border border-primary/10 shadow-sm">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">What this means</h3>
            <p className="text-on-surface-variant leading-relaxed">{copy}</p>
          </div>
          <div className="flex-1 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary">Immediate Next Steps</h4>
            <ul className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-on-surface-variant">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-stone-950 text-white rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="max-w-xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Need help identifying which queries are creating the most drag?</h2>
          <p className="text-white/70 text-lg leading-relaxed">PowerGlide helps ServiceNow teams pinpoint where performance is getting hit and what to fix first.</p>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto relative z-10 shrink-0">
          <button className="bg-primary text-black px-10 py-4 rounded-full font-bold text-lg whitespace-nowrap hover:scale-105 transition-transform shadow-lg shadow-primary/20">
            Talk to PowerGlide
          </button>
          <button onClick={onRestart} className="text-white/60 hover:text-white font-medium text-sm transition-colors py-2">
            Run the check again
          </button>
        </div>
      </div>

      {!leadFormSubmitted ? (
        <div className="bg-white border-2 border-primary/10 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-xl shadow-primary/5">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Mail className="w-32 h-32 text-primary" />
          </div>
          <h3 className="text-3xl font-bold mb-4 relative z-10">Want a copy of your results and next-step recommendations?</h3>
          <p className="text-on-surface-variant mb-10 max-w-lg mx-auto relative z-10">We'll send your results and a simple next-step guide.</p>
          
          <form 
            className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
            onSubmit={(e) => {
              e.preventDefault();
              setLeadFormSubmitted(true);
            }}
          >
            <div className="text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block ml-2 text-on-surface-variant">First Name</label>
              <input required className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-4 py-3 transition-all outline-none rounded-t-lg" placeholder="Jane" type="text" />
            </div>
            <div className="text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block ml-2 text-on-surface-variant">Work Email</label>
              <input required className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-4 py-3 transition-all outline-none rounded-t-lg" placeholder="jane@company.com" type="email" />
            </div>
            <div className="text-left md:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block ml-2 text-on-surface-variant">Company</label>
              <input required className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-4 py-3 transition-all outline-none rounded-t-lg" placeholder="Acme Corp" type="text" />
            </div>
            <button type="submit" className="md:col-span-2 bg-primary text-black py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all mt-4 shadow-lg shadow-primary/20 active:scale-95">
              Send my results
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white border-2 border-primary/10 rounded-[3rem] p-10 md:p-16 text-center shadow-xl shadow-primary/5">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Results sent!</h3>
          <p className="text-on-surface-variant">Check your inbox shortly for your detailed breakdown.</p>
        </div>
      )}
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 border-t border-primary/10 bg-surface-container-low mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-6">
        <div className="text-sm font-black text-on-surface">PowerGlide</div>
        <div className="flex gap-8 text-[0.6875rem] uppercase tracking-[0.1em] font-medium">
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-all duration-300 hover:tracking-[0.15em]">Privacy Policy</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-all duration-300 hover:tracking-[0.15em]">Terms of Service</a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-all duration-300 hover:tracking-[0.15em]">ServiceNow Guide</a>
        </div>
        <div className="text-on-surface-variant text-[0.6875rem] uppercase tracking-[0.1em] font-medium text-center md:text-left">
          © 2026 PowerGlide. Architectural Operator Precision.
        </div>
      </div>
    </footer>
  );
}
