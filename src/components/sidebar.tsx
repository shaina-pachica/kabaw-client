'use client';

import { Sparkles } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="relative w-1/4 border-r border-border bg-card/30 backdrop-blur-xl">
      <div className="flex h-full flex-col items-center justify-center gap-8 px-8 py-12">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-2xl bg-primary/20 blur-xl" />
          {/* <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-primary/80 to-primary ring-2 ring-primary/30"> */}
            {/* <img
              src="/starcow.png"
              alt="App Logo"
              width={180}
              height={180}
              className=""
            /> */}
          {/* </div> */}
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">
            test.ai
          </h1>
          <div className="h-1 w-16 mx-auto rounded-full bg-linear-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-balance text-sm leading-relaxed text-muted-foreground">
            AI-powered conversational assistant designed to enhance your
            communication experience with intelligent, real-time responses.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <p className="text-xs text-muted-foreground">
                Real-time messaging
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <p className="text-xs text-muted-foreground">
                AI-enhanced responses
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
              <p className="text-xs text-muted-foreground">
                Seamless connectivity
              </p>
            </div>
          </div>
        </div>

        {/* Optional: Personal note section */}
        <div className="mt-auto text-center">
          <div className="rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground">
              Built with passion for intelligent interactions
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
