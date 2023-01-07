import {
  APIEmbed,
  Client,
  Embed,
  Events,
  GatewayIntentBits,
  JSONEncodable,
  WebhookClient,
} from "discord.js";
import * as dotenv from "dotenv";
import { logSave } from "./lib/modules/logSave";
import {
  buildStartEmbed,
  buildSuccessEmbed,
  CIResultEmbed,
  githubEventTimeStamped,
} from "./lib/modules/embedParser";
import envSelector from "./lib/modules/envSelector";
import createEmbed from "./lib/templates/createEmbed";
import express from "express";
import path from "path";

const app = express();
// import commandListner from "./listener/dist/commandListner";

dotenv.config();

// "길드"라는 용어는 Discord API와 discord.js에서 Discord 서버를 지칭하는 데 사용됩니다.
// define은 또한 Discord가 봇에 보내야 하는 이벤트를 정의하며 최소 이상을 활성화할 수 있습니다.
// define 항목 에서 다른 의도에 대해 자세히 읽을 수 있습니다.
// Create a new client instance

const env = envSelector("develop");
const productEnv = envSelector("product");

export interface PetBotClient extends Client {
  commands?: any;
}

const client: PetBotClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

const onLineEmbed = createEmbed({
  title: "봇이 활성화 되었어요",
  avatarURL:
    "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
  description: "야옹",
});

const webhookClient = new WebhookClient({
  url: env.webhookURL,
});

export const botProfile = {
  username: "petBot",
  avatarURL:
    "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
};

export const waitPreArray: Embed[] = [];

client.on(Events.ClientReady, (petBotClient) => {
  console.log(`Ready! Logged in as ${petBotClient.user.tag}`);

  petBotClient.channels
    .fetch(env.channelId)
    .then(async (textChannel) => {
      const hook = await client
        .fetchWebhook(productEnv.webhookId, productEnv.webhookToken)
        .catch((e) => {
          console.error(e);

          webhookClient.send({
            ...botProfile,
            content: `대상 채널에 webhook이 없거나 env 파일이 빠져있을수 있음`,
          });
        });

      webhookClient.send({
        ...botProfile,
        embeds: [onLineEmbed],
      });

      if (!textChannel) {
        webhookClient.send({
          ...botProfile,
          content: "개발용 서버에 인식된 textChannel 없음",
        });

        return;
      }

      textChannel?.client.on(Events.MessageCreate, (msgCreateEvent) => {
        logSave(msgCreateEvent, webhookClient);

        // CI 시작되었음을 알리는, 타임 스탬프를 임베드에 찍어서
        // 펫북 채널로 재전송하는 부분
        if (
          msgCreateEvent.author.username === "GitHub" &&
          msgCreateEvent.embeds &&
          (msgCreateEvent.embeds[0].title?.includes("petBook-Client:fe") ||
            msgCreateEvent.embeds[0].title?.includes(
              "[K-Slave/petBook-Client] Pull request"
            ))
        ) {
          const logedEmbeds = githubEventTimeStamped(
            msgCreateEvent,
            webhookClient
          );

          if (!hook) {
            webhookClient.send({
              ...botProfile,
              content: "개발용 채널에 인식된 webhook 없음",
            });

            return;
          }

          try {
            hook.send({
              username: "petBot",
              avatarURL:
                "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
              embeds: logedEmbeds,
            });
          } catch (err) {
            webhookClient.send({
              ...botProfile,
              content: "logedEmbeds 가 비어있는 컨텐츠임",
            });
          }
        }

        // CI 가 끝났음을 알리는, 워크플로우가 걸린 시간을 측정해서
        // 펫북 채널로 재전송 하는 부분
        if (
          msgCreateEvent.author.username === "petBot" &&
          msgCreateEvent.channelId === env.channelId &&
          msgCreateEvent.embeds &&
          msgCreateEvent.embeds.length > 0 &&
          msgCreateEvent.embeds[0] &&
          msgCreateEvent.embeds[0].title?.includes("petBook Web Client CI") &&
          msgCreateEvent.embeds[0].description?.includes("??")
        ) {
          let logedEmbeds: (APIEmbed | JSONEncodable<APIEmbed>)[] = [];

          if (
            msgCreateEvent.embeds[0].title.includes(
              "petBook Web Client CI : pull_request"
            )
          ) {
            logedEmbeds = CIResultEmbed(msgCreateEvent, "PR", webhookClient);
          }

          if (
            msgCreateEvent.embeds[0].title.includes(
              "petBook Web Client CI : push"
            )
          ) {
            logedEmbeds = CIResultEmbed(msgCreateEvent, "PUSH", webhookClient);
          }

          if (!hook) {
            webhookClient.send({
              ...botProfile,
              content: "개발용 채널에 인식된 webhook 없음",
            });

            return;
          }

          try {
            hook.send({
              username: "petBot",
              avatarURL:
                "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
              embeds: logedEmbeds,
            });
          } catch (err) {
            webhookClient.send({
              ...botProfile,
              content: "logedEmbeds 가 비어있는 컨텐츠임",
            });
          }
        }

        if (
          msgCreateEvent.author.username === "petBot" &&
          msgCreateEvent.content.includes("빌드중...")
        ) {
          const logedEmbeds = buildStartEmbed(msgCreateEvent, webhookClient);

          if (!hook) {
            webhookClient.send({
              ...botProfile,
              content: "개발용 채널에 인식된 webhook 없음",
            });

            return;
          }

          try {
            hook.send({
              username: "petBot",
              avatarURL:
                "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
              embeds: logedEmbeds,
            });
          } catch (err) {
            webhookClient.send({
              ...botProfile,
              content: "logedEmbeds 가 비어있는 컨텐츠임",
            });
          }
        }

        if (
          msgCreateEvent.author.username === "petBot" &&
          msgCreateEvent.content.includes("빌드 성공")
        ) {
          const logedEmbeds = buildSuccessEmbed(msgCreateEvent, webhookClient);

          if (!hook) {
            webhookClient.send({
              ...botProfile,
              content: "개발용 채널에 인식된 webhook 없음",
            });

            return;
          }

          const attachment = [...msgCreateEvent.attachments][0];

          try {
            hook.send({
              username: "petBot",
              avatarURL:
                "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
              embeds: [...logedEmbeds],
              files: [attachment[1]],
            });
          } catch (err) {
            webhookClient.send({
              ...botProfile,
              content: "logedEmbeds 가 비어있는 컨텐츠임",
            });
          }
        }
      });
    })
    .catch((e) => {
      console.error(e);
    });
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

// commandListner(client);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get(`${process.env.LOG_KEY}`, (req, res) => {
  res.sendFile(path.join(__dirname + "/../logData.json"));
});

app.listen("1009", () => {
  console.log(process.env.LOG_KEY);
  console.log("ready to logData.json response");
});
