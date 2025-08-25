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
├── backend/                   # 🔧 Backend + Frontend projects
│   ├── maps/
│   │   ├── web/              # 🚀 Vite + React app (deployed to GitHub Pages)
│   │   │   ├── src/
│   │   │   └── dist/         # Build output published by Pages workflow
│   │   ├── server/           # Map-related API (Express)
│   │   └── mobile/           # Expo React Native app
│   └── server/               # Core API (Express)
│
├── archive/                  # Legacy static sites moved here (if present)
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automatic deployment to GitHub Pages
├── package.json
└── README.md
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

2. Install dependencies (root only needed for backend and tooling):
   ```bash
   npm install
   ```

3. Start the frontend (Vite + React):
   ```bash
   cd backend/maps/web
   npm ci
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🌐 Deployment

### GitHub Pages (Frontend)
The Vite React app in `backend/maps/web` is deployed via GitHub Actions. On push to `main`, the workflow builds the app and publishes `backend/maps/web/dist` to Pages.

- Push to `main`
- Workflow: `.github/workflows/deploy.yml`
- Output URL: `https://ayush.github.io/citypulse-urban-growth-tracker/`

### Backend Deployment
The backend can be deployed to:
- Heroku
- Render
- Railway
- Firebase Functions
- Any Node.js hosting platform

## 🛠️ Development

### Available Scripts
- Root: `npm start` (backend), `npm run dev` (backend dev)
- Frontend (from `backend/maps/web`): `npm run dev`, `npm run build`, `npm run preview`

### Adding New Features
1. **Frontend**: Implement in `backend/maps/web/src` (Vite + React)
2. **Backend**: Extend Express servers under `backend/server` or `backend/maps/server`
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

## 📱 Frontend App

The production site is the Vite app in `backend/maps/web`. Legacy static pages have been archived under `archive/`.

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
