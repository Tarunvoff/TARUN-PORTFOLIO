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
5. Configure redirect URLs for your domain

### Environment Variables
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Configure build settings (auto-detected for Vite)
4. Deploy and configure custom domain if needed

## 📱 User Experience

### Responsive Design
- Mobile-first approach with responsive breakpoints
- Touch-friendly interface for mobile devices
- Optimized for various screen sizes

### Performance
- Fast loading with Vite's optimized builds
- Code splitting for better performance
- Image optimization and lazy loading
- CDN delivery via Vercel Edge Network

### Accessibility
- WCAG compliant components from shadcn/ui
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support

## 🔒 Security Features

- **Authentication**: Secure JWT-based authentication
- **Authorization**: Role-based access control
- **Data Protection**: Row Level Security on all database operations
- **Input Validation**: Client and server-side validation
- **File Upload Security**: Secure file handling with type validation
- **HTTPS**: SSL/TLS encryption for all communications

## 🚀 Deployment

### Production Deployment
The application is automatically deployed to Vercel when changes are pushed to the main branch.

### Manual Deployment
```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

### Environment Configuration
Ensure all environment variables are set in your deployment platform:
- Production environment variables in Vercel
- Supabase project configuration
- Domain and redirect URL setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the Supabase documentation for backend-related questions

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added real-time updates and improved UX
- **v1.2.0** - Enhanced admin features and mobile optimization

---

Built with ❤️ for a sustainable future 🌍