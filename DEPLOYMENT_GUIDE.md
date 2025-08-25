# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your CityPulse project to GitHub Pages successfully.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Your CityPulse project ready

## 🔧 Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `citypulse-urban-growth-tracker`
5. Description: `CityPulse - Urban Growth & Infrastructure Tracker`
6. Make it **Public** (required for free GitHub Pages)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

### 2. Push Your Project to GitHub

Open your terminal/command prompt in your project directory and run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: CityPulse project structure"

# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/citypulse-urban-growth-tracker.git

# Push to main branch
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section (left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Branch: `main`
6. Folder: `/ (root)`
7. Click "Save"

### 4. Configure GitHub Actions (Automatic Deployment)

1. In your repository, go to "Actions" tab
2. You should see the workflow file we created
3. GitHub will automatically run it on your next push

### 5. Test Your Deployment

1. Wait a few minutes for GitHub to build and deploy
2. Your site will be available at:
   ```
   https://YOUR_USERNAME.github.io/citypulse-urban-growth-tracker/
   ```

## 🎯 Project Structure for GitHub Pages

```
citypulse-urban-growth-tracker/
├── public/                    # 🚀 This is your GitHub Pages root
│   ├── index.html            # Main entry point
│   ├── *.html                # All your HTML pages
│   ├── *.css                 # Stylesheets
│   ├── *.js                  # JavaScript files
│   ├── assets/               # Images and media
│   └── test.html             # Test page to verify deployment
│
├── backend/                   # 🔧 Backend server (not deployed to Pages)
├── src/                      # 📁 Source organization
├── .github/                  # 🤖 GitHub Actions
└── package.json              # Project configuration
```

## ✅ Verification Checklist

- [ ] Repository created on GitHub
- [ ] Project pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Source set to "main" branch, "/ (root)" folder
- [ ] Site accessible at the provided URL
- [ ] All pages load correctly
- [ ] Images and assets display properly
- [ ] Navigation between pages works

## 🔍 Troubleshooting

### Common Issues:

1. **404 Errors**: Make sure your `index.html` is in the root of the `public/` folder
2. **Broken Links**: Check that all file paths are relative (not absolute)
3. **Images Not Loading**: Verify assets are in the correct folder structure
4. **Build Failures**: Check GitHub Actions logs for errors

### File Path Rules:

✅ **Correct (Relative Paths):**
```html
<img src="./assets/logo.png">
<link rel="stylesheet" href="./style.css">
<a href="./dashboard.html">
```

❌ **Incorrect (Absolute Paths):**
```html
<img src="/assets/logo.png">
<link rel="stylesheet" href="/style.css">
<a href="/dashboard.html">
```

## 🚀 Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Push it to GitHub
4. Deploy to GitHub Pages

## 📱 Testing Your Deployed Site

1. **Desktop**: Test on different browsers
2. **Mobile**: Test responsive design
3. **Links**: Verify all navigation works
4. **Forms**: Test any interactive elements
5. **Performance**: Check loading times

## 🔄 Updating Your Site

After making changes:

```bash
git add .
git commit -m "Update: [describe your changes]"
git push origin main
```

GitHub Actions will automatically rebuild and deploy your site.

## 🌟 Success!

Once deployed, your CityPulse project will be accessible to anyone with the URL. Share it with your team, stakeholders, or the public!

---

**Need Help?** Check the [Troubleshooting Guide](TROUBLESHOOTING_SIGNUP.md) or open an issue on GitHub.
