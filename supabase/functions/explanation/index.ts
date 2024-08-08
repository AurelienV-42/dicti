import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import OpenAI from "https://deno.land/x/openai@v4.55.1/mod.ts";

const configuration = {
  apiKey: Deno.env.get("OPENAI_API_KEY") ?? "",
};

const client = new OpenAI(configuration);

async function getCorrectWordExplanation(
  req: Request,
): Promise<Response> {
  const { incorrectWord, correctWord, correctText, userID } = await req.json();
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: "user",
          content:
            `Tu es un correcteur de dictée. Donne moi une explication simple de pourquoi le mot "${incorrectWord}" doit être corrigé "${correctWord}" dans la dictée suivante "${correctText}". Je veux uniquement la raison, va droit au but, sans donner d'exemple.`,
        },
      ],
      max_tokens: 80,
      user: userID,
      model: "gpt-3.5-turbo",
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion = await client.chat
      .completions.create(params);
    const explanation = chatCompletion.choices[0].message.content;
    return new Response(JSON.stringify({ explanation }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to generate explanation" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

serve(getCorrectWordExplanation);
