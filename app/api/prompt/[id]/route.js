import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

//PATCH (update)

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (existingPrompt) {
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();
      return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } else {
      return new Response("Prompt not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Failed to find the prompt", { status: 500 });
  }
};

//DELETE

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Deleted successfully.", { status: 200 });
  } catch (error) {
    return new Response("Failed to find the prompt", { status: 500 });
  }
};
