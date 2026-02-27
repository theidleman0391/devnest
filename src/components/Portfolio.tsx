import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import "./portfolio-scanner.css";

/* ── Project data ─────────────────────────────────────── */
interface Project {
  titleKey: string;
  descKey: string;
  tags: string[];
  liveUrl?: string;
  imageUrl?: string;
  credentials?: { email: string; password: string };
}

const projects: Project[] = [
  {
    titleKey: "project.cryptoliquid.title",
    descKey: "project.cryptoliquid.desc",
    tags: ["JavaScript", "Crypto API", "Live Data", "Tailwind"],
    liveUrl: "https://cryptoliquid.live/",
    imageUrl: "/images/cryptoliquid.png",
  },
  {
    titleKey: "project.smartfix.title",
    descKey: "project.smartfix.desc",
    tags: ["React", "Mobile", "Web App", "Cross-platform"],
    liveUrl: "https://smartfixtool.vercel.app/",
    imageUrl: "/images/smartfix.png",
  },
  {
    titleKey: "project.innovamob.title",
    descKey: "project.innovamob.desc",
    tags: ["Next.js", "SEO", "Blog", "React"],
    liveUrl: "https://innova-mob.vercel.app",
    imageUrl: "/images/innovamob.png",
  },
  {
    titleKey: "project.roofcrm.title",
    descKey: "project.roofcrm.desc",
    tags: ["React", "Tailwind", "AI", "CRM", "Supabase"],
    liveUrl: "https://roofconnect.vercel.app/",
    imageUrl: "/images/roofcrm.png",
    credentials: { email: "demuser@gmail.com", password: "demouser1" },
  },
];

/* ── ASCII code block generator ──────────────────────── */
const CODE_SRC =
  "const SCAN_WIDTH=8;const FADE_ZONE=35;const MAX_PARTICLES=2500;" +
  "function clamp(n,a,b){return Math.max(a,Math.min(b,n));}" +
  "function lerp(a,b,t){return a+(b-a)*t;}" +
  "class Particle{constructor(x,y,vx,vy,r,a){this.x=x;this.y=y;this.vx=vx;this.vy=vy;this.r=r;this.a=a;}step(dt){this.x+=this.vx*dt;this.y+=this.vy*dt;}}" +
  "const scanner={x:Math.floor(window.innerWidth/2),width:SCAN_WIDTH,glow:3.5};" +
  "function drawParticle(ctx,p){ctx.globalAlpha=clamp(p.a,0,1);ctx.drawImage(gradient,p.x-p.r,p.y-p.r,p.r*2,p.r*2);}" +
  "function tick(t){const dt=0.016;}" +
  "const state={intensity:1.2,particles:MAX_PARTICLES};" +
  "const v0=(1+23)*0.7;const v1=(3+45)*0.2;const v2=(2+67)*0.5;" +
  "if(state.intensity>1){scanner.glow+=0.01;}" +
  "ctx.globalCompositeOperation='lighter';" +
  "requestAnimationFrame(tick);";

function generateCodeBlock(cols: number, rows: number): string {
  let flow = CODE_SRC;
  while (flow.length < cols * rows + cols) flow += " " + flow;
  let out = "";
  let offset = 0;
  for (let r = 0; r < rows; r++) {
    let line = flow.slice(offset, offset + cols);
    if (line.length < cols) line = line.padEnd(cols);
    out += line + (r < rows - 1 ? "\n" : "");
    offset = (offset + cols) % (flow.length - cols || 1);
  }
  return out;
}

/* ── CardStreamController ────────────────────────────── */
type TFn = (key: string) => string;

class CardStreamController {
  private el: HTMLElement;
  private projects: Project[];
  private t: TFn;
  private pos = 0;
  private vel = 120;
  private dir = -1;
  private animating = true;
  private dragging = false;
  private lastX = 0;
  private dragVel = 0;
  private readonly friction = 0.95;
  private readonly minVel = 60;
  private lineW = 0;
  private rafMove = 0;
  private rafClip = 0;
  private lastTime = 0;
  private recentDrag = false;
  private onMM: (e: MouseEvent) => void;
  private onMU: () => void;
  private onTM: (e: TouchEvent) => void;
  private onTE: () => void;
  private onResize: () => void;

