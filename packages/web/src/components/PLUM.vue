<script setup lang="ts">
const plum: HTMLCanvasElement = $ref()
const ctx = plum.getContext('2d')!
const w = plum.width // 画布的宽
const h = plum.height // 画布的高
const l = 5 // 线段的长度

interface Point {
  x: number
  y: number
  angle?: number
}

function lineTo(p1: Point, p2: Point) {
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
}

function draw() {
  ctx.beginPath()
  // lineTo()
}

draw()
</script>

<template>
  <canvas
    ref="plum"
    z--1
    w-screen
    h-screen
  />
</template>
