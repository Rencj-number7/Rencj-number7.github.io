---
title: "Atcoder ABC220E"
date: 2022-10-11
category: 算法竞赛
tags: 
  -  算法竞赛
  -  题解
draft: false
---


（树上问题+组合数学） $ O(D) $ 

设 $ X= $ 左边深度为 $ k $ 的顶点数 $ \times $ 右边深度为 $ D−k $ 的顶点数， $ M=max(k,D−k) $ 

而高度大于等于 M 的子树有 $ 2^{N−M}-1 $ 个。

对于每个 k 的贡献是 $ (2^{N−M}-1)\times X $ 

我们枚举 $ k=0∼D $ 即可。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long
typedef pair<int,int> Pii;
const int N=1e6+5,Mod=998244353;
int n,d;
int a[N];
signed main()
{
    cin.tie(0)->sync_with_stdio(0);
    a[0]=1;cin>>n>>d;
    for(int i=1;i<=n;i++)
        a[i]=a[i-1]*2%Mod;
    int ans=0;
    for(int i=0;i<=d;i++)
    {
        int j=d-i;
        if(i>=n||j>=n)continue;
        int res=(a[n-max(i,j)]-1+Mod)%Mod;
        res=res*a[max(i-1,0ll)]%Mod*a[max(j-1,0ll)]%Mod;
        (ans+=res)%=Mod;
    }
    cout<<(ans<<1)%Mod<<'\n';
    return 0;
}
```