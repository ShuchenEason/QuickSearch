import { COVER_HOST } from "./index";

export const DEFAULT_COVER = {
  src: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/covers/dynamic/cover-12/index.html',
  type: 'iframe',
};

const sceneryList = Array.from(Array(12), (v, k) => {
  let num = k + 1;
  return {
    name: `风景 ${num}`,
    preview: `/scenery/preview/cover_${num}.jpg`,
    src: `/scenery/cover_${num}.jpg`,
    type: 'image',
  }
})

const starList = Array.from(Array(12), (v, k) => {
  let num = k + 1;
  return {
    name: `星空 ${num}`,
    preview: `/star/preview/cover_${num}.jpg`,
    src: `/star/cover_${num}.jpg`,
    type: 'image',
  }
})

const poolList = Array.from(Array(12), (v, k) => {
  let num = k + 1;
  return {
    name: `淡雅 ${num}`,
    preview: `/pool/preview/cover_${num}.jpg`,
    src: `/pool/cover_${num}.jpg`,
    type: 'image',
  }
})

const comicList = Array.from(Array(12), (v, k) => {
  let num = k + 1;
  return {
    name: `动漫 ${num}`,
    preview: `/comic/preview/cover_${num}.jpg`,
    src: `/comic/cover_${num}.jpg`,
    type: 'image',
  }
})

const dataList = [
  {
    name: "动态",
    key: "dynamic",
    list: [
      {
        name: '满天繁星',
        preview: '/dynamic/stars/preview.png',
        src: '/dynamic/stars/index.html',
        type: 'iframe',
      },
      {
        name: '樱花少女',
        preview: "/dynamic/cover-01/preview.jpg",
        src: '/dynamic/cover-01/index.html',
        type: 'iframe',
      },
      {
        name: '点线联结',
        preview: "/dynamic/cover-02/preview.jpg",
        src: '/dynamic/cover-02/index.html',
        type: 'iframe',
      },
      {
        name: '雪之仙境',
        preview: "/dynamic/cover-12/preview.jpg",
        src: '/dynamic/cover-12/index.html',
        type: 'iframe',
      },
    ]
  },
  {
    name: "风景",
    key: "scenery",
    list: sceneryList,
  },
  {
    name: "淡雅",
    key: "pool",
    list: poolList,
  },
  {
    name: "星空",
    key: "star",
    list: starList,
  },
  {
    name: "动漫",
    key: "comic",
    list: comicList,
  },
]

dataList.forEach(obj => {
  obj.list.forEach(cover => {
    cover.preview = COVER_HOST + cover.preview;
    cover.src = COVER_HOST + cover.src;
  })
})

export default dataList;
