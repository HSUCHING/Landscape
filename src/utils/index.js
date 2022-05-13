const utils = {
    
}

String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    var template = this.replace(/{{(\w+)}}/g,'${$1}').replace('生态报告模板','产品厂商报告_' + new Date().getTime())
    return new Function(...names, `return \`${template}\`;`)(...vals);
}
export default utils