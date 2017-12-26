jQuery(function ($) {
  var canvas = ($('canvas'))[0]
  var context = canvas.getContext('2d')
  var w = canvas.width = window.innerWidth
  var h = canvas.height = window.innerHeight

  function MakeFlake () {
    this.draw = function () {
      this.g = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz)
      this.g.addColorStop(0, 'hsla(255,255%,255%,1)')
      this.g.addColorStop(1, 'hsla(255,255%,255%,0)')
      context.moveTo(this.x, this.y)
      context.fillStyle = this.g
      context.beginPath()
      context.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true)
      context.fill()
    }
  }

  function letItSnow () {
    var arr = []
    var num = 600
    var tsc = 1
    var sp = 1
    var sc = 1.3
    var mv = 20
    var min = 1
    var snow

    for (var i = 0; i < num; ++i) {
      snow = new MakeFlake()
      snow.y = Math.random() * (h + 50)
      snow.x = Math.random() * w
      snow.t = Math.random() * (Math.PI * 2)
      snow.sz = (100 / (10 + (Math.random() * 100))) * sc
      snow.sp = (Math.pow(snow.sz * 0.8, 2) * 0.15) * sp
      snow.sp = snow.sp < min ? min : snow.sp
      arr.push(snow)
    }

    function fall () {
      window.requestAnimationFrame(fall)
      context.clearRect(0, 0, w, h)
      context.fillStyle = 'hsla(242, 95%, 3%, 1)'
      context.fillRect(0, 0, w, h)
      context.fill()

      for (var i = 0; i < arr.length; ++i) {
        var f = arr[i]

        f.t += 0.05
        f.t = f.t >= Math.PI * 2 ? 0 : f.t
        f.y += f.sp
        f.x += Math.sin(f.t * tsc) * (f.sz * 0.3)

        if (f.y > h + 50) f.y = -10 - Math.random() * mv
        if (f.x > w + mv) f.x = -mv
        if (f.x < -mv) f.x = w + mv

        f.draw()
      }
    }

    fall()
  }

  letItSnow()

  $('window').resize(function () {
    canvas.width = w = window.innerWidth
    canvas.height = h = window.innerHeight
  })
})
