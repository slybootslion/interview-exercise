/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
var maxDepth = function (root) {

  let resLevel = 0
  const func = (node, level) => {
    if (!node) return
    if (!node.left && !node.right) resLevel = Math.max(resLevel, level)
    node.left  && func(node.left, level + 1)
    node.right && func(node.right, level + 1)
  }
  func(root, 1)
  return resLevel
};
// @lc code=end

