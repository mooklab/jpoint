// Атрибуты элементов
const dialogAttribute = 'data-modal-name'
const buttonAttribute = 'data-modal-target'
const closeAttribute = 'data-modal-close'

const buttons = document.querySelectorAll('[' + buttonAttribute + ']')

buttons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault()
        target = button.getAttribute(buttonAttribute)
        createDialog(target)
    })
})


const createDialog = (target, video = null) => {
    const dialog = document.querySelector('[' + dialogAttribute + '=' + target + ']')
    const links = dialog.querySelectorAll('[' + closeAttribute + ']')

    closeDialogs()
    dialog.showModal()

    links.forEach(link => link.addEventListener('click', closeDialogs))
    dialog.addEventListener('click', event => event.target === dialog && closeDialogs())
}

const closeDialogs = () => {
    const openedDialogs = document.querySelectorAll('[' + dialogAttribute + ']')
    openedDialogs.forEach(dialog => {
        dialog.close()
    })
}


// Добавляем в CSS переменную значение ширины скроллбара
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px")

// createDialog('callback')