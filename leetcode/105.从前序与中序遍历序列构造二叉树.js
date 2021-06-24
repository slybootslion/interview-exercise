/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!inorder.length) return null
  const rootVal = preorder[0]
  const treeNode = new TreeNode(rootVal)
  
  const mid = inorder.indexOf(rootVal)
  const iLeftArr = inorder.slice(0, mid)
  const pLeftArr = preorder.slice(1, mid + 1)
  treeNode.left = buildTree(pLeftArr, iLeftArr)
  
  const iRightArr = inorder.slice(mid + 1)
  const pRightArr = preorder.slice(mid + 1)
  treeNode.right = buildTree(pRightArr, iRightArr)
  
  return treeNode
};
// @lc code=end

