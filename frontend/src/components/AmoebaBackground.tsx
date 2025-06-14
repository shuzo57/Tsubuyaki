import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

export default function AmoebaBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let width = window.innerWidth
    let height = window.innerHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
    camera.position.z = 60

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    mount.appendChild(renderer.domElement)

    const material = new THREE.MeshPhongMaterial({
      color: 0x6699ff,
      shininess: 50,
      transparent: true,
      opacity: 0.7,
    })
    const effect = new MarchingCubes(28, material, true, true)
    effect.scale.set(40, 40, 40)
    scene.add(effect)

    const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.position.set(0.5, 0.5, 1)
    scene.add(dirLight)
    scene.add(new THREE.AmbientLight(0x222222))

    const update = (time: number) => {
      effect.reset()
      const numBlobs = 5
      for (let i = 0; i < numBlobs; i++) {
        const ballx = Math.sin(time * (0.3 + i * 0.1) + i) * 0.5 + 0.5
        const bally = Math.cos(time * (0.2 + i * 0.1) + i) * 0.5 + 0.5
        const ballz = Math.sin(time * (0.1 + i * 0.05) + i) * 0.5 + 0.5
        effect.addBall(ballx, bally, ballz, 0.2, 12)
      }
    }

    let id: number
    const animate = () => {
      const time = performance.now() / 1000
      update(time)
      renderer.render(scene, camera)
      id = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', handleResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 -z-10 pointer-events-none" />
}
