# Green11-main

**Description:** No description provided.

## README

# Green11 - Sustainable Challenge Platform

A gamified sustainability platform that encourages eco-friendly actions through challenges, rewards, and community engagement. Built with modern web technologies and real-time data synchronization.

## 🌱 Live Demo

**Production URL**: [https://green11.vercel.app](https://green11.vercel.app)

## 🏗️ Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui for consistent, accessible components
- **State Management**: TanStack Query for server state management
- **Routing**: React Router v6 for client-side navigation
- **Authentication**: Supabase Auth with PKCE flow

### Backend & Database
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth with email/password and OAuth
- **Real-time**: Supabase Realtime for live updates
- **File Storage**: Supabase Storage for user uploads
- **API**: RESTful APIs built with Supabase client

### Deployment
- **Hosting**: Vercel for frontend deployment
- **CDN**: Vercel Edge Network for global performance
- **Environment**: Production, Preview, and Development environments
- **CI/CD**: Automatic deployments from GitHub main branch

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup, login, and password reset
- **Challenge System**: Create, participate in, and track sustainability challenges
- **Rewards Marketplace**: Redeem earned Green Points for rewards
- **Leaderboard**: Real-time rankings and community competition
- **Profile Management**: User profiles with avatar upload and settings
- **Activity Feed**: Live updates of community actions and achievements

### Admin Features
- **Content Management**: Create and manage challenges and rewards
- **Submission Moderation**: Approve or reject user challenge submissions
- **Analytics Dashboard**: Monitor platform engagement and user activity

### Real-time Features
- **Live Updates**: Instant notifications for new activities and changes
- **Real-time Leaderboard**: Rankings update automatically
- **Live Activity Feed**: See community actions as they happen

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn package manager
- Git for version control

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sreejesh06/Green11.git
   cd Green11
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🗄️ Database Schema

### Core Tables
- **profiles** - User profiles with points and settings
- **challenges** - Sustainability challenges with points and deadlines
- **submissions** - User challenge submissions with proof
- **rewards** - Marketplace items available for redemption
- **activities** - User actions and system events
- **redemptions** - Reward redemption history

### Security
- Row Level Security (RLS) enabled on all tables
- User-specific data access controls
- Admin role-based permissions
- Secure file upload with access controls

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the provided SQL schema
3. Configure Row Level Security policies
4. Set up authentication providers
5. Configure redirect URLs for your
