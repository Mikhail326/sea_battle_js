const shipData = [
  { size: 4, direction: 'row', startX: 10, startY: 345 },
  { size: 3, direction: 'row', startX: 10, startY: 390 },
  { size: 3, direction: 'row', startX: 120, startY: 390 },
  { size: 2, direction: 'row', startX: 10, startY: 435 },
  { size: 2, direction: 'row', startX: 88, startY: 435 },
  { size: 2, direction: 'row', startX: 167, startY: 435 },
  { size: 1, direction: 'row', startX: 10, startY: 480 },
  { size: 1, direction: 'row', startX: 55, startY: 480 },
  { size: 1, direction: 'row', startX: 100, startY: 480 },
  { size: 1, direction: 'row', startX: 145, startY: 480 },
]


class PreparationScene extends Scene {
  draggedShip = null
  draggedOffsetX = 0
  draggedOffsetY = 0

  removeEventListeners = []
  randomize() {
    this.app.player.randomize()

    for (let i = 0; i < 10; i++) {
      this.app.player.ships[i].startX = shipData[i].startX
      this.app.player.ships[i].startY = shipData[i].startY
    }
  }
  manually() {
    const { player } = this.app
    player.removeAllShips()
    for (const { size, direction, startX, startY } of shipData) {
      const ship = new ShipView(size, direction, startX, startY)
      player.addShip(ship)
    }
  }
  startComputer() {
    const matrix = this.app.player.matrix
    const withoutShipItems = matrix.flat().filter(item => !item.ship)
    this.app.start('computer')
  }
  init() {
    this.manually()
  }
  start() {
    this.removeEventListeners = []

    this.removeEventListeners.push(addEventListener(randomizeButton, 'click', () => this.randomize()))
    this.removeEventListeners.push(addEventListener(manuallyButton, 'click', () => this.manually()))
    this.removeEventListeners.push(addEventListener(computerButton, 'click', () => this.startComputer()))

  }
  update() {
    const { mouse, player } = this.app

    if (!this.draggedShip && mouse.left && !mouse.pLeft) {
      const ship = player.ships.find(ship => ship.isUnder(mouse))

      if (ship) {
        const shipRect = ship.div.getBoundingClientRect()
        this.draggedOffsetX = mouse.x - shipRect.left
        this.draggedOffsetY = mouse.y - shipRect.top

        this.draggedShip = ship

        ship.x = null
        ship.y = null
      }
    }
    if (mouse.left && this.draggedShip) {
      const { left, top } = player.root.getBoundingClientRect()
      this.draggedShip.div.style.left = `${mouse.x - left - this.draggedOffsetX}px`
      this.draggedShip.div.style.top = `${mouse.y - top - this.draggedOffsetY}px`
    }

    if (!mouse.left && this.draggedShip) {
      const ship = this.draggedShip
      this.draggedShip = null

      const { left, top } = ship.div.getBoundingClientRect()
      const { width, height } = player.cells[0][0].getBoundingClientRect()

      const point = {
        x: left + width / 2,
        y: top + height / 2
      }

      const cell = player.cells.flat().find((cell) => isUnderPoint(point, cell))

      if (cell) {
        const x = parseInt(cell.dataset.x)
        const y = parseInt(cell.dataset.y)
        player.removeShip(ship)
        player.addShip(ship, x, y)
      } else {
        player.removeShip(ship)
        player.addShip(ship)
      }
    }
    if (this.draggedShip && mouse.delta) {
      this.draggedShip.toggleDirection()
    }

    if (player.complete) {
      document.querySelector('.computer-button').disabled = false
    } else {
      document.querySelector('.computer-button').disabled = true
    }
  }
  stop() {
    for (const removeEventListener of this.removeEventListeners) {
      removeEventListener()
    }

    this.removeEventListeners = []
  }
}