  constructor(el: HTMLElement, projects: Project[], t: TFn) {
    this.el = el;
    this.projects = projects;
    this.t = t;
    this.onMM = (e) => this.drag(e);
    this.onMU = () => this.endDrag();
    this.onTM = (e) => this.drag(e.touches[0] as unknown as MouseEvent);
    this.onTE = () => this.endDrag();
    this.onResize = () => this.calcDims();
    this.init();
  }

  private init() {
    this.populate();
    this.calcDims();
    const isMobile = window.innerWidth < 1024;
    const cx = isMobile ? window.innerWidth * 0.35 : window.innerWidth / 2;
    this.pos = Math.floor(cx) + 600;
    this.el.style.transform = `translateX(${this.pos}px)`;
    this.el.addEventListener("mousedown", (e) => this.startDrag(e));
    document.addEventListener("mousemove", this.onMM);
    document.addEventListener("mouseup", this.onMU);
    this.el.addEventListener("touchstart", (e) => this.startDrag(e.touches[0] as unknown as MouseEvent), { passive: false });
    document.addEventListener("touchmove", this.onTM, { passive: false });
    document.addEventListener("touchend", this.onTE);
    this.el.addEventListener("wheel", (e) => { e.preventDefault(); this.pos += e.deltaY > 0 ? 30 : -30; this.updateClip(); }, { passive: false });
    window.addEventListener("resize", this.onResize);
    this.loop();
    this.clipLoop();
  }

  private calcDims() {
    const cardCount = this.el.children.length;
    this.lineW = (400 + 50) * cardCount;
  }

  private startDrag(e: MouseEvent) {
    (e as Event).preventDefault?.();
    this.dragging = true;
    this.recentDrag = false;
    this.animating = false;
    this.lastX = e.clientX;
    this.dragVel = 0;
    this.el.style.cursor = "grabbing";
  }

  private drag(e: MouseEvent) {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastX;
    if (Math.abs(dx) > 4) this.recentDrag = true;
    this.pos += dx;
    this.dragVel = dx * 60;
    this.lastX = e.clientX;
    this.el.style.transform = `translateX(${this.pos}px)`;
    this.updateClip();
  }

  private endDrag() {
    if (!this.dragging) return;
    this.dragging = false;
    this.el.style.cursor = "grab";
    if (Math.abs(this.dragVel) > this.minVel) {
      this.vel = Math.abs(this.dragVel);
      this.dir = this.dragVel > 0 ? 1 : -1;
    } else {
      this.vel = 90;
    }
    this.animating = true;
    setTimeout(() => { this.recentDrag = false; }, 120);
  }

  private loop() {
    const now = performance.now();
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (this.animating && !this.dragging) {
      this.vel = this.vel > this.minVel ? this.vel * this.friction : Math.max(this.minVel, this.vel);
      this.pos += this.vel * this.dir * dt;
      const w = window.innerWidth;
      if (this.pos < -this.lineW) this.pos = w;
      else if (this.pos > w) this.pos = -this.lineW;
      this.el.style.transform = `translateX(${this.pos}px)`;
    }
    this.rafMove = requestAnimationFrame(() => this.loop());
  }

  private clipLoop() {
    this.updateClip();
    this.rafClip = requestAnimationFrame(() => this.clipLoop());
  }

  updateClip() {
    // On mobile (<768px), move scanner to 30% of screen width to leave room for cards.
    // On desktop, keep it centered at 50%.
    const isMobile = window.innerWidth < 1024;
    const cx = isMobile ? window.innerWidth * 0.35 : window.innerWidth / 2;
    const sw = 8;
    const sl = cx - sw / 2;
    const sr = cx + sw / 2;
    let scanning = false;

    // If mobile, keep all cards fully normal, no ASCII clipping effect at all.
    if (isMobile) {
      document.querySelectorAll<HTMLElement>(".scanner-card-wrapper").forEach((w) => {
        const n = w.querySelector<HTMLElement>(".scanner-card-normal");
        const a = w.querySelector<HTMLElement>(".scanner-card-ascii");
        if (!n || !a) return;
        n.style.setProperty("--clip-right", "0%");
        a.style.setProperty("--clip-left", "0%");
        w.classList.remove("scanner-card-scanned");
      });
      (window as any).__setScannerActive?.(false);
      return;
    }

    document.querySelectorAll<HTMLElement>(".scanner-card-wrapper").forEach((w) => {
      const r = w.getBoundingClientRect();
      const n = w.querySelector<HTMLElement>(".scanner-card-normal");
      const a = w.querySelector<HTMLElement>(".scanner-card-ascii");
      if (!n || !a) return;
      if (r.left < sr && r.right > sl) {
        scanning = true;
        const iL = Math.max(sl - r.left, 0);
        const iR = Math.min(sr - r.left, r.width);
        n.style.setProperty("--clip-right", `${(iL / r.width) * 100}%`);
        a.style.setProperty("--clip-left", `${(iR / r.width) * 100}%`);
        w.classList.add("scanner-card-scanned");
      } else if (r.right < sl) {
        n.style.setProperty("--clip-right", "100%");
        a.style.setProperty("--clip-left", "100%");
        w.classList.add("scanner-card-scanned");
      } else {
        n.style.setProperty("--clip-right", "0%");
        a.style.setProperty("--clip-left", "0%");
        w.classList.remove("scanner-card-scanned");
      }
    });
    (window as any).__setScannerActive?.(scanning);
  }

