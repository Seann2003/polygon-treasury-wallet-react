# polygon-treasury-wallet-react

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, React Router, and more.

## Stack

- **TypeScript**
- **React Router**
- **TailwindCSS**
- **shadcn/ui**
- **Turborepo**

## Architectural Decisions

### Monorepo Structure

This project uses **Turborepo** to manage a monorepo architecture, enabling code sharing and optimized builds across multiple applications and packages. The structure separates concerns:

- `apps/web` - Main web application
- `packages/config` - Shared TypeScript configuration

### State Management

**Zustand** is chosen for state management with persistence middleware:

- **Lightweight**: Minimal boilerplate compared to Redux
- **Persistence**: Client-side state (wallet connections, transactions) persists across sessions using localStorage
- **Type Safety**: Full TypeScript support with type inference
- **Separation**: Domain-specific stores (`wallet-store`, `transaction-store`) for clear boundaries

### Web3 Integration

**Wagmi** + **RainbowKit** provide the Web3 foundation:

- **Wagmi**: React hooks for Ethereum interactions with built-in caching and request deduplication
- **RainbowKit**: Pre-built wallet connection UI supporting multiple wallet providers
- **Multi-chain Support**: Configured for Polygon, Polygon Amoy, Ethereum Mainnet, and Sepolia testnets
- **SSR Disabled**: Client-side only rendering for Web3 compatibility

### Data Fetching

Blockchain data fetching is handled through **Wagmi hooks**, which internally use **TanStack Query**:

- **Wagmi Hooks**: All blockchain interactions use Wagmi's built-in hooks (e.g., `useAccount`, `getBalance`)
- **Automatic Caching**: Wagmi leverages TanStack Query internally for caching and request deduplication
- **No Direct Usage**: The application doesn't use TanStack Query directly; all queries go through Wagmi's abstraction layer
- **Custom Hooks**: Application-specific data fetching (token balances, transactions) uses `useState`/`useEffect` patterns with Wagmi's core functions

### Routing

**React Router v7** with file-based routing:

- **File-based Routes**: Routes defined in `src/routes/` directory
- **Type Safety**: Full TypeScript support with generated route types
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **SSR Ready**: Built for server-side rendering (currently disabled for Web3 compatibility)

### UI Architecture

**shadcn/ui** components built on **Radix UI** and **TailwindCSS**:

- **Accessible**: Radix UI primitives ensure WCAG compliance
- **Customizable**: TailwindCSS utilities for rapid styling
- **Composable**: Component-based architecture for reusability
- **Theme Support**: Dark mode enabled by default

### Custom Hooks Pattern

Business logic is encapsulated in custom hooks:

- **Separation of Concerns**: UI components remain presentational
- **Reusability**: Hooks can be shared across components
- **Testability**: Business logic isolated for easier testing
- **Examples**: `use-wallet`, `use-token-balances`, `use-transactions`, `use-send-tokens`

### Configuration-Driven Setup

Chain and token configurations are centralized:

- **Maintainability**: Easy to add/remove chains or tokens
- **Type Safety**: Configuration files are fully typed
- **Environment Variables**: WalletConnect project ID configurable via `VITE_WALLETCONNECT_PROJECT_ID`

## Getting Started

### Installation

First, install the dependencies:

```bash
bun install
```

### Running the Application

Run the development server:

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the web application.

