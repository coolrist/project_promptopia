import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const prompts = await Prompt.findById(params.id).populate('creator')

        if (!prompts) {
            return new Response("Prompt not found", { status: 404 })
        }
        return new Response(JSON.stringify(prompts))
    } catch (error) {
        return new Response("Failed to fetch all prompts")
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()

    try {
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.id)

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 })
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt))
    } catch (error) {
        return new Response("Failed to update prompt")
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()
        
        Prompt.findByIdAndRemove(params.id)
        
        return new Response("Prompt deleted successfully")
    } catch (error) {
        return new Response("Failed to delete prompt")
    }
}