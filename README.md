# AI Chat

AI chat application that generates images using Stable Diffusion and text responses using Llama cpp and can run locally.

![heheader2](https://github.com/jastrz/ai-chat/assets/20701963/a61a5c86-4f27-432e-bf2c-8d4e93681363)

# How to run

Clone repository, then inside main directory download or clone [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

Download desired Stable Diffusion models and place them inside:
`stable-diffusion-webui/models/Stable-diffusion`<br>
You can use this as a starter: [Realistic Vision V2.0](https://huggingface.co/SG161222/Realistic_Vision_V2.0)

Download desired LLM models and place them inside `/backend/models`.<br>
You can use this link as a starter source: [TheBloke on Hugging Face](https://huggingface.co/TheBloke?search_models=GGUF)

Fill data inside `/backend/.env.template` and change it's name to `.env`. Then
type `npm start` in console.

Setting `USE_DB=true` inside `.env` file will enable user authentication and history functionality and will require setting up/using existing MongoDB. 

Note: Currently, only the version with db works properly, as not all functionality has been separated from the database yet, so you need to install and setup MongoDB locally too... Sorry for that.
[MongoDB Community Server Download](https://www.mongodb.com/try/download/community-kubernetes-operator)

