---
title: "CF随机做题"
date: 2022-09-30
category: 算法竞赛
tags: 
  -  算法竞赛
draft: false
---
## [CF1000C](https://www.luogu.com.cn/problem/CF1000C)  

难度 1700   [$代码$](https://codeforces.com/contest/1000/submission/174047770)

> #### 开始以为是线段树，但是发现好像直接离线做就好了。。。

## [CF1176D](https://www.luogu.com.cn/problem/CF1176D)    

难度 1800   [$代码$](https://codeforces.com/contest/1176/submission/174070479)

> #### 思维题，考虑从大到小贪心。<br> 若当前数为质数，那么它一定不在原数组中，那么找到 $prime_{x}==b_{i}$ 的 $x$ 并放入原数组，删除两数。<br> 若为合数，那么它一定在原数组中，找到它因子中最大的那个，删除两数。

## [CF295B](https://www.luogu.com.cn/problem/CF295B)    

难度 1700   [$代码$](https://codeforces.com/contest/295/submission/174078559)

> #### 发现正着做，无论如何都是 $\geq O(n^4)$，于是考虑倒着做，转化为每次加一个点，此时可以 $Floyd$ 直接来，因为 $Floyd$ 对松弛操作的顺序没有要求，所以复杂度 $O(n^3)$。

## [CF1388C](https://www.luogu.com.cn/problem/CF1388C)    

难度 1800   [$代码$](https://codeforces.com/contest/1388/submission/174096750)

> #### 细节题，考虑 $YES$ 需要满足的条件：<br> 1.经过当前点的人数 $\ge |h_{u}|$，显然。<br> 2.经过当前点的人数 $-h_{u}$ 能被 2 整除，考虑设 经过当前点的人数为 x，可得当前点心情好的有 $\frac{1}{2} (x+h_{i})$ 个，不好的有 $\frac{1}{2} (x-h_{i})$ 个。<br> 3.当前点心情不好的人数 $\leq$ 其子树中所有点心情不好的人数之和，因为心情不好的人不会变好，所以心情不好的人数只增不减。

## [CF1354D](https://www.luogu.com.cn/problem/CF1354D) 

难度 1900   [$代码$](https://codeforces.com/contest/1354/submission/174325121)

> #### 本来想拿 $pbds$ 的 $tree$ 写，发现卡空间。于是想到值域分块做，但是看数据范围 $1e6$ ，感觉很卡，应该过不了（后来看题解区好像有人写了，能过），只能改用二分+树状数组，时间复杂度 $O(nlog^2n)$。

## [CF1400E](https://www.luogu.com.cn/problem/CF1400E)

难度 2200   [$代码$](https://codeforces.com/contest/1400/submission/174381291)

> #### 本来想写 $dp$，但是奈何太菜了，写萎了。于是考虑分治。<br> $f(l,r)$ 表示把 $l~r$ 推平的最少次数，若全用操作 2，则需 $r-l+1$ 次，若用操作 1，则考虑一直用操作 1，直至有一位变成 0，然后贡献是 $f(l,p-1)+f(p+1,r)+a_{p}$。 时间复杂度 $O(n^2)$。

## [CF743D](https://www.luogu.com.cn/problem/CF743D)

难度 1800    [$代码$](https://codeforces.com/contest/743/submission/174755456)

> #### 考虑树形 dp，设 $f_{u}$ 表示以 u 为根的子树的最大子树和，转移显然为 $\large{f_{u}=\max_{\max_{f_{v}},sum_{u}}}$，而答案则是取每个 u 的儿子 v 中，最大的和次大的 $f_{v}$ 之和的最大值。若只有一个儿子，则不更新答案。 

## [CF626D](https://www.luogu.com.cn/problem/CF626D)

难度 1800    [$代码$](https://codeforces.com/contest/626/submission/175154179)

> #### 概率题，考虑 dp，假设第一个人取的数是 $a_{1},a_{2},a_{3}$，第二个人是 $b_{1},b_{2},b_{3}$，求 $ (a_{1}-b_{1})+(a_{2}-b_{2}) < a_{3}-b_{3} [a_{1} > b_{1},a{2} > b_{2}] $ 的概率。设 $f_{0,i}$ 表示 $a_{x}-a_{y}==i$ 的概率， $f_{1,i}$ 表示 $(a_{x1}-a_{y1})+(a_{x2}-a_{y2})==i$ 的概率，直接做就行了。

## [CF1690G](https://www.luogu.com.cn/problem/CF1690G)

难度 2000    [$代码$](https://codeforces.com/contest/1690/submission/174959200)

> #### 萌萌 ds 题，相当于是单点减 + 区间推平，考虑直接珂朵莉做。推平就暴力往后枚举，能并就并，经过我们的若干次操作，最多会有 $n+m$ 个区间，所以复杂度 $O((n+m)\log{n})$。

## [CF1702G2](https://www.luogu.com.cn/problem/CF1702G2)

难度 2000    [$代码$](https://codeforces.com/contest/1702/submission/175291996)

> #### LCA 好题，要求判断是否存在一条链包含树上给定点集。考虑这样一个性质：若存在满足条件的最短链，则点集中深度最深的点 u 是该链的一个端点，点集中距离 u 最远的点 v 是该链的另一端点。<br>所以，直接求出头尾两点的 LCA，对于其他点，若其 $dep_{u} < dep_{LCA}$ 则不满足，否则若其不在 $1-st || 1-ed$ 的路径上，则也不满足。每个点可以用 LCA 判。

## [CF730B](https://www.luogu.com.cn/problem/CF730B)

难度 1800    [$代码$](https://codeforces.com/contest/730/submission/175194889)

![](https://images.cnblogs.com/cnblogs_com/blogs/734127/galleries/2228076/o_221011015922_image_2022_10_11T01_57_34_722Z.png)

> #### 如图先每相邻两个一组，询问 $\lfloor \frac n 2 \rfloor$ 次，再组与组之间比较，每两组比较两次，找最大最小预计 $n-1$ 次，刚好满足题目要求次数。

## [CF1012C](https://www.luogu.com.cn/problem/CF1012C)

难度 1900    [$代码$](https://codeforces.com/contest/1012/submission/175293469)

> #### dp，考虑设:<br> $f_{i,j,0}$ 表示 前 i 个数中，有 j 个峰，第 i,i-1 都不为峰的方案数。<br>$f_{i,j,1}$ 表示 前 i 个数中，有 j 个峰，第 i 为峰的方案数。<br>$f_{i,j,2}$ 表示 前 i 个数中，有 j 个峰，第 i-1 为峰的方案数。<br>考虑转移：<br> $f_{i,j,0}=min(f_{i-1,j,0},f_{i-1,j,2});$<br>$f_{i,j,1}=min(f_{i-1,j-1,0}+max(0,a_{i-1}-a_{i}+1),f_{i-1,j-1,2}+max(0,min(a_{i-1},a_{i-2}-1)-a_{i}+1));$<br>$f_{i,j,2}=f_{i-1,j,1}+max(0,a_{i}-a_{i-1}+1);$<br>第一维可以直接滚掉，同时注意要倒序枚举 j，从转移可见，先更新顺序为 $f_{i,j,0},f_{i,j,2},f_{i,j,1}$。时间复杂度 $O(n^2)$

## [CF1174D](https://www.luogu.com.cn/problem/CF1174D)

难度 1900   [$代码$](https://codeforces.com/contest/1174/submission/175492923)

> #### 先考虑构造，序列中相邻两个元素异或和不为 0 或 x，这个可以记 vis 直接做，然后考虑怎么把相邻扩展到任意，直接异或前缀和即可。

## [CF1537D](https://www.luogu.com.cn/problem/CF1537D) 

难度 1700   [$代码$](https://codeforces.com/contest/1537/submission/175498724)

> #### 找规律题，可以手玩或者打暴力，发现奇数都是 $Bob$ 赢，偶数则是当其为 $2^{2k+1}$ 时是 $Bob$ 赢，否则是 $Alice$ 赢。

## [CF161D](https://www.luogu.com.cn/problem/CF161D)

难度 1800   [$代码$](https://codeforces.com/contest/161/submission/175734554)

> #### 范围比较小，可以直接 $O(nk)$ 树形 dp，设 $f_{u,d}$ 表示与 u 距离为 d 的点数，直接暴力转移就行。

## [CF1144F](https://www.luogu.com.cn/problem/CF1144F)

难度 1700   [$代码$](https://codeforces.com/contest/1144/submission/175878366)

> #### ~~你谷恶评，这题居然有紫。。。~~，要使图中没有距离 $\geq 2$ 的路径，那么就是相邻两点不能同时为入或者同时为出，那么发现直接黑白染色即可。

## [CF1144G](https://www.luogu.com.cn/problem/CF1144G)

难度 2400   [$代码$](https://codeforces.com/contest/1144/submission/176086934)

> #### 设 $f_{i,0}$ 表示把序列的前 i 个数拆成一个递增序列和一个递减序列（可以为空），并且 $A_i$ 属于递增序列时，递减序列结尾可能的最大值。$f_{i,1}$，表示 $A_i$ 属于递减序列时，递增序列结尾可能的最小值。
>
> #### 转移有四种：
>
> - #### $A_{i-1},A_i$ 都属于递增序列，条件是 $A_{i-1} < A_i$，转移为 $f_{i-1,0} \rightarrow f_{i,0}$。
>
> - #### $A_{i-1},A_i$ 都属于递减序列，情况类似。
>
> - #### $A_{i-1}$ 属于递减序列，$A_i$ 属于递增序列，条件是 $f_{i-1,1} < A_i$，转移为 $A_{i-1} \rightarrow f_{i,0}$。
>
> - #### $A_{i-1}$ 属于递增序列，$A_i$ 属于递减序列，情况类似。
>
> #### 为了输出方案，记 $lst_{i,0}$ 表示在最优方案中 $A_{i-1}$ 属于哪个序列，$lst_{i,1}$ 同理。

## [CF1335E2](https://www.luogu.com.cn/problem/CF1335E2)

难度 1800   [$代码$](https://codeforces.com/contest/1335/submission/176173117)

> #### 模拟题。首先我们记录某一个数 $a_i$ 到 i 出现的次数以及出现到这个次数的位置。前缀后缀个各做一遍。然后我们枚举第一个颜色 x 以及它第一段的长度l。然后得出 $p_1,p_2$ 分别表示前缀 x 颜色到达 l 个的位置，以及后缀到达 l 个的位置。
>
> #### 然后在枚举第二种颜色 y，那么 $ans=\max(ans,l\times 2+\max(p_2-p_1))$ 为到 $[p1,p2]$ 这段区间里面出现次数最多的颜色数量。

## [CF1477B](https://www.luogu.com.cn/problem/CF1477B)

难度 1900   [$代码$](https://codeforces.com/contest/1477/submission/176651323)

> #### 我们模拟一下样例的过程，发现正着不好做，考虑反过来，即将 T 改为 F。
>
> #### 对于 一段区间 $[l_i,r_i]$
>
> - #### 如果 01 数量相同，不能改变字符串。
>
> - #### 如果 1 的数量超过一半，就只能把所有 0 改为 1。
>
> - #### 如果 1 的数量没超过一半，就只把所有 1 改为 0。
>
> #### 只需一个数据结构维护区间覆盖 + 区间求和，直接上线段树或分块即可。

## [CF527D](https://www.luogu.com.cn/problem/CF527D)

难度 1800   [$代码$](https://codeforces.com/contest/527/submission/176814229)

> #### 设 $x_i \geq x_j$，原式可以写为 $x_i-w_i \geq x_j+w_j$，对于一个点 i，我们再给它加上两个属性：l 和 r。其中 $l_i = x_i-w_i$，$r_i=x_i+w_i$，然后再看看刚才推出来的式子，就变成了 $l_i \geq r_j$，接着就是贪心线段覆盖。
