# 正方体绘制

####  顶点着色器

```
attribute vec4 position;
        attribute vec4 color;
        uniform mat4 u_matrix;
        varying vec4 v_color;
        void main() {
          gl_Position = u_matrix*position;
          v_color = color;
        }
```

#### 片段着色器

```
        precision mediump float;

        varying vec4 v_color;

        uniform vec4 u_colorMult;
        
        void main() {
       
        
          gl_FragColor = v_color * u_colorMult;
        }
```

#### shape.js

- 详见代码
- 主要实现了立方体点坐标,索引,发现,面颜色,纹理坐标.



#### 效果演示

![立方体](..\imgs\立方体.png)