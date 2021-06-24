/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length) return null
  const rootVal = postorder.pop()
  const treeNode = new TreeNode(rootVal)

  const midIndex = inorder.indexOf(rootVal)
  const iLeftArr = inorder.slice(0, midIndex)
  const pLeftArr = postorder.slice(0, iLeftArr.length)
  treeNode.left = buildTree(iLeftArr, pLeftArr)
  const iRightArr = inorder.slice(midIndex + 1)
  const pRightArr = postorder.slice(iLeftArr.length, iLeftArr.length + iRightArr.length)
  treeNode.right = buildTree(iRightArr, pRightArr)
  return treeNode
};
// @lc code=end

