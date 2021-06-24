/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true
  const func = (left, right) => {
    if (!left && !right) return true
    return !!(left && right && left.val === right.val && func(left.right, right.left) && func(left.left, right.right))
  }
  return func(root.left, root.right)
};
// @lc code=end

