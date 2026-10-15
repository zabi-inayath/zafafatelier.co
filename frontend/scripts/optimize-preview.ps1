Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Users\zabi2\Desktop\projects\Zafaf Atelier\frontend\public\images\sadullah-safiya-preview.png"
$jpgPath = "c:\Users\zabi2\Desktop\projects\Zafaf Atelier\frontend\public\images\sadullah-safiya-preview.jpg"

$src = [System.Drawing.Image]::FromFile($imagePath)
$targetWidth = 1200
$targetHeight = 630
$bmp = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$srcAspect = $src.Width / $src.Height
$targetAspect = $targetWidth / $targetHeight

if ($srcAspect -gt $targetAspect) {
    $cropHeight = $src.Height
    $cropWidth = [int]($src.Height * $targetAspect)
    $cropX = [int](($src.Width - $cropWidth) / 2)
    $cropY = 0
} else {
    $cropWidth = $src.Width
    $cropHeight = [int]($src.Width / $targetAspect)
    $cropX = 0
    $cropY = [int](($src.Height - $cropHeight) / 2)
}

$destRect = New-Object System.Drawing.Rectangle 0, 0, $targetWidth, $targetHeight
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropWidth, $cropHeight
$graph.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$src.Dispose()

# Save as JPEG with 85% quality (< 200 KB)
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]85)

$bmp.Save($jpgPath, $encoder, $encoderParams)

# Also overwrite PNG with resized version
$bmp.Save($imagePath, [System.Drawing.Imaging.ImageFormat]::Png)

$graph.Dispose()
$bmp.Dispose()
Write-Host "Done resizing!"
