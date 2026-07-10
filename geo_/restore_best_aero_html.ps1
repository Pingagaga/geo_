$log = 'c:\Users\diwei\AppData\Roaming\Code\User\workspaceStorage\cf95e3aadd63558386fe80b1839ae370\chatSessions\004d936e-cbdc-4f99-b02b-9a97780f8199.jsonl'
$raw = Get-Content -Raw -Path $log

$pattern = '"kind":"textEditGroup","uri":\{[^}]*"fsPath":"c:\\\\Users\\\\diwei\\\\Desktop\\\\areo\\\\AERO\.html"[^}]*\},"edits":\[\[\{"text":"(?<txt>(?:\\.|[^"])*)","range"'
$matches = [regex]::Matches($raw, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
if ($matches.Count -eq 0) {
    throw 'No AERO.html textEditGroup payload found'
}

$bestText = $null
$bestScore = -1
$bestLen = 0

foreach ($m in $matches) {
    $json = '"' + $m.Groups['txt'].Value + '"'
    try {
        $txt = ConvertFrom-Json $json
    }
    catch {
        continue
    }

    $cjkCount = ([regex]::Matches($txt, '[\u4E00-\u9FFF]')).Count
    $score = $cjkCount

    if ($score -gt $bestScore -or ($score -eq $bestScore -and $txt.Length -gt $bestLen)) {
        $bestScore = $score
        $bestLen = $txt.Length
        $bestText = $txt
    }
}

if (-not $bestText) {
    throw 'Failed to decode any AERO.html payload'
}

Set-Content -Path 'c:\Users\diwei\Desktop\areo\AERO.html' -Value $bestText -Encoding utf8 -NoNewline
Write-Output ("RESTORED_HTML_LEN=" + $bestLen + "; CJK_SCORE=" + $bestScore + "; MATCHES=" + $matches.Count)
