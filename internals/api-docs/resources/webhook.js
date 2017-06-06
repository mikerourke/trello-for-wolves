/**
 * @api {path} /webhooks webhook
 * @apiVersion 1.0.0
 * @apiName webhook
 * @apiGroup overview
 * @apiDescription
 * A developer could theoretically parse a user's Boards, Lists, and Cards in
 * order to get all of the information, but this would mean loading a lot of
 * data that doesn't change very often, using more bandwidth, CPU, and RAM
 * for both you and for our servers. To mitigate this we have built a system
 * that allows your application to hook into updates on various members such
 * as Boards, Lists, and Cards. Whenever a member with a Webhook is changed,
 * we make an HTTP request to the endpoint of your choosing.
 */
