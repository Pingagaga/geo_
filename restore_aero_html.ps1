$log = 'c:\Users\diwei\AppData\Roaming\Code\User\workspaceStorage\cf95e3aadd63558386fe80b1839ae370\chatSessions\004d936e-cbdc-4f99-b02b-9a97780f8199.jsonl'
$raw = Get-Content -Raw -Path $log

$pattern = '"kind":"textEditGroup","uri":\{[^}]*"fsPath":"c:\\\\Users\\\\diwei\\\\Desktop\\\\areo\\\\AERO\.html"[^}]*\},"edits":\[\[\{"text":"(?<txt>(?:\\.|[^"])*)","range"'
$m = [regex]::Match($raw, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
if (-not $m.Success) {
    throw 'AERO.html payload not found in chatSessions log'
}

$json = '"' + $m.Groups['txt'].Value + '"'
$txt = ConvertFrom-Json $json
Set-Content -Path 'c:\Users\diwei\Desktop\areo\AERO.html' -Value $txt -Encoding utf8 -NoNewline
Write-Output ("RESTORED_HTML_LEN=" + $txt.Length)
