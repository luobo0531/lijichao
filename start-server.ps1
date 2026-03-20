# 简单的HTTP服务器脚本
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:9000/')
$listener.Start()
Write-Host '服务器已启动，访问地址: http://localhost:9000/' -ForegroundColor Green

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $response = $context.Response
        $path = $context.Request.Url.LocalPath
        
        # 默认访问index.html
        if ($path -eq '/') {
            $path = '/index.html'
        }
        
        # 构建文件路径
        $filePath = Join-Path -Path '.' -ChildPath $path.TrimStart('/')
        
        # 检查文件是否存在
        if (Test-Path -Path $filePath -PathType Leaf) {
            # 读取文件内容
            $content = Get-Content -Path $filePath -Raw
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            
            # 设置响应头
            $response.ContentType = 'text/html; charset=utf-8'
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            # 文件不存在，返回404
            $response.StatusCode = 404
            $content = '404 Not Found'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        
        $response.Close()
    } catch {
        Write-Host "错误: $_" -ForegroundColor Red
    }
}

# 停止服务器
$listener.Stop()
Write-Host '服务器已停止' -ForegroundColor Yellow