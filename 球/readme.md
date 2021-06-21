# 球体绘制

#### 顶点着色器

```
attribute vec4 position;
  
        uniform mat4 u_matrix;
      
        void main() {
          gl_Position = u_matrix*position;
         
        }
```

#### 片段着色器

```
 	precision mediump float;


        
        void main() {
       
        
          gl_FragColor = vec4(1,0,0.5,1);
        }
```

#### 递归细分逼近球面

```js
function createSphere(radius,depth){
	// radius 为球面半径
	// depth 为递归深度
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
```

- 思路: 在正四面体的四个面上不断划分小三角形,然后将小三角形的三个顶点坐标归一化到球面,即完成近似
- 优点: webgl只能绘制基本图元(点,线,三角形),因此这里使用三角形近似球面.
- 说明: 为了能够看出球的效果,这里开启了隐藏面消除,使得部分三角形不显示.

#### 效果演示

![球](..\imgs\球.png)

#### 参考链接

- [递归细分画球](https://blog.csdn.net/JeremyZhao1998/article/details/107032447)

