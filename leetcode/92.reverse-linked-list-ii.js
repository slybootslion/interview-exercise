/*
 * @lc app=leetcode id=92 lang=javascript
 *
 * [92] Reverse Linked List II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {

  let successor = null

  function reverseN(head, N) {
    if (N === 1) {
      successor = head.next
      return head
    }

    const last = reverseN(head.next, N - 1)
    head.next.next = head
    head.next = successor
    return last
  }

  if (m === 1) {
    return reverseN(head, n)
  }

  head.next = reverseBetween(head.next, m - 1, n - 1)
  return head
};
// @lc code=end

