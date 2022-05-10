<script setup lang="ts">
interface Point {
  x: number
  y: number
  angle?: number
}

const plum: HTMLCanvasElement = $ref()

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

  const l = 10// 线段的长度

  function drwaline(p1: Point, p2: Point) {
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
  }

  function draw() {
    ctx.lineWidth = 1
    ctx.strokeStyle = '#00000040'
    ctx.beginPath()
    const startPoint: Point = { x: width / 2, y: height }
    const endPoint: Point = { x: width / 2, y: height - l }

    drwaline(startPoint, endPoint)
  }

  draw()
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
