import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

export default function AmoebaBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(0.5, 0.5, 1)
    scene.add(light)

    const material = new THREE.MeshPhongMaterial({ color: 0x5588ff })
    const effect = new MarchingCubes(32, material, true, true)
    effect.position.set(0, 0, 0)
    effect.scale.set(40, 40, 40)
    scene.add(effect)

    const clock = new THREE.Clock()
    const numBlobs = 7

    const update = (t: number) => {
      effect.reset()
      for (let i = 0; i < numBlobs; i++) {
        const b = i + 1
        const ballx = Math.sin(b * 1.7 + t * 0.3) * 0.5 + 0.5
        const bally = Math.cos(b * 1.3 + t * 0.5) * 0.5 + 0.5
        const ballz = Math.sin(b * 1.5 + t * 0.7) * 0.5 + 0.5
        effect.addBall(ballx, bally, ballz, 0.4, 12)
      }
    }

    let frameId: number
    const animate = () => {
      const t = clock.getElapsedTime()
      update(t)
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 -z-10" />
}
