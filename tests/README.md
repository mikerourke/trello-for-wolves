# Testing Operations

## Overview

The list below details the testing operations to ensure all tests can be run.

## Operations

1. Create new `organization` instance named <u>TFW Testing</u>
    * Update properties (`PUT` requests)
2. Assign `member` to <u>TFW Testing</u>
    * Update properties
3. Create (2) `board` instances named <u>Board A</u> and <u>Board B</u>
    * Update properties of <u>Board A</u> (`PUT` requests)
    * Star <u>Board A</u>
    * Unstar <u>Board A</u>
4. Create (2) `label` instances named <u>Label A</u> and <u>Label B</u> on <u>Board A</u>
    * Update properties of <u>Label A</u> (`PUT` requests)
    * Move <u>Label B</u> to <u>Board B</u>
    * Delete <u>Label B</u>
5. Create (3) `list` instances named <u>List A</u>, <u>List B</u>, and <u>List C</u> on <u>Board A</u>
    * Update properties of <u>List A</u> (`PUT` requests)
    * Move <u>List B</u> to <u>Board B</u>
    * Delete <u>List C</u>
6. Create (3) `card` instances named <u>Card A</u>, <u>Card B</u>, and <u>Card C</u> on <u>List A</u> on <u>Board A</u>
    * Update properties of <u>Card A</u> (`PUT` requests)
    * Add description to <u>Card B</u> of *This is a description for wolves*
    * Add 2 `sticker` instances to <u>Card A</u> with image **check** and **heart**
    * Move <u>Card B</u> to <u>Board B</u>
    * Move all cards on <u>List A</u> to <u>List B</u> on <u>Board B</u>
    * Move all cards on <u>List B</u> to <u>List A</u> on <u>Board A</u>
    * Add `comment` to <u>Card A</u> with text *This is a test comment.*
    * Update comment text to *This is updated text.*
    * Delete comment
    * Delete <u>Card C</u>
7. Create (3) `checklist` instances named <u>Checklist A</u>, <u>Checklist B</u>, and <u>Checklist C</u> on <u>Card A</u>
    * Add (3) check items named <u>Item A</u>, <u>Item B</u>, and <u>Item C</u> on <u>Checklist A</u>
    * Change name of <u>Item A</u> to "Item A New"
    * Mark <u>Item C</u> as complete
    * Mark <u>Item C</u> as not complete
    * Convert <u>Item B</u> to a `card`
    * Move <u>Checklist B</u> to <u>Card B</u>
    * Delete <u>Checklist C</u>
8. Perform `search` request with URL `https://api.trello.com/1/search?query=wolves&idBoards=mine&key=[KEY]&token=[TOKEN]`
9. Perform `type` request with URL `https://api.trello.com/1/types/me?key=[KEY]&token=[TOKEN]`

## Results

All results should be written to a JSON file for reference in other tests.