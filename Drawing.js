class Drawing {
    constructor(name) {
        this.currentLayer = 0
        this.allLayers = [
            []
        ]
        this.dataurl = ''
        this.name = name
    }

    moveLayer(updown) {
        var newId, temp
        var oldId = this.currentLayer

        if (updown == "up" && this.currentLayer != (this.allLayers.length - 1)) {
            newId = this.currentLayer
            newId++

            temp = this.allLayers[newId]

            this.allLayers[newId] = this.allLayers[oldId]

            this.allLayers[oldId] = temp
            this.currentLayer = newId
        }

        if (updown == "down" && this.currentLayer != 0) {
            newId = this.currentLayer
            newId--

            temp = this.allLayers[newId]
            this.allLayers[newId] = this.allLayers[oldId]
            this.allLayers[oldId] = temp
            this.currentLayer = newId
        }
    }

    newLayer() {
        this.allLayers[this.allLayers.length] = []
        this.currentLayer = this.allLayers.length - 1
    }

    removeLayer() {
        if (this.allLayers.length > 1) {
            this.allLayers[this.currentLayer] = [];
            for (let i = this.currentLayer; i < (this.allLayers.length - 1); i++) {
                this.moveLayer("up")
            }
            this.allLayers.pop()
            this.currentLayer = this.allLayers.length-1
        }
    }

    setActiveLayer(layer) {
        if (layer < (this.allLayers.length) && layer > -1) {
            this.currentLayer = layer
        }
    }
}