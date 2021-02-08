/*
 * @lc app=leetcode id=124 lang=javascript
 *
 * [124] Binary Tree Maximum Path Sum
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let maxNum = -Infinity

  function getMax(a, b) {
    return a > b ? a : b
  }

  function onSiseMax(root) {
    if (!root) return 0
    const left = getMax(0, onSiseMax(root.left))
    const right = getMax(0, onSiseMax(root.right))
    maxNum = getMax(maxNum, left + right + root.val)
    return getMax(left, right) + root.val
  }

  onSiseMax(root)
  return maxNum
};
// @lc code=end

