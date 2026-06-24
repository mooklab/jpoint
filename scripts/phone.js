// ----------------------- Маска для телефона

export const phoneMask = function (event) {

    var element = event.target,
        pattern = "+7 (___) ___-__-__",
        i = 0,
        def = pattern.replace(/\D/g, ""),
        val = event.target.value.replace(/\D/g, "")

    // Проверка на валиидацию
    const cleanValue = element.value.replace(/\D/g, '')
    const isValid = cleanValue.length === 11 || cleanValue.length === 12
    element.classList.toggle('invalid', !isValid);


    if (def.length >= val.length) val = def
    event.target.value = pattern.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    })


}



// ----------------------- Маска для телефона