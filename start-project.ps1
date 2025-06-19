# Asegurarse de que estamos en el directorio correcto
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath

# Limpiar procesos de Node.js existentes
taskkill /F /IM node.exe 2>$null

# Limpiar la caché y los módulos
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Instalar dependencias
npm install

# Iniciar el servidor
npm run dev 