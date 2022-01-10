class ShipView extends Ship {
  div = null
  startX = null
  startY = null

  setDirection(newDirection, force = false) {
    if (!force && this.direction === newDirection) {
      return false
    }

    this.div.classList.remove(`ship-${this.direction}-${this.size}`)
    this.direction = newDirection
    this.div.classList.add(`ship-${this.direction}-${this.size}`)
    return true
  }
  isUnder(point) {
    return isUnderPoint(point, this.div)
  }

  toggleDirection() {
    const newDirection = this.direction === 'row' ? 'column' : 'row'
    this.setDirection(newDirection)
  }
  constructor(size, direction, startX, startY) {
    super(size, direction)
    const div = document.createElement('div')
    div.classList.add('ship')
    this.div = div
    this.startX = startX
    this.startY = startY

    this.setDirection(direction, true)
  }

}