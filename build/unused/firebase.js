// import * as functions from "firebase-functions";
// import axios from "axios";
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// const webhooks = new octokit.Webhooks({
//   secret: functions.config().github_webhook.secret,
// });
// exports.githubNotifier = functions
//   .runWith({
//     memory: "128MB",
//   })
//   .https.onRequest((request, response) => {
//     const event = request.headers["x-github-event"];
//     const hook = {
//       id: request.headers["x-github-delivery"] as string,
//       name: event as any,
//       payload: request.rawBody.toString() as string,
//       signature: request.headers["x-hub-signature-256"] as string,
//     };
//     return webhooks
//       .verifyAndReceive(hook)
//       .then(() => {
//         response.status(200).send("Webhook handled");
//       })
//       .catch((err) => {
//         functions.logger.error(err);
//         response.status(500).send("Webhook not processed");
//       });
//   });
// function sendWebhook(
//   author: string,
//   icon: string,
//   description: string,
//   title: string,
//   body: string,
//   url: string
// ) {
//   const request = {
//     username: "Ocean Bot",
//     avatar_url: "<snip>",
//     embeds: [
//       {
//         color: 0xffc89c,
//         author: {
//           name: author,
//           icon_url: icon,
//         },
//         title: description,
//         fields: [
//           {
//             name: title,
//             value: body,
//           },
//         ],
//         url: url,
//       },
//     ],
//   };
//   functions.logger.info("Sending discord webhook", { request });
//   return axios
//     .post(functions.config().discord_hook.url, request)
//     .then((res) => {
//       functions.logger.info("Discord webhook send successful", { res });
//     })
//     .catch((err) => {
//       functions.logger.error("Discord webhook failed", { err });
//     });
// }
// webhooks.on(
//   ["pull_request.opened", "pull_request.reopened", "pull_request.closed"],
//   ({ id, name, payload }) => {
//     functions.logger.info("Handling Pull Request", { id, name, payload });
//     sendWebhook(
//       payload.pull_request.user.login,
//       payload.pull_request.user.avatar_url,
//       `Pull Request #${payload.pull_request.number} ${payload.action}`,
//       payload.pull_request.title,
//       payload.pull_request.body,
//       payload.pull_request.html_url
//     );
//   }
// );
//# sourceMappingURL=firebase.js.map