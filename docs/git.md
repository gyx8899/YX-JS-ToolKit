# Git 命令集

- 克隆项目基本操作
```shell script
git clone https://github.com/gyx8899/YX-JS-ToolKit.git
cd YX-JS-ToolKit
# 查看本地仓库内容状态
git status
# 查看本地仓库提交记录
git log
# 添加改动文件到 Stage
git add A.txt
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

