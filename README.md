# AI Chat

AI chat application that generates images using Stable Diffusion models and text responses using Llama cpp.

# How to run

Clone repository, then inside main directory download or clone [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Download desired Stable Diffusion models and place them inside:
`stable-diffusion-webui/models/Stable-diffusion`

Download desired LLM models and place them inside `/backend/models`.

Fill data inside `/backend/.env.template` and change it's name to `.env`. Then
type `npm start` in console.

Setting `USE_DB=true` inside `.env` file will enable user authentication and history functionality and will require setting up/using existing MongoDB server.
