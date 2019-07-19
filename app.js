document.addEventListener('DOMContentLoaded', () => {
    const allSpans = Array.from(document.querySelectorAll('span'))
    const operators = Array.from(document.querySelectorAll('.operator'))
    const numbers = allSpans.filter(span => span.className != 'operator')
    const bigFour = operators.filter(span => span.innerText == '+' || span.innerText == '-' || span.innerText == 'x' || span.innerText == '÷')
    const equals = document.querySelector('#equals')
    const clear = document.querySelector('#clear')
    const screen = document.querySelector('#screen')

    numbers.map(element => element.addEventListener('click', () => {
        console.log(event.target.innerText)
        getPokePicture(event.target.innerText)
        screen.innerText += event.target.innerText
    }))

    bigFour.map(element => element.addEventListener('click', () => {
        screen.innerText += event.target.innerText
    }))

    clear.addEventListener('click', () => {
        screen.innerText = ''
    })

    equals.addEventListener('click', () => {
        const input = screen.innerText
        const parsedInput = input.replace(/x/g, '*').replace(/÷/g, '/')
        const answer = eval(parsedInput)
        getPokePicture(answer)
        screen.innerText = answer
    })

    function getPokePicture(pokemon) {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

        const img = document.createElement('img')
        const body = document.querySelector('#calculator')

        fetch(apiUrl)
            .then(response => response.json())
            .then(parsedJson => {
                const sprite = parsedJson.sprites.front_default

                img.src = sprite
                body.appendChild(img)
                console.log(img)
            })
    }
});