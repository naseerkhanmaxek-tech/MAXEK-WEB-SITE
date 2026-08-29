import React, { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Line } from "@react-three/drei";
import Btn from "@/components/common/Btn";
import { heroCopyVariants } from "@/lib/motion";
import * as THREE from "three";

// --- PROCEDURAL PROXY ENGINEERING SCENE ---
function EngineeringProxy() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Subtle procedural movement representing "active engineering"
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[-2, 0, 0]}>
      {/* Central structural pillar */}
      <Box args={[1, 6, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3a4b6b" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Cross beams */}
      <Box args={[4, 0.5, 0.5]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#2d3b55" metalness={0.7} roughness={0.3} />
      </Box>
      <Box args={[4, 0.5, 0.5]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#2d3b55" metalness={0.7} roughness={0.3} />
      </Box>

      {/* BIM Wireframe proxy */}
      <Box args={[4.2, 6.2, 1.2]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </Box>

      {/* Precision Red Signal proxy */}
      <Line 
        points={[
          new THREE.Vector3(-2, 2.5, 0.5), 
          new THREE.Vector3(0, 2.5, 0.5), 
          new THREE.Vector3(0, -2.5, 0.5), 
          new THREE.Vector3(2, -2.5, 0.5)
        ]} 
        color="#E32636" // MAXEK red
        lineWidth={3}
      />
    </group>
  );
}

function WebGLScene() {
  return (
    <Canvas 
      dpr={[1, 1.5]} 
      camera={{ position: [0, 0, 8], fov: 45 }}
    >
      <color attach="background" args={["#08132A"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#E32636" distance={10} />
      
      <Suspense fallback={null}>
        <EngineeringProxy />
      </Suspense>
      
      {/* We allow limited orbital movement for testing, but in prod we'd restrict it */}
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/2 + 0.1} minPolarAngle={Math.PI/2 - 0.1} />
    </Canvas>
  );
}

export default function Prototype() {
  const navigate = useNavigate();

  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[#08132A]"
      aria-label="MAXEK India — Integrated Engineering Group"
    >
      {/* 1. Full-bleed WEBGL Canvas */}
      <div className="absolute inset-0 z-0 bg-[#08132A] pointer-events-auto">
        {/* We use pointer-events-auto temporarily on canvas so OrbitControls work during prototyping */}
        <WebGLScene />
      </div>

      {/* 2. Content protection gradient */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none hidden md:block" 
        style={{
          background: "linear-gradient(to right, transparent 0%, transparent 32%, rgba(8, 19, 42, 0.18) 40%, rgba(8, 19, 42, 0.58) 52%, rgba(8, 19, 42, 0.82) 65%, rgba(8, 19, 42, 0.94) 100%)"
        }}
      />
      
      {/* Mobile/Tablet Portrait Fallback */}
      <div className="absolute inset-0 z-0 bg-[#08132A]/40 pointer-events-none md:hidden" />

      {/* 3. Existing real HTML content */}
      <div className="shell relative z-10 w-full pt-32 pb-24 md:py-0 md:h-[100svh] flex flex-col md:flex-row md:items-center pointer-events-none">
        {/* Left spacer to push content to the right on desktop */}
        <div className="hidden md:block md:w-[45%]" />
        
        {/* Headline / supporting copy / CTAs */}
        <div className="md:w-[55%] md:pl-8 lg:pl-16 flex flex-col justify-center pointer-events-auto">
          <motion.p
            className="kicker text-white"
            variants={heroCopyVariants}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <span className="mr-3 inline-block h-[2px] w-8 -translate-y-[3px] bg-maxek-red align-middle" />
            Integrated Engineering Group (PROTOTYPE)
          </motion.p>

          <motion.h1
            className="mt-6 font-heading text-[clamp(2.2rem,4vw+0.4rem,3.6rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-white"
            variants={heroCopyVariants}
            initial="hidden"
            animate="show"
            custom={1}
          >
            Engineering Tomorrow.
            <span className="block text-white/90">Building Sustainable Growth.</span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            variants={heroCopyVariants}
            initial="hidden"
            animate="show"
            custom={2}
          >
            Creating value through engineering, technology, and innovation.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
            variants={heroCopyVariants}
            initial="hidden"
            animate="show"
            custom={3}
          >
            <Btn
              variant="onDark"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {}}
            >
              Explore MAXEK
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
            <Btn
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate("/contact")}
            >
              Contact
            </Btn>
          </motion.div>
        </div>
      </div>

      {/* Subtle animated scroll indicator */}
      <motion.button
        type="button"
        aria-label="Scroll to About MAXEK"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/55 [transition:color_.25s_ease] hover:text-white md:flex pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Scroll</span>
        <span className="relative flex h-9 w-[22px] items-start justify-center rounded-full border border-white/35 pt-1.5">
          <span className="h-1.5 w-1.5 animate-scroll-dot rounded-full bg-maxek-red" />
        </span>
        <ArrowDown className="h-3 w-3" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
