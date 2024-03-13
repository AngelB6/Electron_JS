const $ = selector => document.querySelector(selector)

const $count = $('#count');
const $button = $('button');

$button.addEventListener('click', ()=>{
    const count = +$count.innerHTML
    $count.innerHTML = (count + 1)
})