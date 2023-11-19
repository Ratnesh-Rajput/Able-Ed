# AbleEd: Augmented Reality Science Education

AbleEd is an innovative platform revolutionizing science education through Augmented Reality (AR). Our goal is to provide students with an immersive and interactive learning experience, making complex scientific concepts come to life. With cutting-edge AR technology, AbleEd aims to engage students in a way that traditional methods cannot, fostering a deeper understanding of science.

## Features

- 🔍 Explore Scientific Concepts: Immerse yourself in the world of science by visualizing abstract concepts through augmented reality.
- 🌌 Interactive 3D Models: Access a library of interactive 3D models that allows students to manipulate and explore various scientific structures and processes.
- 📚 Lesson Plans and Experiments: Engage in hands-on learning with AR-enhanced lesson plans and virtual experiments that supplement traditional classroom teachings.
- 📱 Multi-Device Compatibility: AbleEd is accessible on various devices, including smartphones and tablets, ensuring flexibility and convenience for students.

## How To Use

1. **Download the AbleEd App:** Start by downloading the AbleEd app from GitHub Repo.
2. **Open the App and Scan Your Environment:** Launch the app and use your device's camera to scan your surroundings. AbleEd will identify surfaces and project AR content onto them.
3. **Explore and Interact:** Navigate through virtual 3D models, explore scientific concepts, and participate in interactive experiments. AbleEd makes learning science a captivating experience.

## Technologies Behind AbleEd

### AR Visualization
- Echo3D
- WebAR
- 3D Modeling Solaris

### Frontend
- Next.js
- React.js
- JavaScript
- TailwindCSS

### Backend
- Node.js
- MongoDB
- Express.js

### Version Control & Deployment
- Git/GitHub
- Replit (Frontend)
- Cyclic (Backend)

## Setup AbleEd Locally

### **Prerequisites**

This repo requires the use of [`pnpm`](https://pnpm.io/). To install, run the command:

```bash
npm -g install pnpm
```

or follow the instructions on [pnpm's installation page](https://pnpm.io/installation).



<br/>

### **Installation**

To install the required packages & dependencies:

```bash
pnpm install
```

<br/>

### **Environment Variables**

- This will require that you setup a MongoDB database. We recommend using MongoDB Atlas because there's a free option.
- You will also need access to our Discord Developer Portal. For this, you can reach out @GarlandKey or @JoeKarow.
- Do not try to run the server locally until you have completed the MongoDB and Discord setup.

Copy `.env.example` in the root directory and name it `.env`

```bash
cp .env.example .env
```

Follow the instructions listed in the newly created `.env`.

Once complete, you'll need to seed the database with test data. Do this as follows:

```bash
pnpm db:seed
pnpm db:devseed
```

<br/>

## Usage

To start the development live server:

```bash
pnpm dev
```

## Team

- **Rahul Karda** 
  - **Position/Role:** Team Leader - Backend Development, AR/VR development

- **Ratnesh Singh Rajput**
  - **Position/Role:** Frontend Development

- **Pukhraj Kushwah**
  - **Position/Role:** 3D Model Renderings, Presentation

# Contributors
Thank you for joining us on this journey to revolutionize science education with Augmented Reality! We welcome your contributions and look forward to making AbleEd an exceptional learning tool for students worldwide.
