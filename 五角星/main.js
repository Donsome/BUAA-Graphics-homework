
  // 创建glsl   着色器程序
  function vertexShaderSource(){
    return `
    attribute vec2 a_position;
 
    uniform vec2 u_resolution;
   
    void main() {
      // 从像素坐标转换到 0.0 到 1.0
    
   
      gl_Position =  vec4(a_position, 0, 1);
    }
       
    `
 }
 function fragmentShaderSource(){
    return `
        precision mediump float;
    
        uniform vec4 u_color;
    
        void main() {
            gl_FragColor = u_color;
        }
    `
 }
 function createShader(gl,type,source){
     console.log(source);
    var shader = gl.createShader(type); // 创建着色器对象
    gl.shaderSource(shader, source); // 提供数据源
    gl.compileShader(shader); // 编译 -> 生成着色器
    return shader;
 }
 function createProgram(gl,vertexShader,fragmentShader){
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;

 }


var canvas = document.getElementById("mycanvas")
var gl = canvas.getContext("webgl")
var vertexShader = createShader(gl,gl.VERTEX_SHADER,vertexShaderSource())
var fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource())
var program = createProgram(gl, vertexShader, fragmentShader);

 // 获取顶点着色器的属性值位置
 /// 初始化positionBuffer
var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
var colorUniformLocation = gl.getUniformLocation(program, "u_color");



var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
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
function cos(x){
    return Math.cos(x/180*Math.PI);
}
function sin(x){
    return Math.sin(x/180*Math.PI);
}
var positions = createFiveStar(0.3);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
 // 渲染

 gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
 gl.clearColor(0, 0, 0, 0);
 gl.clear(gl.COLOR_BUFFER_BIT);

 gl.useProgram(program);
 gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
 gl.uniform4f(colorUniformLocation, 1,0.1,1,1);
 gl.enableVertexAttribArray(positionAttributeLocation);

 // 设置读取缓冲的方式
 gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
 var size = 2
 var type = gl.FLOAT;
 var normalized = false;
 var stride =0;
 gl.vertexAttribPointer(positionAttributeLocation, size, type, normalized, stride, offset);

 // 运行着色器程序
 var primitiveType = gl.TRIANGLES;
 var offset = 0;
 var count = 15;
 gl.drawArrays(primitiveType, offset, count);
 

 var positions = createFiveStarCenter(0.3);
 gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
 gl.uniform4f(colorUniformLocation, 1,1,0,1);
 gl.drawArrays(primitiveType, offset, count);


