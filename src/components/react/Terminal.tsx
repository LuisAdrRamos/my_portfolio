import React, { useState, useRef, useEffect } from 'react';

type CommandOutput = {
  command: string;
  output: React.ReactNode;
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: '',
      output: (
        <div className="text-accent-cyan">
          <p>Welcome to LAR OS v2.2</p>
          <p>Type 'help' to see available commands.</p>
        </div>
      ),
    },
  ])
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of the terminal container
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') {
      setHistory((prev) => [...prev, { command: cmd, output: null }]);
      return;
    }

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    let output: React.ReactNode = null;

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="text-text-secondary">
            <p>Available commands:</p>
            <ul className="list-none ml-4 mt-2 space-y-1">
              <li><span className="text-accent-cyan">help</span>       - Show this message</li>
              <li><span className="text-accent-cyan">whoami</span>     - Display personal information</li>
              <li><span className="text-accent-cyan">skills</span>     - List technical skills</li>
              <li><span className="text-accent-cyan">projects</span>   - List featured projects</li>
              <li><span className="text-accent-cyan">contact</span>    - Show contact information</li>
              <li><span className="text-accent-cyan">benchmarks</span> - View AI benchmark data</li>
              <li><span className="text-accent-cyan">neofetch</span>   - System information</li>
              <li><span className="text-accent-cyan">clear</span>      - Clear terminal screen</li>
            </ul>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div className="text-text-secondary">
            <p><span className="text-accent-purple font-bold">Name:</span> Luis Adrián Ramos</p>
            <p><span className="text-accent-purple font-bold">Role:</span> Backend Developer & Local AI Engineer</p>
            <p><span className="text-accent-purple font-bold">Location:</span> Ecuador</p>
            <p><span className="text-accent-purple font-bold">Education:</span> Escuela Politécnica Nacional — ESFOT</p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="text-text-secondary">
            <p className="text-accent-mint font-bold mb-2">Core Dependencies:</p>
            <p>Python, Django, Linux, SQL, Docker, Git, REST APIs</p>
            <p className="text-accent-mint font-bold mt-3 mb-2">AI Inference:</p>
            <p>llama.cpp, GGUF, ROCm, Vulkan</p>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="text-text-secondary">
            <p>1. <span className="text-accent-cyan font-bold">Scalable REST API</span> (backend)</p>
            <p>2. <span className="text-accent-cyan font-bold">Local LLM Quantizer Pipeline</span> (ai-inference)</p>
            <p>3. <span className="text-accent-cyan font-bold">Network Monitoring Tool</span> (system-tools)</p>
            <p className="mt-2 text-text-muted">Tip: Scroll down to the Projects section for details!</p>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="text-text-secondary">
            <p><span className="text-accent-cyan">Email:</span> <a href="mailto:tu-correo@ejemplo.com" className="hover:underline">tu-correo@ejemplo.com</a></p>
            <p><span className="text-accent-cyan">GitHub:</span> <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/tu-usuario</a></p>
            <p><span className="text-accent-cyan">LinkedIn:</span> <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/tu-perfil</a></p>
          </div>
        );
        break;
      case 'benchmarks':
        output = (
          <div className="text-text-secondary">
            <p>Initializing benchmarking module...</p>
            <p className="text-accent-amber mt-2">Hardware detected: AMD Radeon RX 9060 XT 16GB</p>
            <p className="mt-2 text-text-muted">Check the Benchmarks section below for detailed charts.</p>
          </div>
        );
        break;
      case 'neofetch':
        output = (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm sm:text-base">
            <div className="text-accent-cyan font-bold whitespace-pre">
{`       .---.
      /     \\
      \\.@-@./
      /\\\`_'/\\
     //  _  \\\\
    | \\     / |
   /\\_\\_   _/_/\\
   \\__//___\\\\__/
     \\ \\___/ /
      '---'`}
            </div>
            <div className="text-text-secondary">
              <p><span className="text-accent-cyan font-bold">luis</span>@<span className="text-accent-cyan font-bold">portfolio</span></p>
              <p>-------------------</p>
              <p><span className="text-accent-purple font-bold">OS:</span> LAR OS v2.2</p>
              <p><span className="text-accent-purple font-bold">Host:</span> Vercel Edge Network</p>
              <p><span className="text-accent-purple font-bold">Kernel:</span> Astro 5.x</p>
              <p><span className="text-accent-purple font-bold">Uptime:</span> 100%</p>
              <p><span className="text-accent-purple font-bold">Packages:</span> React, Tailwind 4</p>
              <p><span className="text-accent-purple font-bold">Shell:</span> bash</p>
              <p><span className="text-accent-purple font-bold">Resolution:</span> Responsive</p>
              <p><span className="text-accent-purple font-bold">Terminal:</span> LAR-Term</p>
              <p><span className="text-accent-purple font-bold">GPU:</span> AMD Radeon RX 9060 XT 16GB</p>
              <p><span className="text-accent-purple font-bold">Memory:</span> 32GB RAM / 16GB VRAM</p>
              
              <div className="flex gap-2 mt-4">
                <div className="w-4 h-4 bg-bg-primary"></div>
                <div className="w-4 h-4 bg-accent-cyan"></div>
                <div className="w-4 h-4 bg-accent-mint"></div>
                <div className="w-4 h-4 bg-accent-purple"></div>
                <div className="w-4 h-4 bg-accent-amber"></div>
                <div className="w-4 h-4 bg-text-primary"></div>
                <div className="w-4 h-4 bg-text-secondary"></div>
              </div>
            </div>
          </div>
        );
        break;
      default:
        output = (
          <div className="text-red-400">
            command not found: {trimmedCmd}
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="glass-panel border border-border-subtle rounded-xl overflow-hidden shadow-2xl shadow-accent-cyan/5 w-full max-w-3xl mx-auto flex flex-col font-code text-sm">
      {/* Terminal Header */}
      <div className="bg-bg-elevated border-b border-border-subtle px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-accent-amber/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-text-muted text-xs flex items-center gap-2">
          <span>bash</span>
          <span>—</span>
          <span>80x24</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalContainerRef}
        className="p-4 md:p-6 h-80 overflow-y-auto bg-bg-primary/50 scroll-smooth" 
        onClick={() => document.getElementById('terminal-input')?.focus()}
      >
        
        {history.map((entry, index) => (
          <div key={index} className="mb-4">
            {entry.command && (
              <div className="flex gap-2 text-text-primary mb-1">
                <span className="text-accent-mint">visitor@lar-os:~$</span>
                <span>{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <div className="pl-0">{entry.output}</div>
            )}
          </div>
        ))}
        
        <form onSubmit={onSubmit} className="flex gap-2 text-text-primary mt-2">
          <span className="text-accent-mint shrink-0">visitor@lar-os:~$</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-text-primary focus:ring-0 p-0 m-0 caret-accent-cyan"
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal input"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
