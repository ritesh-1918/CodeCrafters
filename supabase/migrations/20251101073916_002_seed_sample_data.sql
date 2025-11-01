/*
  # Seed Sample Data for CodeCrafters AI

  This migration populates the database with:
  - 15+ realistic coding challenges across CSE/IT/ECE branches
  - Achievement badge definitions
  - No user data (users are created via auth)
  
  IMPORTANT NOTE: This migration inserts demo data for the buildathon presentation.
  User data is managed by Supabase Auth and created during registration.
*/

INSERT INTO achievements (badge_name, description, icon_name, category, unlock_criteria) VALUES
  ('First Step', 'Complete your first coding challenge', 'Footprints', 'milestone', '{"challenges_completed": 1}'),
  ('Easy Master', 'Complete 5 Easy challenges', 'Zap', 'difficulty', '{"easy_challenges": 5}'),
  ('Medium Achiever', 'Complete 5 Medium challenges', 'Flame', 'difficulty', '{"medium_challenges": 5}'),
  ('Hard Conqueror', 'Complete 5 Hard challenges', 'Trophy', 'difficulty', '{"hard_challenges": 5}'),
  ('Speed Demon', 'Complete a challenge in under 5 minutes', 'Rocket', 'speed', '{"fastest_time": 5}'),
  ('Persistent', 'Attempt a challenge 10 times', 'Target', 'perseverance', '{"max_attempts": 10}'),
  ('Perfect Score', 'Score 100 on any challenge', 'Star', 'excellence', '{"perfect_score": true}'),
  ('Streak Hero', 'Complete challenges on 7 consecutive days', 'Flame', 'consistency', '{"consecutive_days": 7}'),
  ('All-Rounder', 'Complete challenges from all 3 branches', 'Compass', 'exploration', '{"all_branches": true}'),
  ('Algorithm Wizard', 'Complete 10 algorithm challenges', 'Wand2', 'category', '{"algorithm_challenges": 10}'),
  ('Data Architect', 'Complete 10 data structure challenges', 'Database', 'category', '{"datastructure_challenges": 10}'),
  ('Problem Solver', 'Achieve 100 total challenges completed', 'CheckCircle2', 'milestone', '{"challenges_completed": 100}');

