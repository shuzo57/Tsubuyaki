import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes'

export default function Background() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    let width = window.innerWidth
    let height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    ref.current.appendChild(renderer.domElement)

    const resolution = 28
    const material = new THREE.MeshPhongMaterial({
      color: 0x66ccff,
      transparent: true,
      opacity: 0.7,
    })
    const effect = new MarchingCubes(resolution, material, true, true)
    effect.scale.set(1, 1, 1)
    scene.add(effect)

    const light = new THREE.DirectionalLight(0xffffff, 0.8)
    light.position.set(1, 1, 1)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.2))

    type Ball = {
      position: THREE.Vector3
      velocity: THREE.Vector3
    }
    const balls: Ball[] = []
    for (let i = 0; i < 5; i++) {
      balls.push({
        position: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ),
      })
    }

    const updateField = () => {
      effect.reset()
      balls.forEach((b) => {
        b.position.add(b.velocity)
        const limit = 0.4
        ;['x', 'y', 'z'].forEach((axis) => {
          const vAxis = axis as 'x' | 'y' | 'z'
          if (Math.abs(b.position[vAxis]) > limit) {
            b.velocity[vAxis] *= -1
          }
        })
        effect.addBall(b.position.x, b.position.y, b.position.z, 0.25, 12)
      })
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    const animate = () => {
      updateField()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return <div ref={ref} className="fixed inset-0 -z-10 pointer-events-none" />
}
