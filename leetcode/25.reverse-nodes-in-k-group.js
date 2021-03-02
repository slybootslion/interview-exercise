/*
 * @lc app=leetcode id=25 lang=javascript
 *
 * [25] Reverse Nodes in k-Group
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
 * @param {number} k
 * @return {ListNode}
 */
const reverse = (a, b) => {
  let pre = null
  let cur = a
  let nxt = a
  while (cur != b) {
    nxt = cur.next
    cur.next = pre
    pre = cur
    cur = nxt
  }
  return pre
}

var reverseKGroup = function (head, k) {
  if (!head) return null
  const a = head
  let b = head
  for (let i = 0; i < k; i++) {
    if (!b) return head
    b = b.next
  }
  const newHead = reverse(a, b)
  a.next = reverseKGroup(b, k)
  return newHead
}
// @lc code=end

