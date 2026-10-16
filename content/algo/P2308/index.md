---
title: "洛谷P2308 添加括号"
date: 2022-02-19
category: 算法竞赛
tags: 
  -  算法竞赛
  -  题解
draft: false
description: ""
---
### Updata:

``2022 . 2 . 16``： SPJ 已加，本题解中  80  分的写法也能 AC。

---

[题目传送门](https://www.luogu.com.cn/problem/P2308)

---

## 思路：

这题明显是区间 dp（ 做法和石子合并很像 ）。

---

首先我们设 `f[i][j]` 表示从 i 到 j 区间合并后所能得到的中间和之和的最小代价，

于是就是区间 dp ~~的模板~~：

- **状态转移方程：**

##### `f[i][j] = min(f[i][j],f[i][k] + f[k+1][j] + sum[j] - sum[i-1] )`

其中 `sum[i]` 表示前缀和，也就是从 a[1] 到  a[i]  的和，

所以 `sum[j] - sum[i-1]` 表示从  a[i]  到  a[j]  的和。

- **初始状态：**

自己和自己合并代价是 0，所以 `f[i][j] = 0`

由于是求最小代价，所以

`memset(f,0x3f,sizeof(f))//给 f 赋一个较大值`

---

## 输出部分：

这题要注意的是它的输出 （~~输出调了我一晚上~~）

- 我最开始是想在每个不同区间中找到最小时用 `sl[l]++` 和  `sr[r]++` 来存左右括号数，最后输出。

写法：

```cpp
int l,r;
for(int len=2;len<=n;len++)
{
    int Min=1e9;
    for(int i=1;i<=n-len+1;i++)
    {
        int j=len+i-1;
        if(f[i][j]<Min)
            l=i,r=j;
    }
    sl[l]++,sr[r]++;
}
for(int i=1;i<=n;i++)
{
    for(int j=1;j<=sl[i];j++)
        cout<<'(';
    cout<<a[i];
    for(int j=1;j<=sr[i];j++)
        cout<<')';
    if(i!=n)
        cout<<'+';
}cout<<'\n';
```

虽过了样例，然而[ 30pts 记录](https://www.luogu.com.cn/record/69455713)。

于是百思不得其解的我拿了一位 dalao 的码对拍，立即就出错。。。

输入：

```
7
10 2 9 9 9 6 2 
```

输出：

```
//std.out:
((10+(2+9))+(9+(9+(6+2))))
130
11 21 8 17 26 47 

//bf.out:
(10+(2+(9+(9+(9+(6+2))))))
130
8 17 26 27 15 37 
```

- 观察后发现 std 是递归输出（括号层数少），于是我改了一下：

```cpp
void print(int l,int r)
{
    if(l==r)
        cout<<a[l];
    else
    {
        cout<<'(';
        print(l,num[l][r]);//num[i][j]是 i ，j 区间最小值的断点
        cout<<'+';
        print(num[l][r]+1,r);
        cout<<')';
        ans[++ans[0]]=sum[r]-sum[l-1];//这是存每个中间和
    }
}
//求f[i][j]（写在主函数里）
for(int len=2;len<=n;len++)
    for(int i=1;i<=n-len+1;i++)
    {
        int j=len+i-1;
        for(int k=i;k<=j-1;k++)
	    if(f[i][k]+f[k+1][j]+sum[j]-sum[i-1]<f[i][j])
            f[i][j]=f[i][k]+f[k+1][j]+sum[j]-sum[i-1],num[i][j]=k;//做标记num[i][j]
    }
```

于是[ 80pts 记录](https://www.luogu.com.cn/record/69457188)。（SPJ已加，现在已能过）

- 最后在不断对拍后，发现 k 枚举的顺序也会影响  num[i][j] 的值，不过题目说从左到右也许是要标记靠右的 k，

所以终于[ AC ](https://www.luogu.com.cn/record/69457786)了。

Code：

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
int num[21][21];
int ans[21];
int a[21],sum[21];
int f[21][21];
void print(int l,int r)//递归输出
{
    if(l==r)
        cout<<a[l];
    else
    {
        cout<<'(';
        print(l,num[l][r]);
        cout<<'+';
        print(num[l][r]+1,r);
        cout<<')';
        ans[++ans[0]]=sum[r]-sum[l-1];//存中间和
    }
}
int main()
{
    ios::sync_with_stdio(0);
    memset(f,0x3f,sizeof(f));//初始化
    cin>>n;
    for(int i=1;i<=n;i++)
    {
        cin>>a[i];
        sum[i]=sum[i-1]+a[i];//前缀和
        f[i][i]=0;//初始化
    }
    for(int len=2;len<=n;len++)//区间dp写法
    {
        for(int i=1;i<=n-len+1;i++)
        {
            int j=len+i-1;
            for(int k=j-1;k>=i;k--)//这里顺序改了改就过了。。。
            {
                if(f[i][k]+f[k+1][j]+sum[j]-sum[i-1]<f[i][j])
                    f[i][j]=f[i][k]+f[k+1][j]+sum[j]-sum[i-1],num[i][j]=k;
            }
        }
    }
    print(1,n);cout<<'\n';
    cout<<f[1][n]<<'\n';
    for(int i=1;i<=ans[0];i++)
        cout<<ans[i]<<" ";
    cout<<'\n';
    return 0;
}
```

谢谢各位 dalao 观赏。

End
