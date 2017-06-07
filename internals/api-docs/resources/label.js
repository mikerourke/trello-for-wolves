/**
 * @api {path} /labels label
 * @apiVersion 1.0.0
 * @apiName label
 * @apiGroup overview
 * @apiDescription
 *    A label is a way of categorizing a card by type, represented by a color
 *    and term or, for colorless labels, a term only. There are 10 label colors
 *    to choose from in Trello, and a colorless label option. You can choose
 *    to add label names if you wish. A single card can have multiple labels.
 *    Colored labels will display on the front and back of a card, and colorless
 *    labels (represented by the light gray color) will display on the back of
 *    the card. Label names will only show on the back of the card.
 */

/**
 * @apiDefine LabelFieldsQueryArg
 * @apiParam {String="all","color","idBoard","name","uses"} [fields='"all"']
 *    Label fields to include in response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine LabelInclusionQueryArgs
 * @apiParam {String="all","none"} [labels='"none"'] Labels to include in
 *    response.
 * @apiParam {String="all","color","idBoard","name","uses"} [labelFields='"all"']
 *    Label fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */
