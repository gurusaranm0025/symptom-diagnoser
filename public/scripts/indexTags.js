// Tags for input code
const submitBtn = document.querySelector(".submit-btn")
const input_tag = document.querySelector('.input-tag')
const tags_length = document.querySelector('.tags-length')

let tags_list = []
input_tag.addEventListener("keyup", (e) => {
    const val = input_tag.value

    if (e.key === "Enter") {
        if (tags_list.length > 0 && val == '') {
            submitBtn.click();
        } else {
            if(tags_list.some(e => e.text == val)) return alert('Duplicate tags')
            if (val == '') return;
    
            const tags = val.split(',').map(e => e.trim()).filter(e => e !== "")
    
            for (let i of tags) {
                tags_list.push({
                    id: Math.random().toString(10).substring(2, 10),
                    text: i
                })
            }
    
            input_tag.value = ""
            console.log(input_tag)
            RenderTags()
        }
    }
})

function RenderTags() {
    const wrapper_tags = document.querySelector(".wrapper-tags")
    let cache = ""

    document.querySelectorAll('.item-tag').forEach(e => e.remove())
    cache = ""

    tags_list.forEach(e => {
        cache = `<div class="item-tag">
                    <span>${e.text}</span>
                    <button type="button" data-id="${e.id}" class="btn-rm-tag">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </div>`;
        wrapper_tags.insertAdjacentHTML('afterbegin', cache)
        HandleRmTags()
    })

    tags_length.textContent = `${tags_list.length} Tags`
}

function HandleRmTags() {
    const buttons = document.querySelectorAll('.btn-rm-tag')
    if(buttons.length > 0) {
        buttons.forEach(e => {
            e.onclick = function () {
                const data_id = Number(e.getAttribute('data-id'))
                tags_list = tags_list.filter(x => x.id != data_id)
                RenderTags()
            }
        })
    }
}

// End of tags for input code area
const submitButton = document.querySelector(".submit-btn")

submitButton.addEventListener("click", () => {
    console.log("value changed")

    const list = [];
    tags_list.forEach(tag => {
        list.push(tag.text)
    })
    console.log(list)
    submitButton.value = list
    console.log(submitButton.value)
})

//hover or focus on input tag change the border color
const wrapperTags = document.querySelector('.wrapper-tags')
input_tag.addEventListener("focus", () => {
    wrapperTags.style.border = '3px solid #007c8fff';
})

input_tag.addEventListener('blur', () => {
    wrapperTags.style.border = '3px solid #18435aff';
})