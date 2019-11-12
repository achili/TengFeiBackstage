import Result from "../../view/backyard/summary/other/Result";
import Analysis from "../../view/backyard/summary/other/Analysis";
import summaryList from "../../view/backyard/summary/List";
import summaryCreate from "../../view/backyard/summary/Create";

import summaryAnalysisList from "../../view/backyard/summary/analysis/List";
import summaryAnalysisCreate from "../../view/backyard/summary/analysis/Create";

export default [
  {
    path: 'summary/result',
    component: Result
  },
  {
    path: 'summary/analysis',
    component: Analysis
  },
  {
    path: 'summary/list',
    component: summaryList,
    meta: {
      name: "汇总统计列表"
    }
  },
  {
    path: 'summary/create',
    component: summaryCreate,
    meta: {
      name: "创建汇总统计"
    }
  },
  {
    path: 'summary/edit',
    component: summaryCreate,
    meta: {
      name: "编辑汇总统计"
    }
  },
  {
    path: 'summary/analysis/list',
    component: summaryAnalysisList,
    meta: {
      name: "图表分析列表"
    }
  },
  {
    path: 'summary/analysis/create',
    component: summaryAnalysisCreate,
    meta: {
      name: "创建图表分析"
    }
  },
  {
    path: 'summary/analysis/edit',
    component: summaryAnalysisCreate,
    meta: {
      name: "编辑图表分析"
    }
  }
]
