---
title: "UVA12412 A Typical Homework (a.k.a 师兄帮帮忙)题解"
date: 2022-03-11
category: 算法竞赛
tags: 
  -  算法竞赛
  -  题解
draft: false
description: ""
---
## [题目翻译](https://www.luogu.com.cn/paste/ozjja1yt)

*注：翻译中样例仍存在一些换行符的问题，具体下文注意点会有。*

---

## 解：

模拟题没什么好说的，就纯模拟呗。

#### 写大模拟的建议：

* 动手前先理清思路，细节想清楚。
* 代码写干净一些，便于调试。
* 有好用的视网膜和强大的耐心。


## 注意点：

个人认为此题的模拟部分不难，但 WA 的原因都在很多细小的注意点上。（关键有些注意点题目里也没给出。。。）

建议大家过了样例后，去和 uDebug 上的一组 [**大数据**](https://www.udebug.com/UVa/12412) 对一下，

正常情况下，这组数据过了，交上去基本上就过了。（但也有特例，比如我。。。）

#### 错误大全：

首先这两篇讨论涵盖了几乎大部分注意点：

* [**讨论一**](https://www.luogu.com.cn/discuss/383994)

* [**讨论二**](https://www.luogu.com.cn/discuss/380711)

然后是我的补充：

* $-nan$ 的情况

在讨论二中楼主说到 $-nan$ 的情况，最好判一下，因为我发现我的代码如果不判的话会 WA。

**判断方法：** 首先要知道 $-nan$ 的情况是在操作 $5$ 统计人数，当人数为 $0$ 时，计算平均数  `(double)(num)/(double)(0) ` 时的结果，所以只要特判一下就好了。


* 记得赋初值

还有如果有人在写操作 $5$ 时，像我一样开一个结构体存统计结果，**记得一定要给里面的变量都赋初值！**（这就是为什么我 uDebug 上的数据过了，却 WA 的原因，我就漏赋了一个值。。。）




## Code：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define Debug(i) cout<<i<<'\n'//找 Bug用的
struct Student{//学生信息
    string SID,CID,Name;
    int Chinese,Math,English,Program;
    int Tot,Rank,ID;
    bool operator<(const Student &n)const{
        return Tot>n.Tot;
    }
}Message[201];
struct Statistics{//统计信息，注意赋初值
    int Student_Tot=0;//我最后就是这个变量没赋初值，就 WA了
    double Chinese_Ave=0.0,Math_Ave=0.0,English_Ave=0.0,Program_Ave=0.0;
    int Chinese_Tot=0,Math_Tot=0,English_Tot=0,Program_Tot=0;
    int Chinese_Passed_Student=0,Chinese_Failed_Student=0;
    int Math_Passed_Student=0,Math_Failed_Student=0;
    int English_Passed_Student=0,English_Failed_Student=0;
    int Program_Passed_Student=0,Program_Failed_Student=0;
    int Passed_1_more_Subjects=0;
    int Passed_2_more_Subjects=0;
    int Passed_3_more_Subjects=0;
    int Passed_All_Subjects=0;
    int Failed_All_Subjects=0;
};
int opt,top,Top;
//top记录当前系统中学生人数
//Top记录按输入顺序第几个加入的学生，为了操作 3输出多个人信息时，按输入顺序排序
double eps=1e-5;//避免精度误差

//Output每个操作的输出

void Welcome(){printf("Welcome to Student Performance Management System (SPMS).\n\n1 - Add\n2 - Remove\n3 - Query\n4 - Show ranking\n5 - Show Statistics\n0 - Exit\n\n");}
//Add
void AddQ(){printf("Please enter the SID, CID, name and four scores. Enter 0 to finish.\n");}
void Duplicated(){printf("Duplicated SID.\n");}
//Remove
void RemoveQ(){printf("Please enter SID or name. Enter 0 to finish.\n");}
void Remove_Student(int x){printf("%d student(s) removed.\n",x);}
//Query
void QueryQ(){printf("Please enter SID or name. Enter 0 to finish.\n");}
void Query_Student(int i){printf("%d %s %s %s %d %d %d %d %d %.2lf\n",Message[i].Rank,Message[i].SID.data(),Message[i].CID.data(),Message[i].Name.data(),Message[i].Chinese,Message[i].Math,Message[i].English,Message[i].Program,Message[i].Tot,double(Message[i].Tot/4.0+eps));}
//Show_Ranking
void Show_RankingQ(){printf("Showing the ranklist hurts students' self-esteem. Don't do that.\n");}
//Show_Statistics
void Show_StatisticsQ(){printf("Please enter class ID, 0 for the whole statistics.\n");}
void Show_Statistics_Class(Statistics Sum,bool flag)
{
    if(flag)
    {
        printf("Chinese\nAverage Score: %.2lf\nNumber of passed students: %d\nNumber of failed students: %d\n\n",Sum.Chinese_Ave,Sum.Chinese_Passed_Student,Sum.Chinese_Failed_Student);
        printf("Mathematics\nAverage Score: %.2lf\nNumber of passed students: %d\nNumber of failed students: %d\n\n",Sum.Math_Ave,Sum.Math_Passed_Student,Sum.Math_Failed_Student);
        printf("English\nAverage Score: %.2lf\nNumber of passed students: %d\nNumber of failed students: %d\n\n",Sum.English_Ave,Sum.English_Passed_Student,Sum.English_Failed_Student);
        printf("Programming\nAverage Score: %.2lf\nNumber of passed students: %d\nNumber of failed students: %d\n\n",Sum.Program_Ave,Sum.Program_Passed_Student,Sum.Program_Failed_Student);
        printf("Overall:\nNumber of students who passed all subjects: %d\nNumber of students who passed 3 or more subjects: %d\nNumber of students who passed 2 or more subjects: %d\nNumber of students who passed 1 or more subjects: %d\nNumber of students who failed all subjects: %d\n\n",Sum.Passed_All_Subjects,Sum.Passed_3_more_Subjects,Sum.Passed_2_more_Subjects,Sum.Passed_1_more_Subjects,Sum.Failed_All_Subjects);
    }
    else//特判 -nan
    {
        printf("Chinese\nAverage Score: -nan\nNumber of passed students: %d\nNumber of failed students: %d\n\n",Sum.Chinese_Passed_Student,Sum.Chinese_Failed_Student);
        printf("Mathematics\nAverage Score: -nan\nNumber of passed students: %d\nNumber of failed students: %d\n\n",Sum.Math_Passed_Student,Sum.Math_Failed_Student);
        printf("English\nAverage Score: -nan\nNumber of passed students: %d\nNumber of failed students: %d\n\n",Sum.English_Passed_Student,Sum.English_Failed_Student);
        printf("Programming\nAverage Score: -nan\nNumber of passed students: %d\nNumber of failed students: %d\n\n",Sum.Program_Passed_Student,Sum.Program_Failed_Student);
        printf("Overall:\nNumber of students who passed all subjects: %d\nNumber of students who passed 3 or more subjects: %d\nNumber of students who passed 2 or more subjects: %d\nNumber of students who passed 1 or more subjects: %d\nNumber of students who failed all subjects: %d\n\n",Sum.Passed_All_Subjects,Sum.Passed_3_more_Subjects,Sum.Passed_2_more_Subjects,Sum.Passed_1_more_Subjects,Sum.Failed_All_Subjects);
    }
}

void Add()
{
    string SID,CID,Name;
    int Chinese,Math,English,Program;
    int Tot;
    while(true)
    {
        AddQ();
        cin>>SID;
        if(SID=="0")break;
        cin>>CID>>Name;
        scanf("%d %d %d %d",&Chinese,&Math,&English,&Program);
        for(int i=1;i<=top;i++)
            if(Message[i].SID==SID){Duplicated();goto Nxt;}//学生SID重复
        Tot=Chinese+Math+English+Program;
        Top++;
        Message[++top]=(Student){SID,CID,Name,Chinese,Math,English,Program,Tot,0,Top};//加入
        Nxt:;
    }
}

void Remove()
{
    string str;
    while(true)
    {
        RemoveQ();
        int sum=0;
        cin>>str;
        if(str=="0")break;
        for(int i=1;i<=top;i++)
            if(Message[i].SID==str||Message[i].Name==str)
            {
                top--;
                for(int j=i;j<=top;j++)
                    Message[j]=Message[j+1];
                i--,sum++;
            }
        Remove_Student(sum);
    }
}

void Rank()//更改排名
{
    for(int i=1,Rank=1;i<=top;i++)
    {
        Message[i].Rank=Rank;
        if(Message[i].Tot!=Message[i+1].Tot)Rank=i+1;
    }
}
bool cmp(const int &x,const int &y)//按输入顺序排序
{
    return Message[x].ID<Message[y].ID;
}
void Query()
{
    sort(Message+1,Message+top+1);//先按成绩排序
    Rank();
    string str;
    int a[101],sum;
    while(true)
    {
        memset(a,0,sizeof(a));
        sum=0;
        QueryQ();
        cin>>str;
        if(str=="0")break;
        for(int i=1;i<=top;i++)
            if(Message[i].SID==str||Message[i].Name==str)      
                a[++sum]=i;
        sort(a+1,a+sum+1,cmp);//对所有符合的学生按输入顺序排序
        for(int i=1;i<=sum;i++)   
            Query_Student(a[i]);
    }
}

void Show_Ranking()
{
    Show_RankingQ();
}

void Show_Statistics()
{
    Show_StatisticsQ();
    string str;
    cin>>str;
    bool isAll=false;
    if(str=="0") isAll=true;
    Statistics Sum;
    for(int i=1;i<=top;i++)//统计
    {
        if(isAll||Message[i].CID==str)
        {
            int Pass_Sum=0;
            Sum.Student_Tot++;

            //统计四科分数和，用于求平均数
            Sum.Chinese_Tot+=Message[i].Chinese;
            Sum.Math_Tot+=Message[i].Math;
            Sum.English_Tot+=Message[i].English;
            Sum.Program_Tot+=Message[i].Program;

            //四科及格人数统计
            if(Message[i].Chinese>=60) Sum.Chinese_Passed_Student++,Pass_Sum++;
            else Sum.Chinese_Failed_Student++;

            if(Message[i].Math>=60) Sum.Math_Passed_Student++,Pass_Sum++;
            else Sum.Math_Failed_Student++;

            if(Message[i].English>=60) Sum.English_Passed_Student++,Pass_Sum++;
            else Sum.English_Failed_Student++;

            if(Message[i].Program>=60) Sum.Program_Passed_Student++,Pass_Sum++;
            else Sum.Program_Failed_Student++;

            switch(Pass_Sum)//统计总体情况
            {
                case 1:
                    Sum.Passed_1_more_Subjects++;
                    break;
                case 2:
                    Sum.Passed_1_more_Subjects++,Sum.Passed_2_more_Subjects++;
                    break;
                case 3:
                    Sum.Passed_1_more_Subjects++,Sum.Passed_2_more_Subjects++,Sum.Passed_3_more_Subjects++;
                    break;
                case 4:
                    Sum.Passed_1_more_Subjects++,Sum.Passed_2_more_Subjects++,Sum.Passed_3_more_Subjects++,Sum.Passed_All_Subjects++;
                    break;
                default:
                    Sum.Failed_All_Subjects++;
            }
        }
    }
    if(Sum.Student_Tot>0)//特判学生人数是否为 0
    {
        Sum.Chinese_Ave=double(1.0*Sum.Chinese_Tot/double(1.0*Sum.Student_Tot)+eps);
        Sum.Math_Ave=double(1.0*Sum.Math_Tot/double(1.0*Sum.Student_Tot)+eps);
        Sum.English_Ave=double(1.0*Sum.English_Tot/double(1.0*Sum.Student_Tot)+eps);
        Sum.Program_Ave=double(1.0*Sum.Program_Tot/double(1.0*Sum.Student_Tot)+eps);
            Show_Statistics_Class(Sum,1);
    }
    else
        Show_Statistics_Class(Sum,0);
}

signed main()//主函数
{
    while(true)
    {
        Welcome();
        scanf("%d",&opt);
        switch(opt)
        {
            case 1:Add();break;
            case 2:Remove();break;
            case 3:Query();break;
            case 4:Show_Ranking();break;
            case 5:Show_Statistics();break;
            default:exit(0);//opt是 0就结束
        }
    }
    return 0;
}
```

#### 注：
