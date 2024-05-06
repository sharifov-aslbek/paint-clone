const canvas = document.querySelector("canvas")
 const toolsBtns = document.querySelectorAll(".tool")
 const fillColor = document.querySelector("#fill-color")
 const sizeSlider = document.querySelector("#size-slider")
 const colorBtns = document.querySelectorAll(".colors .option")
 const colorPicker = document.querySelector("#color-picker")
 const clearCanvas = document.querySelector(".clear-canvas")
 const saveImageBtn = document.querySelector(".save-img")
let ctx = canvas.getContext('2d'),
   isDrawing = false,
   brushWidth = 2,
   selectedTool = 'brush',
   prevMouseX,
   prevMouseY,
   snapshot,
   selectedColor = '#000'
// Draw Rectangle
const drawRectangle = e => {
   if(!fillColor.checked) {
     return ctx.strokeRect(e.offsetX , e.offsetY , prevMouseX - e.offsetX, prevMouseY - e.offsetY)
   } 
   ctx.fillRect(e.offsetX , e.offsetY , prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

// Draw Circle 
const drawCircle = e => {
      ctx.beginPath()
      const radius =
      Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 1)
      ctx.arc(prevMouseX, prevMouseY, radius, 0 , 2 * Math.PI)
      fillColor.checked ? ctx.fill() : ctx.stroke()
}
// Draw Triangle
const drawTriangle = e => {
   ctx.beginPath()
   ctx.moveTo(prevMouseX, prevMouseY)
   ctx.lineTo(e.offsetX , e.offsetY)
   ctx.lineTo(prevMouseX * 2 - e.offsetX , e.offsetY)
   ctx.closePath()
   fillColor.checked ? ctx.fill() : ctx.stroke()
}


// Change brush Width
sizeSlider.addEventListener("change" , () => (brushWidth = sizeSlider.value))

   //DRAWING 
const drawing = e => {
   if(!isDrawing) return
   ctx.putImageData(snapshot, 0, 0)
   if(selectedTool == 'brush' || selectedTool == "eraser") {
      ctx.strokeStyle = selectedTool == "eraser" ? "#fff" : selectedColor  
      ctx.lineTo(e.offsetX , e.offsetY)
      ctx.stroke()
   }
   switch (selectedTool) {
         case 'rectangle': 
         drawRectangle(e)
         break
         case 'circle':
            drawCircle(e)
            break
            case 'triangle':
            drawTriangle(e)
            break
         default: 
            break
   }
   
}

const startDraw = (e) => {
   isDrawing = true
   prevMouseX = e.offsetX
   prevMouseY = e.offsetY
   ctx.beginPath()
   ctx.lineWidth = brushWidth
   ctx.strokeStyle = selectedColor
   ctx.fillStyle = selectedColor
   snapshot = ctx.getImageData(0, 0 , canvas.width, canvas.height)
}

const stopDraw = () => {
   isDrawing = false
}

window.addEventListener("load" , ( ) => {
   canvas.width = canvas.offsetWidth
   canvas.height = canvas.offsetHeight
})
canvas.addEventListener("mousemove" , drawing)
canvas.addEventListener("mousedown" , startDraw)
canvas.addEventListener("mouseup" , stopDraw)

toolsBtns.forEach(btn => {
   btn.addEventListener("click" , () => {
      document.querySelector(".options .active").classList.remove("active")
      btn.classList.add("active")
      selectedTool = btn.id
   })
})

colorBtns.forEach(btn => {
   btn.addEventListener("click" , e => {
      document.querySelector(".options .selected").classList.remove('selected')
      btn.classList.add('selected')
      const bgColor = window.getComputedStyle(btn).getPropertyValue("background-color")
      console.log(bgColor);
      selectedColor = bgColor
   })
})

// Color picker

colorPicker.addEventListener("change", () => {
   colorPicker.parentElement.style.background = colorPicker.value
   colorPicker.parentElement.click()
})


clearCanvas.addEventListener("click" , () => {
   ctx.clearRect(0 , 0, canvas.width, canvas.height)
})

saveImageBtn.addEventListener("click" , () => {
   const link = document.createElement("a")
   link.download = `Aslbek-paint${Date.now}.jpg`
   link.href = canvas.toDataURL()
   link.click()
})