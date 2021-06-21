# 基于纹理映射的投影

#### 帧缓冲顶点着色器

```
 attribute vec4 a_position;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;

void main() {
  // Multiply the position by the matrices.
  gl_Position = u_projection * u_view * u_world * a_position;
}
```

- 绘制简单的场景,同时从相机的角度记录.由webgl支持的深度缓冲区记录每个所绘制的像素的深度.

#### 帧缓冲片段着色器

```
  	precision mediump float;

    uniform vec4 u_color;
    void main() {
      gl_FragColor = u_color;
    }
```

- 使用深度缓冲区即可,颜色无实际意义.

#### 场景顶点着色器

```
  		attribute vec4 a_position;
        attribute vec2 a_texcoord;
        attribute vec3 a_normal;
        varying vec3 v_normal;

        uniform mat4 u_projection;
        uniform mat4 u_view;
        uniform mat4 u_world;
        uniform mat4 u_textureMatrix;

        varying vec2 v_texcoord;
        varying vec4 v_projectedTexcoord;

        void main() {
          // Multiply the position by the matrix.
          vec4 worldPosition = u_world * a_position;

          gl_Position = u_projection * u_view * worldPosition;

          // Pass the texture coord to the fragment shader.
          v_texcoord = a_texcoord;

          v_projectedTexcoord = u_textureMatrix * worldPosition;
          v_normal = mat3(u_world) * a_normal;
        }
```

- v_texcoord为纹理坐标
- v_projectedTexcoord  为光源坐标系下的坐标
- v_normal 为发现(没做尝试,实际应该是乘以逆的转置吧)

#### 场景片段着色器

```
     precision mediump float;
    varying vec3 v_normal;


    varying vec2 v_texcoord;
    varying vec4 v_projectedTexcoord;

    uniform vec4 u_colorMult;
    uniform sampler2D u_texture;
    uniform sampler2D u_projectedTexture;
    uniform float u_bias;
    uniform vec3 u_reverseLightDirection;
    void main() {

            vec3 projectedTexcoord = v_projectedTexcoord.xyz / v_projectedTexcoord.w;
            vec3 normal = normalize(v_normal);
            float light = dot(normal, u_reverseLightDirection);

          float currentDepth = projectedTexcoord.z + u_bias;
          bool inRange =
              projectedTexcoord.x >= 0.0 &&
              projectedTexcoord.x <= 1.0 &&
              projectedTexcoord.y >= 0.0 &&
              projectedTexcoord.y <= 1.0;



          float projectedDepth = texture2D(u_projectedTexture, projectedTexcoord.xy).r;
          float shadowLight = (inRange && projectedDepth <= currentDepth) ? 0.0 : 1.0;  
          vec4 texColor = texture2D(u_texture, v_texcoord) * u_colorMult;
          gl_FragColor = vec4(texColor.rgb * shadowLight, texColor.a);
          gl_FragColor = vec4(
            texColor.rgb * light * shadowLight,
              texColor.a);
    }
```

- 计算当前场景下该顶点距离光源的距离

  ```
  float currentDepth = projectedTexcoord.z + u_bias;
  ```

- 判断当前三角形是否在纹理范围内

  ```
  bool inRange =
                projectedTexcoord.x >= 0.0 &&
                projectedTexcoord.x <= 1.0 &&
                projectedTexcoord.y >= 0.0 &&
                projectedTexcoord.y <= 1.0;
  ```

- 在范围内且距离大于等于光照时的距离,则为黑色阴影(0.0.0) ,否则为原色.

  ```
  float shadowLight = (inRange && projectedDepth <= currentDepth) ? 0.0 : 1.0;  
  ```

#### 优缺点

- 优点: 实现效果逼真,能够完成曲面上的阴影生成
- 缺点: 实现起来比较复杂,需要两侧绘制,且使用帧缓冲记录深度,同时即使是平面也要用细分来逼近.

#### 参考代码

- [WebGL 平面的和透视的投影映射](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-planar-projection-mapping.html)
- [WebGL 阴影](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-shadows.html)

#### 效果展示

![阴影2](..\imgs\阴影2.png)