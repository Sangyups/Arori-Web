import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import Stats from 'three/examples/jsm/libs/stats.module';

const ThreejsLoader = ({ fileName }) => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(1));

    const light = new THREE.SpotLight();
    light.position.set(0, 0, 20);
    scene.add(light);
    const light1 = new THREE.SpotLight();
    light1.position.set(0, 0, -20);
    scene.add(light1);
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.ThreejsLoader').appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const material = new THREE.MeshPhysicalMaterial({
      // color: 0xb2ffc8,
      metalness: 0,
      roughness: 0,
      transparent: false,
      transmission: 0,
      side: THREE.DoubleSide,
      clearcoat: 1.0,
      clearcoatRoughness: 0.25,
      vertexColors: true,
    });

    const loader = new PLYLoader();
    loader.load(
      `${process.env.PUBLIC_URL}/${fileName}.ply`,
      function (geometry) {
        geometry.computeVertexNormals();
        geometry.center();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(-Math.PI / 2);
        scene.add(mesh);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        setLoading((xhr.loaded / xhr.total) * 100);
      },
      (error) => {
        console.log(error);
      }
    );

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    const stats = Stats();
    // document.body.appendChild(stats.dom);

    function animate() {
      requestAnimationFrame(animate);

      controls.update();

      render();

      stats.update();
    }

    function render() {
      renderer.render(scene, camera);
    }

    animate();
  }, []);
  return <div className="ThreejsLoader">{loading === 100 ? null : <span>{loading} % loaded</span>}</div>;
};

export default ThreejsLoader;
