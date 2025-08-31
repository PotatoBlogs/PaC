var drawing = new Drawing('untitled-1');
var tool = 'brush'

var layerlbl, sclear, penColor, bgColor, penWidth, bg, bgbtn, colorpicker, brush, serase, save, s, NEWL, DLTL, MVLU, MVLD, SETLU, SETLD, CURL;

function setup() {
  createCanvas(640, 360)
  sclear = createButton("Clear");
  bgbtn = createButton("Background Active?");
  layerlbl = createP(drawing.currentLayer).id("layer");

  NEWL = createButton("New Layer");
  DLTL = createButton("Delete Layer");
  MVLU = createButton("Move Layer Up");
  MVLD = createButton("Move Layer Down");
  SETLU = createButton("Set Layer Up");
  SETLD = createButton("Set Layer Down");

  brush = createButton("Brush");
  serase = createButton("Erase");
  save = createButton("Save");
  colorpicker = createColorPicker('black');
  bgColor = createColorPicker('grey');
  bg = false;
  penWidth = createInput(15).id('hello').attribute('type', 'number');
  //CURL = createP(0);
}

function draw() {
  penColor = colorpicker.value()
  //CURL.value(drawing.currentLayer)
  //console.log(drawing.currentLayer)

  layerlbl.elt.innerText = "Current Layer: " + drawing.currentLayer + " Max Layer: " + (drawing.allLayers.length - 1)


  if (bg) {
    s = background(bgColor.value())
  } else {
    clear()
  }

  serase.mousePressed(function () {
    tool = 'erase'
  })

  brush.mousePressed(function () {
    tool = 'brush'
  })

  NEWL.mousePressed(function () {
    drawing.newLayer();
  })

  SETLU.mousePressed(function () {
    drawing.setActiveLayer((drawing.currentLayer + 1))
  })

  SETLD.mousePressed(function () {
    drawing.setActiveLayer((drawing.currentLayer - 1))
  })

  MVLU.mousePressed(function () {
    drawing.moveLayer("up")
  })

  MVLD.mousePressed(function () {
    drawing.moveLayer("down")
  })

  DLTL.mousePressed(function () {
    drawing.removeLayer()
  })

  bgbtn.mousePressed(function () {
    bg = !bg;
  })

  sclear.mousePressed(function () {
    drawing.allLayers[drawing.currentLayer] = []
  })

  save.mousePressed(function () {
    var url = document.getElementById('defaultCanvas0').toDataURL('image/png', 1.0)
    downloadImage(url, prompt("File Name? (Default: download)"));
  })

  if (mouseIsPressed) {
    if (tool == 'brush') {
      var line = new Line(penColor, penWidth.value())
      drawing.allLayers[drawing.currentLayer].push(line)
    } else if (tool == 'erase') {
      //var distance = dist()
    }
  }

  //var distance = dist(mouseX, mouseY, line.x, line.y)
  //console.log("X: "+winMouseX+" Y: "+winMouseY)

  for (layer in drawing.allLayers) {
    for (var line of drawing.allLayers[layer]) {
      line.show()


      //console.log(line.distance())
      if (tool == 'erase' && mouseIsPressed) {
        if (line.distance() < line.penWidth * 1.5) {
          drawing.allLayers[layer].splice(drawing.allLayers[layer].indexOf(line), 1)
        }
      }

    }
  }
}

function downloadImage(data, filename = 'download.png') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
