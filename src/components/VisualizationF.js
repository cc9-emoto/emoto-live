import React, { useEffect, useRef, useState } from "react";
import THREE from "three.js";
import '../styles/Visualization.scss'

const VisualizationF = ({ position, beatsData = [], playerPlaying, color }) => {
  const renderer = useRef(null);
  const sphere = useRef(null);
  const particle = useRef(null);
  const camera = useRef(null);
  const scene = useRef(null);
  const lights = useRef([]);

  const [duration, setDuration] = useState(200);
  const beats = new Set(beatsData.map(beat => Math.ceil((beat.start * 1000) / 100) * 100));

  useEffect(() => {
    if (beatsData.length > 0 && playerPlaying) {
      const avgDuration =
        beatsData.reduce((acc, beat) => acc + beat.duration, 0) /
        beatsData.length;
      setDuration(avgDuration * 500);
    }
  }, [beatsData, playerPlaying]);

  const loadSphere = () => {
    const container = document.querySelector(".visualization");
    const sphereContainer = document.querySelector("#sphere");
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(50, container.scrollWidth / container.scrollHeight, 0.1, 1000);
    camera.current.position.z = 15;
    renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.current.setSize(container.scrollWidth, container.scrollHeight);
    sphereContainer.appendChild(renderer.current.domElement);


    sphere.current = new THREE.Object3D();
    const geom = new THREE.IcosahedronGeometry(4, 1);
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading })
    const planet = new THREE.Mesh(geom, mat);
    sphere.current.scale.x = sphere.current.scale.y = sphere.current.scale.z = 1;
    sphere.current.add(planet);


    const geom2 = new THREE.TetrahedronGeometry(0.1, 0)
    particle.current = new THREE.Object3D();
    for (let i = 0; i < 1000; i++) {
      const mesh = new THREE.Mesh(geom2, mat);
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      mesh.position.multiplyScalar((Math.random() * 10));
      particle.current.add(mesh);
    }

    scene.current.add(sphere.current);
    scene.current.add(particle.current);

    const ambientLight = new THREE.AmbientLight(0x666666);
    scene.current.add(ambientLight);
    lights.current[0] = new THREE.DirectionalLight( 0x00ff00, 1 );
    lights.current[0].position.set( 1, 0, 0 );
    lights.current[1] = new THREE.DirectionalLight( 0x0000ff, 1 );
    lights.current[1].position.set( 0.75, 1, 0.5 );
    lights.current[2] = new THREE.DirectionalLight( 0xff0000, 1 );
    lights.current[2].position.set( -0.75, -1, 0.5 );
    scene.current.add( lights.current[0] );
    scene.current.add( lights.current[1] );
    scene.current.add( lights.current[2] )

    renderer.current.render(scene.current, camera.current);
  };

  useEffect(() => {
    loadSphere();
  }, []);

  useEffect(() => {
    if (beats.has(Math.round(position/100)*100)) animate();
  }, [position])

  const animate = () =>  {
    const timestamp = Date.now();

    const increase = () => {
      sphere.current.scale.x += 0.05;
      sphere.current.scale.y += 0.05;
      sphere.current.scale.z += 0.05;
      sphere.current.rotation.x += 0.05;
      sphere.current.rotation.y += 0.05;
      particle.current.rotation.x -= 0.1;
      particle.current.rotation.y -= 0.1;
      particle.current.rotation.z -= 0.1;
      lights.current[0].position.set(Math.random(),Math.random(), Math.random())
      lights.current[1].position.set(Math.random(),Math.random(), Math.random())
      lights.current[2].position.set(Math.random(),Math.random(), Math.random())
    };
    const decrease = () => {
      sphere.current.scale.x -= 0.05;
      sphere.current.scale.y -= 0.05;
      sphere.current.scale.z -= 0.05;
      sphere.current.rotation.x -= 0.10;
      sphere.current.rotation.y -= 0.10;
      particle.current.rotation.x += 0.1;
      particle.current.rotation.y += 0.1;
      particle.current.rotation.z += 0.1;
    };
    const defaultSize = () => {
      sphere.current.scale.x = 1;
      sphere.current.scale.y = 1;
      sphere.current.scale.z = 1;
      sphere.current.rotation.x = 1;
      sphere.current.rotation.x = 1;
    };
    const recurse = () => {
      if (Date.now() - timestamp > duration) {
        defaultSize();
        renderer.current.render(scene.current, camera.current);
        return;
      } else if (Date.now() - timestamp > duration / 2) {
        decrease();
        renderer.current.render(scene.current, camera.current);
        requestAnimationFrame(recurse);
      } else {
        increase();
        renderer.current.render(scene.current, camera.current);
        requestAnimationFrame(recurse);
      }
    }
    recurse();
  }

  return (
    <div className = "visualization">
      <div id="sphere" />
    </div>
  )
}

export default VisualizationF;