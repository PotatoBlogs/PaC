var drawing = new Drawing('untitled-1');
var tool = 'brush'

var useMouse, candy, canx, cany, resize, bgcheck, buck, layerlbl, g, sclear, penColor, bgColor, penWidth, bg, load, bgbtn, colorpicker, brush, serase, save, s, NEWL, DLTL, MVLU, MVLD, SETLU, SETLD, CURL;

function setup() {
  candy = createCanvas(640, 360).id('cans')
  //candy = document.getElementById('cans')
  candy.attribute('onmouseover', 'hello()')
  candy.attribute('onmouseout', 'goodbye()')
  createElement('br')
  SETLU = createButton("Set Layer Up");
  SETLD = createButton("Set Layer Down");
  NEWL = createButton("New Layer");
  MVLU = createButton("Move Layer Up");
  MVLD = createButton("Move Layer Down");
  DLTL = createButton("Delete Layer");
  sclear = createButton("Clear Layer");

  layerlbl = createP(drawing.currentLayer).id("layer");

  penWidth = createInput(15).id('hello').attribute('type', 'number');


  colorpicker = createColorPicker('black');

  createElement('br')


  brush = createButton("Brush");
  brush.addClass('currentTool')
  buck = createButton("Bucket");
  serase = createButton("Erase");

  createElement('br')
  createElement('br')
  bgcheck = createCheckbox('Background Active? (Transparent if left unchecked)', true)
  bgColor = createColorPicker('white');


  createP("Project Title");

  g = createInput("untitled-1");
  createElement('br')
  createElement('br')

  createElement('label', 'x: ')

  canx = createInput(640).attribute('type', 'number')
  createElement('label', '  y: ')
  cany = createInput(360).attribute('type', 'number')
  resize = createButton('Resize Canvas')
  createElement('label', '  NOTE: You will have to resize the canvas again when loading a file.')

  createElement('br')
  createElement('br')
  save = createButton("Save");
  createElement('label', '  Load  ')
  load = createFileInput();

}

function draw() {

  penColor = colorpicker.value()

  layerlbl.elt.innerText = "Current Layer: " + drawing.currentLayer + " Max Layer: " + (drawing.allLayers.length - 1)
  g.changed(function () {
    drawing.name = g.elt.value
  })

  if (bgcheck.checked()) {
    s = background(bgColor.value())
  } else {
    clear()
  }

  serase.mousePressed(function () {
    tool = 'erase'
    buck.removeClass('currentTool')
    brush.removeClass('currentTool')

    serase.addClass('currentTool')

  })

  brush.mousePressed(function () {
    tool = 'brush'

    buck.removeClass('currentTool')
    serase.removeClass('currentTool')

    brush.addClass('currentTool')
  })

  buck.mousePressed(function () {
    tool = 'bucket'
    brush.removeClass('currentTool')
    serase.removeClass('currentTool')

    buck.addClass('currentTool')
  })

  resize.mousePressed(function () {
    resizeCanvas(canx.value(), cany.value())
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

  sclear.mousePressed(function () {
    drawing.allLayers[drawing.currentLayer] = []
  })

  load.changed(function (event) {
    LOAD(event)
  })

  save.mousePressed(function () {
    drawing.dataurl = document.getElementById('defaultCanvas0').toDataURL('image/png', 1.0)

    download(drawing.dataurl);

    var fileName = drawing.name + '.json';

    // Create a blob of the data
    var fileToSave = new Blob([JSON.stringify(drawing)], {
      type: 'asset/json'
    });

    download(URL.createObjectURL(fileToSave), fileName);
  })

  if (mouseIsPressed) {
    if (tool == 'brush' && useMouse) {
      var line = new Line(penColor, penWidth.value())
      drawing.allLayers[drawing.currentLayer].push(line)
    }
  }

  //var distance = dist(mouseX, mouseY, line.x, line.y)
  //console.log("X: "+winMouseX+" Y: "+winMouseY)

  for (layer in drawing.allLayers) {
    for (var line of drawing.allLayers[layer]) {
      line.show()
      if (useMouse) {
        if (tool == 'erase' && mouseIsPressed) {
          if (layer == drawing.currentLayer) {
            if (line.distance() < penWidth.value() * 1.5) {
              drawing.allLayers[layer].splice(drawing.allLayers[layer].indexOf(line), 1)
            }
          }
        } else if (tool == 'bucket' && mouseIsPressed) {
          if (layer == drawing.currentLayer) {
            if (line.distance() < penWidth.value() * 1.5) {
              line.penColor = penColor
            }
          }
        }
      }
    }
  }

  new Line(penColor, penWidth.value()).show()

}

function download(data, filename = drawing.name) {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function LOAD(eve) {
  const file = eve.target.files[0]
  const reader = new FileReader()
  var imported = new Drawing()

  if (file.type == 'application/json') {
    reader.readAsText(file)

    reader.onload = function (e) {
      const content = e.target.result
      var tmep = JSON.parse(content)

      imported.currentLayer = 0
      imported.allLayers = tmep.allLayers
      imported.name = tmep.name
      imported.dataurl = tmep.dataurl

      //drawing = imported

      for (layer in imported.allLayers) {
        for (var skip of imported.allLayers[layer]) {
          var h = new Line()
          h.penColor = skip.penColor
          h.penWidth = Number(skip.penWidth)
          h.px = Number(skip.px)
          h.py = Number(skip.py)
          h.x = Number(skip.x)
          h.y = Number(skip.y)
          imported.allLayers[layer][imported.allLayers[layer].indexOf(skip)] = h
        }
      }

      g.elt.value = imported.name

      drawing = imported
    }

  }
}

function hello() {
  useMouse = true;
}

function goodbye() {
  useMouse = false;
}