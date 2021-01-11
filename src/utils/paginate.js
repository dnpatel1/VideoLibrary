import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    console.log(_(items).slice(startIndex).take(pageSize).value());
    console.log(items.slice(startIndex, pageSize));
    return _(items).slice(startIndex).take(pageSize).value();
}