INSERT INTO coding_challenges (title, description, difficulty, branch, topic, starter_code, test_cases, solution_code) VALUES
  (
    'Two Sum Problem',
    'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to the target. You may assume that each input has exactly one solution, and you may not use the same element twice.',
    'Easy',
    'CSE',
    'Array',
    '{"javascript": "function twoSum(nums, target) {\n  // Your code here\n}\n\n// Example:\n// twoSum([2, 7, 11, 15], 9) => [0, 1]", "python": "def two_sum(nums, target):\n    # Your code here\n    pass\n\n# Example:\n# two_sum([2, 7, 11, 15], 9) => [0, 1]"}',
    '[{"input": "[2, 7, 11, 15], 9", "output": "[0, 1]"}, {"input": "[3, 2, 4], 6", "output": "[1, 2]"}, {"input": "[3, 3], 6", "output": "[0, 1]"}]',
    'function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map.has(complement)) return [map.get(complement), i]; map.set(nums[i], i); } return []; }'
  ),
  (
    'Reverse String',
    'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    'Easy',
    'IT',
    'String',
    '{"javascript": "function reverseString(s) {\n  // Your code here\n  // s is an array of characters\n}\n\n// Example: reverseString([\"h\",\"e\",\"l\",\"l\",\"o\"]) => [\"o\",\"l\",\"l\",\"e\",\"h\"]", "python": "def reverse_string(s):\n    # Your code here\n    pass\n\n# Example: reverse_string([\"h\",\"e\",\"l\",\"l\",\"o\"]) => [\"o\",\"l\",\"l\",\"e\",\"h\"]"}',
    '[{"input": "[h,e,l,l,o]", "output": "[o,l,l,e,h]"}, {"input": "[H,a,n,n,a,h]", "output": "[h,a,n,n,a,H]"}]',
    'function reverseString(s) { let left = 0, right = s.length - 1; while (left < right) { [s[left], s[right]] = [s[right], s[left]]; left++; right--; } }'
  ),
  (
    'Palindrome Check',
    'Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    'Easy',
    'ECE',
    'String',
    '{"javascript": "function isPalindrome(s) {\n  // Your code here\n  // Return true or false\n}\n\n// Example: isPalindrome(\"A man, a plan, a canal: Panama\") => true", "python": "def is_palindrome(s):\n    # Your code here\n    pass\n\n# Example: is_palindrome(\"A man, a plan, a canal: Panama\") => True"}',
    '[{"input": "A man, a plan, a canal: Panama", "output": "true"}, {"input": "race a car", "output": "false"}, {"input": " ", "output": "true"}]',
    'function isPalindrome(s) { const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(); let left = 0, right = cleaned.length - 1; while (left < right) { if (cleaned[left] !== cleaned[right]) return false; left++; right--; } return true; }'
  ),
  (
    'Valid Parentheses',
    'Given a string s containing just the characters (), {}, [], determine if the input string is valid. An input string is valid if: 1) Open brackets must be closed by the same type of brackets. 2) Open brackets must be closed in the correct order.',
    'Easy',
    'CSE',
    'Stack',
    '{"javascript": "function isValid(s) {\n  // Your code here\n  // Return true or false\n}\n\n// Example: isValid(\"()\") => true", "python": "def is_valid(s):\n    # Your code here\n    pass\n\n# Example: is_valid(\"()\") => True"}',
    '[{"input": "()", "output": "true"}, {"input": "()[]", "output": "true"}, {"input": "(]", "output": "false"}, {"input": "([)]", "output": "false"}]',
    'function isValid(s) { const stack = []; const map = { ")": "(", "}": "{", "]": "[" }; for (const c of s) { if (map[c]) { if (!stack.length || stack.pop() !== map[c]) return false; } else { stack.push(c); } } return stack.length === 0; }'
  ),
  (
    'Binary Search',
    'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search for target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    'Medium',
    'IT',
    'Algorithm',
    '{"javascript": "function search(nums, target) {\n  // Your code here\n  // Return index or -1\n}\n\n// Example: search([-3,-1,0,2,4,6,9], 0) => 2", "python": "def search(nums, target):\n    # Your code here\n    pass\n\n# Example: search([-3,-1,0,2,4,6,9], 0) => 2"}',
    '[{"input": "[-3,-1,0,2,4,6,9], 0", "output": "2"}, {"input": "[-3,-1,0,2,4,6,9], 13", "output": "-1"}]',
    'function search(nums, target) { let left = 0, right = nums.length - 1; while (left <= right) { const mid = Math.floor((left + right) / 2); if (nums[mid] === target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }'
  ),
  (
    'Merge Sorted Array',
    'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of valid elements in nums1 and nums2 respectively. Merge nums2 into nums1 as one sorted array.',
    'Medium',
    'CSE',
    'Array',
    '{"javascript": "function merge(nums1, m, nums2, n) {\n  // Your code here\n  // Modify nums1 in-place\n}\n\n// Example: merge([1,2,3,0,0,0], 3, [2,5,6], 3) => [1,2,2,3,5,6]", "python": "def merge(nums1, m, nums2, n):\n    # Your code here\n    pass\n\n# Example: merge([1,2,3,0,0,0], 3, [2,5,6], 3) => [1,2,2,3,5,6]"}',
    '[{"input": "[1,2,3,0,0,0], 3, [2,5,6], 3", "output": "[1,2,2,3,5,6]"}, {"input": "[1], 1, [], 0", "output": "[1]"}, {"input": "[0], 0, [1], 1", "output": "[1]"}]',
    'function merge(nums1, m, nums2, n) { let p1 = m - 1, p2 = n - 1, p = m + n - 1; while (p1 >= 0 && p2 >= 0) { nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--]; } while (p2 >= 0) nums1[p--] = nums2[p2--]; }'
  ),
  (
    'Longest Substring Without Repeating Characters',
    'Given a string s, find the length of the longest substring without repeating characters.',
    'Medium',
    'ECE',
    'String',
    '{"javascript": "function lengthOfLongestSubstring(s) {\n  // Your code here\n  // Return the length\n}\n\n// Example: lengthOfLongestSubstring(\"abcabcbb\") => 3", "python": "def length_of_longest_substring(s):\n    # Your code here\n    pass\n\n# Example: length_of_longest_substring(\"abcabcbb\") => 3"}',
    '[{"input": "abcabcbb", "output": "3"}, {"input": "bbbbb", "output": "1"}, {"input": "pwwkew", "output": "3"}, {"input": "au", "output": "2"}]',
    'function lengthOfLongestSubstring(s) { const map = new Map(); let maxLen = 0, start = 0; for (let i = 0; i < s.length; i++) { if (map.has(s[i])) start = Math.max(start, map.get(s[i]) + 1); map.set(s[i], i); maxLen = Math.max(maxLen, i - start + 1); } return maxLen; }'
  ),
  (
    'Linked List Cycle Detection',
    'Given the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.',
    'Medium',
    'IT',
    'LinkedList',
    '{"javascript": "function hasCycle(head) {\n  // Your code here\n  // Return true or false\n  // Use slow and fast pointers\n}\n\n// Example: hasCycle(3 -> 2 -> 0 -> -4) with cycle at index 1 => true", "python": "def has_cycle(head):\n    # Your code here\n    pass\n\n# Example: has_cycle(3 -> 2 -> 0 -> -4) with cycle at index 1 => True"}',
    '[{"input": "List with cycle", "output": "true"}, {"input": "List without cycle", "output": "false"}]',
    'function hasCycle(head) { let slow = head, fast = head; while (fast && fast.next) { slow = slow.next; fast = fast.next.next; if (slow === fast) return true; } return false; }'
  ),
  (
    'Maximum Subarray Sum',
    'Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous part of an array.',
    'Medium',
    'CSE',
    'Array',
    '{"javascript": "function maxSubArray(nums) {\n  // Your code here\n  // Use Kadanes algorithm\n}\n\n// Example: maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) => 6", "python": "def max_sub_array(nums):\n    # Your code here\n    pass\n\n# Example: max_sub_array([-2,1,-3,4,-1,2,1,-5,4]) => 6"}',
    '[{"input": "[-2,1,-3,4,-1,2,1,-5,4]", "output": "6"}, {"input": "[5]", "output": "5"}, {"input": "[-1]", "output": "-1"}]',
    'function maxSubArray(nums) { let maxSum = nums[0], currentSum = nums[0]; for (let i = 1; i < nums.length; i++) { currentSum = Math.max(nums[i], currentSum + nums[i]); maxSum = Math.max(maxSum, currentSum); } return maxSum; }'
  ),
  (
    'Container With Most Water',
    'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    'Hard',
    'ECE',
    'Array',
    '{"javascript": "function maxArea(height) {\n  // Your code here\n  // Use two-pointer approach\n}\n\n// Example: maxArea([1,8,6,2,5,4,8,3,7]) => 49", "python": "def max_area(height):\n    # Your code here\n    pass\n\n// Example: max_area([1,8,6,2,5,4,8,3,7]) => 49"}',
    '[{"input": "[1,8,6,2,5,4,8,3,7]", "output": "49"}, {"input": "[1,1]", "output": "1"}]',
    'function maxArea(height) { let maxArea = 0, left = 0, right = height.length - 1; while (left < right) { const area = Math.min(height[left], height[right]) * (right - left); maxArea = Math.max(maxArea, area); height[left] < height[right] ? left++ : right--; } return maxArea; }'
  ),
  (
    'Word Ladder',
    'Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists. You must change exactly one letter in each step, and each transformed word must exist in the wordList.',
    'Hard',
    'IT',
    'BFS',
    '{"javascript": "function ladderLength(beginWord, endWord, wordList) {\n  // Your code here\n  // Use BFS\n}\n\n// Example: ladderLength(\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]) => 5", "python": "def ladder_length(begin_word, end_word, word_list):\n    # Your code here\n    pass"}',
    '[{"input": "hit,cog,[hot,dot,dog,lot,log,cog]", "output": "5"}]',
    'function ladderLength(beginWord, endWord, wordList) { const wordSet = new Set(wordList); if (!wordSet.has(endWord)) return 0; const queue = [[beginWord, 1]]; while (queue.length) { const [word, level] = queue.shift(); if (word === endWord) return level; for (let i = 0; i < word.length; i++) { for (let c = 97; c <= 122; c++) { const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1); if (wordSet.has(newWord)) { queue.push([newWord, level + 1]); wordSet.delete(newWord); } } } } return 0; }'
  ),
  (
    'Serialize and Deserialize Binary Tree',
    'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer. Design an algorithm to serialize and deserialize a binary tree.',
    'Hard',
    'CSE',
    'BinaryTree',
    '{"javascript": "class Codec {\n  serialize(root) {\n    // Your code here\n  }\n  deserialize(data) {\n    // Your code here\n  }\n}", "python": "class Codec:\n    def serialize(self, root):\n        # Your code here\n        pass\n    def deserialize(self, data):\n        # Your code here\n        pass"}',
    '[{"input": "Binary tree", "output": "Serialized then deserialized correctly"}]',
    'class Codec { serialize(root) { if (!root) return "null"; return root.val + "," + this.serialize(root.left) + "," + this.serialize(root.right); } }'
  ),
  (
    'Minimum Window Substring',
    'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such window, return the empty string.',
    'Hard',
    'ECE',
    'String',
    '{"javascript": "function minWindow(s, t) {\n  // Your code here\n  // Use sliding window\n}\n\n// Example: minWindow(\"ADOBECODEBANC\", \"ABC\") => \"BANC\"", "python": "def min_window(s, t):\n    # Your code here\n    pass"}',
    '[{"input": "ADOBECODEBANC,ABC", "output": "BANC"}]',
    'function minWindow(s, t) { const need = {}, window = {}; for (const c of t) need[c] = (need[c] || 0) + 1; let have = 0, formed = 0; let minLen = Infinity, minStart = 0; let left = 0; for (let right = 0; right < s.length; right++) { const c = s[right]; window[c] = (window[c] || 0) + 1; if (c in need && window[c] === need[c]) formed++; while (formed === Object.keys(need).length && left <= right) { if (right - left + 1 < minLen) { minLen = right - left + 1; minStart = left; } const lc = s[left]; window[lc]--; if (lc in need && window[lc] < need[lc]) formed--; left++; } } return minLen === Infinity ? "" : s.substr(minStart, minLen); }'
  ),
  (
    'Regular Expression Matching',
    'Given an input string s and a pattern p, implement regular expression matching with support for . and * where: . matches any single character, * matches zero or more of the preceding element. The matching should cover the entire input string (not partial).',
    'Hard',
    'IT',
    'DynamicProgramming',
    '{"javascript": "function isMatch(s, p) {\n  // Your code here\n  // Use dynamic programming\n}\n\n// Example: isMatch(\"aa\", \"a\") => false, isMatch(\"aa\", \".*\") => true", "python": "def is_match(s, p):\n    # Your code here\n    pass"}',
    '[{"input": "aa,a", "output": "false"}, {"input": "aa,.*", "output": "true"}]',
    'function isMatch(s, p) { const memo = {}; const dp = (i, j) => { if (memo.hasOwnProperty(`${i},${j}`)) return memo[`${i},${j}`]; if (j === p.length) return i === s.length; const isFirstMatch = i < s.length && (p[j] === "." || p[j] === s[i]); if (j + 1 < p.length && p[j + 1] === "*") { return memo[`${i},${j}`] = dp(i, j + 2) || (isFirstMatch && dp(i + 1, j)); } else { return memo[`${i},${j}`] = isFirstMatch && dp(i + 1, j + 1); } }; return dp(0, 0); }'
  ),
  (
    'Decode String',
    'Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.',
    'Medium',
    'General',
    'Stack',
    '{"javascript": "function decodeString(s) {\n  // Your code here\n  // Use stack-based approach\n}\n\n// Example: decodeString(\"3[a2[c]]\") => \"accaccacc\"", "python": "def decode_string(s):\n    # Your code here\n    pass"}',
    '[{"input": "3[a2[c]]", "output": "accaccacc"}, {"input": "2[abc]3[cd]ef", "output": "abcabccdcdcdef"}]',
    'function decodeString(s) { const stack = []; for (const c of s) { if (c === "]") { let str = ""; while (stack.length && stack[stack.length - 1] !== "[") str = stack.pop() + str; stack.pop(); let num = ""; while (stack.length && !isNaN(stack[stack.length - 1])) num = stack.pop() + num; stack.push(str.repeat(parseInt(num))); } else { stack.push(c); } } return stack.join(""); }'
  );
