# SportsBet Pro - Modern Sports Betting Website

A full-featured, responsive sports betting website built with Next.js, Tailwind CSS, and Framer Motion. Features a modern dark theme with green and yellow accents, similar to premium betting platforms.

## 🚀 Features

### Core Functionality
- **Homepage** - Dynamic hero section, featured events, popular sports, and live betting preview
- **Sports Page** - Comprehensive sports categories with filtering and search
- **Live Betting** - Real-time odds updates and match statistics
- **User Authentication** - Login/signup with form validation
- **User Dashboard** - Balance tracking, active bets, and bet history
- **Responsive Design** - Mobile-first approach with seamless desktop experience

### Design & UX
- **Dark Theme** - Modern dark UI with green (#22c55e) and yellow (#eab308) accents
- **Animations** - Smooth transitions and micro-interactions using Framer Motion
- **Card-based Layout** - Clean, organized content presentation
- **Modern Typography** - Inter font for excellent readability
- **Interactive Elements** - Hover effects, loading states, and visual feedback

### Technical Features
- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Advanced animations and transitions
- **Lucide React** - Beautiful, consistent icons
- **Mobile Responsive** - Optimized for all screen sizes

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage
│   ├── sports/            # Sports betting pages
│   ├── live/              # Live betting interface
│   ├── login/             # Authentication pages
│   └── dashboard/         # User dashboard
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Homepage hero section
│   ├── FeaturedEvents.tsx # Featured betting events
│   ├── PopularSports.tsx  # Sports categories grid
│   └── LiveBetting.tsx    # Live betting preview
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project dependencies
```

## 🎨 Design System

### Colors
- **Primary Green**: #22c55e (buttons, highlights, success states)
- **Accent Yellow**: #eab308 (secondary actions, warnings)
- **Dark Background**: #020617 (main background)
- **Card Background**: #1e293b (content cards)
- **Text**: White primary, gray-400 secondary

### Components
- **Buttons**: Rounded corners, hover effects, multiple variants
- **Cards**: Subtle borders, shadow effects, hover animations
- **Odds Buttons**: Interactive betting odds with hover states
- **Navigation**: Sticky header with mobile hamburger menu

## 📱 Pages Overview

### Homepage (`/`)
- Hero section with call-to-action buttons
- Featured events with live odds
- Popular sports grid
- Live betting preview section

### Sports (`/sports`)
- Filterable sports categories
- Search functionality
- Match listings with odds
- Responsive grid layout

### Live Betting (`/live`)
- Real-time odds updates
- Live match statistics
- Interactive match selection
- Streaming integration placeholders

### Authentication (`/login`)
- Toggle between login/signup
- Form validation
- Social login options
- Password visibility toggle

### Dashboard (`/dashboard`)
- Account balance and statistics
- Active bets tracking
- Bet history with results
- Quick action buttons

## 🔧 Customization

### Adding New Sports
Update the sports data in components to add new categories:

```typescript
const sports = [
  {
    name: 'Your Sport',
    icon: '🏆',
    matches: 42,
    color: 'from-blue-500 to-blue-600'
  }
]
```

### Modifying Theme Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
  }
}
```

### Adding Animations
Use Framer Motion for new animations:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Your content
</motion.div>
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npx vercel
```

## 📄 License

This project is for educational and demonstration purposes. Please ensure compliance with local gambling regulations before deploying any betting-related functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion