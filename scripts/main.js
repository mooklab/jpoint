import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'
import { phoneMask } from "./phone.js"



const indexMainSwiper = document.querySelector('section.main div.swiper.texts')
const indexMainSwiperThumbs = document.querySelector('section.main div.swiper.backgrounds')
const socialSwiper = document.querySelector('section.socials div.swiper')
const productSwipers = document.querySelectorAll('section.products div.swiper')
const collectionSwiper = document.querySelector('section.collections div.swiper')
const categorySwiper = document.querySelector('section.categories div.swiper')



// Маска телефона
const phoneInputs = document.querySelectorAll('input[type=tel]')
phoneInputs.forEach(phoneInput => {
    ['input', 'blur', 'focus'].forEach(event => {
        phoneInput.addEventListener(event, phoneMask)
    })
})

// Слайдер главного экрана
const thumbsSwiper = new Swiper(indexMainSwiperThumbs, {
    slidesPerView: 1,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    effect: 'fade',
    speed: 1500,
    fadeEffect: {
        crossFade: true
    },
    on: {
        init() {
            this.el.classList.add('show')
        }
    }
})

const mainSwiper = new Swiper(indexMainSwiper, {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: indexMainSwiper?.closest('section').querySelector('.swiper-pagination'),
        clickable: true,
    },
    thumbs: {
        swiper: thumbsSwiper
    },
    on: {
        init() {
            this.el.classList.add('show')
            animateSlide(this.slides[this.activeIndex])
        },
        slideChangeTransitionStart() {
            resetSlides(this.slides)
        },
        slideChangeTransitionEnd() {
            animateSlide(this.slides[this.activeIndex])
        }
    }
})

thumbsSwiper.on('slideChange', () => { mainSwiper.slideToLoop(thumbsSwiper.realIndex) })
mainSwiper.on('slideChange', () => { thumbsSwiper.slideTo(mainSwiper.realIndex) })

function resetSlides(slides) {
    slides.forEach(slide => {
        gsap.set(slide.querySelectorAll('h4, h1, a.button, button'), {
            opacity: 0,
            y: 40
        })
    })
}

function animateSlide(slide) {
    gsap.fromTo(
        slide.querySelectorAll('h4, h1, a.button, button'),
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }
    )
}





new Swiper(socialSwiper, {
    slidesPerView: 1.2,
    spaceBetween: 10,
    pagination: {
        el: socialSwiper?.closest('section').querySelector('.swiper-pagination2'),
        clickable: true,
    },
    on: {
        init() {
            this.el.classList.add('show')
        }
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        960: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
})


new Swiper(collectionSwiper, {
    slidesPerView: 1.02,
    spaceBetween: 10,
    navigation: {
        prevEl: collectionSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child'),
        nextEl: collectionSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child')
    },
    pagination: {
        el: collectionSwiper?.closest('section').querySelector('.swiper-pagination2'),
        clickable: true,
    },
    on: {
        init() {
            this.el.classList.add('show')
        }
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        960: {
            slidesPerView: 2,
            spaceBetween: 20
        }
    }
})


productSwipers.forEach(swiper => {
    new Swiper(swiper, {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: swiper?.closest('section').querySelector('.swiper-pagination2'),
            clickable: true,
        },
        navigation: {
            prevEl: swiper.closest('section').querySelector('div.swiper-navigation div.arrow:first-child'),
            nextEl: swiper.closest('section').querySelector('div.swiper-navigation div.arrow:last-child')
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    })
})






const productGallerySwiper = document.querySelector('section.main div.product div.swiper')
new Swiper(productGallerySwiper, {
    pagination: {
        el: productGallerySwiper?.closest('section').querySelector('.swiper-pagination'),
        clickable: true,
    },
})










new Swiper(categorySwiper, {
    slidesPerView: 1.53,
    spaceBetween: 55,
    centeredSlides: true,
    loop: true,
    speed: 700,
    navigation: {
        prevEl: categorySwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child'),
        nextEl: categorySwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child')
    },
    breakpoints: {
        960: {
            slidesPerView: 2,
            spaceBetween: 160
        }
    }
})

const categoryArrows = categorySwiper?.closest('section').querySelectorAll('div.swiper-navigation div.arrow')

categoryArrows?.forEach(arrow => {

    arrow.addEventListener('mousemove', event => {
        const rect = arrow.getBoundingClientRect()
        const img = arrow.querySelector('img')

        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        img.style.left = x + 'px'
        img.style.top = y + 'px'
    })

})












// Общая анимация страниц
const headerContainer = document.querySelector('header div.container')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const mainTimeline = gsap.timeline()

gsap.set(headerContainer, { opacity: 0, y: 50 })
gsap.set(main, { opacity: 0 })
gsap.set(footer, { opacity: 0 })

mainTimeline
    .to(headerContainer, { opacity: 1, y: 0, duration: 0.7 })
    .to(main, { opacity: 1, duration: 1 }, '-=0.2')
    .to(footer, { opacity: 1, duration: 1 }, '-=0.7')







// Управление классами шапки при скролле
let lastScrollY = window.scrollY
const header = document.querySelector('header')
const product_footer = document.querySelector('section.product_footer')

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY

    header.classList.toggle('scrolled', currentScrollY > 0)
    product_footer?.classList.toggle('scrolled', currentScrollY > 0)

    currentScrollY > lastScrollY && currentScrollY > 0
        ? header.classList.add('hidden')
        : header.classList.remove('hidden')

    product_footer?.classList.toggle('scrolled', currentScrollY >= 750)

    lastScrollY = currentScrollY
})







// Управление классами шапки для модалок
window.headerPopup = (activeClass) => {
    const classes = ['search', 'menu']
    const header = document.querySelector('header')
    const isActive = header.classList.contains(activeClass)

    if (activeClass === 'close') {
        header.classList.remove(...classes)
        return
    }

    header.classList.remove(...classes)
    !isActive && header.classList.add(activeClass)
}










// Анимация при скролле
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // entry.isIntersecting ? entry.target.classList.add('animate') : entry.target.classList.remove('animate')
        if (entry.isIntersecting) {
            entry.target.classList.add('animate')
        } else {
            entry.target.classList.remove('animate')
        }

    })
}, {
    rootMargin: '0px 0px -100px 0px'
})

var animateElements = document.querySelectorAll('div.observe')
animateElements.forEach(element => observer.observe(element))







// Селект

document.querySelectorAll('.select').forEach(select => {
    const selected = select.querySelector('.selected_item')
    const list = select.querySelector('.select_list')
    const input = select.querySelector('input[type="hidden"]')

    selected.addEventListener('click', e => {
        e.stopPropagation()

        // закрываем остальные
        document.querySelectorAll('.select.opened').forEach(item => {
            if (item !== select) {
                item.classList.remove('opened')
            }
        })

        select.classList.toggle('opened')
    })

    list.querySelectorAll('span').forEach(option => {
        option.addEventListener('click', () => {
            selected.querySelector('span').textContent = option.textContent
            input.value = option.dataset.value
            list.querySelectorAll('span').forEach(item => {
                item.classList.remove('active')
            })
            option.classList.add('active')
            select.classList.remove('active')
        })
    })
})


// клик вне селекта
document.addEventListener('click', () => {
    document.querySelectorAll('.select.opened').forEach(select => {
        select.classList.remove('opened')
    })
})











const products = document.querySelector('section.products')
if (products) {
    const buttons = products.querySelectorAll('div.views img')
    const savedView = localStorage.getItem('catalogView') || 'grid'

    setView(savedView)

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            setView(view)
            localStorage.setItem('catalogView', view)
        });
    });

    function setView(view) {
        products.classList.remove('grid', 'list')
        products.classList.add(view)

        buttons.forEach(button => {
            button.classList.toggle(
                'active',
                button.dataset.view === view
            )
        })
    }
}







// Инпут цены мин макс

const minRange = document.querySelector('.range-min')
const maxRange = document.querySelector('.range-max')
const minInput = document.querySelector('.input-min')
const maxInput = document.querySelector('.input-max')
const range = document.querySelector('.slider-range')
const MIN_GAP = 1000;

function updateSlider() {

    let minVal = Number(minRange.value);
    let maxVal = Number(maxRange.value);

    if (maxVal - minVal < MIN_GAP) {

        if (document.activeElement === minRange) {
            minVal = maxVal - MIN_GAP;
            minRange.value = minVal;
        } else {
            maxVal = minVal + MIN_GAP;
            maxRange.value = maxVal;
        }
    }

    const max = Number(minRange.max);

    const left = (minVal / max) * 100;
    const right = (maxVal / max) * 100;

    range.style.left = left + '%';
    range.style.width = (right - left) + '%';

    minInput.value = minVal;
    maxInput.value = maxVal;
}

function updateInputs() {

    let minVal = Number(minInput.value);
    let maxVal = Number(maxInput.value);

    const min = Number(minRange.min);
    const max = Number(minRange.max);

    minVal = Math.max(min, minVal);
    maxVal = Math.min(max, maxVal);

    if (maxVal - minVal < MIN_GAP) {
        return;
    }

    minRange.value = minVal
    maxRange.value = maxVal

    updateSlider();
}

minRange?.addEventListener('input', updateSlider)
maxRange?.addEventListener('input', updateSlider)
minInput?.addEventListener('input', updateInputs)
maxInput?.addEventListener('input', updateInputs)
if (range) updateSlider()




// Табы

const tabs = document.querySelectorAll('div.tabs')
tabs.forEach(section => {

    const captions = section.querySelectorAll('div.tab_caption')
    const contents = section.querySelectorAll('div.tab_content')

    captions.forEach(caption => {
        caption.addEventListener('click', () => {

            captions.forEach(item => item.classList.remove('active'))
            contents.forEach(item => item.classList.remove('active'))

            caption.classList.add('active')
            section
                .querySelector(`[data-tabcontent="${caption.dataset.tabcaption}"]`)
                .classList.add('active')
        })
    })
})



// Попап "товар добалвлен в корзину" для карточек товаров

const product_cards = document.querySelectorAll('a.product_card')
const cart_popup = document.querySelector('header div.cart_popup')
product_cards.forEach(card => {
    const buttons = card.querySelectorAll('button')
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault()
            cart_popup.classList.add('show')
            setTimeout(() => {
                cart_popup.classList.remove('show')
            }, 3000)
        })
    })
})




// Попап "Намекнуть о подарке"

const hint_buttons = document.querySelectorAll('section.main div.about div.buttons button.border')
const product_hint_popup = document.querySelector('section.product_hint')

hint_buttons.forEach(button => {
    button.addEventListener('click', e => {
        product_hint_popup.classList.toggle('show')
    })
})




// Лайтбокс
const zoomButton = document.querySelector('div.product div.gallery img.zoom')
const lightboxSwiper = document.querySelector('section.lightbox div.swiper')
const current = document.querySelector('section.lightbox span.current')
const total = document.querySelector('section.lightbox span.total')
const formatNumber = num => String(num).padStart(2, '0')

new Swiper(lightboxSwiper, {
    navigation: {
        prevEl: lightboxSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child'),
        nextEl: lightboxSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child')
    },
    on: {
        init(swiper) {
            current.textContent = formatNumber(swiper.realIndex + 1)
            total.textContent = formatNumber(swiper.slides.length)
        },

        slideChange(swiper) {
            current.textContent = formatNumber(swiper.realIndex + 1)
        }
    }
})
zoomButton.addEventListener('click', event => {
    lightboxSwiper.closest('section').classList.toggle('show')
})

