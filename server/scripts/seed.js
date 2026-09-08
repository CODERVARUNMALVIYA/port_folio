import 'dotenv/config'
import mongoose from 'mongoose'
import Project from '../src/models/Project.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio'

const sample = [
  { 
    title: 'Recipe Website', 
    description: 'Full-stack recipe website where users can browse, search, and save their favorite recipes. Features include user authentication, recipe categories, ingredient lists, cooking instructions, and a beautiful responsive interface.',
    tech: ['React','Node.js','MongoDB','Express','Tailwind CSS','JWT'], 
    link: 'https://recepie-app-hhy0.onrender.com',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500'
  },
  { 
    title: 'Socially - Social Media Website', 
    description: 'A modern social media website with photo sharing, user profiles, likes, comments, follow/unfollow functionality, real-time notifications, and responsive image galleries. Built with the MERN stack.',
    tech: ['React','Node.js','MongoDB','Express','Cloudinary','Socket.io','Redux'], 
    link: 'https://instaclone-2-pk5p.onrender.com',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500'
  },
  { 
    title: 'Government Portal Project', 
    description: 'Comprehensive government portal frontend with citizen services, document management, application tracking, and public information system. Features clean UI, accessibility compliance, and multi-language support.',
    tech: ['React','Redux','Material-UI','Axios','React Router','Form Validation'], 
    link: 'https://goverment-project-frontend-y575.onrender.com',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500'
  },
  { 
    title: 'CircleTalk', 
    description: 'Real-time community chat platform for connecting with friends, sharing messages, and staying engaged through a clean and responsive social experience.',
    tech: ['React','Node.js','MongoDB','Express','Socket.io'], 
    link: 'https://circletalk-1.onrender.com/',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500'
  },
  { 
    title: '3D Portfolio Website', 
    description: 'Modern portfolio website with stunning Three.js 3D animations, glassmorphism UI, dark theme, particle effects, and production-ready MERN stack architecture. Features smooth animations and responsive design.',
    tech: ['React','Three.js','Tailwind CSS','Node.js','MongoDB','Vite','@react-three/fiber'], 
    link: 'https://varun-portfolio.vercel.app',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500'
  },
  { 
    title: 'E-Commerce Operations Platform', 
    description: 'Major full-stack commerce platform concept with product management, inventory tracking, order workflows, sales analytics, customer accounts, and a responsive admin workspace.',
    tech: ['React','Node.js','MongoDB','Express','Stripe','Charts'], 
    link: '/commerce-platform',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500'
  },
  { 
    title: 'Task Management System', 
    description: 'A focused task workspace with a Kanban board, task CRUD, priorities, due dates, search, filters, and a responsive dashboard that keeps work easy to scan.',
    tech: ['React','Node.js','MongoDB','Express','Vite','CSS'],
    link: '/task-manager',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=500'
  }
]

async function run(){
  await mongoose.connect(MONGO_URI)
  console.log('Connected to', MONGO_URI)
  await Project.deleteMany({})
  const created = await Project.insertMany(sample)
  console.log('Inserted', created.length, 'projects')
  await mongoose.disconnect()
  process.exit(0)
}

run().catch(err=>{ console.error(err); process.exit(1) })
