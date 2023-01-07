import { Message } from "discord.js";

// 둘중 마지막 메시지를 리턴함
// find 메서드 자체가 하나 찾으면 바로 리턴

export const getLastCommitMsg = (logData: Message[]) => {
  const lastFePush = logData.find((log) => {
    const embedsLog = log.embeds[0];
    const authorLog = log.author;

    if (
      authorLog &&
      authorLog.username === "GitHub" &&
      (embedsLog.title?.includes("petBook-Client:fe") ||
        embedsLog.title?.includes("[K-Slave/petBook-Client] Pull request"))
    ) {
      return true;
    }

    return false;
  });

  return lastFePush;
};

export const getPushCommitMsg = (logData: Message[]) => {
  const lastFePush = logData.find((log) => {
    const embedsLog = log.embeds[0];
    const authorLog = log.author;

    if (
      authorLog &&
      authorLog.username === "GitHub" &&
      embedsLog.title?.includes("petBook-Client:fe")
    ) {
      return true;
    }

    return false;
  });

  return lastFePush;
};

export const getPRCommitMsg = (logData: Message[], authorName?: string) => {
  const lastPR = logData.find((log) => {
    const embedsLog = log.embeds[0];
    const authorLog = log.author;

    if (
      authorLog &&
      authorLog.username === "GitHub" &&
      !embedsLog.title?.includes("petBook-Client:fe") &&
      embedsLog.author?.name === authorName &&
      embedsLog.title?.includes("petBook-Client")
    ) {
      return true;
    }
    return false;
  });

  return lastPR;
};

export const getVercelUpdated = (logData: Message[]) => {
  const lastUpdated = logData.find((log) => {
    const content = log.content;

    if (content && content.includes("vercel updated")) {
      return true;
    }

    return false;
  });

  if (!lastUpdated) {
    return "";
  }

  return lastUpdated;
};
