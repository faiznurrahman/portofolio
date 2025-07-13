import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ← tambahkan ini
import Navbar from './components/Navbar';
import Background from './components/Background';
import Home from './pages/Home';
import About from './pages/About';
import Portofolio from './pages/Portofolio';
import Contact from './pages/Contact';
import ProjectDetails from './components/ProjectDetail'; // ← import komponen detail

const MainLayout = () => (
  <div className='w-screen'>
    <Navbar />
    <Background />
    <Home />
    <About />
    <Portofolio />
    <Contact />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Faiz
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </div>
);

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Faiz
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/project/:id" element={<ProjectPageLayout />} />
    </Routes>
  );
}

export default App;
