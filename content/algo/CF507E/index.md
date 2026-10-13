---
title: "CF507E Breaking Good题解"
date: 2022-02-19
category: 算法竞赛
tags: 
  -  算法竞赛
draft: false
---
## [题目传送门](https://www.luogu.com.cn/problem/CF507E)

### 题意分析：

这题最重要的是要看懂题目意思：

- 给出 n 个城市和 m 条边，其中 z 表示此边是否能通行。
- 求一条从城市 $1$ 到 n 尽可能短且对道路的影响（即炸毁或修复）尽可能小的路。

**那么如何使选出的路对道路的影响小呢？**

多读几遍题可知：

1. 对于在所选路径上的路，所要修复（即不可通行）的路要尽可能少。
2. 对于非所选路径上的路，所要炸毁（即可通行）的路要尽可能少。

## 解：

这题用最短路做（~~关于 SPFA ，它死了。~~），于是我用 Dijkstra 做。

---

根据刚才的分析，

我们用 $ dis_{ i } $ 表示从城市 $ 1 $ 到 i 的最短路长度，

$ path_{ i } $ 表示所选最短路中从城市 1 到 i 的不可通行路的数量，

更新时考虑找路径最短，且路径中不可通行路数量少：

```cpp
//it.nxt表示下一个城市，now表示现在的城市，
//it.w表示这条路能否通行（因为 0 表示不可通行，所以加 !it.w，即加 1）。
if((dis[it.nxt]==dis[now]+1&&path[it.nxt]>path[now]+!it.w)||dis[it.nxt]>dis[now]+1)
{
    更新...
}
```

---

#### 输出：

这题的输出也是有点麻烦。

我们先用  $ pre_{ v } = u $ 表示前驱，即路径中城市 v 的上一个是城市 u，

跑完 Dijkstra 后从 n 点递归标记选出的最短路：

```cpp
void Print(int x)
{
    vis[x]=1;
    if(pre[x])
        Print(pre[x]);
}
int main()
{
    ...
    memset(vis,0,sizeof(vis));
    Print(n);
    ...
}
```

然后对于所有边按题意模拟一遍输出即可。（具体见代码）

---

### Code：

**注：**

本代码中有关 **auto** 的用法最好用 C++17 提交，

不过其实这个在 C++14 就能用（只是会警告，我平时都用 C++14 交的），

但这题用 C++14 在 CF 上交会 CE。

```cpp
#include<bits/stdc++.h>
using namespace std;
struct Node{
    int nxt;bool w;
};
int n,m;
vector<Node>a[100001];//本人较懒，就用vector存边了

int dis[100001],vis[100001],path[100001],pre[100001];
typedef pair<int,int> Pii;
priority_queue<Pii,vector<Pii>,greater<Pii> >q;//小根堆

void Dijkstra(int s)//堆优化 Dijkstra
{
    memset(dis,0x3f,sizeof(dis));//初始化
    memset(path,0x3f,sizeof(path));//别忘记初始化 path 
    dis[s]=0;path[s]=0;q.emplace(0,s);
    while(!q.empty())
    {
        auto [w,now]=q.top();q.pop();
        if(vis[now])continue;
        vis[now]=1;
        for(auto it:a[now])//遍历与城市 now 相连的城市，用 auto 可以省很多码。
        {
            if((dis[it.nxt]==dis[now]+1&&path[it.nxt]>path[now]+!it.w)||dis[it.nxt]>dis[now]+1)
            {
                //更新
                dis[it.nxt]=dis[now]+1;
                path[it.nxt]=path[now]+!it.w;
                pre[it.nxt]=now;
                q.emplace(dis[it.nxt],it.nxt);
            }
        }
    }
}
void Print(int x)//递归标记选出的路径
{
    vis[x]=1;
    if(pre[x])
        Print(pre[x]);
}
int ans[100001][3],sum;//用来存答案
signed main()
{
	ios::sync_with_stdio(0);
    cin.tie(0),cout.tie(0);
    cin>>n>>m;
    for(int i=1,u,v,w;i<=m;i++)//无向图存边
        cin>>u>>v>>w,a[u].emplace_back((Node){v,w}),a[v].emplace_back((Node){u,w});
    Dijkstra(1);
    memset(vis,0,sizeof(vis));
    Print(n);
    for(int i=1;i<=n;i++)
    {
        for(auto it:a[i])
        {
            if((vis[i]&&vis[it.nxt]&&it.w==1)||(!(vis[i]&&vis[it.nxt])&&it.w==0))continue;//按题意模拟
            else if(i<it.nxt)//无向图防止重复输出
            {
                sum++;
                ans[++ans[0][0]][0]=i,ans[ans[0][0]][1]=it.nxt,ans[ans[0][0]][2]=!it.w;//记录答案，修复和炸毁和原先反一下，所以存 !it.w
            }
        }
    }
    cout<<sum<<'\n';//输出
    for(int i=1;i<=ans[0][0];i++)
        cout<<ans[i][0]<<' '<<ans[i][1]<<' '<<ans[i][2]<<'\n';
	return 0;
}

```
