import { APIEmbed, JSONEncodable, Message, WebhookClient } from "discord.js";
import { getLocalData } from "../common/fsFunction";
import createEmbed from "../templates/createEmbed";
import dayjs from "dayjs";
import { botProfile } from "../..";
import {
  getPRCommitMsg,
  getPushCommitMsg,
  getVercelUpdated,
} from "./getCommit";
import { getStartTimeStr } from "./getTime";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";

export const githubEventTimeStamped = (
  msgEvt: Message<boolean>,
  webhookClient?: WebhookClient
) => {
  const parsedArr: (APIEmbed | JSONEncodable<APIEmbed>)[] | undefined = [];

  try {
    const githubEmbed = [...msgEvt.embeds][0];

    if (githubEmbed && msgEvt) {
      const date = dayjs(msgEvt.createdTimestamp);

      const lastUpdatedTime = getStartTimeStr(date);

      if (githubEmbed.description) {
        const desc = `π‘ μ½λμ λ¬Έμ κ° μλμ§ κ²μ¬ μμ.. : ${lastUpdatedTime}\n\n${githubEmbed.description}`;

        const sendEmbed = createEmbed({
          ...githubEmbed.data,
          author: githubEmbed.author,
          description: desc,
        });

        parsedArr.push(sendEmbed);
      } else {
        parsedArr.push(githubEmbed);
      }
    }
  } catch (error) {
    if (webhookClient) {
      webhookClient.send({
        ...botProfile,
        content: `githubEventTimeStamped μμ μλ¬λ°μ\n${error}`,
      });

      console.error(error);
    }
  }

  return parsedArr;
};

export const CIResultEmbed = (
  msgEvt: Message<boolean>,
  kind: "PR" | "PUSH",
  webhookClient?: WebhookClient
) => {
  const logData: Message[] = getLocalData().reverse();
  const parsedArr: (APIEmbed | JSONEncodable<APIEmbed>)[] | undefined = [];
  try {
    const CIEmbed = [...msgEvt.embeds][0];
    let embedDesc = CIEmbed.description;
    let CIProcessResult = "";

    // μμμκ°μ΄ μ ν Msg κ° μ‘νκ²μ
    let lastMsg: Message<boolean> | undefined = undefined;

    if (kind === "PR") {
      lastMsg = getPRCommitMsg(logData, CIEmbed.author?.name);
    }

    console.log(lastMsg, "lastMsg");

    if (kind === "PUSH") {
      lastMsg = getPushCommitMsg(logData);
    }

    if (CIEmbed && lastMsg) {
      const lastMsgCreatedTime = dayjs(lastMsg.createdTimestamp);
      const CIMsgCreatedTime = dayjs(msgEvt.createdTimestamp);
      const minDiff = CIMsgCreatedTime.diff(lastMsgCreatedTime, "m");
      const secDiff = (
        CIMsgCreatedTime.diff(lastMsgCreatedTime, "s", true) % 60
      ).toFixed(3);

      CIProcessResult = `${minDiff > 0 ? minDiff + "m " : ""}${secDiff}s`;

      if (CIEmbed.description) {
        embedDesc = CIEmbed.description.replace(
          "??",
          CIProcessResult ? CIProcessResult : "μκ° κ³μ° μλ¬ λ°μ"
        );
      }

      const sendEmbed = createEmbed({
        ...CIEmbed.data,
        author: CIEmbed.author,
        description: embedDesc,
      });

      parsedArr.push(sendEmbed);
    }
  } catch (error) {
    if (webhookClient) {
      webhookClient.send({
        ...botProfile,
        content: `CIResultEmbed μμ μλ¬λ°μ\n${error}`,
      });

      console.error(error);
    }
  }

  return parsedArr;
};

