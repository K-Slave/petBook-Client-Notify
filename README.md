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

1. 커밋로그 웹훅 수집 (fe)
2. 빌드 시작 메시지 수집 (preRunner)
3. 두개의 내용 합산해서 petbook 채널로 웹훅 또는 봇으로 전송 (0xffd400)
4. 빌드 종료 메시지 수집
5. 빌드 타임 측정, 종료 시간, 성공 여부 판단

- 성공했다면, 커밋 로그 / site url 과 임베드 / 맨아래 번들 크기만 정보만 따로 출력해서 전송 (0x036635)
- 실패했다면, 커밋 로그와 전체 txt 파일을 전송 (0x9b111e)

// TODO: 12.19

[x] 봇 인스턴스 실행시 보낼 메시지 만들기
[x] 최종적으로 내보낼 메시지 꾸미기
[x] 혹시나 에러가 떠서 죽을경우 처리
[x] 빌드 타임 계산 시키기
[x] 모든 에러처리를 통해 봇이 죽지 않도록 처리
[x] 결과물 url 링크와 버셀링크

1. logData.json 저장 시퀀스 최적화 (마지막 fe 커밋만 남기고 저장)
2. 일정 시간마다 한번 종료시키고 재실행 되도록 처리
3. 몇가지 커맨드 만들어주기 (getLogData 등)
4. yarn build 커맨드 입력시 txt 파일과 log 둘다 출력되게 (npm)
5. js 코드를 읽지 못하는 문제 ( txt 파일에 color 코드 파싱해서 지우기 )
6. 가능하다면 txt 파일로 보내지 말고, 메시지에 계속 수정되도록 처리하기
7. 로더 감아주기 또는 프로그레스바 구현
8. 디코 봇 배포하기
9. 유저 태그하기 등 처리

- ++ 빌드환경이 로컬인지 버셀인지 구별하기

// TODO : 12.20

[x] 에러 발생시 로그 전송 처리
[x] 마지막 steven-yn / fe 업데이트를 기준으로

1. 추후 petbook site 임베드 처리 ( title, desc )
2. 한번씩 메모리 관리차원에서 재시동 할수있게

프로세스 포트 조회 sudo lsof -PiTCP -sTCP:LISTEN
