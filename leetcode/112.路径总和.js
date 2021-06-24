/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false
  let res = false
  const func = (node, sum) => {
    if (!node.left && !node.right && targetSum === sum) res = true
    node.left && func(node.left, node.left.val + sum)
    node.right && func(node.right, node.right.val + sum)
  }
  func(root, root.val)
  return res
};
// @lc code=end