  togglePlay() {
    this.animating = !this.animating;
    return this.animating;
  }

  flipDir() {
    this.dir *= -1;
  }

  private card(index: number): HTMLDivElement {
    const p = this.projects[index % this.projects.length];
    const wrap = document.createElement("div");
    wrap.className = "scanner-card-wrapper";

    // Normal card
    const normal = document.createElement("div");
    normal.className = "scanner-card-normal";
    if (p.imageUrl) {
      const img = document.createElement("img");
      img.className = "scanner-card-image";
      img.src = p.imageUrl;
      img.alt = this.t(p.titleKey);
      img.onerror = () => {
        img.remove();
        const ph = document.createElement("div");
        ph.className = "scanner-card-placeholder";
        normal.insertBefore(ph, normal.firstChild);
      };
      normal.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "scanner-card-placeholder";
      normal.appendChild(ph);
    }

    const overlay = document.createElement("div");
    overlay.className = "scanner-card-overlay";
    const title = document.createElement("span");
    title.className = "scanner-card-title";
    title.textContent = this.t(p.titleKey);
    const tags = document.createElement("div");
    tags.className = "scanner-card-tags";
    p.tags.slice(0, 3).forEach((tag) => {
      const s = document.createElement("span");
      s.className = "scanner-card-tag";
      s.textContent = tag;
      tags.appendChild(s);
    });
    overlay.appendChild(title);
    overlay.appendChild(tags);
    normal.appendChild(overlay);

    if (p.liveUrl && p.liveUrl !== "#") {
      const lnk = document.createElement("a");
      lnk.href = p.liveUrl;
      lnk.target = "_blank";
      lnk.rel = "noopener noreferrer";
      lnk.className = "scanner-card-link";
      lnk.textContent = "\u2197";
      lnk.addEventListener("click", (e) => e.stopPropagation());
      normal.appendChild(lnk);
    }

    // Click to expand (only if not a drag)
    wrap.addEventListener("click", () => {
      if (this.recentDrag) return;
      document.dispatchEvent(new CustomEvent("scanner-card-selected", {
        detail: {
          titleKey: p.titleKey,
          descKey: p.descKey,
          tags: p.tags,
          liveUrl: p.liveUrl,
          imageUrl: p.imageUrl,
          credentials: p.credentials,
        },
      }));
    });

    // ASCII card
    const ascii = document.createElement("div");
    ascii.className = "scanner-card-ascii";
    const content = document.createElement("div");
    content.className = "scanner-ascii-content";
    content.textContent = generateCodeBlock(Math.floor(400 / 6), Math.floor(240 / 13));
    ascii.appendChild(content);

    wrap.appendChild(normal);
    wrap.appendChild(ascii);
    return wrap;
  }

  private populate() {
    this.el.innerHTML = "";
    for (let i = 0; i < 28; i++) this.el.appendChild(this.card(i));
  }

  destroy() {
    cancelAnimationFrame(this.rafMove);
    cancelAnimationFrame(this.rafClip);
    document.removeEventListener("mousemove", this.onMM);
    document.removeEventListener("mouseup", this.onMU);
    document.removeEventListener("touchmove", this.onTM);
    document.removeEventListener("touchend", this.onTE);
    window.removeEventListener("resize", this.onResize);
  }
}

/* ── ParticleScanner ─────────────────────────────────── */
interface ScanParticle {
  x: number; y: number; vx: number; vy: number;
  radius: number; alpha: number; decay: number;
  originalAlpha: number; life: number; time: number;
  twinkleSpeed: number; twinkleAmount: number;
}

