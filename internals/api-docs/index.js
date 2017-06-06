/**
 * @apiDefine read Read access rights needed.
 */

/**
 * @apiDefine write Write access rights needed.
 */

/**
 * @apiDefine owner Owner access rights needed.
 */

/**
 * @apiDefine DeltasQueryArgs
 * @apiParam {String} tags A valid tag for subscribing.
 * @apiParam {Number{-1-Infinity}} ixLastUpdate Index of last update.
 */

/**
 * @apiDefine LimitQueryArg
 * @apiParam {Number{0-1000}} [limit=50] Number of records to limit for
 *    response.
 */

/**
 * @apiDefine PageQueryArg
 * @apiParam {Number} [page=0] Pages to include in response.  Page * limit
 *    must be less than 1,000.
 */

/**
 * @apiDefine WithinLimitsQueryArgs
 * @apiParam {String="count","list","minimal"} [format="list"] Format for
 *    displaying results in the response.
 * @apiParam {String="lastView",date,null} [since] Starting date for data to
 *    include in the response, can be a date, <code>null</code> or
 *    <code>"lastView"</code>.
 * @apiParam {Date} [before] Ending date for data to include in response, can
 *    be either a date or <code>null</code>.
 */
