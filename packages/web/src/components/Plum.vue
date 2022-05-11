<script setup lang="ts">

const plum: HTMLCanvasElement = $ref()

interface Point {
  x: number
  y: number
}

interface Branch {
  point: Point
  len: number
  angle: number
}

function initCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const w = plum.parentElement.clientWidth
  const h = plum.parentElement.clientHeight
  canvas.width = w
  canvas.height = h
  plum.style.width = `${w}px`
  plum.style.height = `${h}px`
  return ctx
}

onMounted(() => {
  const ctx = initCanvas(plum)
  const { width, height } = plum

  const LENGTH = 5// 线段的长度

  function drawBranch(b: Branch) {
    const { point } = b
    const endPoint = getEndPoint(b)

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.lineTo(endPoint.x, endPoint.y)
    ctx.stroke()
  }

  function getEndPoint(b: Branch): Point {
    const { point, len, angle } = b
    return {
      x: point.x - Math.cos(angle) * len,
      y: point.y - Math.sin(angle) * len,
    }
  }

  const tasks: Function[] = []

  function step(b: Branch, count = 0) {
    const endPoint = getEndPoint(b)
    drawBranch(b)

    if (Math.random() < 0.5 || count < 4) {
      tasks.push(() => step({
        point: endPoint,
        len: LENGTH,
        angle: b.angle + 0.2,
      }, count + 1))
    }

    if (Math.random() < 0.5 || count < 4) {
      tasks.push(() => step({
        point: endPoint,
        len: LENGTH,
        angle: b.angle - 0.2,
      }, count + 1))
    }
  }

  function frame() {
    const steps = [...tasks]
    tasks.length = 0
    steps.forEach(fn => fn())
  }

  let frameCount = 0
  function render() {
    if (frameCount % 5 === 0)
      frame()

    frameCount++
    requestAnimationFrame(() => render())
  }

  function init() {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(153, 163, 164, 0.5)'

    const startBranch: Branch = {
      point: { x: (width / 2) * Math.random(), y: 0 },
      len: LENGTH,
      angle: -Math.PI * Math.random(),
    }

    step(startBranch)
    render()
  }

  init()
})

</script>

<template>
  <canvas
    ref="plum"
    z--1
    absolute
    w-screen
    h-screen
    top-0
  />
</template>
