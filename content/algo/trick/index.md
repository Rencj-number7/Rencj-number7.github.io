---
title: "Trick"
date: 2022-09-30
category: 算法竞赛
tags: 
  -  算法竞赛
  - trick
draft: false
description: ""
---
> 1. 对于每次删点求最短路，范围小可以考虑倒着做 Floyd，因为 Floyd 对松弛操作的顺序没有要求（[CF295B](https://www.luogu.com.cn/problem/CF295B)）。

---

> 2. **求序列本质不同子序列数量。**
>
> 令 $f_{i}$ 表示 $S_{1∼i}$ 的本质不同子序列数量。
>
> 方法一：是通过子序列自动机得出转移：$f_{i} = 1 + \sum_{x} f_{lst_{x}}$。
>
> 方法二：是通过容斥得出转移：$f_{i} = 2f_{i−1} − f_{lst_{a_{i}}−1}$。

---

> 3. 给简单无向联通图定向，要求每个点**出度**为偶数，求构造方案。
>
> 发现边数为奇数显然无解，对于边数为偶数，考虑先跑出生成树，生成树外的边随便连，内的边从下到上连边，若当前点出度为奇数连自己向父亲的边。

---

> 4. **给一堆二元组，要求分成两组，使 $\sum x_i+\sum y_i$ 最大的问题**。
>
> 考虑一个经典贪心，考虑两个二元组 $(x_i,y_i)$ 和 $(x_j, y_j)$，若 $x_i+y_j>x_j+y_i$，则有 $x_i-y_i>x_j-y_j$，即 $x-y$ 更大的二元组选 $y$ 一定更优。所以把这些二元组按 $x-y$ 从小到大排序，最大的 $X$ 个选成 $x$，剩下的选成 $y$ 即可。
>
> **Ex:** 若是三元组，分成三组。[AGC018C](https://atcoder.jp/contests/agc018/tasks/agc018_c) 。只要先全选第一个。然后，就转化成两个的问题了。

---

> 5. **求 $\large{\lfloor \frac{x}{M}\rfloor\mod p}$** 。
>
> 经典做法，对于 $x$ 这部分计算时可以直接对 $M*p$ 取模（注意开 $ \text{int128} $），然后正常除下取整，外面 $\mod p$ 。

---

> 6. $\large{\sum\limits_{i=1}^k \sum\limits_{d|\gcd(i,n)}{\mu(d)}}=\large{\sum\limits_{d|n}\mu(d)\lfloor \frac{k}{d} \rfloor}$，简单的转化，但是怕忘。

---

> 7. **莫比乌斯函数**：
>
> 定义：$\mu(n)=\left\{ 
>     \begin{array}{lc}
>         1 & n=1 \\
>         0 & n含有平方因子\\(-1)^k & k为 n 的本质不同质因子个数\end{array}
> \right.$
>
> 性质：$\sum\limits_{d|n}\mu(d)=\left\{ 
>  \begin{array}{lc}
>      1 & n = 1 \\
>      0 & n \ne 1 \\
>  \end{array}
> \right.$
>
> 结论：$\large{[\gcd(i,j)=1]\Rightarrow \sum\limits_{d|\gcd(i,j)}\mu(d)}$
