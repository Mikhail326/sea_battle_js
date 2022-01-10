class ComputerScene extends Scene {
  playerTurn = true

  start() {
    const { opponent } = this.app
    const container = document.querySelector('.container')
    const finishGame = document.createElement('div')
    finishGame.classList.add('finish-game')
    finishGame.textContent = 'Игра идёт...'
    container.append(finishGame)
    const randomizeButton = document.querySelector('.randomize-button')
    randomizeButton.classList.add('hidden')

    const manuallyButton = document.querySelector('.manually-button')
    manuallyButton.classList.add('hidden')

    const computerButton = document.querySelector('.computer-button')
    computerButton.classList.add('hidden')
    opponent.clear()
    opponent.randomize(ShipView)

  }

  update() {
    const { mouse, opponent, player } = this.app
    const isEnd = opponent.loser || player.loser
    const finishGame = document.querySelector('.finish-game')
    if (isEnd) {
      if (opponent.loser) {
        finishGame.textContent = 'Вы выиграли!!!'
        document.body.style.backgroundImage = "url('https://i.yapx.ru/HTjD9.gif')"
      } else {
        finishGame.textContent = 'Вы проиграли((('
      }
      return
    }
    const cells = opponent.cells.flat()
    cells.forEach(cell => cell.classList.remove('battlefield-item__active'))

    if (isUnderPoint(mouse, opponent.table)) {
      const cell = cells.find(cell => isUnderPoint(mouse, cell))
      if (cell) {
        cell.classList.add('battlefield-item__active')
        if (this.playerTurn && mouse.left && !mouse.pLeft) {
          const x = parseInt(cell.dataset.x)
          const y = parseInt(cell.dataset.y)
          const shot = new ShotView(x, y)
          const result = opponent.addShot(shot)

          if (result) {
            this.playerTurn = shot.variant === 'miss' ? false : true
          }
        }
      }
    }

    if (!this.playerTurn) {
      const x = getRandomBetween(0, 9)
      const y = getRandomBetween(0, 9)

      const shot = new ShotView(x, y)
      const result = player.addShot(shot)
      if (result) {
        this.playerTurn = shot.variant === 'miss' ? true : false
      }
    }
  }
}