export const buildStartEmbed = (
  msgEvt: Message<boolean>,
  webhookClient?: WebhookClient
) => {
  const logData: Message[] = getLocalData().reverse();
  const parsedArr: (APIEmbed | JSONEncodable<APIEmbed>)[] | undefined = [];
  try {
    let lastUpdatedTime = "";
    const buildEmbed = [...msgEvt.embeds][0];
    let embedDesc = buildEmbed.description;

    // TODO : νμ¬λ λ΄ λ ν¬μμ fork sync λμΌμ§λ§ λ°°ν¬λλ―λ‘ μ΄λ κ² ν΄λμμ
    const lastUpdateMessage =
      getVercelUpdated(logData) || getPushCommitMsg(logData);

    if (buildEmbed && lastUpdateMessage) {
      const date = dayjs(lastUpdateMessage.createdTimestamp);

      if (date) {
        lastUpdatedTime = `${date.year()}λ ${(
          date.month() + 1
        ).toString()}/${date.date()}μΌ ${date.hour()}μ${date.minute()}λΆ`;
      }

      if (buildEmbed.description) {
        embedDesc = buildEmbed.description.replace(
          "??",
          lastUpdatedTime ? lastUpdatedTime : "λ‘κ·Έ μμ μ‘΄μ¬νμ§ μμ"
        );

        const sendEmbed = createEmbed({
          ...buildEmbed.data,
          description: embedDesc,
        });

        parsedArr.push(sendEmbed);
      } else {
        parsedArr.push(buildEmbed);
      }
    }

    // if (
    //   lastUpdateMessage &&
    //   lastUpdateMessage.embeds &&
    //   lastUpdateMessage.embeds.length > 0
    // ) {
    //   const foundEmbeds = lastUpdateMessage.embeds.find((embed: Embed) =>
    //     embed.title?.includes("petBook-Client:fe")
    //   );

    //   if (foundEmbeds) {
    //     parsedArr.push(foundEmbeds);
    //   }
    // }
  } catch (error) {
    if (webhookClient) {
      webhookClient.send({
        ...botProfile,
        content: `buildStartEmbed μμ μλ¬λ°μ\n${error}`,
      });

      console.error(error);
    }
  }

  return parsedArr;
};

export const buildSuccessEmbed = (
  msgEvt: Message<boolean>,
  webhookClient?: WebhookClient
) => {
  const logData: Message[] = getLocalData().reverse();
  const parsedArr: (APIEmbed | JSONEncodable<APIEmbed>)[] | undefined = [];

  try {
    let buildTimeResult = "";
    const buildEmbed = [...msgEvt.embeds][0];
    let embedDesc = buildEmbed.description;

    const buildStartContent = logData.find((log) => {
      const contentLog = log.content;

      if (contentLog.includes("μμμκ°")) {
        return true;
      }

      return false;
    })?.content;

    const buildEndContent = logData.find((log) => {
      const contentLog = log.content;

      if (contentLog.includes("μ’λ£μκ°")) {
        return true;
      }
      return false;
    })?.content;

    if (buildEmbed) {
      if (buildStartContent && buildEndContent) {
        const buildStarted = buildStartContent.slice(
          15,
          buildStartContent.length
        );

        const buildEnded = buildEndContent.slice(13, buildEndContent.length);

        const buildStartDate = dayjs(buildStarted);
        const buildEndDate = dayjs(buildEnded);
        const buildMinTime = buildEndDate.diff(buildStartDate, "m");
        const buildSecTime = (
          buildEndDate.diff(buildStartDate, "s", true) % 60
        ).toFixed(3);

        buildTimeResult = `${
          buildMinTime > 0 ? buildMinTime + "m " : ""
        }${buildSecTime}s`;
      }

      if (buildEmbed.description) {
        embedDesc = buildEmbed.description.replace(
          "??",
          buildTimeResult ? buildTimeResult : "??"
        );

        const sendEmbed = createEmbed({
          ...buildEmbed.data,
          description: embedDesc,
        });

        const productLink = createEmbed({
          url: "https://www.petbook.site/",
          type: "link",
          title: "μ¬μ΄νΈ νμΈνκΈ° : https://www.petbook.site/",
          description: "λ°°ν¬ λ‘κΉ νμΈνκΈ° : νμ¬λ μ§μλμ§ μμμ",
          // https://vercel.com/steven-yn/pet-book-client/deployments
        });

        parsedArr.push(sendEmbed);
        parsedArr.push(productLink);
      } else {
        parsedArr.push(buildEmbed);
      }
    }
  } catch (error) {
    if (webhookClient) {
      webhookClient.send({
        ...botProfile,
        content: `buildSuccessEmbed μμ μλ¬λ°μ ${error}`,
      });

      console.error(error);
    }
  }

  return parsedArr;
};
