# AI Chat

AI chat application that generates images using Stable Diffusion and text responses using Llama cpp and can run locally.

https://github.com/jastrz/ai-chat/assets/20701963/d85b441e-19b8-4e2b-833f-f775fa293eab

# How to run

Clone repository, then inside main directory download or clone [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Download desired Stable Diffusion models and place them inside:
`stable-diffusion-webui/models/Stable-diffusion`

Download desired LLM models and place them inside `/backend/models`.

Fill data inside `/backend/.env.template` and change it's name to `.env`. Then
type `npm start` in console.

Setting `USE_DB=true` inside `.env` file will enable user authentication and history functionality and will require setting up/using existing MongoDB.
