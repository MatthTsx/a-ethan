const Hex_arry = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']

export function rand_Hex(){
    let str = "#"
    for(let i = 0; i < 6; i++) str += Hex_arry[Math.floor(Math.random() * Hex_arry.length)]
    return str;
}

export function rand_RGB(){
    let str = ""
    for(let i = 0; i < 3; i++) str += Math.floor(Math.random() * 256) + (i != 2 ? ", " : "")
    return str
}