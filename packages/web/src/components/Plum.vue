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
  const w = plum.parentElement?.clientWidth
  const h = plum.parentElement?.clientHeight
  canvas.width = w || window.innerWidth
  canvas.height = h || window.innerHeight
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

  function plumStart(b: Branch) {
    const tasks: Function[] = [] // 绘制流程队列

    // 绘制流程，每次绘制，都会将下次要绘制流程放到队列里
    const step = (b: Branch, count = 0) => {
      const endPoint = getEndPoint(b)
      drawBranch(b)

      if (count >= 180)
        return

      if (Math.random() < 0.5 || count < 4) {
        tasks.push(() => step({
          point: endPoint,
          len: LENGTH,
          angle: b.angle + 0.22,
        }, count + 1))
      }

      if (Math.random() < 0.5 || count < 4) {
        tasks.push(() => step({
          point: endPoint,
          len: LENGTH,
          angle: b.angle - 0.22,
        }, count + 1))
      }
    }

    /** 每一帧，将当前队列清空，绘制出所有线条 */
    const frame = () => {
      const fns = [...tasks]
      tasks.length = 0
      fns.forEach(fn => fn())
    }

    let animationTime = 0 // 实际的帧数
    const render = () => {
      requestAnimationFrame(() => {
        if (tasks.length === 0)
          return false

        if (animationTime % 5 === 0)
          frame()

        animationTime++
        render()
      })
    }

    step(b)
    render()
  }

  function init() {
    ctx.lineWidth = 0.4
    ctx.strokeStyle = 'rgba(153, 163, 164, 0.4)'

    const startBranches: Branch[] = [
      {
        point: { x: width * Math.random(), y: 0 },
        len: LENGTH,
        angle: -Math.PI / 2 + (Math.random() - 0.5),
      },
      {
        point: { x: width, y: height * Math.random() },
        len: LENGTH,
        angle: 0 + (Math.random() - 0.5),
      },
      {
        point: { x: width * Math.random(), y: height },
        len: LENGTH,
        angle: Math.PI / 2 + (Math.random() - 0.5),
      },
      {
        point: { x: 0, y: height * Math.random() },
        len: LENGTH,
        angle: Math.PI + (Math.random() - 0.5),
      },
    ]

    startBranches.map(b => plumStart(b))
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
