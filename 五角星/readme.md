

# 五角星绘制

- webgl每次只能画点,线或者三角形,所以如果需要画矩形就要把矩形分割成两个三角形
- 画五角星就需要把五角星割成三角形,这里我共分割成了是个三角形,分别计算每个三角形三个顶点的坐标值

```
function createFiveStar(a){
    return[
        0,a*cos(36)/sin(18),-sin(36)*a,cos(36)*a,sin(36)*a,cos(36)*a,
       
        sin(36)*a,cos(36)*a,cos(36)*a/sin(18)*cos(18),cos(36)*a,cos(18)*a,-sin(18)*a,
        
        cos(18)*a,-sin(18)*a,0,-a,cos(36)/sin(18)*cos(54)*a,-cos(36)/sin(18)*a*sin(54),
      
        0,-a,-cos(18)*a,-sin(18)*a,-cos(36)/sin(18)*a*cos(54),-cos(36)/sin(18)*a*sin(54),
       
        -cos(18)*a,-sin(18)*a,-sin(36)*a,cos(36)*a,-cos(36)/sin(18)*a*cos(18),cos(36)*a,
    
    ]
}
function createFiveStarCenter(a){
    return [
        0,0,-sin(36)*a,cos(36)*a,sin(36)*a,cos(36)*a,
        0,0,sin(36)*a,cos(36)*a,cos(18)*a,-sin(18)*a,
        cos(18)*a,-sin(18)*a,0,-a,0,0,
        0,-a,-cos(18)*a,-sin(18)*a,0,0,
        -cos(18)*a,-sin(18)*a,-sin(36)*a,cos(36)*a,0,0
    ]
}
```

![image-20210323201510885](C:\Users\栾帅\AppData\Roaming\Typora\typora-user-images\image-20210323201510885.png)

- 分别设置片段着色器的颜色值.