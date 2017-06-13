# Coverage

The table below contains all of the available Trello routes and their status in terms of project coverage.

### Icon Details
👍: Task is complete/ready to test.
📝: Indicates that there is a note associated with the item.
🔒: Test passed the first time it was ran, but I don't want to keep running the tests.  These usually entail things like generating keys or creating users.
📌: Test was skipped, need to come back to it.
💰: Premium feature that I'm not able to test (e.g. Business Class).
🛑: Test is failing and is being worked on.

| Id       | Resource     | Method | Path                                                      | Coded | Tested        | Documented |
|:---------|:-------------|:-------|:----------------------------------------------------------|:-----:|:-------------:|:----------:|
| ACT-G-01 | action       | get    | /actions/:id                                              | 👍     | 👍          | 👍         |
| ACT-G-02 | action       | get    | /actions/:id/:field                                       | 👍     | 👍          | 👍         |
| ACT-G-03 | action       | get    | /actions/:id/board                                        | 👍     | 👍          | 👍         |
| ACT-G-04 | action       | get    | /actions/:id/board/:field                                 | 👍     | 👍          | 👍         |
| ACT-G-05 | action       | get    | /actions/:id/card                                         | 👍     | 👍          | 👍         |
| ACT-G-06 | action       | get    | /actions/:id/card/:field                                  | 👍     | 👍          | 👍         |
| ACT-G-07 | action       | get    | /actions/:id/display                                      | 👍     | 👍          | 👍         |
| ACT-G-08 | action       | get    | /actions/:id/entities                                     | 👍     | 👍          | 👍         |
| ACT-G-09 | action       | get    | /actions/:id/list                                         | 👍     | 👍          | 👍         |
| ACT-G-10 | action       | get    | /actions/:id/list/:field                                  | 👍     | 👍          | 👍         |
| ACT-G-11 | action       | get    | /actions/:id/member                                       | 👍     | 👍          | 👍         |
| ACT-G-12 | action       | get    | /actions/:id/member/:field                                | 👍     | 👍          | 👍         |
| ACT-G-13 | action       | get    | /actions/:id/memberCreator                                | 👍     | 👍          | 👍         |
| ACT-G-14 | action       | get    | /actions/:id/memberCreator/:field                         | 👍     | 👍          | 👍         |
| ACT-G-15 | action       | get    | /actions/:id/organization                                 | 👍     | 👍          | 👍         |
| ACT-G-16 | action       | get    | /actions/:id/organization/:field                          | 👍     | 👍          | 👍         |
| ACT-U-01 | action       | put    | /actions/:id                                              | 👍     | 👍          | 👍         |
| ACT-U-02 | action       | put    | /actions/:id/text                                         | 👍     | 👍          | 👍         |
| ACT-D-01 | action       | delete | /actions/:id                                              | 👍     | [📝](#N1)   | 👍         |
| BTC-G-01 | batch        | get    | /batch/                                                   | 👍     | 👍          |             |
| BRD-G-01 | board        | get    | /boards/:id                                               | 👍     | 👍          |            |
| BRD-G-02 | board        | get    | /boards/:id/:field                                        | 👍     | 👍          |            |
| BRD-G-03 | board        | get    | /boards/:id/actions                                       | 👍     | 👍          |            |
| BRD-G-04 | board        | get    | /boards/:id/boardStars                                    | 👍     | 👍          |            |
| BRD-G-05 | board        | get    | /boards/:id/cards                                         | 👍     | 👍          |            |
| BRD-G-06 | board        | get    | /boards/:id/cards/:filter                                 | 👍     | 👍          |            |
| BRD-G-07 | board        | get    | /boards/:id/cards/:idCard                                 | 👍     | 👍          |            |
| BRD-G-08 | board        | get    | /boards/:id/checklists                                    | 👍     | 👍          |            |
| BRD-G-09 | board        | get    | /boards/:id/deltas                                        | 👍     | 💰          |            |
| BRD-G-10 | board        | get    | /boards/:id/idTags                                        | 👍     | 💰          |            |
| BRD-G-11 | board        | get    | /boards/:id/labels                                        | 👍     | 👍          |            |
| BRD-G-12 | board        | get    | /boards/:id/labels/:idLabel                               | 👍     | 👍          |            |
| BRD-G-13 | board        | get    | /boards/:id/lists                                         | 👍     | 👍          |            |
| BRD-G-14 | board        | get    | /boards/:id/lists/:filter                                 | 👍     | 👍          |            |
| BRD-G-15 | board        | get    | /boards/:id/members                                       | 👍     | 👍          |            |
| BRD-G-16 | board        | get    | /boards/:id/members/:filter                               | 👍     | 👍          |            |
| BRD-G-17 | board        | get    | /boards/:id/members/:idMember/cards                       | 👍     | 👍          |            |
| BRD-G-18 | board        | get    | /boards/:id/membersInvited                                | 👍     | 👍          |            |
| BRD-G-19 | board        | get    | /boards/:id/membersInvited/:field                         | 👍     | 👍          |            |
| BRD-G-20 | board        | get    | /boards/:id/memberships                                   | 👍     | 👍          |            |
| BRD-G-21 | board        | get    | /boards/:id/memberships/:idMembership                     | 👍     | 👍          |            |
| BRD-G-22 | board        | get    | /boards/:id/myPrefs                                       | 👍     | 👍          |            |
| BRD-G-23 | board        | get    | /boards/:id/organization                                  | 👍     | 👍          |            |
| BRD-G-24 | board        | get    | /boards/:id/organization/:field                           | 👍     | 👍          |            |
| BRD-G-25 | board        | get    | /boards/:id/pluginData                                    | 👍     | 👍          |            |
| BRD-U-01 | board        | put    | /boards/:id                                               | 👍     | 👍          |            |
| BRD-U-02 | board        | put    | /boards/:id/closed                                        | 👍     | 👍          |            |
| BRD-U-03 | board        | put    | /boards/:id/desc                                          | 👍     | 👍          |            |
| BRD-U-04 | board        | put    | /boards/:id/idOrganization                                | 👍     | 👍          |            |
| BRD-U-05 | board        | put    | /boards/:id/labelNames/blue                               | 👍     | 👍          |            |
| BRD-U-06 | board        | put    | /boards/:id/labelNames/green                              | 👍     | 👍          |            |
| BRD-U-07 | board        | put    | /boards/:id/labelNames/orange                             | 👍     | 👍          |            |
| BRD-U-08 | board        | put    | /boards/:id/labelNames/purple                             | 👍     | 👍          |            |
| BRD-U-09 | board        | put    | /boards/:id/labelNames/red                                | 👍     | 👍          |            |
| BRD-U-10 | board        | put    | /boards/:id/labelNames/yellow                             | 👍     | 👍          |            |
| BRD-U-11 | board        | put    | /boards/:id/members                                       | 👍     | 🔒          |            |
| BRD-U-12 | board        | put    | /boards/:id/members/:idMember                             | 👍     | 🔒          |            |
| BRD-U-13 | board        | put    | /boards/:id/memberships/:idMembership                     | 👍     | 👍          |            |
| BRD-U-14 | board        | put    | /boards/:id/myPrefs/emailPosition                         | 👍     | 👍          |            |
| BRD-U-15 | board        | put    | /boards/:id/myPrefs/idEmailList                           | 👍     | 📌          |            |
| BRD-U-16 | board        | put    | /boards/:id/myPrefs/showListGuide                         | 👍     | 👍          |            |
| BRD-U-17 | board        | put    | /boards/:id/myPrefs/showSidebar                           | 👍     | 👍          |            |
| BRD-U-18 | board        | put    | /boards/:id/myPrefs/showSidebarActivity                   | 👍     | 👍          |            |
| BRD-U-19 | board        | put    | /boards/:id/myPrefs/showSidebarBoardActions               | 👍     | 👍          |            |
| BRD-U-20 | board        | put    | /boards/:id/myPrefs/showSidebarMembers                    | 👍     | 👍          |            |
| BRD-U-21 | board        | put    | /boards/:id/name                                          | 👍     | 👍          |            |
| BRD-U-22 | board        | put    | /boards/:id/prefs/background                              | 👍     | 👍          |            |
| BRD-U-23 | board        | put    | /boards/:id/prefs/calendarFeedEnabled                     | 👍     | 👍          |            |
| BRD-U-24 | board        | put    | /boards/:id/prefs/cardAging                               | 👍     | 👍          |            |
| BRD-U-25 | board        | put    | /boards/:id/prefs/cardCovers                              | 👍     | 👍          |            |
| BRD-U-26 | board        | put    | /boards/:id/prefs/comments                                | 👍     | 👍          |            |
| BRD-U-27 | board        | put    | /boards/:id/prefs/invitations                             | 👍     | 👍          |            |
| BRD-U-28 | board        | put    | /boards/:id/prefs/permissionLevel                         | 👍     | 👍          |            |
| BRD-U-29 | board        | put    | /boards/:id/prefs/selfJoin                                | 👍     | 👍          |            |
| BRD-U-30 | board        | put    | /boards/:id/prefs/voting                                  | 👍     | 👍          |            |
| BRD-U-31 | board        | put    | /boards/:id/subscribed                                    | 👍     | 👍          |            |
| BRD-P-01 | board        | post   | /boards                                                   | 👍     | 🔒          |            |
| BRD-P-02 | board        | post   | /boards/:id/calendarKey/generate                          | 👍     | 🔒          |            |
| BRD-P-03 | board        | post   | /boards/:id/checklists                                    | 👍     | 🛑          |            |
| BRD-P-04 | board        | post   | /boards/:id/emailKey/generate                             | 👍     | 🔒          |            |
| BRD-P-05 | board        | post   | /boards/:id/idTags                                        | 👍     | 💰          |            |
| BRD-P-06 | board        | post   | /boards/:id/labels                                        | 👍     | 👍          |            |
| BRD-P-07 | board        | post   | /boards/:id/lists                                         | 👍     | 👍          |            |
| BRD-P-08 | board        | post   | /boards/:id/markAsViewed                                  | 👍     | 👍          |            |
| BRD-P-09 | board        | post   | /boards/:id/powerUps                                      | 👍     | 🛑          |            |
| BRD-D-01 | board        | delete | /boards/:id/members/:idMember                             | 👍     | 🔒          |            |
| BRD-D-02 | board        | delete | /boards/:id/powerUps/:powerUp                             | 👍     | 👍          |            |
| CAR-G-01 | card         | get    | /cards/:id                                                | 👍     | 👍          |            |
| CAR-G-02 | card         | get    | /cards/:id/:field                                         | 👍     | 👍          |            |
| CAR-G-03 | card         | get    | /cards/:id/actions                                        | 👍     | 👍          |            |
| CAR-G-04 | card         | get    | /cards/:id/attachments                                    | 👍     | 👍          |            |
| CAR-G-05 | card         | get    | /cards/:id/attachments/:idAttachment                      | 👍     | 👍          |            |
| CAR-G-06 | card         | get    | /cards/:id/board                                          | 👍     | 👍          |            |
| CAR-G-07 | card         | get    | /cards/:id/board/:field                                   | 👍     | 👍          |            |
| CAR-G-08 | card         | get    | /cards/:id/checkItemStates                                | 👍     | 👍          |            |
| CAR-G-09 | card         | get    | /cards/:id/checklists                                     | 👍     | 👍          |            |
| CAR-G-10 | card         | get    | /cards/:id/checkItem/:idCheckItem                         | 👍     |             |            |
| CAR-G-11 | card         | get    | /cards/:id/list                                           | 👍     | 👍          |            |
| CAR-G-12 | card         | get    | /cards/:id/list/:field                                    | 👍     | 👍          |            |
| CAR-G-13 | card         | get    | /cards/:id/members                                        | 👍     | 👍          |            |
| CAR-G-14 | card         | get    | /cards/:id/membersVoted                                   | 👍     |            |            |
| CAR-G-15 | card         | get    | /cards/:id/pluginData                                     | 👍     |            |            |
| CAR-G-16 | card         | get    | /cards/:id/stickers                                       | 👍     |            |            |
| CAR-G-17 | card         | get    | /cards/:id/stickers/:idSticker                            | 👍     |            |            |
| CAR-U-01 | card         | put    | /cards/:id                                                | 👍     |            |            |
| CAR-U-02 | card         | put    | /cards/:id/actions/:id/comments                           | 👍     |            |            |
| CAR-U-03 | card         | put    | /cards/:id/checklist/:id/checkItem/:id/name               | 👍     |            |            |
| CAR-U-04 | card         | put    | /cards/:id/checklist/:id/checkItem/:id/pos                | 👍     |            |            |
| CAR-U-05 | card         | put    | /cards/:id/checklist/:id/checkItem/:id/state              | 👍     |            |            |
| CAR-U-06 | card         | put    | /cards/:id/checklist/:id/checkItem/:id                    | 👍     |            |            |
| CAR-U-07 | card         | put    | /cards/:id/checkItem/:idCheckItem                         | 👍     |            |            |
| CAR-U-08 | card         | put    | /cards/:id/closed                                         | 👍     |            |            |
| CAR-U-09 | card         | put    | /cards/:id/desc                                           | 👍     |            |            |
| CAR-U-10 | card         | put    | /cards/:id/due                                            | 👍     |            |            |
| CAR-U-11 | card         | put    | /cards/:id/dueComplete                                    | 👍     |            |            |
| CAR-U-12 | card         | put    | /cards/:id/idAttachmentCover                              | 👍     |            |            |
| CAR-U-13 | card         | put    | /cards/:id/idBoard                                        | 👍     |            |            |
| CAR-U-14 | card         | put    | /cards/:id/idList                                         | 👍     |            |            |
| CAR-U-15 | card         | put    | /cards/:id/idMembers                                      | 👍     |            |            |
| CAR-U-16 | card         | put    | /cards/:id/name                                           | 👍     |            |            |
| CAR-U-17 | card         | put    | /cards/:id/pos                                            | 👍     |            |            |
| CAR-U-18 | card         | put    | /cards/:id/stickers/:idSticker                            | 👍     |            |            |
| CAR-U-19 | card         | put    | /cards/:id/subscribed                                     | 👍     |            |            |
| CAR-P-01 | card         | post   | /cards                                                    | 👍     |            |            |
| CAR-P-02 | card         | post   | /cards/:id/actions/comments                               | 👍     |            |            |
| CAR-P-03 | card         | post   | /cards/:id/attachments                                    | 👍     |            |            |
| CAR-P-04 | card         | post   | /cards/:id/checklist/:id/checkItem                        | 👍     |            |            |
| CAR-P-05 | card         | post   | /cards/:id/checklist/:id/checkItem/:id/convertToCard      | 👍     |            |            |
| CAR-P-06 | card         | post   | /cards/:id/checklists                                     | 👍     |            |            |
| CAR-P-07 | card         | post   | /cards/:id/idLabels                                       | 👍     |            |            |
| CAR-P-08 | card         | post   | /cards/:id/idMembers                                      | 👍     |            |            |
| CAR-P-09 | card         | post   | /cards/:id/labels                                         | 👍     |            |            |
| CAR-P-10 | card         | post   | /cards/:id/markAssociatedNotificationsRead                | 👍     |            |            |
| CAR-P-11 | card         | post   | /cards/:id/membersVoted                                   | 👍     |            |            |
| CAR-P-12 | card         | post   | /cards/:id/stickers                                       | 👍     |            |            |
| CAR-D-01 | card         | delete | /cards/:id                                                | 👍     |            |            |
| CAR-D-02 | card         | delete | /cards/:id/actions/:id/comments                           | 👍     |            |            |
| CAR-D-03 | card         | delete | /cards/:id/attachments/:idAttachment                      | 👍     |            |            |
| CAR-D-04 | card         | delete | /cards/:id/checklist/:id/checkItem/:id                    | 👍     |            |            |
| CAR-D-05 | card         | delete | /cards/:id/checkItem/:idCheckItem                         | 👍     |            |            |
| CAR-D-06 | card         | delete | /cards/:id/checklists/:id                                 | 👍     |            |            |
| CAR-D-07 | card         | delete | /cards/:id/idLabels/:idLabel                              | 👍     |            |            |
| CAR-D-08 | card         | delete | /cards/:id/idMembers/:idMember                            | 👍     |            |            |
| CAR-D-09 | card         | delete | /cards/:id/labels/:color                                  | 👍     |            |            |
| CAR-D-10 | card         | delete | /cards/:id/membersVoted/:idMember                         | 👍     |            |            |
| CAR-D-11 | card         | delete | /cards/:id/stickers/:idSticker                            | 👍     |            |            |
| CHK-G-01 | checklist    | get    | /checklists/:id                                           | 👍     |            |            |
| CHK-G-02 | checklist    | get    | /checklists/:id/:field                                    | 👍     |            |            |
| CHK-G-03 | checklist    | get    | /checklists/:id/board                                     | 👍     |            |            |
| CHK-G-04 | checklist    | get    | /checklists/:id/board/:field                              | 👍     |            |            |
| CHK-G-05 | checklist    | get    | /checklists/:id/cards                                     | 👍     |            |            |
| CHK-G-06 | checklist    | get    | /checklists/:id/cards/:filter                             | 👍     |            |            |
| CHK-G-07 | checklist    | get    | /checklists/:id/checkItems                                | 👍     |            |            |
| CHK-G-08 | checklist    | get    | /checklists/:id/checkItems/:id                            | 👍     |            |            |
| CHK-U-01 | checklist    | put    | /checklists/:id                                           | 👍     |            |            |
| CHK-U-02 | checklist    | put    | /checklists/:id/name                                      | 👍     |            |            |
| CHK-U-03 | checklist    | put    | /checklists/:id/pos                                       | 👍     |            |            |
| CHK-P-01 | checklist    | post   | /checklists                                               | 👍     |            |            |
| CHK-P-02 | checklist    | post   | /checklists/:id/checkItems                                | 👍     |            |            |
| CHK-D-01 | checklist    | delete | /checklists/:id                                           | 👍     |            |            |
| CHK-D-02 | checklist    | delete | /checklists/:id/checkItems/:id                            | 👍     |            |            |
| LBL-G-01 | label        | get    | /labels/:idLabel                                          | 👍     |            |            |
| LBL-G-02 | label        | get    | /labels/:idLabel/board                                    | 👍     |            |            |
| LBL-G-03 | label        | get    | /labels/:idLabel/board/:field                             | 👍     |            |            |
| LBL-U-01 | label        | put    | /labels/:idLabel                                          | 👍     |            |            |
| LBL-U-02 | label        | put    | /labels/:idLabel/color                                    | 👍     |            |            |
| LBL-U-03 | label        | put    | /labels/:idLabel/name                                     | 👍     |            |            |
| LBL-P-01 | label        | post   | /labels                                                   | 👍     |            |            |
| LBL-D-01 | label        | delete | /labels/:idLabel                                          | 👍     |            |            |
| LST-G-01 | list         | get    | /lists/:idList                                            | 👍     |            |            |
| LST-G-02 | list         | get    | /lists/:idList/:field                                     | 👍     |            |            |
| LST-G-03 | list         | get    | /lists/:idList/actions                                    | 👍     |            |            |
| LST-G-04 | list         | get    | /lists/:idList/board                                      | 👍     |            |            |
| LST-G-05 | list         | get    | /lists/:idList/board/:field                               | 👍     |            |            |
| LST-G-06 | list         | get    | /lists/:idList/cards                                      | 👍     |            |            |
| LST-G-07 | list         | get    | /lists/:idList/cards/:filter                              | 👍     |            |            |
| LST-U-01 | list         | put    | /lists/:idList                                            | 👍     |            |            |
| LST-U-02 | list         | put    | /lists/:idList/closed                                     | 👍     |            |            |
| LST-U-03 | list         | put    | /lists/:idList/idBoard                                    | 👍     |            |            |
| LST-U-04 | list         | put    | /lists/:idList/name                                       | 👍     |            |            |
| LST-U-05 | list         | put    | /lists/:idList/pos                                        | 👍     |            |            |
| LST-U-06 | list         | put    | /lists/:idList/subscribed                                 | 👍     |            |            |
| LST-P-01 | list         | post   | /lists                                                    | 👍     |            |            |
| LST-P-02 | list         | post   | /lists/:idList/archiveAllCards                            | 👍     |            |            |
| LST-P-03 | list         | post   | /lists/:idList/cards                                      | 👍     |            |            |
| LST-P-04 | list         | post   | /lists/:idList/moveAllCards                               | 👍     |            |            |
| MBR-G-01 | member       | get    | /members/:id                                              | 👍     |            |            |
| MBR-G-02 | member       | get    | /members/:id/:field                                       | 👍     |            |            |
| MBR-G-03 | member       | get    | /members/:id/actions                                      | 👍     |            |            |
| MBR-G-04 | member       | get    | /members/:id/boardBackgrounds                             | 👍     |            |            |
| MBR-G-05 | member       | get    | /members/:id/boardBackgrounds/:idBoardBackground          | 👍     |            |            |
| MBR-G-06 | member       | get    | /members/:id/boardStars                                   | 👍     |            |            |
| MBR-G-07 | member       | get    | /members/:id/boardStars/:idBoardStar                      | 👍     |            |            |
| MBR-G-08 | member       | get    | /members/:id/boards                                       | 👍     |            |            |
| MBR-G-09 | member       | get    | /members/:id/boards/:filter                               | 👍     |            |            |
| MBR-G-10 | member       | get    | /members/:id/boardsInvited                                | 👍     |            |            |
| MBR-G-11 | member       | get    | /members/:id/boardsInvited/:field                         | 👍     |            |            |
| MBR-G-12 | member       | get    | /members/:id/cards                                        | 👍     |            |            |
| MBR-G-13 | member       | get    | /members/:id/cards/:filter                                | 👍     |            |            |
| MBR-G-14 | member       | get    | /members/:id/customBoardBackgrounds                       | 👍     |            |            |
| MBR-G-15 | member       | get    | /members/:id/customBoardBackgrounds/:idBoardBackground    | 👍     |            |            |
| MBR-G-16 | member       | get    | /members/:id/customEmoji                                  | 👍     |            |            |
| MBR-G-17 | member       | get    | /members/:id/customEmoji/:idCustomEmoji                   | 👍     |            |            |
| MBR-G-18 | member       | get    | /members/:id/customStickers                               | 👍     |            |            |
| MBR-G-19 | member       | get    | /members/:id/customStickers/:idCustomSticker              | 👍     |            |            |
| MBR-G-20 | member       | get    | /members/:id/deltas                                       | 👍     |            |            |
| MBR-G-21 | member       | get    | /members/:id/notifications                                | 👍     |            |            |
| MBR-G-22 | member       | get    | /members/:id/notifications/:filter                        | 👍     |            |            |
| MBR-G-23 | member       | get    | /members/:id/organizations                                | 👍     |            |            |
| MBR-G-24 | member       | get    | /members/:id/organizations/:filter                        | 👍     |            |            |
| MBR-G-25 | member       | get    | /members/:id/organizationsInvited                         | 👍     |            |            |
| MBR-G-26 | member       | get    | /members/:id/organizationsInvited/:field                  | 👍     |            |            |
| MBR-G-27 | member       | get    | /members/:id/savedSearches                                | 👍     |            |            |
| MBR-G-28 | member       | get    | /members/:id/savedSearches/:idSavedSearch                 | 👍     |            |            |
| MBR-G-29 | member       | get    | /members/:id/tokens                                       | 👍     |            |            |
| MBR-U-01 | member       | put    | /members/:id                                              | 👍     |            |            |
| MBR-U-02 | member       | put    | /members/:id/avatarSource                                 | 👍     |            |            |
| MBR-U-03 | member       | put    | /members/:id/bio                                          | 👍     |            |            |
| MBR-U-04 | member       | put    | /members/:id/boardBackgrounds/:idBoardBackground          | 👍     |            |            |
| MBR-U-05 | member       | put    | /members/:id/boardStars/:idBoardStar                      | 👍     |            |            |
| MBR-U-06 | member       | put    | /members/:id/boardStars/:idBoardStar/idBoard              | 👍     |            |            |
| MBR-U-07 | member       | put    | /members/:id/boardStars/:idBoardStar/pos                  | 👍     |            |            |
| MBR-U-08 | member       | put    | /members/:id/customBoardBackgrounds/:idBoardBackground    | 👍     |            |            |
| MBR-U-09 | member       | put    | /members/:id/fullName                                     | 👍     |            |            |
| MBR-U-10 | member       | put    | /members/:id/initials                                     | 👍     |            |            |
| MBR-U-11 | member       | put    | /members/:id/prefs/colorBlind                             | 👍     |            |            |
| MBR-U-12 | member       | put    | /members/:id/prefs/locale                                 | 👍     |            |            |
| MBR-U-13 | member       | put    | /members/:id/prefs/minutesBetweenSummaries                | 👍     |            |            |
| MBR-U-14 | member       | put    | /members/:id/savedSearches/:idSavedSearch                 | 👍     |            |            |
| MBR-U-15 | member       | put    | /members/:id/savedSearches/:idSavedSearch/name            | 👍     |            |            |
| MBR-U-16 | member       | put    | /members/:id/savedSearches/:idSavedSearch/pos             | 👍     |            |            |
| MBR-U-17 | member       | put    | /members/:id/savedSearches/:idSavedSearch/query           | 👍     |            |            |
| MBR-U-18 | member       | put    | /members/:id/username                                     | 👍     |            |            |
| MBR-P-01 | member       | post   | /members/:id/avatar                                       | 👍     |            |            |
| MBR-P-02 | member       | post   | /members/:id/boardBackgrounds                             | 👍     |            |            |
| MBR-P-03 | member       | post   | /members/:id/boardStars                                   | 👍     |            |            |
| MBR-P-04 | member       | post   | /members/:id/customBoardBackgrounds                       | 👍     |            |            |
| MBR-P-05 | member       | post   | /members/:id/customEmoji                                  | 👍     |            |            |
| MBR-P-06 | member       | post   | /members/:id/customStickers                               | 👍     |            |            |
| MBR-P-07 | member       | post   | /members/:id/oneTimeMessagesDismissed                     | 👍     |            |            |
| MBR-P-08 | member       | post   | /members/:id/savedSearches                                | 👍     |            |            |
| MBR-D-01 | member       | delete | /members/:id/boardBackgrounds/:idBoardBackground          | 👍     |            |            |
| MBR-D-02 | member       | delete | /members/:id/boardStars/:idBoardStar                      | 👍     |            |            |
| MBR-D-03 | member       | delete | /members/:id/customBoardBackgrounds/:idBoardBackground    | 👍     |            |            |
| MBR-D-04 | member       | delete | /members/:id/customStickers/:idCustomSticker              | 👍     |            |            |
| MBR-D-05 | member       | delete | /members/:id/savedSearches/:idSavedSearch                 | 👍     |            |            |
| NTF-G-01 | notification | get    | /notifications/:id                                        | 👍     |            |            |
| NTF-G-02 | notification | get    | /notifications/:id/:field                                 | 👍     |            |            |
| NTF-G-03 | notification | get    | /notifications/:id/board                                  | 👍     |            |            |
| NTF-G-04 | notification | get    | /notifications/:id/board/:field                           | 👍     |            |            |
| NTF-G-05 | notification | get    | /notifications/:id/card                                   | 👍     |            |            |
| NTF-G-06 | notification | get    | /notifications/:id/card/:field                            | 👍     |            |            |
| NTF-G-07 | notification | get    | /notifications/:id/display                                | 👍     |            |            |
| NTF-G-08 | notification | get    | /notifications/:id/entities                               | 👍     |            |            |
| NTF-G-09 | notification | get    | /notifications/:id/list                                   | 👍     |            |            |
| NTF-G-10 | notification | get    | /notifications/:id/list/:field                            | 👍     |            |            |
| NTF-G-11 | notification | get    | /notifications/:id/member                                 | 👍     |            |            |
| NTF-G-12 | notification | get    | /notifications/:id/member/:field                          | 👍     |            |            |
| NTF-G-13 | notification | get    | /notifications/:id/memberCreator                          | 👍     |            |            |
| NTF-G-14 | notification | get    | /notifications/:id/memberCreator/:field                   | 👍     |            |            |
| NTF-G-15 | notification | get    | /notifications/:id/organization                           | 👍     |            |            |
| NTF-G-16 | notification | get    | /notifications/:id/organization/:field                    | 👍     |            |            |
| NTF-U-01 | notification | put    | /notifications/:id                                        | 👍     |            |            |
| NTF-U-02 | notification | put    | /notifications/:id/unread                                 | 👍     |            |            |
| NTF-P-01 | notification | post   | /notifications/all/read                                   | 👍     |            |            |
| ORG-G-01 | organization | get    | /organizations/:id                                        | 👍     |            |            |
| ORG-G-02 | organization | get    | /organizations/:id/:field                                 | 👍     |            |            |
| ORG-G-03 | organization | get    | /organizations/:id/actions                                | 👍     |            |            |
| ORG-G-04 | organization | get    | /organizations/:id/boards                                 | 👍     |            |            |
| ORG-G-05 | organization | get    | /organizations/:id/boards/:filter                         | 👍     |            |            |
| ORG-G-06 | organization | get    | /organizations/:id/deltas                                 | 👍     |            |            |
| ORG-G-07 | organization | get    | /organizations/:id/members                                | 👍     |            |            |
| ORG-G-08 | organization | get    | /organizations/:id/members/:filter                        | 👍     |            |            |
| ORG-G-09 | organization | get    | /organizations/:id/members/:idMember/cards                | 👍     |            |            |
| ORG-G-10 | organization | get    | /organizations/:id/membersInvited                         | 👍     |            |            |
| ORG-G-11 | organization | get    | /organizations/:id/membersInvited/:field                  | 👍     |            |            |
| ORG-G-12 | organization | get    | /organizations/:id/memberships                            | 👍     |            |            |
| ORG-G-13 | organization | get    | /organizations/:id/memberships/:idMembership              | 👍     |            |            |
| ORG-G-14 | organization | get    | /organizations/:id/pluginData                             | 👍     |            |            |
| ORG-G-15 | organization | get    | /organizations/:id/tags                                   | 👍     |            |            |
| ORG-U-01 | organization | put    | /organizations/:id                                        | 👍     |            |            |
| ORG-U-02 | organization | put    | /organizations/:id/desc                                   | 👍     |            |            |
| ORG-U-03 | organization | put    | /organizations/:id/displayName                            | 👍     |            |            |
| ORG-U-04 | organization | put    | /organizations/:id/members                                | 👍     |            |            |
| ORG-U-05 | organization | put    | /organizations/:id/members/:idMember                      | 👍     |            |            |
| ORG-U-06 | organization | put    | /organizations/:id/members/:idMember/deactivated          | 👍     |                    |            |
| ORG-U-07 | organization | put    | /organizations/:id/memberships/:idMembership              | 👍     |                    |            |
| ORG-U-08 | organization | put    | /organizations/:id/name                                   | 👍     |                    |            |
| ORG-U-09 | organization | put    | /organizations/:id/prefs/associatedDomain                 | 👍     |                    |            |
| ORG-U-10 | organization | put    | /organizations/:id/prefs/boardVisibilityRestrict/org      | 👍     |                    |            |
| ORG-U-11 | organization | put    | /organizations/:id/prefs/boardVisibilityRestrict/private  | 👍     |                    |            |
| ORG-U-12 | organization | put    | /organizations/:id/prefs/boardVisibilityRestrict/public   | 👍     |                    |            |
| ORG-U-13 | organization | put    | /organizations/:id/prefs/externalMembersDisabled          | 👍     |                    |            |
| ORG-U-14 | organization | put    | /organizations/:id/prefs/googleAppsVersion                | 👍     |                    |            |
| ORG-U-15 | organization | put    | /organizations/:id/prefs/orgInviteRestrict                | 👍     |                    |            |
| ORG-U-16 | organization | put    | /organizations/:id/prefs/permissionLevel                  | 👍     |                    |            |
| ORG-U-17 | organization | put    | /organizations/:id/website                                | 👍     |                    |            |
| ORG-P-01 | organization | post   | /organizations                                            | 👍     |                    |            |
| ORG-P-02 | organization | post   | /organizations/:id/logo                                   | 👍     |                    |            |
| ORG-P-03 | organization | post   | /organizations/:id/tags                                   | 👍     |                    |            |
| ORG-D-01 | organization | delete | /organizations/:id                                        | 👍     |                    |            |
| ORG-D-02 | organization | delete | /organizations/:id/logo                                   | 👍     |                    |            |
| ORG-D-03 | organization | delete | /organizations/:id/members/:idMember                      | 👍     |                    |            |
| ORG-D-04 | organization | delete | /organizations/:id/members/:idMember/all                  | 👍     |                    |            |
| ORG-D-05 | organization | delete | /organizations/:id/prefs/associatedDomain                 | 👍     |                    |            |
| ORG-D-06 | organization | delete | /organizations/:id/prefs/orgInviteRestrict                | 👍     |                    |            |
| SRC-G-01 | search       | get    | /search                                                   | 👍     |                    |            |
| SRC-G-02 | search       | get    | /search/members                                           | 👍     |                    |            |
| TKN-G-03 | token        | get    | /tokens/:token                                            | 👍     |                    |            |
| TKN-G-04 | token        | get    | /tokens/:token/:field                                     | 👍     |                    |            |
| TKN-G-05 | token        | get    | /tokens/:token/member                                     | 👍     |                    |            |
| TKN-G-06 | token        | get    | /tokens/:token/member/:field                              | 👍     |                    |            |
| TKN-G-07 | token        | get    | /tokens/:token/webhooks                                   | 👍     |                    |            |
| TKN-G-08 | token        | get    | /tokens/:token/webhooks/:idWebhook                        | 👍     |                    |            |
| TKN-U-01 | token        | put    | /tokens/:token/webhooks                                   | 👍     |                    |            |
| TKN-P-01 | token        | post   | /tokens/:token/webhooks                                   | 👍     |                    |            |
| TKN-D-01 | token        | delete | /tokens/:token                                            | 👍     |                    |            |
| TKN-D-02 | token        | delete | /tokens/:token/webhooks/:idWebhook                        | 👍     |                    |            |
| TYP-G-01 | type         | get    | /types/:id                                                | 👍     |                    |            |
| WEB-G-02 | webhook      | get    | /webhooks/:idWebhook                                      | 👍     |                    |            |
| WEB-G-03 | webhook      | get    | /webhooks/:idWebhook/:field                               | 👍     |                    |            |
| WEB-U-01 | webhook      | put    | /webhooks/:idWebhook                                      | 👍     |                    |            |
| WEB-U-02 | webhook      | put    | /webhooks/                                                | 👍     |                    |            |
| WEB-U-03 | webhook      | put    | /webhooks/:idWebhook/active                               | 👍     |                    |            |
| WEB-U-04 | webhook      | put    | /webhooks/:idWebhook/callbackURL                          | 👍     |                    |            |
| WEB-U-05 | webhook      | put    | /webhooks/:idWebhook/description                          | 👍     |                    |            |
| WEB-U-06 | webhook      | put    | /webhooks/:idWebhook/idModel                              | 👍     |                    |            |
| WEB-P-01 | webhook      | post   | /webhooks                                                 | 👍     |                    |            |
| WEB-D-01 | webhook      | delete | /webhooks/:idWebhook                                      | 👍     |                    |            |
 
### Notes

<a name="N1">Note 1:</a>  Test is covered by creating and deleting Comment in Card.  See `CAR-P-02` and `CAR-D-02`.

### Issues

<a name="I1">Issue 1:</a>  I don't want to roll the dice on the organization stuff.
