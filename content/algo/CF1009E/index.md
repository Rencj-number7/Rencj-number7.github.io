---
title: "CF1009E题解"
date: 2022-11-13
category: 算法竞赛
tags: 
  -  算法竞赛
draft: false
---
## CF1009E 题解

数学题，可见答案求的是所有代价的和。

考虑每个 $a_{i}$ 会被计算几次，发现对于一个 $a_{i}$，它的贡献是 $\sum\limits_{i=1}^{n-i+1}i \times C_{n-i+1}^{n-i}$。例如，样例 $2$ 中 $a_{1}$ 的贡献是 $(4\times 1 +3\times 3+2\times 3+1\times 1 )\times a_{1}=20$。

但是直接做是 $O(n^2)$ 的，考虑化简，把式子 $\times 2$，变成（暂时把上式中 $n-i+1$ 看成 $N$ ）：

原式 $=\large{\frac{N\times C_{N}^{0}+ 1\times C_{N}^{N-1} +(N-1)\times C_{N}^{1}+2\times C_{N}^{N-2}+... }{2}}$

​		$=\large{\frac{(N+1)\times \sum\limits_{i=0}^{N-1}C_{N}^{i}}{2}}$  

​		$=\large{\frac{(N+1)\times 2^{N-1}}{2}}$ 

​		$=(N+1)\times 2^{N-2}$

把 $N=n-i+1$ 代入，得 原式 $=(n-i+2)\times 2^{n-i-1}$。

最后答案便是 $\sum\limits_{i=1}^{n} a_{i}\times (n-i+2)\times 2^{n-i-1}$，时间复杂度 $O(n)$。

注意指数可能为负，稍微改改快速幂就行。

**Talk is cheap, show me the code.**

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long
typedef pair<int,int> Pii;
const int N=1e6+5,Mod=998244353;
int n;
int a[N];
int ans=0;
inline int qp(int a,int b,int res=1)
{
	bool f=b<0;b=abs(b);
	while(b)
	{
		if(b&1)res=res*a%Mod;
		a=a*a%Mod;b>>=1;
	}return f?qp(res,Mod-2):res;
}
signed main()
{
	cin.tie(0)->sync_with_stdio(0);
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
		(ans+=(n-i+2)*qp(2,n-i-1)%Mod*a[i]%Mod)%=Mod;
	} 
	cout<<ans<<'\n';
	return 0;
}
```
