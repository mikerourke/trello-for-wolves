/**
 * @api {path} /cards card
 * @apiVersion 1.0.0
 * @apiName card
 * @apiGroup overview
 * @apiDescription
 *    A Card is the most basic unit of information in Trello. Cards have a name,
 *    description, labels, members, and a set of historical actions that have
 *    been taken on the card, including any comments.
 *    <h3>Child Methods</h3>
 *    <ul>
 *      <li>
 *        <h4>Actions</h4>
 *        Actions are the audit log/record of everything that has been
 *        done to a card throughout its history, including any comments that
 *        have been made.
 *      </li>
 *      <br>
 *      <li>
 *        <h4>Labels</h4>
 *        Labels can be as simple as colors attached to a Card, or Labels can
 *        have names.
 *      </li>
 *    </ul>
 */

/**
 * @apiDefine CardFieldQueryArg
 * @apiParam {String="badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} field
 *    Card field to get value for.
 */

/**
 * @apiDefine CardFieldsQueryArg
 * @apiParam {String="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [fields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine CardFilterQueryArg
 * @apiParam {String="all","closed","none","open","visible"} [filter='"all"']
 *    Card types to include in the response
 */

/**
 * @apiDefine CardInclusionQueryArgs
 * @apiParam {String="all","closed","none","open","visible"} [cards='"none"']
 *    Limit cards in the response.
 * @apiParam {String="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [cardFields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine AttachmentInclusionQueryArgs
 * @apiParam {Boolean=true,false,"cover"} [attachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>,
 *    include none, and if <code>"cover"</code>, include only card cover
 *    attachments.
 * @apiParam {String="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [attachmentFields='"all"']
 *    Attachment fields to include in the response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine CardAttachmentInclusionQueryArgs
 * @apiParam {Boolean=true,false,"cover"} [cardAttachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>,
 *    include none, and if <code>"cover"</code>, include only card cover
 *    attachments.
 * @apiParam {String="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [cardAttachmentFields='"all"']
 *    Card attachment fields to include in the response, can either be
 *    <code>"all"</code> or an array of field names.
 */
