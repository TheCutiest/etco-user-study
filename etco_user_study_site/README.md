# ETCO User Study Website

这是一个纯静态网页，不需要后端，直接浏览器打开即可。

## 研究流程

Welcome/Consent → **Part 1 稳定性评估**（单视频独立打分）→ 过渡页 → **Part 2 两两比较**（原有 pairwise 研究）→ 完成/下载 CSV。

## 使用方法

1. 把你的视频/图片放到 `assets/` 文件夹。
2. 在 `study_data.js` 中添加你的样本：
   - **Part 1（稳定性评估）样本 → 编辑 `STABILITY_ITEMS` 数组**（文件顶部）。
     每个 prompt 通常拆成两条独立记录（Baseline 一条、ETCO 一条），
     它们会被当作两个独立 trial 随机打乱、单独展示，不会成对出现。
     字段：`id`、`caseId`（同一 prompt 的两条记录用同一个 caseId）、`prompt`、
     `mediaType`（"image" 或 "video"）、`media`（文件路径）、`method`（仅供内部记录，不会展示给参与者）。
   - **Part 2（两两比较）样本 → 编辑 `STUDY_ITEMS` 数组**（文件底部，与之前一致）。
     字段：`id`、`prompt`、`mediaType`、`A`、`B`、`methodA`、`methodB`。
     A/B 具体哪个在左边、哪个在右边，会在每位参与者开始 Part 2 时**随机分配一次**
     （见 `app.js` 的 `startPart2()` / `getPart2Display()`），并在该参与者的整个
     Part 2 过程中保持稳定，参与者不会看到方法名。
3. 双击 `index.html` 即可本地运行。
4. 参与者完成后点击“下载 CSV”，Part 1 和 Part 2 的结果会导出到同一个 CSV 文件中
   （用 `part` 列区分 `stability` / `pairwise`）。

## Part 1 — 稳定性评估（独立评分）

- 维度：Prompt Alignment / Visual Quality / Geometry Consistency / Overall Quality
- 每个维度使用 1–5 绝对评分：1 很差 · 2 较差 · 3 一般 · 4 良好 · 5 优秀
- 每个视频单独展示，不显示是 Baseline 还是 ETCO
- Trial 顺序在参与者开始时随机打乱一次

## Part 2 — 两两比较（原有研究，保留不变）

- 维度：Prompt Alignment / Visual Quality / Geometry Consistency / Overall Preference
- 五档 pairwise preference：明显偏好 A / 偏好 A / 差不多 / 偏好 B / 明显偏好 B
- A/B 的呈现顺序已随机化（见上），不再固定 A = Baseline

## CSV 导出字段

| 列 | Part 1 | Part 2 |
|---|---|---|
| participant_id | ✓ | ✓ |
| part | `stability` | `pairwise` |
| item_id | ✓ | ✓ |
| case_id | ✓ | — |
| prompt | ✓ | ✓ |
| method | ✓（内部标签，不展示给参与者） | — |
| method_A / method_B | — | ✓（实际展示为 A/B 的方法，内部标签） |
| presentation_order | trial 在 Part 1 中的序号 | `swapped` / `unswapped` |
| prompt_alignment / visual_quality / geometry_consistency | ✓ | ✓ |
| overall_quality | ✓ | — |
| overall_preference | — | ✓ |
| timestamp | ✓ | ✓ |
