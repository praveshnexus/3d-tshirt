# 🧵 3D T-Shirt Customizer

An interactive **3D product customization web app** that allows users to design a T-shirt in real time by changing colors, adding logos, and applying textures — all rendered in a 3D environment.

🔗 **Live Demo:** https://3d-tshirt-bay.vercel.app  
📦 **Repository:** https://github.com/praveshnexus/3d-tshirt

---

## ✨ Features

- 🎨 **Real-time color customization** of a 3D T-shirt
- 🖼 **Upload custom logos** and apply them as decals
- 🧵 **Toggle logo vs full texture** on the shirt
- 🔄 **Reset design** to default state instantly
- 📸 **Download** the customized design as an image
- 🧭 Smooth camera controls (rotate & zoom)
- ⚡ Optimized rendering using React Three Fiber

---

## 🤖 AI Feature Status (Important)

This project includes an **AI image generation UI**.  
However, the AI backend is hosted on a **free-tier service** and is currently **unavailable (500 error)**.

To ensure:
- application stability
- no WebGL crashes
- clean user experience  

the AI feature has been **gracefully disabled on the frontend**.

> This demonstrates proper error handling and defensive UI design rather than leaving a broken feature exposed.

---

## 🛠 Tech Stack

- **Frontend:** React, Vite
- **3D Rendering:** Three.js, @react-three/fiber, @react-three/drei
- **State Management:** Valtio
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## 🧠 What I Learned

- Managing **3D state and materials** in a React environment
- Applying **decals and textures** safely in Three.js
- Handling **WebGL edge cases** (texture loading & context loss)
- Designing **reset and recovery UX** for complex UI states
- Gracefully disabling unstable features instead of allowing crashes
- Working with **GitHub → Vercel CI/CD auto-deployments**

---

## 🚀 Running Locally

```bash
git clone https://github.com/praveshnexus/3d-tshirt.git
cd 3d-tshirt/client
npm install
npm run dev
