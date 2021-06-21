# 反射与贴图

#### 普通场景顶点着色器

```
   		attribute vec4 position;
        attribute vec4 color;
        uniform mat4 u_view;
        uniform mat4 u_world;
        uniform mat4 u_projection;

        varying vec4 v_color;

   
        void main() {
          gl_Position = u_projection*u_view*u_world * position;
          v_color = color;
        }
```

#### 普通场景片段着色器

```
		precision mediump float;

        varying vec4 v_color;
       
        uniform vec4 u_colorMult;
        void main() {
            gl_FragColor = v_color * u_colorMult;
           
        }
```

#### 球体顶点着色器

```
		attribute vec4 position;
        attribute vec3 normal;


        uniform mat4 u_view;
        uniform mat4 u_world;
        uniform mat4 u_projection;
 
        varying vec3 v_worldPosition;
        varying vec3 v_worldNormal;
   
        void main() {
            gl_Position = u_projection*u_view*u_world * position;
          
            v_worldPosition = (u_world * position).xyz;
            v_worldNormal = mat3(u_world) * normal;
        }
```

- 加入发现用来计算反射光

#### 球体片段着色器

```

		precision mediump float;
        uniform samplerCube cubeTexture;
        varying vec3 v_worldPosition;
        varying vec3 v_worldNormal;
        uniform vec3 u_eye;
     
        void main() {
            vec3 worldNormal = normalize(v_worldNormal);
           vec3 eyeToSurfaceDir = normalize(v_worldPosition - u_eye);
           vec3 direction = reflect(eyeToSurfaceDir,worldNormal);
           
           gl_FragColor = textureCube(cubeTexture, -direction);
           if(gl_FragColor.x == 0.0 && gl_FragColor.y == 0.0 && gl_FragColor.z == 0.0){
               gl_FragColor = vec4(0.3,0.5,0.7,1);
           }
          
        }
```

- 计算反射光的方向(由glsl底层函数reflect实现)
- 从立方体纹理中采样获取颜色值

### 立方体顶点着色器

```
		attribute vec4 position;
        
        attribute vec2 texcoord;
        uniform mat4 u_view;
        uniform mat4 u_world;
        uniform mat4 u_projection;

       
        varying vec2 v_texcoord;
   
        void main() {
          gl_Position = u_projection*u_view*u_world * position;
         v_texcoord = texcoord;
        }
```

#### 立方体片段着色器

```
 		precision mediump float;

        varying vec2 v_texcoord;
        
        uniform sampler2D numtexture;
        void main() {
            gl_FragColor = texture2D(numtexture,v_texcoord);
           
        }
```

- 颜色从学号姓名贴图中采样.

#### 绘制流程

1. 使用普通场景着色器绘制立方体和五角星和草坪,相机位于远点,分别朝上下左右前后 
2. 将场景绘制到帧缓冲区,帧缓冲区绑定到一个立方体纹理的上下左右前后,构成球体四周场景
3. 绑定绘制到canvas画布.
4. 重新绘制所有物体,使用立方体纹理将纹理贴到球面上
5. 使用2维纹理将学号姓名纹理贴到立方体上

#### 参考代码

- [WebGL 立方体贴图](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-cube-maps.html)
- [WebGL 环境贴图 (反射)](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-environment-maps.html)
- [WebGL利用FBO完成立方体贴图效果完整实例](https://www.jb51.net/article/78657.htm)

#### 效果

![反射2](..\imgs\反射2.png)![反射1](..\imgs\反射1.png)