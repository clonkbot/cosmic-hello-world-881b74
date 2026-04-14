import { useEffect, useState } from 'react';

function Star({ delay }: { delay: number }) {
  const [style] = useState(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${delay}s`,
    width: `${Math.random() * 2 + 1}px`,
    height: `${Math.random() * 2 + 1}px`,
  }));

  return (
    <div
      className="absolute rounded-full bg-white/60 animate-twinkle"
      style={style}
    />
  );
}

function App() {
  const [visibleChars, setVisibleChars] = useState(0);
  const fullText = "Hello, World";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (visibleChars < fullText.length) {
      const timeout = setTimeout(() => {
        setVisibleChars(v => v + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [visibleChars, fullText.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(c => !c);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const stars = Array.from({ length: 80 }, (_, i) => (
    <Star key={i} delay={Math.random() * 5} />
  ));

  return (
    <div className="min-h-dvh bg-cosmic relative overflow-hidden flex flex-col">
      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {stars}
      </div>

      {/* Aurora gradient overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-aurora" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl animate-aurora-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="text-center">
          {/* Decorative bracket - left */}
          <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6">
            <span className="text-teal-400/50 text-4xl md:text-6xl lg:text-7xl font-light select-none animate-fade-in-left">{`{`}</span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white/95 tracking-wide">
              {fullText.slice(0, visibleChars)}
              <span
                className={`inline-block w-[3px] md:w-1 h-[0.8em] bg-teal-400 ml-1 align-middle ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-100`}
              />
            </h1>

            {/* Decorative bracket - right */}
            <span className="text-teal-400/50 text-4xl md:text-6xl lg:text-7xl font-light select-none animate-fade-in-right">{`}`}</span>
          </div>

          {/* Subtitle */}
          <p
            className="mt-6 md:mt-8 font-mono text-xs md:text-sm text-slate-400/70 tracking-widest uppercase animate-fade-in-up"
            style={{ animationDelay: '1.8s' }}
          >
            The beginning of everything
          </p>

          {/* Decorative line */}
          <div
            className="mt-6 md:mt-8 mx-auto h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent animate-fade-in-up"
            style={{ animationDelay: '2.2s' }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-4 md:pb-6 text-center">
        <p className="font-mono text-[10px] md:text-xs text-slate-500/50 tracking-wide">
          Requested by <span className="text-slate-400/60">@PauliusX</span> · Built by <span className="text-slate-400/60">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
