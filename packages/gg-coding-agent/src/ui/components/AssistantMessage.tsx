import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../theme/theme.js";
import { Markdown } from "./Markdown.js";

interface AssistantMessageProps {
  text: string;
  thinking?: string;
  showThinking?: boolean;
}

export function AssistantMessage({ text, thinking, showThinking = true }: AssistantMessageProps) {
  const theme = useTheme();

  return (
    <Box flexDirection="column" marginTop={1}>
      {showThinking && thinking && (
        <Box marginBottom={1}>
          <Text color={theme.textDim} italic>
            {thinking.length > 500 ? thinking.slice(0, 497) + "..." : thinking}
          </Text>
        </Box>
      )}
      {text && (
        <Box flexShrink={1}>
          <Text color={theme.primary}>{"⏺ "}</Text>
          <Box flexDirection="column" flexGrow={1} flexShrink={1} flexBasis={0}>
            <Markdown>{text.trimStart()}</Markdown>
          </Box>
        </Box>
      )}
    </Box>
  );
}
