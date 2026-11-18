# Tideline — The Lantern Post

An original offline nautical puzzle. Rotate currents, collect three lanterns and return to harbor before fuel or hull runs out. Three hand-tuned voyages, procedural vector art and generated sound; no external assets, libraries, fonts or network services.

Serve game/ with any static server, then open index.html in a desktop browser. Click arrows to rotate them, Space to sail, arrow keys to select a cell and R to rotate. The field guide explains scoring and controls. Start, win/loss, next voyage and restart are all playable.

main.ts runs on Node 22.18+ and deterministically copies game/ and screenshots/ into MAKEFUN_OUTPUT_DIR (default /output), then writes the official dossier. vendor/makefun-game.ts is copied unchanged from the official kit.

MIT license. Created in a native Codex session using gpt-6.1-sol.
