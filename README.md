# Contract Management Platform

A professional contract management platform built with React and TypeScript for creating, managing, and tracking contracts.

## Features

- User authentication (login/signup)
- Blueprint management (contract templates)
- Field library for reusable fields
- Contract creation and management
- Contract lifecycle tracking (Created → Approved → Sent → Signed → Locked)
- Professional dashboard with statistics
- Modern UI with gradient design

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Zustand (State Management)
- Tailwind CSS

## Installation

1. Clone the repository
```bash
git clone https://github.com/20220702007/contract-management-platform.git
cd contract-management-platform
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open browser
Navigate to `http://localhost:5173`

## Usage

1. Create an account on the login page
2. Create blueprints (templates) for contracts
3. Create contracts from blueprints
4. Manage contract status through lifecycle
5. View all contracts in the dashboard

## Project Structure

```
src/
├── components/    # UI components
├── pages/         # Page components
├── store/         # State management
├── utils/         # Utility functions
├── hooks/         # Custom hooks
└── types/         # TypeScript types
```

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## Data Storage

All data is stored in browser localStorage. No backend required.

## License

This project is for demonstration purposes.

## Author

20220702007
