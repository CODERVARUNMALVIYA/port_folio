# 🌐 Deployment Guide - Portfolio Website

Complete guide to deploy your 3D MERN portfolio to production.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended for Frontend + Serverless)
### Option 2: Render (Full Stack - Free Tier)
### Option 3: Railway (Full Stack - Easy Setup)
### Option 4: AWS/DigitalOcean (Advanced)

---

## 📦 Option 1: Vercel Deployment

### Deploy Frontend (Client)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Build Client**
```bash
cd client
npm run build
```

3. **Deploy to Vercel**
```bash
cd client
vercel
```

4. **Environment Variables on Vercel**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add: `VITE_API_URL` = Your backend URL (from Render/Railway)

### Deploy Backend (Use Render for API)

Backend can't run on Vercel free tier, use Render instead (see Option 2).

---

## 🎨 Option 2: Render (Full Stack - FREE)

### Deploy Backend

1. **Create account on [Render.com](https://render.com)**

2. **Create New Web Service**
   - Connect your GitHub repo
   - Name: `portfolio-api`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**
   ```
   MONGO_URI=your-mongodb-atlas-connection-string
   NODE_ENV=production
   PORT=5000
   CLIENT_URL=https://your-frontend-url.vercel.app
   ADMIN_PASSWORD=your-admin-password
   ADMIN_SESSION_SECRET=long-random-session-secret
   ```

   `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` must be added in the hosting provider's environment settings. Do not rely on the local `server/.env` file; it is not deployed. `CLIENT_URL` must exactly match the deployed frontend origin, including `https://` and without a trailing slash.

4. **Get your backend URL**
   - Will be like: `https://portfolio-api.onrender.com`

### Deploy Frontend

1. **Update Client API URL**
   - Create `client/.env.production`:
   ```
   VITE_API_URL=https://portfolio-api.onrender.com
   ```

2. **Deploy on Vercel** (see Option 1) or **Render Static Site**

---

## 🚂 Option 3: Railway (Easiest Full Stack)

### Deploy Entire Project

1. **Create account on [Railway.app](https://railway.app)**

2. **Deploy Backend**
   - New Project → Deploy from GitHub
   - Select your repo
   - Root directory: `server`
   - Railway auto-detects Node.js
   - Add environment variables (see MongoDB Atlas section)

3. **Deploy Frontend**
   - Add new service
   - Root directory: `client`
   - Railway will auto-build Vite app

4. **Connect Services**
   - Get backend URL from Railway
   - Add `VITE_API_URL` in frontend environment variables

---

## 📊 MongoDB Atlas Setup (Required for Production)

1. **Create Free Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free M0 cluster

2. **Setup Database**
   - Create database: `portfolio`
   - Create user with password

3. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

4. **Whitelist IPs**
   - Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

5. **Use in Environment Variables**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio
   ```

---

## 🔧 Pre-Deployment Checklist

### Update These Files Before Deploy:

#### 1. `server/src/index.js`
Make sure it serves static files in production:
```javascript
// Already done! ✅
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
  })
}
```

#### 2. `client/vite.config.js`
Already configured correctly! ✅

#### 3. Environment Variables
Create these files:

**`server/.env.production`**
```env
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
NODE_ENV=production
CLIENT_URL=https://your-domain.com
ADMIN_PASSWORD=your-admin-password
ADMIN_SESSION_SECRET=long-random-session-secret
```

**`client/.env.production`**
```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🌍 Custom Domain Setup

### Vercel Custom Domain
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

### Render Custom Domain
1. Settings → Custom Domain
2. Add domain and configure DNS

---

## 🔒 Security Checklist

- ✅ Use HTTPS (automatic on Vercel/Render/Railway)
- ✅ Set `NODE_ENV=production`
- ✅ Add rate limiting (already has helmet + cors)
- ✅ Whitelist specific origins in CORS
- ✅ Use strong MongoDB password
- ✅ Don't commit `.env` files

---

## 📝 Adding Live Project Links

### Option A: In Seed Script

Edit `server/scripts/seed.js`:
```javascript
const sample = [
  { 
    title: 'Your Project Name',
    description: 'Description...',
    tech: ['React', 'Node.js'],
    link: 'https://your-live-project.vercel.app', // ← Add your live URL
    image: 'https://your-screenshot.jpg'
  }
]
```

Run seed on production:
```bash
node scripts/seed.js
```

### Option B: Via API (After Deploy)

Use Postman/Thunder Client to POST to your production API:
```
POST https://your-backend.onrender.com/api/projects
Content-Type: application/json

{
  "title": "My Live Project",
  "description": "Description",
  "tech": ["React", "Node.js"],
  "link": "https://my-project.vercel.app",
  "image": "https://screenshot-url.jpg"
}
```

---

## 🎯 Deployment Comparison

| Feature | Vercel | Render | Railway | AWS/DO |
|---------|--------|--------|---------|---------|
| **Free Tier** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ Paid |
| **Easy Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Full Stack** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ Manual |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ Free | ✅ Yes |

**Recommendation:** Use **Railway** or **Render** for easiest full-stack deployment!

---

## 🐛 Common Deployment Issues

### Issue 1: API Not Connecting
**Solution:** Check CORS settings in `server/src/index.js`:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
```

### Issue 2: 3D Models Not Loading
**Solution:** Make sure Three.js dependencies are in `dependencies`, not `devDependencies`

### Issue 3: MongoDB Connection Failed
**Solution:** 
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Make sure password doesn't have special characters (or URL encode them)

### Issue 4: Build Fails
**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Performance Optimization

### Frontend
- ✅ Vite builds optimized bundle automatically
- ✅ Code splitting enabled
- ✅ Three.js scenes are optimized
- Consider: Lazy loading components

### Backend
- ✅ Helmet for security headers
- ✅ Compression middleware (add if needed)
- Consider: Redis caching for projects

---

## 🎉 Post-Deployment

1. **Seed Your Projects**
```bash
node scripts/seed.js
```

2. **Test All Features**
- ✅ 3D animations working
- ✅ Projects loading
- ✅ Contact form submitting
- ✅ Navigation smooth
- ✅ Mobile responsive

3. **Update Social Links**
- Edit `Footer.jsx` with your real links
- Update resume PDF
- Add your profile images

4. **Analytics (Optional)**
- Add Google Analytics
- Add Vercel Analytics

---

## 📞 Need Help?

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

## 🎊 Your Portfolio is Ready!

**Share your live links:**
- Portfolio: `https://your-portfolio.vercel.app`
- GitHub: `https://github.com/yourusername/portfolio`
- LinkedIn: Update with live link

Made with ❤️ using MERN Stack + Three.js
