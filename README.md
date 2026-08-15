# Xpeed POS — offline–online sync

Cross-platform point-of-sale for restaurants and retailers: live table tracking,
order and inventory management, expense and salary tracking, and printed receipts —
built so sales keep flowing when the network drops.

Built at XpeedLab (2023–2024). This repository holds the desktop client; the full
production system is private.

## The problem

A restaurant terminal cannot stop taking orders because the internet did. Every
write has to succeed locally first, then reconcile with the server once the
connection returns — without losing or duplicating an order.

## Architecture

```
src/
  main/                    Electron main process
    services/              Auth · Database · Order · cash · customer · expense · product
    utils/encrypt.ts       credential encryption
  renderer/                React UI
    features/              orders · products · purchase · expense · report · closing
    context/               8 providers — cart, orders, inventory, auth, settings, salary
    guards/                route guards for authed / unauthed states
    hooks/useOnlineStatus  connectivity detection driving sync behaviour
    utils/print.utils      receipt and kitchen-ticket printing
    types/                 typed domain models — order, product, table, customer
```

Local writes go through the service layer in the main process against SQLite;
the renderer stays isolated and talks over IPC. `useOnlineStatus` drives whether
the app queues writes or syncs them through.

## Stack

Electron · React · TypeScript · SQLite · Tailwind CSS

## Running locally

```bash
npm install
npm start
```

Packaging a distributable:

```bash
npm run package
```
