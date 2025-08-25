# 🏙️ CityPulse - Urban Growth & Infrastructure Tracker

A comprehensive platform for monitoring urban development, traffic patterns, and infrastructure projects. Built with modern web technologies and designed for both citizens and city officials.

## 🌟 Features

- **Interactive City Maps** - Real-time traffic and infrastructure visualization
- **Citizen Dashboard** - Report issues, view alerts, and track city projects
- **Official Interface** - Comprehensive analytics and project management tools
- **Real-time Updates** - Live data feeds and notifications
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## 🏗️ Project Structure

```
citypulse-urban-growth-tracker/
├── public/                    # 🚀 GitHub Pages Frontend (Static Files)
│   ├── index.html            # Main entry point
│   ├── *.html                # All HTML pages
│   ├── *.css                 # Stylesheets
│   ├── *.js                  # JavaScript files
│   └── assets/               # Images, videos, and media files
│
├── backend/                   # 🔧 Backend Server
│   ├── server.js             # Main Express server
│   └── server/               # User authentication server
│       ├── index.js          # User routes and logic
│       └── package.json      # Backend dependencies
│
├── src/                      # 📁 Source code organization (for future React migration)
│   ├── components/           # Reusable UI components
│   ├── pages/                # Page components
│   └── services/             # API and service functions
│
├── .github/                  # 🤖 GitHub Actions
│   └── workflows/
│       └── deploy.yml        # Automatic deployment to GitHub Pages
│
├── package.json              # Main project configuration
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ayush/citypulse-urban-growth-tracker.git
   cd citypulse-urban-growth-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🌐 Deployment

### GitHub Pages (Frontend)
The frontend automatically deploys to GitHub Pages when you push to the main branch.

**Manual Deployment:**
```bash
npm run deploy
```

**Automatic Deployment:**
- Push to main branch
- GitHub Actions will automatically build and deploy
- Your site will be available at: `https://ayush.github.io/citypulse-urban-growth-tracker/`

### Backend Deployment
The backend can be deployed to:
- Heroku
- Render
- Railway
- Firebase Functions
- Any Node.js hosting platform

## 🛠️ Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build frontend (currently static files)
- `npm run deploy` - Deploy to GitHub Pages

### Adding New Features
1. **Frontend**: Add HTML/CSS/JS files to the `public/` directory
2. **Backend**: Extend the Express server in `backend/server.js`
3. **Database**: Configure MongoDB connection in backend files

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Database Setup
1. Set up MongoDB database
2. Update connection string in backend configuration
3. Run database migrations if needed

## 📱 Pages

- **Homepage** (`/`) - Main landing page with city overview
- **Dashboard** (`/dashboard.html`) - Official analytics and metrics
- **Infrastructure** (`/Infrastructure.html`) - Infrastructure project tracking
- **Real Estate** (`/Real Estate.html`) - Property development monitoring
- **Traffic Patterns** (`/Traffic Patterns Interface.html`) - Real-time traffic data
- **Growth Metrics** (`/Growth Metrics Interface.html`) - Urban development analytics
- **Settings** (`/setting.html`) - User preferences and configuration
- **Signup/Login** (`/singup.html`, `/simple_signup.html`) - User authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
1. Check the [Troubleshooting Guide](TROUBLESHOOTING_SIGNUP.md)
2. Review [System Status](SYSTEM_STATUS.md)
3. Open an issue on GitHub

## 🌟 Acknowledgments

- Built for urban development and smart city initiatives
- Designed with accessibility and user experience in mind
- Powered by modern web technologies and real-time data

---

**Made with ❤️ for better cities and communities**
