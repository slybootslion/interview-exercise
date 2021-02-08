/*
 * @lc app=leetcode id=1 lang=javascript
 *
 * [1] Two Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// 双遍历，垃圾写法，不过是最直觉的写法
/* 
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i]
    for (let j = i + 1; j < nums.length; j++) {
      const item2 = nums[j]
      if (item + item2 === target) return [i, j]
    }
  }
};
 */

// 稍微正经点的写法
function twoSum(nums, target) {
  const map = new Map()
  const len = nums.length
  for (let i = 0; i < len; i++) {
    const item = nums[i]
    if (map.has(target - item)) return [i, map.get(target - item)]
    else map.set(item, i)
  }
}
// @lc code=end

