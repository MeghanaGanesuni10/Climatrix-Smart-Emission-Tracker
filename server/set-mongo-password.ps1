# Run after rotating the CarbonTrack database user's password in MongoDB Atlas.
# The new password is entered as a secure prompt and is written only to .env.
$envPath = Join-Path $PSScriptRoot '.env'
if (-not (Test-Path -LiteralPath $envPath)) { throw 'server/.env was not found.' }
$content = Get-Content -LiteralPath $envPath -Raw
$uriPattern = '(?m)^MONGO_URI=mongodb://([^:]+):[^@]+@(.+)$'
$existing = [regex]::Match($content, $uriPattern)
if (-not $existing.Success) { throw 'MONGO_URI is not in the expected standard seed-list format.' }
$newPassword = Read-Host 'Enter the NEW Atlas database-user password (input is hidden)' -AsSecureString
$pointer = [IntPtr]::Zero
try {
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($newPassword)
  $plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
  $encodedPassword = [Uri]::EscapeDataString($plainPassword)
  $newLine = 'MONGO_URI=mongodb://' + $existing.Groups[1].Value + ':' + $encodedPassword + '@' + $existing.Groups[2].Value
  $lines = foreach ($line in [regex]::Split($content, '\r?\n')) {
    if ($line.StartsWith('MONGO_URI=')) { $newLine } else { $line }
  }
  Set-Content -LiteralPath $envPath -Value ($lines -join "`n") -NoNewline -Encoding utf8
  Write-Output 'Updated MONGO_URI in server/.env. The password was not displayed.'
} finally {
  if ($pointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
  $plainPassword = $null
  $encodedPassword = $null
}
