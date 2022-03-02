# 长度最小的子数组

**描述**

给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

示例：

输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

[力扣题目链接](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

**本题推荐采用「滑动窗口」的方式解决**

左指针，右指针包含着一个区间，这个区间的数组和，大于等于 target

最小区间长度由当前区间长度与历史最小区间长度做对比

```javascript
var minSubArrayLen2 = function (target, nums) {
  const len = nums.length;
  let left = 0,
    right = 0,
    sum = 0,
    res = len + 1;

  while (right < len) {
    sum += nums[right];
    if (sum >= target) {
      while (sum - nums[left] >= target) {
        sum -= nums[left];
        left++;
      }
      res = Math.min(res, right - left + 1);

      if (res === 1) {
        return 1;
      }
    }

    right++;
  }

  // 初始化时 res = len + 1, 遍历数组结束，res 值未改动说明整个数组和未到达 target
  return res === len + 1 ? 0 : res;
};

console.log(minSubArrayLen2(7, [2, 3, 1, 2, 4, 3]));
```
