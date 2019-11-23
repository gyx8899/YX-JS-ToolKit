# Git 命令集

- 克隆项目基本操作
```shell script
git clone https://github.com/gyx8899/YX-JS-ToolKit.git
cd YX-JS-ToolKit

# 查看本地仓库内容状态
git status

# 查看本地仓库提交记录
git log
  # 查看详细历史 -p  -patch
  git log -p
  # 查看简要统计
  git log --stat

# 查看当前 commit
git show
  # 查看任意一个 commit: branch 或 HEAD 标记 或 SHA-1 码
  git show 5e68b0d8
  # 查看指定 commit 中的指定文件
  git show 5e68b0d8 shopping\ list.txt

# 添加改动文件到 Stage
git add A.txt
git stage A.txt
# 添加所有改动文件到 Stage
git add .

# 提交改动到本地仓库
git commit
# 0. 进入 Comment 添加模式
# 1. 点击键盘键 i 
# 2. 输入改动 Comment 注解
# 3. 点击键盘键 Esc
# 4. 鼠标点击 cmd 区域，将焦点重新聚焦 cmd
# 5. Shift + Z, Shift + Z, 两次退出 Comment 编辑模式

# 推送本地仓库改动到中央仓库
git push
# 只需要再输入一次密码， Git 就会把你的密码保存下来，之后不用输入了
git config credential.helper store

# 推送本地仓库改动到远程 origin 仓库的 feature1 分支
git push origin feature1

# 从中央仓库拉取最新文件到本地仓库
git pull

# 对比工作目录和暂存区
git diff
# 对比工作目录和上一条提交
git diff HEAD
# 对比暂存区和上一条提交
git diff --staged


```

- 分支操作
```shell script
## 创建分支
git branch_name
# 切换分支
git checkout branch_name
# 创建并切到分支
git checkout -b branch_name
# 删除分支
git branch -d branch_name

## 合并分支
git merge feature1
  # 1. 冲突时，解决冲突文件
  git add conflict_file.txt
  git commit
  # 2. 冲突时，放弃合并
  git merge --abort 

# 先把 branch 的基准更新到 master 的最新，再把 branch 上的提交记录，再在最新位置上重新提交
git checkout branch1
git rebase master
# 再把 branch1 合并到 master
git checkout master
git merge branch1

```

- Feature branching 工作流 - 方式1-靠吼
```shell script
## User A
git checkout -b feature2
git add .
git commit
git push origin feature2

## User B 查看后说通过
git pull
git checkout feature2

## User A
git checkout master
git pull
git merge feature2
git push
git branch -d feature2
# 上面两行等价下面一行
git push origin -d feature2

```
- Feature branching 工作流 - 方式2-Pull Request

- 修正
```shell script
# 用这一次新的commit, 合并上一次 commit。进而达到修复上一次 commit 的 comment 内容
git add .
git commit --ammend

# rebase --interactive 的缩写，交互式 rebase，
git rebase -i HEAD^^
git rebase -i HEAD~5
# 继续 rebase, 把后面的 commit 应用上去。
git rebase --continue
```
> 说明：在 Git 中，有两个「偏移符号」： ^ 和 ~。
>
> ^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^ 表示 master 指向的 commit 之前的那个 commit； HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。
>
> ~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：HEAD~5 表示 HEAD 指向的 commit往前数 5 个 commit。

> Rebase 816f737..b13037a onto 816f737 (1 command)
> 
> Commands:
> p, pick = use commit
> r, reword = use commit, but edit the commit message
> e, edit = use commit, but stop for amending
> s, squash = use commit, but meld into previous commit
> f, fixup = like "squash", but discard this commit's log message
> x, exec = run command (the rest of the line) using shell
> d, drop = remove commit
>
> These lines can be re-ordered; they are executed from top to bottom.
>
> If you remove a line here THAT COMMIT WILL BE LOST.
>
> However, if you remove everything, the rebase will be aborted.
>
> Note that empty commits are commented out

- 撤销commit
```shell script
# 移除上一次提交
git reset --hard HEAD^
# 移除前某一次提交, 把编辑区域中想删掉的那一次 commit comment 删掉即可。
git rebase -i HEAD^^
git rebase -i HEAD~5
# 以倒数第二个 commit 为起点（起点不包含在 rebase 序列里哟），branch1 为终点，rebase 到倒数第三个 commit 上。
git rebase --onto HEAD^^ HEAD^ branch1
```

- 撤销已在中央仓库的 branch 的 commit
```shell script
# 先在本地仓库 branch 使用上面的 撤销 commit, 再强制提交到 branch。--force, 忽略冲突强制 push
git push origin branch1 -f
```

- 撤销已在中央仓库的 master 的 commit, 只是新增一条 revert commit
```shell script
# 撤销 commit
git revert HEAD^
```
> 如果出错内容在私有 branch：在本地把内容修正后，强制 push (push -f）一次就可以解决；
> 
> 如果出错内容在 master：不要强制 push，而要用 revert 把写错的 commit 撤销。

- 重置回退
```shell script
# 重置回退并保留工作目录的内容，并清空暂存区。
git reset HEAD^
# 重置回退并清空工作目录的所有改动
git reset --hard HEAD^
# 重置回退并保留工作目录和暂存区的内容，并把重置 HEAD 的位置所导致的新的文件差异放进暂存区
git reset --soft HEAD^
```
> --hard：重置位置的同时，清空工作目录的所有改动；
>
> --soft：重置位置的同时，保留工作目录和暂存区的内容，并把重置 HEAD 的位置所导致的新的文件差异放进暂存区。
>
> --mixed（默认）：重置位置的同时，保留工作目录的内容，并清空暂存区。

- Checkout
```shell script
git checkout HEAD^^
git checkout master~5
git checkout 78a4bc
git checkout 78a4bc^
# 用来只让 HEAD 和 branch 脱离而不移动 HEAD 的用法
git checkout --detach
```

- Stash: 临时存放工作目录的改动
```shell script
git stash
# 没有被 track 的文件（即从来没有被 add 过的文件不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 `-u` 参数，它是 `--include-untracked` 的简写。
git stash -u
git stash pop
```

- 重建已删除的 branch1
```shell script
# 从 log 中查找已删除 branch1 的 SHA-1
git reflog
git checkout c08de9a
git checkout -b branch1

# 查看某个 branch 上的移动历史
git reflog master
```

- tag
```shell script
git tag 
```

- cherry-pick
```shell script
git cherry-pick [--edit] [-n] [-m parent-number] [-s] [-x] [--ff] [-S[<keyid>]] <commit>…​
git cherry-pick (--continue | --skip | --abort | --quit)
```