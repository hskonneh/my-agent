import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { getFileChangesInDirectoryTool } from "./tools";
import { SYSTEM_COMMIT } from "./commit";

const codeCommitAgent = async (prompt: string) => {
  const result = streamText({
    model: google("models/gemini-2.5-flash"),
    prompt,
    system: SYSTEM_COMMIT,
    tools: {
      getFileChangesInDirectoryTool: getFileChangesInDirectoryTool,
    },
    stopWhen: stepCountIs(10),
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
};

// Specify which directory the code review agent should review changes in your prompt
await codeCommitAgent(
  "Scan the whole project  and Review the code changes in '../my-agent' directory, make a professional commit message for the changes in the project.",
);