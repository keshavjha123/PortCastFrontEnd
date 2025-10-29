# 🚀 PortCast API Explorer

A beautiful, modern React application built with TypeScript and Tailwind CSS that provides an interactive interface for exploring the PortCast API endpoints.

![PortCast API Explorer](https://img.shields.io/badge/React-v18.3.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-v5.9.3-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4.0-blue)

## ✨ Features

### 🎨 Beautiful UI/UX
- **Dark Mode Support** - Toggle between light and dark themes with smooth transitions
- **Glass Morphism Design** - Modern frosted glass effects with backdrop blur
- **Responsive Layout** - Fully responsive design that works on all devices
- **Smooth Animations** - Elegant fade-in and slide-in animations
- **Loading States** - Beautiful loading spinners and skeleton screens
- **Error Handling** - Comprehensive error states with retry functionality

### 🔌 API Integration
- **Health Check** - Monitor API status, database connectivity, and version info
- **Fetch Paragraphs** - Retrieve random generated paragraphs from the API
- **Smart Search** - Search paragraphs with AND/OR operators
- **Word Frequency Analysis** - Get top 10 most frequent words with definitions and pronunciations

### 🛠 Technical Excellence
- **Modular Architecture** - Clean separation of concerns with custom hooks
- **TypeScript** - Full type safety throughout the application  
- **Custom Hooks** - Reusable hooks for each API endpoint
- **Error Boundaries** - Graceful error handling at component level
- **Performance Optimized** - Efficient re-renders and state management

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # App header with dark mode toggle
│   ├── HealthCheck.tsx  # Health status component
│   ├── FetchParagraph.tsx # Paragraph fetching component
│   ├── SearchParagraphs.tsx # Search interface
│   ├── WordFrequency.tsx # Word analysis component
│   ├── LoadingSpinner.tsx # Loading components
│   ├── ErrorCard.tsx    # Error display component
│   └── index.ts         # Component exports
├── hooks/               # Custom React hooks
│   ├── useHealth.ts     # Health check hook
│   ├── useFetchParagraph.ts # Paragraph fetching hook
│   ├── useSearch.ts     # Search functionality hook
│   ├── useWordFrequency.ts # Word analysis hook
│   ├── useDarkMode.ts   # Dark mode management hook
│   └── index.ts         # Hook exports
├── types/               # TypeScript type definitions
│   └── api.ts          # API response types
├── utils/               # Utility functions
│   └── api.ts          # API client and utilities
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## 🎯 API Endpoints

### 1. Health Check
```bash
GET /health
```
- Returns API status, database connectivity, version, and timestamp
- Displays connection status with colored indicators

### 2. Fetch Paragraph
```bash
POST /fetch
```
- Generates and returns a random paragraph
- Shows paragraph ID, creation timestamp, and full text
- Scrollable text area for long content

### 3. Search Paragraphs
```bash
POST /search
```
- Search with multiple words using AND/OR operators
- Interactive form with word input and operator selection
- Results show matching paragraphs with highlighting

### 4. Word Frequency
```bash
GET /frequency
```
- Returns top 10 most frequent words across all paragraphs
- Displays word definitions, pronunciations, and part of speech
- Beautiful card layout with frequency indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+ (recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portcast
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

## 🎨 Customization

### Themes
The application supports both light and dark themes. You can customize the color palette in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        600: '#0284c7',
        // ... more colors
      }
    }
  }
}
```

### API Base URL
Update the API base URL in `src/utils/api.ts`:

```typescript
const API_BASE_URL = 'https://your-api-domain.com';
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **ESLint** - Configured with React and TypeScript rules
- **TypeScript** - Strict mode enabled for better type safety
- **Prettier** - Code formatting (configure as needed)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🌟 Key Features Showcase

### Dark Mode
- Persistent theme selection (saved to localStorage)
- System preference detection
- Smooth transitions between themes
- All components support both themes

### Loading States
- Skeleton screens during data fetching
- Animated loading spinners
- Disabled states for buttons during operations
- Progress indicators for long operations

### Error Handling
- Network error detection and display
- Retry functionality for failed requests
- User-friendly error messages
- Graceful degradation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PortCast API** - For providing the backend API
- **Tailwind CSS** - For the amazing utility-first CSS framework
- **React** - For the component-based architecture
- **Vite** - For the lightning-fast development experience

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**