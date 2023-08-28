import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    //connect to db
    await connectToDB();

    //create a new prompt
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    //save the prompt in db
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to return new prompt", { status: 500 });
  }
};
