/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  const res = []
  const len = nums.length
  for (let i = 0; i < len; i++) {
    let l = i + 1
    let r = len - 1
    if (i > 0 && nums[i] === nums[i - 1]) continue
    while (l < r) {
      // 三数之和小于0，左指针前进
      if (nums[l] + nums[r] + nums[i] < 0) {
        l++
        // 处理左指针元素重复的情况
        while (l < r && nums[l] === nums[l - 1]) {
          l++
        }
      }
      // 三数之和大于0，左指针前进
      else if (nums[l] + nums[r] + nums[i] > 0) {
        r--
        while (l < r && nums[r] === nums[r + 1]) {
          r--
        }
      }
      // 目标匹配 推入数组
      else {
        res.push([nums[l], nums[r], nums[i]])
        l++
        r--
        while (l < r && nums[l] === nums[l - 1]) {
          l++
        }
        while (l < r && nums[r] === nums[r + 1]) {
          r--
        }
      }
    }
  }
  return res
};
// @lc code=end

