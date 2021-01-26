// https://observablehq.com/@gunggmee/ryb-color-wheel@1360
import define1 from "./e93997d5089d7165@2288.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# RYB color wheel`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`A set of colors from standard RGB color space:`
)});
  main.variable(observer("rgbChips")).define("rgbChips", ["chips","d3","rgb"], function(chips,d3,rgb){return(
chips(d3.range(12).map(d => rgb(d / 12)))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The following is a set of colors suggested by Johannes Itten:`
)});
  main.variable(observer("ittenChips")).define("ittenChips", ["chips","ittenSamples"], function(chips,ittenSamples){return(
chips(ittenSamples)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`This one is a set of colors generated using the algorithm suggested by N. Gossett and B. Chen:`
)});
  main.variable(observer("ngbcChips")).define("ngbcChips", ["chips","d3","ngbc"], function(chips,d3,ngbc){return(
chips(d3.range(12).map(d => ngbc(d / 12)))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`There are notable gaps between the colors since the algorithm uses slightly different *magic colors* from Itten's secondary colors:`
)});
  main.variable(observer("ittenVsAlgorithm1")).define("ittenVsAlgorithm1", ["ittenSamples","d3","ngbc","html","chips"], function(ittenSamples,d3,ngbc,html,chips)
{
  const colors0 = ittenSamples
  const colors1 = d3.range(12).map(d => d3.color(ngbc(d / 12)))

  return html`
    <div>${chips(colors0)}</div>
    <div>${chips(colors1)}</div>
  `
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`If we use Itten's colors as the magic colors, the algorithm generate quite accurate tertiary colors. The following shows a comparision between Itten's 12 colors and generated colors:`
)});
  main.variable(observer("ittenVsAlgorithm2")).define("ittenVsAlgorithm2", ["ittenSamples","d3","itten","html","chips"], function(ittenSamples,d3,itten,html,chips)
{
  const colors0 = ittenSamples
  const colors1 = d3.range(12).map(d => d3.color(itten(d / 12)))

  return html`
    <div>${chips(colors0)}</div>
    <div>${chips(colors1)}</div>
  `
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Comparision between the RGB and RYB wheels:`
)});
  main.variable(observer("wheelComparision")).define("wheelComparision", ["width","DOM","wheel","rgb","itten"], function(width,DOM,wheel,rgb,itten)
{
  const n = 3
  const height = width * 0.45
  const ctx = DOM.context2d(width, height)
  wheel(ctx, width * 0.25, height * 0.5, height * 0.05, height * 0.18, rgb, n * 1, 0, 0, true)
  wheel(ctx, width * 0.25, height * 0.5, height * 0.20, height * 0.33, rgb, n * 2, 0, 0, true)
  wheel(ctx, width * 0.25, height * 0.5, height * 0.35, height * 0.48, rgb, n * 4, 0, 0, true)
  wheel(ctx, width * 0.75, height * 0.5, height * 0.05, height * 0.18, itten, n * 1, 0, 0, true)
  wheel(ctx, width * 0.75, height * 0.5, height * 0.20, height * 0.33, itten, n * 2, 0, 0, true)
  wheel(ctx, width * 0.75, height * 0.5, height * 0.35, height * 0.48, itten, n * 4, 0, 0, true)
  const canvas = ctx.canvas
  canvas.style.width = "100%";
  return canvas
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Interpolations:`
)});
  main.variable(observer("rgbRamp")).define("rgbRamp", ["ramp","rgb"], function(ramp,rgb){return(
ramp(rgb)
)});
  main.variable(observer("ittenRamp")).define("ittenRamp", ["ramp","itten"], function(ramp,itten){return(
ramp(itten)
)});
  main.variable(observer("ngbcRamp")).define("ngbcRamp", ["ramp","ngbc"], function(ramp,ngbc){return(
ramp(ngbc)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Spiral of Itten's RYB color wheel, just for fun:`
)});
  main.variable(observer("ittenSpiral")).define("ittenSpiral", ["width","DOM","wheel","itten"], function(width,DOM,wheel,itten)
{
  const w = width
  const h = width
  const ctx = DOM.context2d(w, h)
  const stacks = 16
  const n = stacks * 2
  
  for(let i = 0; i < stacks; i++) {
    const r0 = (0.05 + i / stacks * 0.3) * h
    const r1 = (0.15 + i / stacks * 0.3) * h
    const angle = (i / stacks * 360)
    wheel(ctx, w * 0.5, h * 0.5, r0, r1, itten, n, 0, angle)
  }
  return ctx.canvas
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Harmonic color selector:`
)});
  main.variable(observer("viewof slices")).define("viewof slices", ["slider"], function(slider){return(
slider({
  title: "Slices",
  min: 12, 
  max: 60, 
  step: 12
})
)});
  main.variable(observer("slices")).define("slices", ["Generators", "viewof slices"], (G, _) => G.input(_));
  main.variable(observer("viewof schemeName")).define("viewof schemeName", ["radio"], function(radio){return(
radio({
  title: 'Color scheme',
  options: [
    { label: 'RGB', value: 'rgb' },
    { label: 'RYB', value: 'ryb' },
  ],
  value: 'ryb'
})
)});
  main.variable(observer("schemeName")).define("schemeName", ["Generators", "viewof schemeName"], (G, _) => G.input(_));
  main.variable(observer("scheme")).define("scheme", ["schemeName","rgb","itten"], function(schemeName,rgb,itten){return(
schemeName === "rgb" ? rgb : itten
)});
  main.variable(observer("colorHarmonies")).define("colorHarmonies", ["width","d3","DOM","slices"], function(width,d3,DOM,slices)
{
  const w = Math.min(width, 600)
  const h = w
  const root = d3.select(DOM.svg(w, h))
  root.append('g')
    .attr('class', 'arcs')
    .attr('transform', `translate(${w * 0.5}, ${h * 0.5}) rotate(${360 / slices * -0.5})`)
  return root.node()
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Selected harmonic colors`
)});
  main.variable(observer("hamoniousChips")).define("hamoniousChips", ["harmonies","scheme","slices","chips"], function(harmonies,scheme,slices,chips)
{
  const colors = [
    harmonies.complementary.map(d => scheme(d / slices)),
    null,
    harmonies.analogous.map(d => scheme(d / slices)),
    null,
    harmonies.triad.map(d => scheme(d / slices)),
    null,
    harmonies.tetrad.map(d => scheme(d / slices)),
  ].flat()
  return chips(colors)
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Itten color space`
)});
  main.variable(observer("ittenColorSpace")).define("ittenColorSpace", ["cubes","renderer","scene","camera","Promises"], async function*(cubes,renderer,scene,camera,Promises)
{
  while (true) {
    cubes.forEach(cube => {
      cube.rotation.x += 0.013
      cube.rotation.y += 0.019
      cube.rotation.z += 0.029
    })

    renderer.render(scene, camera);
    await Promises.delay(50);
    yield renderer.domElement;
  }
}
);
  main.variable(observer("randomRects")).define("randomRects", ["width","DOM","rough","ittenSamples","Promises"], async function*(width,DOM,rough,ittenSamples,Promises)
{
  const w = width
  const h = w * 0.5
  const ctx = DOM.context2d(w, h)
  const canvas = ctx.canvas
  const rc = rough.canvas(canvas);
  const fillStyles = ['hachure', 'zigzag', 'cross-hatch']
  const colors = [...ittenSamples, '#FFF']

  ctx.translate(w * 0.5, h * 0.5)

  let i = 0;
  while(true) {
    const x = (Math.random() - 0.5) * w
    const y = (Math.random() - 0.5) * h
    const width = Math.log(Math.random() + 1.5) * h
    const height = Math.log(Math.random() + 1.5) * h
    const fill = colors[Math.random() * colors.length|0]
    const fillWeight = Math.random() * 3|0
    const fillStyle = fillStyles[Math.random() * fillStyles.length|0]
    
    ctx.rotate(Math.random() * Math.PI * 2)

    let node = rc.rectangle(
      x, y,
      width,
      height,
      {
        bowing: 0.8,
        roughness: 3,
        fill,
        fillWeight,
        fillStyle,
      }
    )

    if(i > 20) {
      const header = document.querySelector(".inner_header")
      if(header) {
        header.style.backgroundImage = "url(" + canvas.toDataURL("image/jpeg") + ")"
      }
      yield canvas

      await Promises.delay(500)
    }
    i++
  }
}
);
  main.variable(observer("cubes")).define("cubes", ["d3","ryb2rgb","ittenMagic","THREE","scene"], function(d3,ryb2rgb,ittenMagic,THREE,scene)
{
  const steps = 8
  const scale = d3.scaleBand()
    .domain(d3.range(steps))
    .range([-8, 8])
    .paddingInner(0.5)

  const size = scale.bandwidth()
  const cubes = []
  for(let x = 0; x < steps; x++) {
    for(let y = 0; y < steps; y++) {
      for(let z = 0; z < steps; z++) {
        const red = x / (steps + 1) * 255
        const yellow = y / (steps + 1) * 255
        const blue = z / (steps + 1) * 255

        const color = d3.rgb(...ryb2rgb([red, yellow, blue], 255, ittenMagic))
        const geo = new THREE.BoxGeometry(size, size, size)
        const mat = new THREE.MeshBasicMaterial({color: color.toString()})
        const cube = new THREE.Mesh(geo, mat)

        cube.position.x = scale(x)
        cube.position.y = scale(y)
        cube.position.z = scale(z)
        scene.add(cube)
        cubes.push(cube)
      }
    }
  }
  return cubes
}
);
  main.variable(observer("scene")).define("scene", ["THREE"], function(THREE)
{
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#FFFFFF')
  return scene
}
);
  main.variable(observer("renderer")).define("renderer", ["THREE","width","invalidation"], function(THREE,width,invalidation)
{
  const renderer = new THREE.WebGLRenderer({antialias: true})
    
  renderer.setSize(width, width / 2);
  renderer.setPixelRatio(devicePixelRatio);
  
  invalidation.then(() => renderer.dispose());
  
  return renderer;
}
);
  main.variable(observer("camera")).define("camera", ["THREE"], function(THREE)
{
  const camera = new THREE.PerspectiveCamera(30, 2, 0.1, 60);
  camera.position.set(30, 20, 35);
  return camera;
}
);
  main.variable(observer("controls")).define("controls", ["THREE","camera","renderer","scene","invalidation"], function(THREE,camera,renderer,scene,invalidation)
{
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 50;
  
  const redraw = () => renderer.render(scene, camera);
  
  controls.addEventListener("change", redraw);
  
  invalidation.then(() => {
    controls.removeEventListener("change", redraw);
    controls.dispose();
  });
  
  return controls;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Functions and variables`
)});
  main.define("initial selectedIndex", function(){return(
0
)});
  main.variable(observer("mutable selectedIndex")).define("mutable selectedIndex", ["Mutable", "initial selectedIndex"], (M, _) => new M(_));
  main.variable(observer("selectedIndex")).define("selectedIndex", ["mutable selectedIndex"], _ => _.generator);
  main.variable(observer("harmonies")).define("harmonies", ["slices","cap","selectedIndex"], function(slices,cap,selectedIndex)
{
  const step = slices / 12
  return {
    complementary: cap([selectedIndex, slices / 2 + selectedIndex]),
    analogous: cap([selectedIndex, selectedIndex - step, selectedIndex + step]),
    triad: cap([selectedIndex, selectedIndex + 1 * slices / 3, selectedIndex + 2 * slices / 3]),
    tetrad: cap([selectedIndex, selectedIndex + 1 * slices / 4, selectedIndex + 2 * slices / 4, selectedIndex + 3 * slices / 4]),
  }
}
);
  main.variable(observer("renderColorHarmonies")).define("renderColorHarmonies", ["width","d3","slices","harmonies","colorHarmonies","mutable selectedIndex","scheme"], function(width,d3,slices,harmonies,colorHarmonies,$0,scheme)
{
  const w = Math.min(width, 600)
  const h = w
  const arc = d3.arc()
    .innerRadius(w * 0.35)
    .outerRadius(w * 0.45)
  const arcComplementary = d3.arc()
    .innerRadius(w * 0.15)
    .outerRadius(w * 0.46)
  const arcAnalogous = d3.arc()
    .innerRadius(w * 0.20)
    .outerRadius(w * 0.46)
  const arcTriad = d3.arc()
    .innerRadius(w * 0.25)
    .outerRadius(w * 0.46)
  const arcTetrad = d3.arc()
    .innerRadius(w * 0.30)
    .outerRadius(w * 0.46)

  const pie = d3.pie()
    .padAngle(0.005)
    .value(360 / slices)
  const arcs = pie(d3.range(slices))
  const highlights = new Set(Object.values(harmonies).flat())

  d3.select(colorHarmonies).select('g.arcs').selectAll('path.arc').data(arcs).join('path')
    .on('touchstart', (e) => e.preventDefault())
    .on('pointerenter', (e, d) => {
      $0.value = d.index
    })
    .attr('class', 'arc')
    .attr('stroke-width', 0)
    .attr('fill', (d, i) => scheme(i / slices))
    .style('touch-action', 'none')
    .transition()
    .duration(100)
    .attr('d', (d, i) => {
      if(harmonies.complementary.indexOf(i) !== -1) return arcComplementary(d)
      if(harmonies.analogous.indexOf(i) !== -1) return arcAnalogous(d)
      if(harmonies.triad.indexOf(i) !== -1) return arcTriad(d)
      if(harmonies.tetrad.indexOf(i) !== -1) return arcTetrad(d)
      return arc(d)
    })
}
);
  main.variable(observer("chips")).define("chips", ["width","d3","DOM"], function(width,d3,DOM){return(
(colors) => {
  const w = width
  const h = 40
  const x = d3.scaleBand()
  .domain(d3.range(colors.length))
  .rangeRound([0, w])

  const root = d3.select(DOM.svg(w, h))
  root.selectAll('rect').data(colors).join('rect')
    .style('cursor', 'pointer')
    .on('click', async (e, d) => {
      await navigator.clipboard.writeText(d3.color(d).formatHex())
    })
    .attr('x', (d, i) => x(i))
    .attr('y', 1)
    .attr('width', x.bandwidth() - 2)
    .attr('height', h - 2)
    .attr('fill', d => d || 'none')
  return root.node()
}
)});
  main.variable(observer("wheel")).define("wheel", ["d3"], function(d3){return(
function wheel(ctx, x, y, r0, r1, cspace, slices, pad, angle, stroke) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(-Math.PI / slices - angle / 360 * Math.PI * 2)
  const arc = d3.arc()
    .innerRadius(r0)
    .outerRadius(r1)
    .context(ctx)
  const pie = d3.pie()
    .padAngle(pad)
    .value(360 / slices)
  const arcs = pie(d3.range(slices))
  arcs.forEach(i => {
    ctx.strokeStyle = "#FFF";
    ctx.fillStyle = cspace(i.data / slices)
    ctx.beginPath()
    arc(i)
    ctx.fill()
    if(stroke) ctx.stroke()
  })
  ctx.restore()
}
)});
  main.variable(observer("rgb")).define("rgb", function(){return(
t => `hsl(${t * 360},100%,50%)`
)});
  main.variable(observer("ittenMagic")).define("ittenMagic", ["ittenSamples"], function(ittenSamples)
{
  const ittenRgb = ittenSamples.map(d => [d.r / 255, d.g / 255, d.b / 255])
  return [
    [1, 1, 1],
    ittenRgb[4],
    ittenRgb[0],
    ittenRgb[2],
    ittenRgb[8],
    ittenRgb[6],
    ittenRgb[10],
    [0.2,   0.094, 0.0]
  ]
}
);
  main.variable(observer("itten")).define("itten", ["rainbow","d3","ryb2rgb","ittenMagic"], function(rainbow,d3,ryb2rgb,ittenMagic)
{
  const samples = rainbow(1000);
  const f = t => {
    const ryb = samples[(1 - t) * (samples.length - 1)|0]
    return d3.rgb(...ryb2rgb(ryb, 255, ittenMagic)).toString()
  }
  return f
}
);
  main.variable(observer("ngbc")).define("ngbc", ["rainbow","d3","ryb2rgb"], function(rainbow,d3,ryb2rgb)
{
  const samples = rainbow(1000);
  const f = t => {
    const ryb = samples[(1 - t) * (samples.length - 1)|0]
    return d3.rgb(...ryb2rgb(ryb)).toString()
  }
  return f
}
);
  main.variable(observer("cap")).define("cap", ["slices"], function(slices){return(
n => n.map(d => (d + slices) % slices)
)});
  main.variable(observer("ittenSamples")).define("ittenSamples", ["d3"], function(d3){return(
[
  '#e42421', '#ea6120', '#f18e1c', '#fdc60e', '#f4e502', '#8dbb26',
  '#038e5b', '#0797bb', '#2a70b0', '#444e99', '#6d3a8a', '#c4027c'
].map(d3.color)
)});
  main.variable(observer()).define(["ittenSamples","d3"], function(ittenSamples,d3){return(
ittenSamples.map(d => {
  const {r, g, b} = d3.color(d)
  return [r / 255, g / 255, b / 255]
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Algorithm suggested by N. Gossett and B. Chen

See http://bahamas10.github.io/ryb/assets/ryb.pdf
`
)});
  main.variable(observer("ryb2rgb")).define("ryb2rgb", function()
{
  /**
   * Copied from https://github.com/bahamas10/ryb
   *
   * ryb2rgb, the motherload, convert a RYB array to RGB
   *
   * @param ryb   {array} RYB values in the form of [0, 255, 0]
   * @param limit {int}   [optional] max value of the color, defaults to 255
   * @param magic {array} An array of magic colors to use in the color space interpolation
   *
   * returns an array of the RGB values
   */
  const MAGIC_COLORS = [
    [1,     1,     1],
    [1,     1,     0],
    [1,     0,     0],
    [1,     0.5,   0],
    [0.163, 0.373, 0.6],
    [0.0,   0.66,  0.2],
    [0.5,   0.0,   0.5],
    [0.2,   0.094, 0.0]
  ];

  const ryb2rgb = (function() {
    // see http://threekings.tk/mirror/ryb_TR.pdf
    function cubicInt(t, A, B){
      var weight = t * t * (3 - 2 * t);
      return A + weight * (B - A);
    }

    function getR(iR, iY, iB, magic) {
      magic = magic || MAGIC_COLORS;
      // red
      var x0 = cubicInt(iB, magic[0][0], magic[4][0]);
      var x1 = cubicInt(iB, magic[1][0], magic[5][0]);
      var x2 = cubicInt(iB, magic[2][0], magic[6][0]);
      var x3 = cubicInt(iB, magic[3][0], magic[7][0]);
      var y0 = cubicInt(iY, x0, x1);
      var y1 = cubicInt(iY, x2, x3);
      return cubicInt(iR, y0, y1);
    }

    function getG(iR, iY, iB, magic) {
      magic = magic || MAGIC_COLORS;
      // green
      var x0 = cubicInt(iB, magic[0][1], magic[4][1]);
      var x1 = cubicInt(iB, magic[1][1], magic[5][1]);
      var x2 = cubicInt(iB, magic[2][1], magic[6][1]);
      var x3 = cubicInt(iB, magic[3][1], magic[7][1]);
      var y0 = cubicInt(iY, x0, x1);
      var y1 = cubicInt(iY, x2, x3);
      return cubicInt(iR, y0, y1);
    }

    function getB(iR, iY, iB, magic) {
      magic = magic || MAGIC_COLORS;
      // blue
      var x0 = cubicInt(iB, magic[0][2], magic[4][2]);
      var x1 = cubicInt(iB, magic[1][2], magic[5][2]);
      var x2 = cubicInt(iB, magic[2][2], magic[6][2]);
      var x3 = cubicInt(iB, magic[3][2], magic[7][2]);
      var y0 = cubicInt(iY, x0, x1);
      var y1 = cubicInt(iY, x2, x3);
      return cubicInt(iR, y0, y1);
    }

    function ryb2rgb(color, limit, magic) {
      limit = limit || 255;
      magic = magic || MAGIC_COLORS;
      var R = color[0] / limit;
      var Y = color[1] / limit;
      var B = color[2] / limit;
      var R1 = getR(R, Y, B, magic);
      var G1 = getG(R, Y, B, magic);
      var B1 = getB(R, Y, B, magic);
      return [
        Math.ceil(R1 * limit),
        Math.ceil(G1 * limit),
        Math.ceil(B1 * limit)
      ];
    }
    return ryb2rgb;
  })();
  
  return ryb2rgb;
}
);
  main.variable(observer("rainbow")).define("rainbow", function(){return(
function(size) {
  /**
   * Copied from https://github.com/bahamas10/ryb
   */
  const numcolors = 3;
  const colors = [255, 0, 0];

  // generate a rainbow for all colors
  let addingcolor = true; // adding or subtracting color
  const r = [];
  for (let color = 0; color < numcolors * 2; color++) {
    // color will loop twice, so grab the lower digit
    const thecolor = (color + 2) % numcolors;

    // loop the possible values
    for (let i = 0; i < 256; i++) {
      // set the color to i if adding, and 255 -i if subtracting
      colors[thecolor] = addingcolor ? i : 255 - i;

      // push a copy of the array
      r.push(colors.slice(0));
    }

    // flip the bit
    addingcolor = !addingcolor;
  }

  // only push what the user wanted, this si kinda gross
  const ret = [];
  const step = r.length / (size || r.length);
  for (let i = 0; Math.ceil(i) < r.length; i += step) {
    ret.push((r[Math.round(i)] || r[Math.floor(i)]).slice(0));
  }
  return ret;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Other dependencies`
)});
  main.variable(observer("ramp")).define("ramp", ["DOM"], function(DOM){return(
function ramp(color, n = 512) {
  // Copied from https://observablehq.com/@mbostock/color-ramp for a sake of loading performance
  const canvas = DOM.canvas(n, 1);
  const context = canvas.getContext("2d");
  canvas.style.width = "100%";
  canvas.style.height = "40px";
  canvas.style.imageRendering = "-moz-crisp-edges";
  canvas.style.imageRendering = "pixelated";
  for (let i = 0; i < n; ++i) {
    context.fillStyle = color(i / (n - 1));
    context.fillRect(i, 0, 1, 1);
  }
  return canvas;
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@v6")
)});
  main.variable(observer("THREE")).define("THREE", ["require"], async function(require)
{
  const THREE = window.THREE = await require('three');
  await require('three/examples/js/controls/OrbitControls.js').catch(() => {});
  return THREE;
}
);
  const child1 = runtime.module(define1);
  main.import("radio", child1);
  main.import("slider", child1);
  main.variable(observer("rough")).define("rough", async function(){return(
(await import('https://unpkg.com/roughjs@4.3.1/bundled/rough.esm.js')).default
)});
  return main;
}
