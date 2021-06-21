# 基于投影矩阵的阴影实现

#### 场景顶点着色器

```
  		attribute vec4 position;
        attribute vec4 color;
        attribute vec3 normal;
     
        uniform mat4 u_view;
        uniform mat4 u_world;
        uniform mat4 u_projection;
        uniform mat4 u_reverseworld;
        varying vec4 v_color;
        varying vec3 v_normal;
        uniform vec4 u_planePosition;
        void main() {
      
          gl_Position = u_projection*u_view*u_world * position;
        
   
          v_color = color;
          v_normal =  mat3(u_reverseworld) * normal;;
        }
```

- 设物体原来法向量为a,乘以模型矩阵M后,法向量变为$$(M^{-1})^T * a$$

#### 场景片段着色器

```
 		precision mediump float;

    
        varying vec4 v_color;
        varying vec3 v_normal;

        uniform vec4 u_colorMult;
        uniform vec3 u_reverseLightDirection;
        void main() {


            vec3 normal = normalize(v_normal);
            float light = dot(normal, u_reverseLightDirection);
            gl_FragColor = v_color * u_colorMult;
            gl_FragColor.rgb *= light;
        }
```

- 光照使用平行光源,只需要计算光照方向和法线方向的点积,然后在颜色值中乘以该系数即可.

#### 阴影顶点着色器

```
        attribute vec4 position;
       
        uniform vec3 u_reverseLightDirection;
        uniform mat4 u_view;
        uniform mat4 u_world;
        uniform mat4 u_projection;
        uniform vec4 u_planePosition;


        void main() {
            vec3 worldPosition = ( u_world*position).xyz;
            vec3 resPosition;
           
            gl_Position =   u_projection *u_view*  vec4(((u_planePosition.y-worldPosition.y)/u_reverseLightDirection.y) *(u_reverseLightDirection.xyz) + ( worldPosition),1);
       
         
        }
```

- 与上一着色器相比,阴影不需要光照,只需要计算相应的位置坐标即可.

- 公式推导:

  - ![阴影](..\imgs\阴影.png)
  - x2-x1 平行于x0 ,且x0,x1,x2中的y坐标值三个都是已知的
  - 则可以列方程求出x2的x和z坐标,推导出下面代码实现的公式.

- 代码实现:

  ```
  gl_Position =   u_projection *u_view*  vec4(((u_planePosition.y-worldPosition.y)/u_reverseLightDirection.y) *(u_reverseLightDirection.xyz) + ( worldPosition),1);
  ```

  

#### 阴影片段着色器

```
		precision mediump float;
        void main () {
            gl_FragColor = vec4(0, 0.0, 0.0, 1);
        }
```

- 阴影颜色为黑即可



#### 优缺点

- 优点: 简单容易实现
- 缺点: 
  1. 阴影不是以纹理的方式贴在底部草坪上的,而是以一个很小的距离飘在草坪上.
  2. 无法将阴影投影在曲面上.

#### 效果

![阴影1](..\imgs\阴影1.png)