import { Message, WebhookClient } from "discord.js";
import { botProfile } from "../..";
import { getLocalData, setLocalData } from "../common/fsFunction";

export const logSave = (
  msgObject: Message<boolean>,
  webhookClient?: WebhookClient
) => {
  try {
    const localJSON = getLocalData();
    const msg = {
      ...msgObject,
      author: msgObject.author,
    };

    if (msgObject && msgObject.channelId === "858929985279492129") {
      localJSON.push(msg);
      setLocalData(localJSON);
    }
  } catch (error) {
    if (webhookClient) {
      webhookClient.send({
        ...botProfile,
        content: `logSave 에서 에러발생\n${error}`,
      });

      console.error(error);
    }
  }
};
