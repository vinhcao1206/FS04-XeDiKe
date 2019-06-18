const _ = require("lodash")
// _ là lodash đó

// isEmpty
//check xem object/array có phần tử nào không
const obj = {};


console.log("Check bình thường:", Object.keys(obj).length === 0)
console.log("Check empty với Lodash:",_.isEmpty(obj))


//_.get
let obj2 = {}
//= ==== obj2 = result
// can lay obj2.content.attributes.id
const id = obj2.content && obj2.content.attributes && obj2.content.attributes.id
console.log("Lấy id bình thường:", id)
console.log("Lấy id với Lodash: ", _.get(obj2, "content.attributes.id"))

//_.set - cho obj không tồn tại id
_.set(obj2,"content.attributes.id", "2")
console.log("TCL: ", obj2)
