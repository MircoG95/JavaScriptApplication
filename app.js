/*  
!!!You must have an API key from OpenAI!!!
To get the Api key visit the OpenAI site. 
Create an account and look for the tab "view API Keys".
REMINDER!!!! do NOT deploy this API key or upload into GitHub with your Personal API-Key!!!!!!!!!!!!!!!!!
*/

const API_KEY = "" //<-- Put in your API-Key as a string
const submitIcon = document.querySelector("#submit-icon")
const inputElement = document.querySelector("input")
const imageSection = document.querySelector('.images-section')

const getImages = async () => {

    const options = {
        method: "POST",
        headers : {
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(
            {
            prompt : inputElement.value,
            n : 4,
            size :  "1024x1024"
            }
        )
    }

    try{
        const response = await fetch("https://api.openai.com/v1/images/generations", options)   
        const data = await response.json() 
        
        data?.data.forEach(imageObjekt => {
           const imageContainer = document.createElement("div") 
            imageContainer.classList.add("image-container")
            const imageElement = document.createElement("img")
            imageElement.setAttribute("src", imageObjekt.url)
            imageContainer.append(imageElement)
            imageSection.append(imageContainer)
        })
    } catch(error){
        console.error(error)
    } 
}
submitIcon.addEventListener('click', getImages)