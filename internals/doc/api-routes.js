/**
 * @api {get} /boards/:boardId getBoard
 * @apiVersion 1.0.0
 * @apiName getBoard
 * @apiDescription Get details of a single board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {Boolean} [actions_entities=false]
 * @apiParam {Boolean} [actions_display=false]
 * @apiParam {String} [actions_format="list"]
 * @apiParam {String} [actions_since]
 * @apiParam {Number{0-1000}} [actions_limit=50]
 * @apiParam {String} [action_fields="all"]
 * @apiParam {Boolean} [action_member=true]
 * @apiParam {String} [action_member_fields="avatarHash,fullName,initials,username"]
 * @apiParam {Boolean} [action_memberCreator=true]
 * @apiParam {String} [action_memberCreator_fields="avatarHash,fullName,initials,username"]
 * @apiParam {String} [cards="none"]
 * @apiParam {String} [card_fields="all"]
 * @apiParam {Boolean} [card_attachments=false]
 * @apiParam {String} [card_attachment_fields="all"]
 * @apiParam {String} [card_checklists="none"]
 * @apiParam {Boolean} [card_pluginData=false]
 * @apiParam {Boolean} [card_stickers=false]
 * @apiParam {String} [boardStars="none"]
 * @apiParam {String} [labels="none"]
 * @apiParam {String} [label_fields="all"]
 * @apiParam {Number{0-1000}} [labels_limit=50]
 * @apiParam {String} [lists="none"]
 * @apiParam {String} [list_fields="all"]
 * @apiParam {String} [memberships="none"]
 * @apiParam {Boolean} [memberships_member=false]
 * @apiParam {String} [memberships_member_fields="fullName,username"]
 * @apiParam {String} [members="none"]
 * @apiParam {String} [member_fields="avatarHash,fullName,initials,username"]
 * @apiParam {String} [membersInvited="none"]
 * @apiParam {String} [membersInvited_fields="avatarHash,fullName,initials,username"]
 * @apiParam {Boolean} [pluginData=false]
 * @apiParam {String} [checklists="none"]
 * @apiParam {String} [checklist_fields="all"]
 * @apiParam {Boolean} [organization=false]
 * @apiParam {String} [organization_fields="name,displayName"]
 * @apiParam {Boolean} [organization_memberships="none"]
 * @apiParam {Boolean} [organization_pluginData=false]
 * @apiParam {Boolean} [myPrefs=false]
 * @apiParam {Boolean} [tags=false]
 * @apiParam {String} [fields="name,desc,descData,closed,idOrganization,pinned,url,shortUrl,prefs,labelNames"]
 * @apiExample {js} Example:
  trello.boards('BoArDId').getBoard({ ... });
 */

/**
 * @api {get} /boards/:boardId/:field getFieldValue
 * @apiVersion 1.0.0
 * @apiName getFieldValue
 * @apiDescription Gets the value of the specified field on a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {Boolean} [entities=false] Include entities in the response.
 * @apiParam {Boolean} [display=false] // TODO: What is this for?
 * @apiParam {String[]} [filter="all"]
 * @apiExample {js} Example:
 trello.boards('BoArDId').getFieldValue('closed');
 */

/**
 * @api {get} /boards/:boardId/actions getActions
 * @apiVersion 1.0.0
 * @apiName getActions
 * @apiDescription Gets the value of the specified field on a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse BoardField
 * @apiExample {js} Example:
 trello.boards('BoArDId').getActions('closed');
 */

/**
 * @api {get} /boards/:boardId/boardStars getBoardStars
 * @apiVersion 1.0.0
 * @apiName getBoardStars
 * @apiDescription Gets the stars associated with a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {String="mine","none"} [filter="mine"] Filter for board stars.
 * @apiExample {js} Example:
 trello.boards('BoArDId').getBoardStars('none');
 */

/**
 * @api {get} /boards/:boardId/deltas getDeltas
 * @apiVersion 1.0.0
 * @apiName getDeltas
 * @apiDescription Gets the deltas for a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {String} tags A valid tag for subscribing.
 * @apiParam {Number{-1-Infinity}} ixLastUpdate
 * @apiExample {js} Example:
 trello.boards('BoArDId').getDeltas('none', 5);
 */

/**
 * @api {get} /boards/:boardId/tags getTags
 * @apiVersion 1.0.0
 * @apiName getTags
 * @apiDescription Gets the tags associated with a board.
 * @apiGroup board
 * @apiPermission read
 * @apiExample {js} Example:
 trello.boards('BoArDId').getTags();
 */

/**
 * @api {get} /boards/:boardId/myPrefs getMyPrefs
 * @apiVersion 1.0.0
 * @apiName getMyPrefs
 * @apiDescription Gets all myPrefs associated with a board.
 * @apiGroup board
 * @apiPermission read
 * @apiExample {js} Example:
 trello.boards('BoArDId').getMyPrefs();
 */

/**
 * @api {get} /boards/:boardId/pluginData getPluginData
 * @apiVersion 1.0.0
 * @apiName getPluginData
 * @apiDescription Gets plugin data associated with a board.
 * @apiGroup board
 * @apiPermission read
 * @apiExample {js} Example:
 trello.boards('BoArDId').getPluginData();
 */
