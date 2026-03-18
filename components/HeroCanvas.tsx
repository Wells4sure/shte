'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // ── Scene ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 85)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Particle field ──
    const PARTICLE_COUNT = 380
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute in a large sphere
      const r = 40 + Math.random() * 120
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Color: mix cyan (#38bdf8) to blue (#2563eb)
      const t = Math.random()
      colors[i * 3]     = 0.08 + t * 0.22
      colors[i * 3 + 1] = 0.45 + t * 0.29
      colors[i * 3 + 2] = 0.85 + t * 0.12

      sizes[i] = 0.3 + Math.random() * 1.2
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    pGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const pMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── Connection lines (neural web) ──
    // Sample a subset of nearby particles and draw lines
    const LINE_PARTICLE_COUNT = 20
    const linePositions: number[] = []

    const sampled: THREE.Vector3[] = []
    for (let i = 0; i < LINE_PARTICLE_COUNT; i++) {
      const idx = Math.floor(Math.random() * PARTICLE_COUNT)
      sampled.push(
        new THREE.Vector3(
          positions[idx * 3],
          positions[idx * 3 + 1],
          positions[idx * 3 + 2],
        ),
      )
    }

    const CONNECT_DIST = 30
    for (let i = 0; i < sampled.length; i++) {
      for (let j = i + 1; j < sampled.length; j++) {
        if (sampled[i].distanceTo(sampled[j]) < CONNECT_DIST) {
          linePositions.push(sampled[i].x, sampled[i].y, sampled[i].z)
          linePositions.push(sampled[j].x, sampled[j].y, sampled[j].z)
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(linePositions), 3),
    )
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // ── Glowing rings (pulse rings around center) ──
    const ringGroup = new THREE.Group()
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.RingGeometry(18 + r * 14, 18.5 + r * 14, 80)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.06 - r * 0.015,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2
      ringGroup.add(ring)
    }
    ringGroup.position.set(0, 0, -60)
    scene.add(ringGroup)

    // ── Mouse tracking ──
    let targetX = 0
    let targetY = 0
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ──
    let frameId: number
    let elapsed = 0
    let lastTime = performance.now()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const now = performance.now()
      elapsed += (now - lastTime) / 1000
      lastTime = now
      const t = elapsed

      // Slowly drift particles
      particles.rotation.y = t * 0.04
      particles.rotation.x = t * 0.012

      // Drift connection lines with particles
      lines.rotation.y = t * 0.04
      lines.rotation.x = t * 0.012

      // Pulse rings
      ringGroup.rotation.z = t * 0.08
      const pulse = Math.sin(t * 0.8) * 0.5 + 0.5
      ;(ringGroup.children as THREE.Mesh[]).forEach((ring, i) => {
        ;(ring.material as THREE.MeshBasicMaterial).opacity =
          (0.06 - i * 0.015) * (0.5 + pulse * 0.5)
      })

      // Smooth camera parallax from mouse
      camera.position.x += (targetX * 18 - camera.position.x) * 0.03
      camera.position.y += (targetY * 12 - camera.position.y) * 0.03
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 z-0" />
}
