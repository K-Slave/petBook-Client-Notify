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
        const desc = `💡 코드에 문제가 있는지 검사 시작.. : ${lastUpdatedTime}\n\n${githubEmbed.description}`;

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
        content: `githubEventTimeStamped 에서 에러발생\n${error}`,
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

    // 시작시간이 적힌 Msg 가 잡힐것임
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
          CIProcessResult ? CIProcessResult : "시간 계산 에러 발생"
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
        content: `CIResultEmbed 에서 에러발생\n${error}`,
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

    // TODO : 현재는 내 레포에서 fork sync 되야지만 배포되므로 이렇게 해두었음
    const lastUpdateMessage =
      getVercelUpdated(logData) || getPushCommitMsg(logData);

    if (buildEmbed && lastUpdateMessage) {
      const date = dayjs(lastUpdateMessage.createdTimestamp);

      if (date) {
        lastUpdatedTime = `${date.year()}년 ${(
          date.month() + 1
        ).toString()}/${date.date()}일 ${date.hour()}시${date.minute()}분`;
      }

      if (buildEmbed.description) {
        embedDesc = buildEmbed.description.replace(
          "??",
          lastUpdatedTime ? lastUpdatedTime : "로그 안에 존재하지 않음"
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
  } catch (error) {
    if (webhookClient) {
      webhookClient.send({
        ...botProfile,
        content: `buildStartEmbed 에서 에러발생\n${error}`,
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

      if (contentLog.includes("시작시간")) {
        return true;
      }

      return false;
    })?.content;

    const buildEndContent = logData.find((log) => {
      const contentLog = log.content;

      if (contentLog.includes("종료시간")) {
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
          title: "사이트 확인하기 : https://www.petbook.site/",
          description: "배포 로깅 확인하기 : 현재는 지원되지 않아요",
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
        content: `buildSuccessEmbed 에서 에러발생 ${error}`,
      });

      console.error(error);
    }
  }

  return parsedArr;
};
