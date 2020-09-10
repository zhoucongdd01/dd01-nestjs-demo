import moment from 'moment';

// 获取url参数
export const getUrlQuerys = (url) => {
  const a = url.split('?');
  const query = {};
  if (a[1]) {
    const b = a[1].split('&');
    if (b.length) {
        for (let i = 0; i < b.length; i++) {
            const c = b[i].split('=');
            query[c[0]] = c[1];
        }
    }
  }
  return query;
}

// 获取文章发布时间
export const getCreateTime = (time) => {
    let value = {};
    const t1 = moment(new Date());
    const t2 = moment(time)
    const minute = Math.abs(t1.diff(t2, 'minute'));
    const hours = Math.abs(t1.diff(t2, 'hours'));
    const day = Math.abs(t1.diff(t2, 'day'));
    const months = Math.abs(t1.diff(t2, 'months'));
    const years = Math.abs(t1.diff(t2, 'years'));
    const arr = [minute, hours, day, months, years];
    const arrName = ['分钟前', '小时前', '天前', '个月前', '年前'];
    for (let i = arr.length - 1; i >= 0 ; i -- ){
        if (arr[i] !== 0) {
            value['text'] = arrName[i];
            value['time'] = arr[i];
            break;
        }
    }
    return value;
}