# Coverage

The table below contains all of the available Trello routes and their status in terms of project coverage.

### Icon Details
✅: Task is complete. If it's a test, it passed and can be re-ran.<br />
📝: Indicates that there is a note associated with the item.<br />
🆗: Test passed the first time it was ran, but I don't want to keep running the tests.  These usually entail things like generating keys or creating users.<br />
📌: Test was skipped or is failing, need to come back to it.<br />
🔒: Premium feature or special permission that I'm not able to test (e.g. Business Class).<br />

| Id       | Resource      | Type | Path                                           | Code | Test      | Doc |
|:---------|:--------------|:-----|:-----------------------------------------------|:----:|:---------:|:---:|
| ACT-G-01 | actions       | GET  | /:id                                           | ✅  | ✅         | ✅ | 
| ACT-G-02 | actions       | GET  | /:id/:field                                    | ✅  | ✅         | ✅ | 
| ACT-G-03 | actions       | GET  | /:id/board                                     | ✅  | ✅         | ✅ | 
| ACT-G-04 | actions       | GET  | /:id/board/:field                              | ✅  | ✅         | ✅ | 
| ACT-G-05 | actions       | GET  | /:id/card                                      | ✅  | ✅         | ✅ | 
| ACT-G-06 | actions       | GET  | /:id/card/:field                               | ✅  | ✅         | ✅ | 
| ACT-G-07 | actions       | GET  | /:id/display                                   | ✅  | ✅         | ✅ | 
| ACT-G-08 | actions       | GET  | /:id/entities                                  | ✅  | ✅         | ✅ | 
| ACT-G-09 | actions       | GET  | /:id/list                                      | ✅  | ✅         | ✅ | 
| ACT-G-10 | actions       | GET  | /:id/list/:field                               | ✅  | ✅         | ✅ | 
| ACT-G-11 | actions       | GET  | /:id/member                                    | ✅  | ✅         | ✅ | 
| ACT-G-12 | actions       | GET  | /:id/member/:field                             | ✅  | ✅         | ✅ | 
| ACT-G-13 | actions       | GET  | /:id/memberCreator                             | ✅  | ✅         | ✅ | 
| ACT-G-14 | actions       | GET  | /:id/memberCreator/:field                      | ✅  | ✅         | ✅ | 
| ACT-G-15 | actions       | GET  | /:id/organization                              | ✅  | ✅         | ✅ | 
| ACT-G-16 | actions       | GET  | /:id/organization/:field                       | ✅  | ✅         | ✅ | 
| ACT-U-01 | actions       | PUT  | /:id                                           | ✅  | ✅         | ✅ | 
| ACT-U-02 | actions       | PUT  | /:id/text                                      | ✅  | ✅         | ✅ | 
| ACT-D-01 | actions       | DEL  | /:id                                           | ✅  | [📝](#N1)  | ✅ | 
| BTC-G-01 | batch         | GET  | /                                              | ✅  | ✅         | ✅ | 
| BRD-G-01 | boards        | GET  | /:id                                           | ✅  | ✅         | ✅ | 
| BRD-G-02 | boards        | GET  | /:id/:field                                    | ✅  | ✅         | ✅ | 
| BRD-G-03 | boards        | GET  | /:id/actions                                   | ✅  | ✅         | ✅ | 
| BRD-G-04 | boards        | GET  | /:id/boardStars                                | ✅  | ✅         | ✅ | 
| BRD-G-05 | boards        | GET  | /:id/cards                                     | ✅  | ✅         | ✅ |
| BRD-G-06 | boards        | GET  | /:id/cards/:filter                             | ✅  | ✅         | ✅ | 
| BRD-G-07 | boards        | GET  | /:id/cards/:idCard                             | ✅  | ✅         | ✅ | 
| BRD-G-08 | boards        | GET  | /:id/checklists                                | ✅  | ✅         | ✅ | 
| BRD-G-09 | boards        | GET  | /:id/deltas                                    | ✅  | 🔒         | ✅ | 
| BRD-G-10 | boards        | GET  | /:id/idTags                                    | ✅  | 🔒         | ✅ | 
| BRD-G-11 | boards        | GET  | /:id/labels                                    | ✅  | ✅️         | ✅ |
| BRD-G-12 | boards        | GET  | /:id/labels/:idLabel                           | ✅  | ✅         | ✅ | 
| BRD-G-13 | boards        | GET  | /:id/lists                                     | ✅  | ✅         | ✅ | 
| BRD-G-14 | boards        | GET  | /:id/lists/:filter                             | ✅  | ✅         | ✅ | 
| BRD-G-15 | boards        | GET  | /:id/members                                   | ✅  | ✅         | ✅ | 
| BRD-G-16 | boards        | GET  | /:id/members/:filter                           | ✅  | ✅         | ✅ | 
| BRD-G-17 | boards        | GET  | /:id/members/:idMember/cards                   | ✅  | ✅         | ✅ | 
| BRD-G-18 | boards        | GET  | /:id/membersInvited                            | ✅  | ✅         | ✅ | 
| BRD-G-19 | boards        | GET  | /:id/membersInvited/:field                     | ✅  | ✅         | ✅ | 
| BRD-G-20 | boards        | GET  | /:id/memberships                               | ✅  | ✅         |    |
| BRD-G-21 | boards        | GET  | /:id/memberships/:idMembership                 | ✅  | ✅         |    |
| BRD-G-22 | boards        | GET  | /:id/myPrefs                                   | ✅  | ✅         | ✅ | 
| BRD-G-23 | boards        | GET  | /:id/organization                              | ✅  | ✅         |    |
| BRD-G-24 | boards        | GET  | /:id/organization/:field                       | ✅  | ✅         |    |
| BRD-G-25 | boards        | GET  | /:id/pluginData                                | ✅  | ✅         | ✅ | 
| BRD-U-01 | boards        | PUT  | /:id                                           | ✅  | ✅         |    |
| BRD-U-02 | boards        | PUT  | /:id/closed                                    | ✅  | ✅         |    |
| BRD-U-03 | boards        | PUT  | /:id/desc                                      | ✅  | ✅         |    |
| BRD-U-04 | boards        | PUT  | /:id/idOrganization                            | ✅  | ✅         |    |
| BRD-U-05 | boards        | PUT  | /:id/labelNames/blue                           | ✅  | ✅         |    |
| BRD-U-06 | boards        | PUT  | /:id/labelNames/green                          | ✅  | ✅         |    |
| BRD-U-07 | boards        | PUT  | /:id/labelNames/orange                         | ✅  | ✅         |    |
| BRD-U-08 | boards        | PUT  | /:id/labelNames/purple                         | ✅  | ✅         |    |
| BRD-U-09 | boards        | PUT  | /:id/labelNames/red                            | ✅  | ✅         |    |
| BRD-U-10 | boards        | PUT  | /:id/labelNames/yellow                         | ✅  | ✅         |    |
| BRD-U-11 | boards        | PUT  | /:id/members                                   | ✅  | 🆗         |    |
| BRD-U-12 | boards        | PUT  | /:id/members/:idMember                         | ✅  | 🆗         |    |
| BRD-U-13 | boards        | PUT  | /:id/memberships/:idMembership                 | ✅  | ✅         |    |
| BRD-U-14 | boards        | PUT  | /:id/myPrefs/emailPosition                     | ✅  | ✅         |    |
| BRD-U-15 | boards        | PUT  | /:id/myPrefs/idEmailList                       | ✅  | 📌         |    |
| BRD-U-16 | boards        | PUT  | /:id/myPrefs/showListGuide                     | ✅  | ✅         |    |
| BRD-U-17 | boards        | PUT  | /:id/myPrefs/showSidebar                       | ✅  | ✅         |    |
| BRD-U-18 | boards        | PUT  | /:id/myPrefs/showSidebarActivity               | ✅  | ✅         |    |
| BRD-U-19 | boards        | PUT  | /:id/myPrefs/showSidebarBoardActions           | ✅  | ✅         |    |
| BRD-U-20 | boards        | PUT  | /:id/myPrefs/showSidebarMembers                | ✅  | ✅         |    |
| BRD-U-21 | boards        | PUT  | /:id/name                                      | ✅  | ✅         |    |
| BRD-U-22 | boards        | PUT  | /:id/prefs/background                          | ✅  | ✅         |    |
| BRD-U-23 | boards        | PUT  | /:id/prefs/calendarFeedEnabled                 | ✅  | ✅         |    |
| BRD-U-24 | boards        | PUT  | /:id/prefs/cardAging                           | ✅  | ✅         |    |
| BRD-U-25 | boards        | PUT  | /:id/prefs/cardCovers                          | ✅  | ✅         |    |
| BRD-U-26 | boards        | PUT  | /:id/prefs/comments                            | ✅  | ✅         |    |
| BRD-U-27 | boards        | PUT  | /:id/prefs/invitations                         | ✅  | ✅         |    |
| BRD-U-28 | boards        | PUT  | /:id/prefs/permissionLevel                     | ✅  | ✅         |    |
| BRD-U-29 | boards        | PUT  | /:id/prefs/selfJoin                            | ✅  | ✅         |    |
| BRD-U-30 | boards        | PUT  | /:id/prefs/voting                              | ✅  | ✅         |    |
| BRD-U-31 | boards        | PUT  | /:id/subscribed                                | ✅  | ✅         |    |
| BRD-P-01 | boards        | POST | /                                              | ✅  | ✅         |    |
| BRD-P-02 | boards        | POST | /:id/calendarKey/generate                      | ✅  | 🆗         |    |
| BRD-P-03 | boards        | POST | /:id/checklists                                | ✅  | 📌         |    |
| BRD-P-04 | boards        | POST | /:id/emailKey/generate                         | ✅  | 🆗         |    |
| BRD-P-05 | boards        | POST | /:id/idTags                                    | ✅  | 🔒         |    |
| BRD-P-06 | boards        | POST | /:id/labels                                    | ✅  | ✅️         |    |
| BRD-P-07 | boards        | POST | /:id/lists                                     | ✅  | ✅         |    |
| BRD-P-08 | boards        | POST | /:id/markAsViewed                              | ✅  | ✅         |    |
| BRD-P-09 | boards        | POST | /:id/powerUps                                  | ✅  | ✅         |    |
| BRD-D-01 | boards        | DEL  | /:id/members/:idMember                         | ✅  | 🆗         |    |
| BRD-D-02 | boards        | DEL  | /:id/powerUps/:powerUp                         | ✅  | 📌         |    |
| CAR-G-01 | cards         | GET  | /:id                                           | ✅  | ✅         |    |
| CAR-G-02 | cards         | GET  | /:id/:field                                    | ✅  | ✅         |    |
| CAR-G-03 | cards         | GET  | /:id/actions                                   | ✅  | ✅         |    |
| CAR-G-04 | cards         | GET  | /:id/attachments                               | ✅  | ✅         |    |
| CAR-G-05 | cards         | GET  | /:id/attachments/:idAttachment                 | ✅  | ✅         |    |
| CAR-G-06 | cards         | GET  | /:id/board                                     | ✅  | ✅         |    |
| CAR-G-07 | cards         | GET  | /:id/board/:field                              | ✅  | ✅         |    |
| CAR-G-08 | cards         | GET  | /:id/checkItemStates                           | ✅  | ✅         |    |
| CAR-G-09 | cards         | GET  | /:id/checklists                                | ✅  | ✅         |    |
| CAR-G-10 | cards         | GET  | /:id/checkItem/:idCheckItem                    | ✅  | ✅         |    |
| CAR-G-11 | cards         | GET  | /:id/list                                      | ✅  | ✅         |    |
| CAR-G-12 | cards         | GET  | /:id/list/:field                               | ✅  | ✅         |    |
| CAR-G-13 | cards         | GET  | /:id/members                                   | ✅  | ✅         |    |
| CAR-G-14 | cards         | GET  | /:id/membersVoted                              | ✅  | 📌         |    |
| CAR-G-15 | cards         | GET  | /:id/pluginData                                | ✅  | ✅         |    |
| CAR-G-16 | cards         | GET  | /:id/stickers                                  | ✅  | ✅         |    |
| CAR-G-17 | cards         | GET  | /:id/stickers/:idSticker                       | ✅  | ✅         |    |
| CAR-U-01 | cards         | PUT  | /:id                                           | ✅  | ✅         |    |
| CAR-U-02 | cards         | PUT  | /:id/actions/:id/comments                      | ✅  | ✅         |    |
| CAR-U-03 | cards         | PUT  | /:id/checklist/:id/checkItem/:id/name          | ✅  | ✅         |    |
| CAR-U-04 | cards         | PUT  | /:id/checklist/:id/checkItem/:id/pos           | ✅  | ✅         |    |
| CAR-U-05 | cards         | PUT  | /:id/checklist/:id/checkItem/:id/state         | ✅  | ✅         |    |
| CAR-U-06 | cards         | PUT  | /:id/checklist/:id/checkItem/:id               | ✅  | ✅         |    |
| CAR-U-07 | cards         | PUT  | /:id/checkItem/:idCheckItem                    | ✅  | ✅         |    |
| CAR-U-08 | cards         | PUT  | /:id/closed                                    | ✅  | ✅         |    |
| CAR-U-09 | cards         | PUT  | /:id/desc                                      | ✅  | ✅         |    |
| CAR-U-10 | cards         | PUT  | /:id/due                                       | ✅  | ✅         |    |
| CAR-U-11 | cards         | PUT  | /:id/dueComplete                               | ✅  | ✅         |    |
| CAR-U-12 | cards         | PUT  | /:id/idAttachmentCover                         | ✅  | 📌         |    |
| CAR-U-13 | cards         | PUT  | /:id/idBoard                                   | ✅  | 🆗         |    |
| CAR-U-14 | cards         | PUT  | /:id/idList                                    | ✅  | 🆗         |    |
| CAR-U-15 | cards         | PUT  | /:id/idMembers                                 | ✅  | 📌         |    |
| CAR-U-16 | cards         | PUT  | /:id/name                                      | ✅  | ✅         |    |
| CAR-U-17 | cards         | PUT  | /:id/pos                                       | ✅  | ✅         |    |
| CAR-U-18 | cards         | PUT  | /:id/stickers/:idSticker                       | ✅  | ✅         |    |
| CAR-U-19 | cards         | PUT  | /:id/subscribed                                | ✅  | ✅         |    |
| CAR-P-01 | cards         | POST | /                                              | ✅  | ✅         |    |
| CAR-P-02 | cards         | POST | /:id/actions/comments                          | ✅  | ✅         |    |
| CAR-P-03 | cards         | POST | /:id/attachments                               | ✅  | ✅         |    |
| CAR-P-04 | cards         | POST | /:id/checklist/:id/checkItem                   | ✅  | ✅         |    |
| CAR-P-05 | cards         | POST | /:id/checklist/:id/checkItem/:id/convertToCard | ✅  | ✅         |    |
| CAR-P-06 | cards         | POST | /:id/checklists                                | ✅  | ✅         |    |
| CAR-P-07 | cards         | POST | /:id/idLabels                                  | ✅  | ✅         |    |
| CAR-P-08 | cards         | POST | /:id/idMembers                                 | ✅  | 📌         |    |
| CAR-P-09 | cards         | POST | /:id/labels                                    | ✅  | ✅         |    |
| CAR-P-10 | cards         | POST | /:id/markAssociatedNotificationsRead           | ✅  | ✅         |    |
| CAR-P-11 | cards         | POST | /:id/membersVoted                              | ✅  | 🔒         |    |
| CAR-P-12 | cards         | POST | /:id/stickers                                  | ✅  | ✅         |    |
| CAR-D-01 | cards         | DEL  | /:id                                           | ✅  | ✅         |    |
| CAR-D-02 | cards         | DEL  | /:id/actions/:id/comments                      | ✅  | ✅         |    |
| CAR-D-03 | cards         | DEL  | /:id/attachments/:idAttachment                 | ✅  | ✅         |    |
| CAR-D-04 | cards         | DEL  | /:id/checklist/:id/checkItem/:id               | ✅  | ✅         |    |
| CAR-D-05 | cards         | DEL  | /:id/checkItem/:idCheckItem                    | ✅  | ✅         |    |
| CAR-D-06 | cards         | DEL  | /:id/checklists/:id                            | ✅  | ✅         |    |
| CAR-D-07 | cards         | DEL  | /:id/idLabels/:idLabel                         | ✅  | ✅         |    |
| CAR-D-08 | cards         | DEL  | /:id/idMembers/:idMember                       | ✅  | 📌         |    |
| CAR-D-09 | cards         | DEL  | /:id/membersVoted/:idMember                    | ✅  | 🔒         |    |
| CAR-D-10 | cards         | DEL  | /:id/stickers/:idSticker                       | ✅  | ✅         |    |
| CHK-G-01 | checklists    | GET  | /:id                                           | ✅  | ✅         |    |
| CHK-G-02 | checklists    | GET  | /:id/:field                                    | ✅  | ✅         |    |
| CHK-G-03 | checklists    | GET  | /:id/board                                     | ✅  | ✅         |    |
| CHK-G-04 | checklists    | GET  | /:id/board/:field                              | ✅  | ✅         |    |
| CHK-G-05 | checklists    | GET  | /:id/cards                                     | ✅  | ✅         |    |
| CHK-G-06 | checklists    | GET  | /:id/cards/:filter                             | ✅  | ✅         |    |
| CHK-G-07 | checklists    | GET  | /:id/checkItems                                | ✅  | ✅         |    |
| CHK-G-08 | checklists    | GET  | /:id/checkItems/:id                            | ✅  | ✅         |    |
| CHK-U-01 | checklists    | PUT  | /:id                                           | ✅  | ✅         |    |
| CHK-U-02 | checklists    | PUT  | /:id/name                                      | ✅  | ✅         |    |
| CHK-U-03 | checklists    | PUT  | /:id/pos                                       | ✅  | ✅         |    |
| CHK-P-01 | checklists    | POST | /                                              | ✅  | ✅         |    |
| CHK-P-02 | checklists    | POST | /:id/checkItems                                | ✅  | ✅         |    |
| CHK-D-01 | checklists    | DEL  | /:id                                           | ✅  | ✅         |    |
| CHK-D-02 | checklists    | DEL  | /:id/checkItems/:id                            | ✅  | ✅         |    |
| ENT-G-01 | enterprises   | GET  | /:id                                           | ✅  | 🔒         |    |
| ENT-G-02 | enterprises   | GET  | /:id/admins                                    | ✅  | 🔒         |    |
| ENT-G-03 | enterprises   | GET  | /:id/signupUrl                                 | ✅  | 🔒         |    |
| ENT-G-04 | enterprises   | GET  | /:id/members                                   | ✅  | 🔒         |    |
| ENT-G-05 | enterprises   | GET  | /:id/members/:idMember                         | ✅  | 🔒         |    |
| ENT-G-06 | enterprises   | GET  | /:id/transferrable/organization/:idOrg         | ✅  | 🔒         |    |
| ENT-U-01 | enterprises   | PUT  | /:id/members/:idMember/deactivated             | ✅  | 🔒         |    |
| ENT-U-02 | enterprises   | PUT  | /:id/organizations                             | ✅  | 🔒         |    |
| ENT-U-03 | enterprises   | PUT  | /:id/admins/:idMember                          | ✅  | 🔒         |    |
| ENT-P-01 | enterprises   | POST | /:id/tokens                                    | ✅  | 🔒         |    |
| ENT-D-01 | enterprises   | DEL  | /:id/organizations/:idOrg                      | ✅  | 🔒         |    |
| ENT-D-02 | enterprises   | DEL  | /:id/admins/:idMember                          | ✅  | 🔒         |    |
| ENT-P-01 | enterprises   | GET  | /:id/transferrable/organization/:idOrg         | ✅  | 🔒         |    |
| LBL-G-01 | labels        | GET  | /:id                                           | ✅  | ✅         |    |
| LBL-G-02 | labels        | GET  | /:id/board                                     | ✅  | ✅         |    |
| LBL-G-03 | labels        | GET  | /:id/board/:field                              | ✅  | ✅         |    |
| LBL-U-01 | labels        | PUT  | /:id                                           | ✅  | ✅         |    |
| LBL-U-02 | labels        | PUT  | /:id/color                                     | ✅  | ✅         |    |
| LBL-U-03 | labels        | PUT  | /:id/name                                      | ✅  | ✅         |    |
| LBL-P-01 | labels        | POST | /                                              | ✅  | ✅         |    |
| LBL-D-01 | labels        | DEL  | /:id                                           | ✅  | ✅         |    |
| LST-G-01 | lists         | GET  | /:id                                           | ✅  | ✅         |    |
| LST-G-02 | lists         | GET  | /:id/:field                                    | ✅  | ✅         |    |
| LST-G-03 | lists         | GET  | /:id/actions                                   | ✅  | ✅         |    |
| LST-G-04 | lists         | GET  | /:id/board                                     | ✅  | ✅         |    |
| LST-G-05 | lists         | GET  | /:id/board/:field                              | ✅  | ✅         |    |
| LST-G-06 | lists         | GET  | /:id/cards                                     | ✅  | ✅         |    |
| LST-G-07 | lists         | GET  | /:id/cards/:filter                             | ✅  | ✅         |    |
| LST-U-01 | lists         | PUT  | /:id                                           | ✅  | ✅         |    |
| LST-U-02 | lists         | PUT  | /:id/closed                                    | ✅  | ✅         |    |
| LST-U-03 | lists         | PUT  | /:id/idBoard                                   | ✅  | ✅         |    |
| LST-U-04 | lists         | PUT  | /:id/name                                      | ✅  | ✅         |    |
| LST-U-05 | lists         | PUT  | /:id/pos                                       | ✅  | ✅         |    |
| LST-U-06 | lists         | PUT  | /:id/subscribed                                | ✅  | ✅         |    |
| LST-P-01 | lists         | POST | /                                              | ✅  | ✅         |    |
| LST-P-02 | lists         | POST | /:id/archiveAllCards                           | ✅  | ✅         |    |
| LST-P-03 | lists         | POST | /:id/cards                                     | ✅  | ✅         |    |
| LST-P-04 | lists         | POST | /:id/moveAllCards                              | ✅  | ✅         |    |
| MBR-G-01 | members       | GET  | /:id                                           | ✅  | ✅         |    |
| MBR-G-02 | members       | GET  | /:id/:field                                    | ✅  | ✅         |    |
| MBR-G-03 | members       | GET  | /:id/actions                                   | ✅  | ✅️         |    |
| MBR-G-04 | members       | GET  | /:id/boardBackgrounds                          | ✅  | ✅         |    |
| MBR-G-05 | members       | GET  | /:id/boardBackgrounds/:idBoardBackground       | ✅  | ✅         |    |
| MBR-G-06 | members       | GET  | /:id/boardStars                                | ✅  | ✅         |    |
| MBR-G-07 | members       | GET  | /:id/boardStars/:idBoardStar                   | ✅  | ✅         |    |
| MBR-G-08 | members       | GET  | /:id/boards                                    | ✅  | ✅         |    |
| MBR-G-09 | members       | GET  | /:id/boards/:filter                            | ✅  | ✅         |    |
| MBR-G-10 | members       | GET  | /:id/boardsInvited                             | ✅  | ✅         |    |
| MBR-G-11 | members       | GET  | /:id/boardsInvited/:field                      | ✅  | ✅         |    |
| MBR-G-12 | members       | GET  | /:id/cards                                     | ✅  | ✅         |    |
| MBR-G-13 | members       | GET  | /:id/cards/:filter                             | ✅  | ✅         |    |
| MBR-G-14 | members       | GET  | /:id/customBoardBackgrounds                    | ✅  | ✅         |    |
| MBR-G-15 | members       | GET  | /:id/customBoardBackgrounds/:idBoardBackground | ✅  | ✅         |    |
| MBR-G-16 | members       | GET  | /:id/customEmoji                               | ✅  | ✅         |    |
| MBR-G-17 | members       | GET  | /:id/customEmoji/:idCustomEmoji                | ✅  | ✅         |    |
| MBR-G-18 | members       | GET  | /:id/customStickers                            | ✅  | ✅         |    |
| MBR-G-19 | members       | GET  | /:id/customStickers/:idCustomSticker           | ✅  | ✅         |    |
| MBR-G-20 | members       | GET  | /:id/deltas                                    | ✅  | 🔒         |    |
| MBR-G-21 | members       | GET  | /:id/notifications                             | ✅  | ✅         |    |
| MBR-G-22 | members       | GET  | /:id/notifications/:filter                     | ✅  | ✅         |    |
| MBR-G-23 | members       | GET  | /:id/organizations                             | ✅  | ✅         |    |
| MBR-G-24 | members       | GET  | /:id/organizations/:filter                     | ✅  | ✅         |    |
| MBR-G-25 | members       | GET  | /:id/organizationsInvited                      | ✅  | ✅         |    |
| MBR-G-26 | members       | GET  | /:id/organizationsInvited/:field               | ✅  | ✅         |    |
| MBR-G-27 | members       | GET  | /:id/savedSearches                             | ✅  | ✅         |    |
| MBR-G-28 | members       | GET  | /:id/savedSearches/:idSavedSearch              | ✅  | ✅         |    |
| MBR-G-29 | members       | GET  | /:id/tokens                                    | ✅  | ✅         |    |
| MBR-U-01 | members       | PUT  | /:id                                           | ✅  | ✅         |    |
| MBR-U-02 | members       | PUT  | /:id/avatarSource                              | ✅  | ✅         |    |
| MBR-U-03 | members       | PUT  | /:id/bio                                       | ✅  | ✅         |    |
| MBR-U-04 | members       | PUT  | /:id/boardBackgrounds/:idBoardBackground       | ✅  | ✅         |    |
| MBR-U-05 | members       | PUT  | /:id/boardStars/:idBoardStar                   | ✅  | ✅         |    |
| MBR-U-06 | members       | PUT  | /:id/boardStars/:idBoardStar/idBoard           | ✅  | ✅         |    |
| MBR-U-07 | members       | PUT  | /:id/boardStars/:idBoardStar/pos               | ✅  | ✅         |    |
| MBR-U-08 | members       | PUT  | /:id/customBoardBackgrounds/:idBoardBackground | ✅  | ✅         |    |
| MBR-U-09 | members       | PUT  | /:id/fullName                                  | ✅  | ✅         |    |
| MBR-U-10 | members       | PUT  | /:id/initials                                  | ✅  | ✅         |    |
| MBR-U-11 | members       | PUT  | /:id/prefs/colorBlind                          | ✅  | ✅         |    |
| MBR-U-12 | members       | PUT  | /:id/prefs/locale                              | ✅  | ✅         |    |
| MBR-U-13 | members       | PUT  | /:id/prefs/minutesBetweenSummaries             | ✅  | ✅         |    |
| MBR-U-14 | members       | PUT  | /:id/savedSearches/:idSavedSearch              | ✅  | ✅         |    |
| MBR-U-15 | members       | PUT  | /:id/savedSearches/:idSavedSearch/name         | ✅  | ✅         |    |
| MBR-U-16 | members       | PUT  | /:id/savedSearches/:idSavedSearch/pos          | ✅  | ✅         |    |
| MBR-U-17 | members       | PUT  | /:id/savedSearches/:idSavedSearch/query        | ✅  | ✅         |    |
| MBR-U-18 | members       | PUT  | /:id/username                                  | ✅  | ✅         |    |
| MBR-P-01 | members       | POST | /:id/avatar                                    | ✅  | 🔒         |    |
| MBR-P-02 | members       | POST | /:id/boardBackgrounds                          | ✅  | ✅         |    |
| MBR-P-03 | members       | POST | /:id/boardStars                                | ✅  | ✅         |    |
| MBR-P-04 | members       | POST | /:id/customBoardBackgrounds                    | ✅  | ✅         |    |
| MBR-P-05 | members       | POST | /:id/customEmoji                               | ✅  | ✅         |    |
| MBR-P-06 | members       | POST | /:id/customStickers                            | ✅  | ✅         |    |
| MBR-P-07 | members       | POST | /:id/oneTimeMessagesDismissed                  | ✅  | 📌         |    |
| MBR-P-08 | members       | POST | /:id/savedSearches                             | ✅  | ✅         |    |
| MBR-D-01 | members       | DEL  | /:id/boardBackgrounds/:idBoardBackground       | ✅  | ✅         |    |
| MBR-D-02 | members       | DEL  | /:id/boardStars/:idBoardStar                   | ✅  | ✅         |    |
| MBR-D-03 | members       | DEL  | /:id/customBoardBackgrounds/:idBoardBackground | ✅  | ✅         |    |
| MBR-D-04 | members       | DEL  | /:id/customStickers/:idCustomSticker           | ✅  | ✅         |    |
| MBR-D-05 | members       | DEL  | /:id/savedSearches/:idSavedSearch              | ✅  | ✅         |    |
| NTF-G-01 | notifications | GET  | /:id                                           | ✅  | ✅         |    |
| NTF-G-02 | notifications | GET  | /:id/:field                                    | ✅  | ✅         |    |
| NTF-G-03 | notifications | GET  | /:id/board                                     | ✅  | ✅         |    |
| NTF-G-04 | notifications | GET  | /:id/board/:field                              | ✅  | ✅         |    |
| NTF-G-05 | notifications | GET  | /:id/card                                      | ✅  | ✅         |    |
| NTF-G-06 | notifications | GET  | /:id/card/:field                               | ✅  | ✅         |    |
| NTF-G-07 | notifications | GET  | /:id/display                                   | ✅  | ✅         |    |
| NTF-G-08 | notifications | GET  | /:id/entities                                  | ✅  | ✅         |    |
| NTF-G-09 | notifications | GET  | /:id/list                                      | ✅  | ✅         |    |
| NTF-G-10 | notifications | GET  | /:id/list/:field                               | ✅  | ✅         |    |
| NTF-G-11 | notifications | GET  | /:id/member                                    | ✅  | ✅         |    |
| NTF-G-12 | notifications | GET  | /:id/member/:field                             | ✅  | ✅         |    |
| NTF-G-13 | notifications | GET  | /:id/memberCreator                             | ✅  | ✅         |    |
| NTF-G-14 | notifications | GET  | /:id/memberCreator/:field                      | ✅  | ✅         |    |
| NTF-G-15 | notifications | GET  | /:id/organization                              | ✅  | ✅         |    |
| NTF-G-16 | notifications | GET  | /:id/organization/:field                       | ✅  | ✅         |    |
| NTF-U-01 | notifications | PUT  | /:id                                           | ✅  | ✅         |    |
| NTF-U-02 | notifications | PUT  | /:id/unread                                    | ✅  | ✅         |    |
| NTF-P-01 | notifications | POST | /all/read                                      | ✅  | ✅         |    |
| ORG-G-01 | organizations | GET  | /:id                                           | ✅  | ✅         |    |
| ORG-G-02 | organizations | GET  | /:id/:field                                    | ✅  | ✅         |    |
| ORG-G-03 | organizations | GET  | /:id/actions                                   | ✅  | ✅         |    |
| ORG-G-04 | organizations | GET  | /:id/boards                                    | ✅  | ✅         |    |
| ORG-G-05 | organizations | GET  | /:id/boards/:filter                            | ✅  | ✅         |    |
| ORG-G-06 | organizations | GET  | /:id/deltas                                    | ✅  | 🔒         |    |
| ORG-G-07 | organizations | GET  | /:id/members                                   | ✅  | ✅         |    |
| ORG-G-08 | organizations | GET  | /:id/members/:filter                           | ✅  | ✅         |    |
| ORG-G-09 | organizations | GET  | /:id/members/:idMember/cards                   | ✅  | ✅         |    |
| ORG-G-10 | organizations | GET  | /:id/membersInvited                            | ✅  | ✅         |    |
| ORG-G-11 | organizations | GET  | /:id/membersInvited/:field                     | ✅  | ✅         |    |
| ORG-G-12 | organizations | GET  | /:id/memberships                               | ✅  | ✅         |    |
| ORG-G-13 | organizations | GET  | /:id/memberships/:idMembership                 | ✅  | ✅         |    |
| ORG-G-14 | organizations | GET  | /:id/pluginData                                | ✅  | ✅         |    |
| ORG-G-15 | organizations | GET  | /:id/tags                                      | ✅  | 🔒         |    |
| ORG-U-01 | organizations | PUT  | /:id                                           | ✅  | ✅         |    |
| ORG-U-02 | organizations | PUT  | /:id/desc                                      | ✅  | ✅         |    |
| ORG-U-03 | organizations | PUT  | /:id/displayName                               | ✅  | ✅         |    |
| ORG-U-04 | organizations | PUT  | /:id/members                                   | ✅  | ✅         |    |
| ORG-U-05 | organizations | PUT  | /:id/members/:idMember                         | ✅  | ✅         |    |
| ORG-U-06 | organizations | PUT  | /:id/members/:idMember/deactivated             | ✅  | ✅         |    |
| ORG-U-07 | organizations | PUT  | /:id/memberships/:idMembership                 | ✅  | ✅         |    |
| ORG-U-08 | organizations | PUT  | /:id/name                                      | ✅  | ✅         |    |
| ORG-U-09 | organizations | PUT  | /:id/prefs/associatedDomain                    | ✅  | 🔒         |    |
| ORG-U-10 | organizations | PUT  | /:id/prefs/boardVisibilityRestrict/org         | ✅  | 🔒         |    |
| ORG-U-11 | organizations | PUT  | /:id/prefs/boardVisibilityRestrict/private     | ✅  | 🔒         |    |
| ORG-U-12 | organizations | PUT  | /:id/prefs/boardVisibilityRestrict/public      | ✅  | 🔒         |    |
| ORG-U-13 | organizations | PUT  | /:id/prefs/externalMembersDisabled             | ✅  | 🔒         |    |
| ORG-U-14 | organizations | PUT  | /:id/prefs/googleAppsVersion                   | ✅  | 🔒         |    |
| ORG-U-15 | organizations | PUT  | /:id/prefs/orgInviteRestrict                   | ✅  | 🔒         |    |
| ORG-U-16 | organizations | PUT  | /:id/prefs/permissionLevel                     | ✅  | ✅         |    |
| ORG-U-17 | organizations | PUT  | /:id/website                                   | ✅  | ✅         |    |
| ORG-P-01 | organizations | POST | /                                              | ✅  | ✅️         |    |
| ORG-P-02 | organizations | POST | /:id/logo                                      | ✅  | ✅         |    |
| ORG-P-03 | organizations | POST | /:id/tags                                      | ✅  | 🔒         |    |
| ORG-D-01 | organizations | DEL  | /:id                                           | ✅  | ✅         |    |
| ORG-D-02 | organizations | DEL  | /:id/logo                                      | ✅  | ✅         |    |
| ORG-D-03 | organizations | DEL  | /:id/members/:idMember                         | ✅  | ✅         |    |
| ORG-D-04 | organizations | DEL  | /:id/members/:idMember/all                     | ✅  | 🔒         |    |
| ORG-D-05 | organizations | DEL  | /:id/prefs/associatedDomain                    | ✅  | 🔒         |    |
| ORG-D-06 | organizations | DEL  | /:id/prefs/orgInviteRestrict                   | ✅  | 🔒         |    |
| SRC-G-01 | search        | GET  | /                                              | ✅  | ✅         |    |
| SRC-G-02 | search        | GET  | /members                                       | ✅  | ✅         |    |
| TKN-G-01 | tokens        | GET  | /:token                                        | ✅  | ✅         |    |
| TKN-G-02 | tokens        | GET  | /:token/:field                                 | ✅  | ✅         |    |
| TKN-G-03 | tokens        | GET  | /:token/member                                 | ✅  | ✅         |    |
| TKN-G-04 | tokens        | GET  | /:token/member/:field                          | ✅  | ✅         |    |
| TKN-G-05 | tokens        | GET  | /:token/webhooks                               | ✅  | ✅         |    |
| TKN-G-06 | tokens        | GET  | /:token/webhooks/:idWebhook                    | ✅  | ✅         |    |
| TKN-U-01 | tokens        | PUT  | /:token/webhooks                               | ✅  | 📌         |    |
| TKN-P-01 | tokens        | POST | /:token/webhooks                               | ✅  | 📌         |    |
| TKN-D-01 | tokens        | DEL  | /:token                                        | ✅  | 📌         |    |
| TKN-D-02 | tokens        | DEL  | /:token/webhooks/:idWebhook                    | ✅  | 📌         |    |
| TYP-G-01 | types         | GET  | /:id                                           | ✅  | ✅         |    |
| WEB-G-02 | webhooks      | GET  | /:id                                           | ✅  | 📌         |    |
| WEB-G-03 | webhooks      | GET  | /:id/:field                                    | ✅  | 📌         |    |
| WEB-U-01 | webhooks      | PUT  | /:id                                           | ✅  | 📌         |    |
| WEB-U-02 | webhooks      | PUT  | /                                              | ✅  | 📌         |    |
| WEB-U-03 | webhooks      | PUT  | /:id/active                                    | ✅  | 📌         |    |
| WEB-U-04 | webhooks      | PUT  | /:id/callbackURL                               | ✅  | 📌         |    |
| WEB-U-05 | webhooks      | PUT  | /:id/description                               | ✅  | 📌         |    |
| WEB-U-06 | webhooks      | PUT  | /:id/idModel                                   | ✅  | 📌         |    |
| WEB-P-01 | webhooks      | POST | /                                              | ✅  | 📌         |    |
| WEB-D-01 | webhooks      | DEL  | /:id                                           | ✅  | 📌         |    |
 
### Notes

<a name="N1">Note 1:</a>  Test is covered by creating and deleting Comment in Card.  See `CAR-P-02` and `CAR-D-02`.
