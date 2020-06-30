
export const movieSources = ["任意", "豆瓣", "猫眼", "时光网"];

export const movieCountries = ["任意", "中国大陆", "香港", "台湾", "美国", "英国", "韩国", "日本", "其他"];

export const movieSourcesE2C = {
  douban: "豆瓣",
  maoyan: "猫眼",
  mtime: "时光网",
};

export const movieSourcesC2E = {
    '任意': '',
    '豆瓣': 'douban',
    '猫眼': 'maoyan',
    '时光网': 'mtime'
}

export const movieCountryC2E = {
    '任意': '',
    '中国大陆': '中国大陆',
    '香港': '香港',
    '台湾': '台湾',
    '美国': '美国',
    '英国': '英国',
    '韩国': '韩国',
    '日本': '日本',
    '其他': ''
}

export const personalizeTags = [
  'country', 'types', 'stars', 'movies'
]

export const personalizeTagsE2C = [
  '国家/地区', '类型', '明星', '影片'
]

export const defaultPersonalizeQues = [
  {
    title: '个性化推荐',
    content: '接下来将会向您询问一些问题，并生成您的个性化推荐。请根据您的喜好进行选择，完成后点击“下一项”即可。'
  }, {}, {}, {}, {}
]