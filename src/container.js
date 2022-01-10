const container = document.createElement('div')
const player = document.createElement('div')
const opponent = document.createElement('div')
const h1 = document.createElement('h1')

h1.textContent = 'Морской бой'
document.body.append(h1)

container.classList.add('container')
document.body.append(container)

player.setAttribute('data-side','player')
container.append(player)

opponent.setAttribute('data-side','opponent')
container.append(opponent)

const containerButton = document.createElement('div')
containerButton.classList.add('container-button')
container.append(containerButton)



const randomizeButton = document.createElement('button')
randomizeButton.classList.add('randomize-button')
randomizeButton.textContent = 'Раставить случайно'
containerButton.append(randomizeButton)

const manuallyButton = document.createElement('button')
manuallyButton.classList.add('manually-button')
manuallyButton.textContent = 'Раставить самому'
randomizeButton.after(manuallyButton)

const computerButton = document.createElement('button')
computerButton.setAttribute('disabled', true)
computerButton.classList.add('computer-button')
computerButton.textContent = 'Играть с компьютером'
manuallyButton.after(computerButton)