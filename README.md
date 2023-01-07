# petBook-Client-Notify

### 실행 방법

0. node.js > 16 버전과 pnpm 패키지 매니저, .env 파일, 기존 logData.json 파일이 필요합니다
   logData.json 파일은 없다면 봇을 두세번정도 테스트 운행을 해주면 해결됩니다.

1. 레포지토리를 클론 받습니다
2. 의존성 패키지를 다운받습니다 ( 레포지토리의 루트 디렉터리에서 )

```
  $ pnpm install
```

3. 최초 1회에는 타입스크립트 파일이 컴파일 되어있어야 합니다. js 파일로만 실행이 가능하기 때문입니다. 아래 명령어를 입력합니다 ( 루트 디렉터리에서 )

```
  $ pnpm build:webhook_discord
```

4. 봇이 죽더라도 계속 다시 실행되도록 다음 명령어를 입력합니다 ( 루트 디렉터리에서 )

```
  $ pnpm start-forever:webhook_discord
```

## 봇의 작동 구조

- 이 레포지토리에 있는 봇은, 개발용 개인 채널 (steven-yn) 에 전송되어지는 웹훅를 자신의 로컬 환경에 로깅하여 보관하고 있다가,
  특정 메시지가 들어오게 되면 펫북채널로 발송해주는 봇입니다.
- 모든 최초 웹훅 메세지는 개발 채널로 들어오게 되며, 펫북 팀 채널로 들어오는 메시지들은 이 봇에서 발송됩니다
- 추후 외부 발송 웹훅과 봇 발송 웹훅에 대한 문서를 작성하도록 하겠습니다

## 디코 채널 메시지 예제 데이터

```
{
    "channelId": "123456",
    "guildId": "123456",
    "id": "123456",
    "createdTimestamp": 1673106155177,
    "type": 0,
    "system": false,
    "content": "빌드 성공\n종료시간 : 2023-01-08T00:42:34.915+09:00",
    "author": {
      "id": "123456",
      "bot": true,
      "system": false,
      "flags": null,
      "username": "petBot",
      "discriminator": "0000",
      "avatar": "123456",
      "createdTimestamp": 1673105200181,
      "defaultAvatarURL": "https://cdn.discordapp.com/embed/avatars/0.png",
      "tag": "petBot#123456",
      "avatarURL": "https://cdn.discordapp.com/avatars/123456/123456.webp",
      "displayAvatarURL": "https://cdn.discordapp.com/avatars/123456/123456.webp"
    },
    "pinned": false,
    "tts": false,
    "nonce": null,
    "embeds": [
      {
        "type": "rich",
        "title": "petBook Web Client 빌드 성공 !",
        "description": "🛬 빌드 종료 : 1/8 - 00:42:34\n⏱ 빌드 하는데 걸린 시간 : ??",
        "color": 36194
      }
    ],
    "components": [],
    "attachments": [
      {
        "attachment": "https://cdn.discordapp.com/attachments/123456/123456/buildLog.txt",
        "name": "buildLog.txt",
        "id": "123456",
        "size": 36849,
        "url": "https://cdn.discordapp.com/attachments/123456/123456/buildLog.txt",
        "proxyURL": "https://media.discordapp.net/attachments/123456/123456/buildLog.txt",
        "height": null,
        "width": null,
        "contentType": "text/plain; charset=utf-8",
        "description": null,
        "ephemeral": false
      }
    ],
    "stickers": [],
    "position": null,
    "editedTimestamp": null,
    "reactions": {
      "message": {
        "channelId": "123456",
        "guildId": "123456",
        "id": "123456",
        "createdTimestamp": 1673106155177,
        "type": 0,
        "system": false,
        "content": "빌드 성공\n종료시간 : 2023-01-08T00:42:34.915+09:00",
        "authorId": "123456",
        "pinned": false,
        "tts": false,
        "nonce": null,
        "embeds": [
          {
            "type": "rich",
            "title": "petBook Web Client 빌드 성공 !",
            "description": "🛬 빌드 종료 : 1/8 - 00:42:34\n⏱ 빌드 하는데 걸린 시간 : ??",
            "color": 36194
          }
        ],
        "components": [],
        "attachments": [
          "123456"
        ],
        "stickers": [],
        "position": null,
        "editedTimestamp": null,
        "mentions": {
          "everyone": false,
          "users": [],
          "roles": [],
          "crosspostedChannels": [],
          "repliedUser": null,
          "members": [],
          "channels": []
        },
        "webhookId": "123456",
        "groupActivityApplicationId": null,
        "applicationId": null,
        "activity": null,
        "flags": 0,
        "reference": null,
        "interaction": null,
        "cleanContent": "빌드 성공\n종료시간 : 2023-01-08T00:42:34.915+09:00"
      }
    },
    "mentions": {
      "everyone": false,
      "users": [],
      "roles": [],
      "crosspostedChannels": [],
      "repliedUser": null,
      "members": [],
      "channels": []
    },
    "webhookId": "123456",
    "groupActivityApplication": null,
    "applicationId": null,
    "activity": null,
    "flags": 0,
    "reference": null,
    "interaction": null
  }
```