class ParticleScanner {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private w: number;
  private h = 300;
  private particles: { [k: number]: ScanParticle } = {};
  private count = 0;
  private maxParticles = 800;
  private intensity = 0.8;
  private lightBarX: number;
  private lightBarWidth = 3;
  private fadeZone = 60;
  private scanningActive = false;
  private readonly baseIntensity = 0.8;
  private readonly baseMaxParticles = 800;
  private readonly baseFadeZone = 60;
  private readonly scanTargetIntensity = 1.8;
  private readonly scanTargetParticles = 2500;
  private readonly scanTargetFadeZone = 35;
  private currentIntensity = 0.8;
  private currentMaxParticles = 800;
  private currentFadeZone = 60;
  private readonly transitionSpeed = 0.05;
  private currentGlowIntensity = 1;
  private gradCanvas: HTMLCanvasElement;
  private primaryHSL = "170 80% 50%"; // fallback, overridden in constructor
  private animId = 0;
  private onResizeFn: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.w = window.innerWidth;
    const isMobile = window.innerWidth < 1024;
    this.lightBarX = isMobile ? window.innerWidth * 0.35 : window.innerWidth / 2;
    this.onResizeFn = () => this.resize();
    this.gradCanvas = document.createElement("canvas");
    // Read primary color from CSS variable
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
    if (raw) this.primaryHSL = raw;
    this.setupCanvas();
    this.createGradCache();
    this.initParticles();
    this.animate();
    window.addEventListener("resize", this.onResizeFn);
  }

  private setupCanvas() {
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  private resize() {
    this.w = window.innerWidth;
    const isMobile = window.innerWidth < 1024;
    this.lightBarX = isMobile ? window.innerWidth * 0.35 : window.innerWidth / 2;
    this.setupCanvas();
  }

  private createGradCache() {
    this.gradCanvas.width = 16;
    this.gradCanvas.height = 16;
    const gc = this.gradCanvas.getContext("2d")!;
    const half = 8;
    const g = gc.createRadialGradient(half, half, 0, half, half, half);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, `hsl(${this.primaryHSL} / 0.8)`);
    g.addColorStop(0.7, `hsl(${this.primaryHSL} / 0.4)`);
    g.addColorStop(1, "transparent");
    gc.fillStyle = g;
    gc.beginPath();
    gc.arc(half, half, half, 0, Math.PI * 2);
    gc.fill();
  }

  private rnd(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private newParticle(): ScanParticle {
    const ir = this.intensity / this.baseIntensity;
    const sm = 1 + (ir - 1) * 1.2;
    return {
      x: this.lightBarX + this.rnd(-this.lightBarWidth / 2, this.lightBarWidth / 2),
      y: this.rnd(0, this.h),
      vx: this.rnd(0.2, 1.0) * sm,
      vy: this.rnd(-0.15, 0.15) * sm,
      radius: this.rnd(0.4, 1.0) * (1 + (ir - 1) * 0.7),
      alpha: this.rnd(0.6, 1),
      decay: this.rnd(0.005, 0.025) * (2 - ir * 0.5),
      originalAlpha: 0,
      life: 1.0,
      time: 0,
      twinkleSpeed: this.rnd(0.02, 0.08) * sm,
      twinkleAmount: this.rnd(0.1, 0.25),
    };
  }

  private initParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.newParticle();
      p.originalAlpha = p.alpha;
      this.count++;
      this.particles[this.count] = p;
    }
  }

  private updateParticle(p: ScanParticle) {
    p.x += p.vx; p.y += p.vy; p.time++;
    p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
    p.life -= p.decay;
    if (p.x > this.w + 10 || p.life <= 0) {
      p.x = this.lightBarX + this.rnd(-this.lightBarWidth / 2, this.lightBarWidth / 2);
      p.y = this.rnd(0, this.h);
      p.vx = this.rnd(0.2, 1.0); p.vy = this.rnd(-0.15, 0.15);
      p.alpha = this.rnd(0.6, 1); p.originalAlpha = p.alpha;
      p.life = 1.0; p.time = 0;
    }
  }

  private drawParticle(p: ScanParticle) {
    if (p.life <= 0) return;
    let fade = 1;
    if (p.y < this.fadeZone) fade = p.y / this.fadeZone;
    else if (p.y > this.h - this.fadeZone) fade = (this.h - p.y) / this.fadeZone;
    fade = Math.max(0, Math.min(1, fade));
    this.ctx.globalAlpha = p.alpha * fade;
    this.ctx.drawImage(this.gradCanvas, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
  }

  private drawLightBar() {
    const vg = this.ctx.createLinearGradient(0, 0, 0, this.h);
    vg.addColorStop(0, "transparent");
    vg.addColorStop(0.15, "rgba(255,255,255,1)");
    vg.addColorStop(0.85, "rgba(255,255,255,1)");
    vg.addColorStop(1, "transparent");

    this.ctx.globalCompositeOperation = "lighter";
    const target = this.scanningActive ? 3.5 : 1;
    this.currentGlowIntensity += (target - this.currentGlowIntensity) * this.transitionSpeed;
    const gi = this.currentGlowIntensity;
    const lw = this.lightBarWidth;
    const lx = this.lightBarX;

    // Core white bar
    const cg = this.ctx.createLinearGradient(lx - lw / 2, 0, lx + lw / 2, 0);
    cg.addColorStop(0, "rgba(255,255,255,0)");
    cg.addColorStop(0.5, `rgba(255,255,255,${Math.min(1, gi)})`);
    cg.addColorStop(1, "rgba(255,255,255,0)");
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = cg;
    this.ctx.beginPath();
    this.ctx.roundRect(lx - lw / 2, 0, lw, this.h, 15);
    this.ctx.fill();

    // Primary color glow 1
    const g1 = this.ctx.createLinearGradient(lx - lw * 2, 0, lx + lw * 2, 0);
    g1.addColorStop(0, `hsl(${this.primaryHSL} / 0)`);
    g1.addColorStop(0.5, `hsl(${this.primaryHSL} / ${Math.min(0.8, 0.8 * gi)})`);
    g1.addColorStop(1, `hsl(${this.primaryHSL} / 0)`);
    this.ctx.globalAlpha = this.scanningActive ? 1 : 0.8;
    this.ctx.fillStyle = g1;
    this.ctx.beginPath();
    this.ctx.roundRect(lx - lw * 2, 0, lw * 4, this.h, 25);
    this.ctx.fill();

    // Primary color glow 2
    const g2 = this.ctx.createLinearGradient(lx - lw * 4, 0, lx + lw * 4, 0);
    g2.addColorStop(0, `hsl(${this.primaryHSL} / 0)`);
    g2.addColorStop(0.5, `hsl(${this.primaryHSL} / ${Math.min(0.4, 0.4 * gi)})`);
    g2.addColorStop(1, `hsl(${this.primaryHSL} / 0)`);
    this.ctx.globalAlpha = this.scanningActive ? 0.8 : 0.6;
    this.ctx.fillStyle = g2;
    this.ctx.beginPath();
    this.ctx.roundRect(lx - lw * 4, 0, lw * 8, this.h, 35);
    this.ctx.fill();

    // Clip to fade at top/bottom
    this.ctx.globalCompositeOperation = "destination-in";
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = vg;
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  private render() {
    const tI = this.scanningActive ? this.scanTargetIntensity : this.baseIntensity;
    const tP = this.scanningActive ? this.scanTargetParticles : this.baseMaxParticles;
    const tF = this.scanningActive ? this.scanTargetFadeZone : this.baseFadeZone;
    this.currentIntensity += (tI - this.currentIntensity) * this.transitionSpeed;
    this.currentMaxParticles += (tP - this.currentMaxParticles) * this.transitionSpeed;
    this.currentFadeZone += (tF - this.currentFadeZone) * this.transitionSpeed;
    this.intensity = this.currentIntensity;
    this.maxParticles = Math.floor(this.currentMaxParticles);
    this.fadeZone = this.currentFadeZone;

    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.drawLightBar();
    this.ctx.globalCompositeOperation = "lighter";

    for (let i = 1; i <= this.count; i++) {
      if (this.particles[i]) { this.updateParticle(this.particles[i]); this.drawParticle(this.particles[i]); }
    }

    const ir = this.intensity / this.baseIntensity;
    const spawnChances = [
      this.intensity > 0,
      ir > 1.1 && Math.random() < (ir - 1) * 1.2,
      ir > 1.3 && Math.random() < (ir - 1.3) * 1.4,
      ir > 1.5 && Math.random() < (ir - 1.5) * 1.8,
      ir > 2.0 && Math.random() < (ir - 2.0) * 2.0,
    ];
    spawnChances.forEach((should, i) => {
      if (should && this.count < this.maxParticles && (i === 0 ? Math.random() < this.intensity : true)) {
        const p = this.newParticle();
        p.originalAlpha = p.alpha;
        this.count++;
        this.particles[this.count] = p;
      }
    });

    if (this.count > this.maxParticles + 200) {
      const excess = Math.min(15, this.count - this.maxParticles);
      for (let i = 0; i < excess; i++) delete this.particles[this.count - i];
      this.count -= excess;
    }
  }

  private animate() {
    this.render();
    this.animId = requestAnimationFrame(() => this.animate());
  }

  setScanningActive(active: boolean) {
    this.scanningActive = active;
  }

  destroy() {
    cancelAnimationFrame(this.animId);
    window.removeEventListener("resize", this.onResizeFn);
  }
}

/* ── React Component ─────────────────────────────────── */
interface SelectedProject {
  titleKey: string;
  descKey: string;
  tags: string[];
  liveUrl?: string;
  imageUrl?: string;
  credentials?: { email: string; password: string };
}

const Portfolio = () => {
  const { t, lang } = useI18n();
  const cardLineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctrlRef = useRef<CardStreamController | null>(null);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<SelectedProject | null>(null);

  useEffect(() => {
    if (!cardLineRef.current || !canvasRef.current) return;
    const ctrl = new CardStreamController(cardLineRef.current, projects, t);
    const scanner = new ParticleScanner(canvasRef.current);
    ctrlRef.current = ctrl;
    (window as any).__setScannerActive = (a: boolean) => scanner.setScanningActive(a);

    const onSelected = (e: Event) => {
      const data = (e as CustomEvent).detail as SelectedProject;
      setSelected(data);
      ctrl.togglePlay(); // pause while viewing
      setPaused(true);
    };
    document.addEventListener("scanner-card-selected", onSelected);

    return () => {
      ctrl.destroy();
      scanner.destroy();
      document.removeEventListener("scanner-card-selected", onSelected);
      delete (window as any).__setScannerActive;
    };
  }, [lang]); // re-run when language changes

  const closeOverlay = () => {
    setSelected(null);
    if (paused) {
      ctrlRef.current?.togglePlay();
      setPaused(false);
    }
  };

  return (
    <section id="portfolio" className="py-24">
      {/* Heading */}
      <motion.div
        className="max-w-5xl mx-auto px-6 mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-primary text-sm mb-2">{t("portfolio.comment")}</p>
        <h2 className="text-3xl md:text-4xl font-bold font-mono">{t("portfolio.heading")}</h2>
      </motion.div>

      {/* Scanner strip */}
      <motion.div
        className="scanner-section-strip"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <canvas ref={canvasRef} className="scanner-canvas" />
        <div className="scanner-card-stream">
          <div ref={cardLineRef} className="scanner-card-line" />
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="scanner-controls"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button
          className="scanner-control-btn"
          onClick={() => {
            const running = ctrlRef.current?.togglePlay();
            setPaused(!running);
          }}
        >
          {paused ? "▶ Play" : "⏸ Pause"}
        </button>
        <button
          className="scanner-control-btn"
          onClick={() => ctrlRef.current?.flipDir()}
        >
          ↔ Direction
        </button>
      </motion.div>

      {/* Expanded project overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeOverlay}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Card panel */}
            <motion.div
              className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-border"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image with dark filter */}
              <div className="relative aspect-video overflow-hidden">
                {selected.imageUrl ? (
                  <img
                    src={selected.imageUrl}
                    alt={t(selected.titleKey)}
                    className="w-full h-full object-cover object-top brightness-40"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary" />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                {/* Title on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-mono font-bold text-xl text-white drop-shadow">{t(selected.titleKey)}</h3>
                </div>
              </div>

              {/* Info */}
              <div className="bg-card p-5 flex flex-col gap-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{t(selected.descKey)}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Credentials */}
                {selected.credentials && (
                  <div className="font-mono text-xs bg-muted/50 rounded-lg p-3 border border-border flex flex-col gap-1">
                    <span className="text-primary font-semibold mb-1">{t("project.demo.credentials")}</span>
                    <span className="text-muted-foreground">📧 {selected.credentials.email}</span>
                    <span className="text-muted-foreground">🔑 {selected.credentials.password}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  {selected.liveUrl && selected.liveUrl !== "#" && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center font-mono text-xs px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {t("project.action.visit")}
                    </a>
                  )}
                  <button
                    onClick={closeOverlay}
                    className="flex-1 font-mono text-xs px-4 py-2.5 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  >
                    {t("project.action.close")}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;

