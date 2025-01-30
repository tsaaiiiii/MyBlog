# GitHub Actions

## 將 ts 的檢查自動化

```
name: checker

on:
  pull_request:
    types:
      - opened  # 創建一個新的 PR
      - reopened  # 舊的 PR 重新被打開
      - synchronize  # 已存在的 PR，被重新發一個 commit

    # 觸發條件：PR 合併到 master，且變更了指定目錄
    branches:
      - master
    paths:
      - 'apps/test/**'
      - 'packages/toolkit/**'
      - 'packages/env/**'
      - 'packages/components/common/**'

jobs:
  typescript:
    runs-on: ubuntu-latest
    env:
      NODE_OPTIONS: '--max_old_space_size=7168' # 提高 Node.js 記憶體上限
    steps:
      # 使用 GitHub 官方的 actions/checkout
      - uses: actions/checkout@v4
        with:
          fetch-depth: 1

      # 安裝 pnpm 指定版本 8.6.12
      - uses: pnpm/action-setup@v4
        with:
          version: 8.6.12
          run_install: false

      # 設置 Node.js
      - uses: actions/setup-node@v4
        with:
          node-version: 20.14.0
          cache: 'pnpm'

      # 執行以下安裝
      - run: |
          pnpm i
          pnpm i -F test
          pnpm i -F toolkit
          pnpm i -F env
          pnpm i -F component

          # 進入 test
          cd apps/test

          # 運行 vue-tsc（TypeScript 編譯器）進行型別檢查
          # --noEmit：只檢查類型，不輸出任何文件
          ${{ github.workspace }}/node_modules/.bin/vue-tsc --noEmit
```

## 執行部署自動化

```
# GitHub Actions: Deployment Workflow

# 觸發條件
on:
  pull_request:
    types:
      - closed  # 當 Pull Request 被關閉時觸發
    branches:
      - master  # 只在 master 分支發生變更時觸發
    paths:
      - 'apps/test/**'  # 影響 test 相關檔案的變更
      - 'packages/toolkit/**'  # 影響 toolkit 套件的變更
      - 'packages/components/common/**'  # 影響 common components 的變更

# 設定全域環境變數
env:
  NODE_OPTIONS: "--max_old_space_size=7168"  # 設定 Node.js 記憶體上限

# 部署至 Staging 環境
jobs:
  staging:
    if: ${{ github.event.pull_request.merged == true && contains(github.event.pull_request.labels.*.name, 'deployment:staging') }}
    runs-on: ubuntu-latest  # 指定執行環境
    steps:
      - name: Deployment Started
        uses: slackapi/slack-github-action@v1.26.0
        env:
          SLACK_WEBHOOK_URL: ${{ vars.SLACK_WEBHOOK_URL }}
        with:
          payload: |
            {
              "text": "執行中"
            }

      - name: Checkout Code  # 取得程式碼
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Set Up Cache  # 設定快取，避免重複編譯
        uses: actions/cache@v4
        id: build-cache
        with:
          path: apps/test/dist
          key: test-staging-${{ github.sha }}

    # steps.build-cache.outputs.cache-hit 是判斷 當前 commit (github.sha) 是否已經有對應的快取。
      - name: Set up pnpm
        if: ${{ steps.build-cache.outputs.cache-hit != 'true' }}
        uses: pnpm/action-setup@v4
        with:
          version: 8.6.12
          run_install: false

      - name: Set up node.js
        if: ${{ steps.build-cache.outputs.cache-hit != 'true' }}
        uses: actions/setup-node@v4
        with:
          node-version: 20.14.0
          cache: 'pnpm'

      - name: Install Dependencies and Build
        if: ${{ steps.build-cache.outputs.cache-hit != 'true' }}
        run: |
          pnpm i  # 安裝專案相依套件
          pnpm i -F test
          pnpm i -F toolkit
          pnpm i -F components
          cd apps/test
          ${{ github.workspace }}/node_modules/.bin/vite build --mode staging

      - name: Sync to S3  # 上傳至 AWS S3
        uses: hannut91/aws-cli@1.33.0
        with:
          args: s3 sync apps/test/dist s3://demo-test.com --acl public-read --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.S3_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.S3_SECRET_KEY }}
          AWS_DEFAULT_REGION: us-east-1

      - name: Invalidate CloudFront Cache  # 清除快取
        uses: hannut91/aws-cli@1.33.0
        with:
          args: cloudfront create-invalidation --distribution-id ${{ vars.AWS_ID }} --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.S3_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.S3_SECRET_KEY }}
          AWS_DEFAULT_REGION: us-east-1

      - name: Deployment Failed  # 部署失敗通知
        if: ${{ failure() }}
        uses: slackapi/slack-github-action@v1.26.0
        env:
          SLACK_WEBHOOK_URL: ${{ vars.SLACK_WEBHOOK_URL }}
        with:
          payload: |
            {
              "text": "執行失敗"
            }

      - name: Deployment Completed  # 部署成功通知
        uses: slackapi/slack-github-action@v1.26.0
        env:
          SLACK_WEBHOOK_URL: ${{ vars.SLACK_WEBHOOK_URL }}
        with:
          payload: |
            {
              "text": "執行完成"
            }
```
