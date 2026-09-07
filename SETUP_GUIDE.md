# 🚀 3D Portfolio - MERN Stack

Modern, production-ready portfolio website with stunning Three.js 3D animations and glassmorphism UI.

## ✨ Features

- 🎨 **3D Animations** - Multiple Three.js scenes throughout the portfolio
- 🌙 **Dark Theme** - Professional dark UI with accent colors
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Optimized React + Vite setup
- 🔒 **Production Ready** - Docker, PM2, and nginx configs included
- 💼 **Contact Form** - Working contact API endpoint
- 📊 **Projects API** - Full CRUD for portfolio projects

## 🛠️ Tech Stack

### Frontend
- React 18
- Three.js + React Three Fiber
- Tailwind CSS
- Vite
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- ES Modules
- Winston Logger
- Helmet, CORS

### DevOps
- Docker
- PM2
- Nginx
- Git

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd port_folio
```

### 2. Setup Server
```bash
cd server
npm install

# Create .env file (already exists with defaults)
# Update MongoDB URI if needed
```

### 3. Setup Client
```bash
cd client
npm install
```

### 4. Seed Sample Projects (Optional)
```bash
cd server
node scripts/seed.js
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Server runs at: `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Client runs at: `http://localhost:5173`

### Production Build

**Build Client:**
```bash
cd client
npm run build
```

**Serve with Backend:**
```bash
cd server
npm start
```

## 📝 Adding Your Own Projects

### Method 1: Edit Seed Script (Recommended for bulk add)

1. Open `server/scripts/seed.js`
2. Modify the `sample` array with your projects:

```javascript
const sample = [
  { 
    title: 'Your Project Name',
    description: 'Detailed description of your project...',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: 'https://your-project-url.com',
    image: 'https://image-url.jpg' // Optional
  },
  // Add more projects...
]
```

3. Run seed script:
```bash
cd server
node scripts/seed.js
```

### Method 2: Use API Endpoints

**Create Project (POST):**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "tech": ["React", "Node.js"],
    "link": "https://project-url.com"
  }'
```

**Get All Projects (GET):**
```bash
curl http://localhost:5000/api/projects
```

**Update Project (PUT):**
```bash
curl -X PUT http://localhost:5000/api/projects/<PROJECT_ID> \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

**Delete Project (DELETE):**
```bash
curl -X DELETE http://localhost:5000/api/projects/<PROJECT_ID>
```

## 🎨 Customization

### Update Personal Info

**Client Side:**
- `client/src/components/Hero.jsx` - Name, title, description
- `client/src/components/About.jsx` - About section content
- `client/src/components/Skills.jsx` - Skills and tech stack
- `client/src/components/Experience.jsx` - Work experience
- `client/src/components/Education.jsx` - Education details
- `client/src/components/Footer.jsx` - Social media links

### Update Colors

Edit `client/tailwind.config.cjs`:
```javascript
theme: {
  extend: {
    colors: {
      accent: '#0ea5a4', // Change this to your brand color
    }
  }
}
```

Also update `client/src/index.css`:
```css
:root {
  --accent: #0ea5a4; /* Match with Tailwind config */
}
```

### Update Resume

Replace `client/public/resume.pdf` with your resume file.

### Update Favicon

Replace `client/public/favicon.svg` with your favicon.

## 🐳 Docker Deployment

### Build Images
```bash
# Server
cd server
docker build -t portfolio-server .

# Client
cd client
docker build -t portfolio-client .
```

### Run with Docker Compose
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Project Structure

```
port_folio/
├── client/                    # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/             # API client
│   │   ├── components/      # React components + 3D scenes
│   │   ├── pages/           # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.cjs
│   └── vite.config.js
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/          # Database config
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Logger, helpers
│   │   └── index.js         # Server entry
│   ├── scripts/
│   │   └── seed.js          # Database seeding
│   ├── .env                 # Environment variables
│   ├── Dockerfile
│   └── ecosystem.config.js  # PM2 config
│
├── docker-compose.prod.yml
├── nginx.conf
└── README.md
```

## 🌐 Environment Variables

### Server (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🔧 Available Scripts

### Server
- `npm run dev` - Start dev server with nodemon
- `npm start` - Start production server
- `node scripts/seed.js` - Seed database

### Client
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🚨 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or update MONGO_URI in server/.env to MongoDB Atlas
```

### Port Already in Use
```bash
# Change PORT in server/.env or kill the process
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill
```

### Three.js Performance Issues
- Reduce particle count in 3D scenes
- Disable auto-rotation on mobile
- Use lower polygon count geometries

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 👨‍💻 Author

**Varun Malviya**
- Portfolio: [your-portfolio-url.com]
- GitHub: [@yourusername]
- LinkedIn: [linkedin.com/in/yourprofile]

## 🙏 Acknowledgments

- Three.js community
- React Three Fiber
- Tailwind CSS
- Unsplash for demo images

---

Made with ❤️ using React, Three.js, and Node.js
