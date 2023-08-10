const key = "k3cOsCwi5p-3CvNL3MsmI3ArGny3rR8civNvLhdYbnE"

let formElement = document.querySelector("form")
let searchBox = document.querySelector(".search-box")
let button = document.querySelector(".btn-primary")
let searchResults = document.querySelector(".search-results")
let showMore = document.querySelector(".btn-secondary")


let inputData = ""
let page = 1;

async function searchImages(){
    inputData = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results
    console.log(results)

    if(page==1)
    {
        searchResults.innerHTML =""
    }

    results.map((result)=>{
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-results-box")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    })

    page++
    if(page>1)
    {
        showMore.style.display="block"
    }
}
formElement.addEventListener("submit",(event)=>{
    event.preventDefault()
    page =1
    searchImages()
})
showMore.addEventListener("click", ()=>{
    searchImages()
})

