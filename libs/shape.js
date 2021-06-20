
// 五角星
function createFivePointerStar(a){

    function cos(x){
        return Math.cos(x/180*Math.PI);
    }
    function sin(x){
        return Math.sin(x/180*Math.PI);
    }
    var v1 = [0,a,0] //上外
    var v2 = [-sin(72)*a,a*cos(72),0]
    var v3 = [-sin(72*2)*a,a*cos(72*2),0]
    var v4 = [-sin(72*3)*a,a*cos(72*3),0]
    var v5 = [-sin(72*4)*a,a*cos(72*4),0] 
    
    var k =-a*sin(18)/sin(126) //下内
    var v6 = [0,k,0]
    var v7 = [-sin(72)*k,k*cos(72),0]
    var v8 = [-sin(72*2)*k,k*cos(72*2),0]
    var v9 = [-sin(72*3)*k,k*cos(72*3),0]
    var v10 = [-sin(72*4)*k,k*cos(72*4),0]
    var v0 =[0,0,0]

    var red = [1,0,0,1]
    var blue = [0,0,1,1]
    var color= []
    for(var i = 0;i<15;i++){
        color = color.concat(red)
    }
    for(var i = 0;i<15;i++){
        color = color.concat(blue)
    }
    var normal  =[]
    for(var i = 0; i<30;i++){
        normal = normal.concat([0,0,1])
    }
    return{

        position:[
            ...v1,...v9,...v8,
            ...v2,...v10,...v9,
            ...v3,...v6,...v10,
            ...v4,...v7,...v6,
            ...v5,...v8,...v7,
            ...v0,...v8,...v9,
            ...v0,...v7,...v8,
            ...v0,...v6,...v7,
            ...v0,...v9,...v10,
            ...v0,...v10,...v6
        ],
        color:color,
        normal:normal
    }
}
//,立方体,
function createCube(edgelength){
    var fontColor = [1.0, 0.0, 0.0,0.8]
    var backColor = [1.0, 0.0, 0.0,0.8]
    var leftColor = [0.0, 1.0, 0.0,0.8]
    var rightColor = [0.0, 1.0, 0.0,0.8]
    var topColor = [0.0, 0.0, 1.0,0.8]
    var downColor = [0.0, 0.0, 1.0,0.8]
    var e = edgelength/2;
    var v0 = [e , e , e]
    var v1 = [-e, e, e]
    var v2 = [-e, -e, e]
    var v3 = [e, -e, e]
    var v4 = [e, -e, -e]
    var v5 = [e, e, -e]
    var v6 = [-e, e, -e]
    var v7 = [-e, -e, -e]

    var normalright = [1,0,0]
    var normalup = [0,1,0]
    var normalfront = [0,0,1]
    var normalleft = [-1,0,0]
    var normaldown = [0,-1,0]
    var normalback = [0,0,-1]
    return {
        position:[
            ...v0, ...v1, ...v2, ...v3, // 前 index 0-3
            ...v3, ...v4, ...v5, ...v0, // 右 index 4-7
            ...v5, ...v0, ...v1, ...v6, // 上 index 8-11
            ...v1, ...v6, ...v7, ...v2, // 左 index 12-15
            ...v7, ...v4, ...v3, ...v2, // 下 index 16-19
            ...v6, ...v5, ...v4, ...v7, // 后 index 20-23 
          
        ],
        indices:[
            0, 1, 2, 0, 2, 3, // 前
            4, 5, 6, 4, 6, 7, // 右
            8, 9, 10, 8, 10, 11, // 上
            12, 13, 14, 12, 14, 15, // 左
            16, 17, 18, 16, 18, 19, // 下
            20, 21, 22, 20, 22, 23 // 后
        ],
        color:[...fontColor, ...fontColor, ...fontColor, ...fontColor, // 前 index 0-3
            ...rightColor, ...rightColor, ...rightColor, ...rightColor, // 右 index 4-7
            ...topColor, ...topColor, ...topColor, ...topColor, // 上 index 8-11
            ...leftColor, ...leftColor, ...leftColor, ...leftColor, // 左 index 12-15
            ...downColor, ...downColor, ...downColor, ...downColor, // 下 index 16-19
            ...backColor, ...backColor, ...backColor, ...backColor,
        ],
        normal:[
          ...normalfront,...normalfront,...normalfront,...normalfront,
            ...normalback, ...normalback, ...normalback, ...normalback,
            ...normalup,...normalup,...normalup,...normalup,
            ...normalleft, ...normalleft, ...normalleft, ...normalleft,
            ...normaldown, ...normaldown, ...normaldown, ...normaldown,
            ...normalright,...normalright,...normalright,...normalright
        ],
        texcoord:[
            1,0,
            0,0,
            0,1,
            1,1,

            0,1,
            1,1,
            1,0,
            0,0,
            
            1,0,
            0,0,
            0,1,
            1,1,  
            
            1,0,
            0,0,
            0,1,
            1,1,  
            
            1,0,
            0,0,
            0,1,
            1,1,  
            
            1,0,
            0,0,
            0,1,
            1,1,
            
        ]
        }
}
//球体数据绘制
function createSphere(radius,depth){
    var positions = []
    var color = []
    var normal = []
    function normalize(vertex){
   
        sum = Math.sqrt(vertex[0]*vertex[0]+vertex[1]*vertex[1]+vertex[2]*vertex[2])
        vertex[0]= vertex[0]/sum *radius;
        vertex[1] = vertex[1]/sum*radius;
        vertex[2] = vertex[2]/sum*radius;
        
    }
    
    function divide_trangle(a,b,c,depth){
        if(depth > 0){
            var ab = []
            var bc = []
            var ac = []
            for (var i=0;i<3;i++){
                ab.push(a[i]+b[i])
                bc.push(b[i]+c[i])
                ac.push(a[i]+c[i])
            }
            normalize(ab);
            normalize(bc);
            normalize(ac);
            divide_trangle(a,ac,ab,depth-1);
            divide_trangle(ac,bc,ab,depth-1);
            divide_trangle(ab,b,bc,depth-1);
            divide_trangle(ac,bc,c,depth-1);
    
        }else{
         
            for(var i = 0;i<3;i++){
                positions.push(a[i])
                normal.push(a[i])
            }
            for(var i =0 ;i<3;i++){
                color.push(Math.random(0,1))
            }
           
            color.push(1)
            for(var i =0;i<3;i++){
                positions.push(b[i])
                normal.push(b[i])
            }
            for(var i =0 ;i<3;i++){
                color.push(Math.random(0,1))
            }
          
            color.push(1)
            for(var i = 0;i<3;i++){
                positions.push(c[i])
                normal.push(c[i])
            }
            for(var i =0 ;i<3;i++){
                color.push(Math.random(0,1))
            }
           
            color.push(1)
          
        }
    }

    var A = [ 0.0,		 0.0,		 1.0]
    var B = [ 0.0,		 0.942809, -0.333333]
    var C = [-0.816497, -0.471405, -0.333333]
    var D = [ 0.816497, -0.471405, -0.333333]
    normalize(A)
    normalize(B)
    normalize(C)
    normalize(D)

    divide_trangle(A,B,C,depth)
    divide_trangle(A,B,D,depth);
    divide_trangle(B,C,D,depth);
    divide_trangle(A,C,D,depth)
  
    return {
        position:positions,
        color:color,
        normal:positions
    }
}


// 创建场景
function createPlane(edge,depth){
    
    v1 = [edge,-depth,edge]
    v2 = [edge,-depth,-edge]
    v3 = [-edge,-depth,edge]
    v4 = [-edge,-depth,-edge]
    return{
        position:[
            ...v1,...v2,...v3,
            ...v2,...v3,...v4
        ],
        color:[
           0.4,0.9,0.3,1,
           0.4,0.9,0.3,1,
           0.4,0.9,0.3,1,
           0.4,0.9,0.3,1,
           0.4,0.9,0.3,1,
           0.4,0.9,0.3,1,
        ],
        normal:[
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,

        ]
    }

}