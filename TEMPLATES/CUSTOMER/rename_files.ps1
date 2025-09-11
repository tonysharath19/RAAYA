$i = 1
Get-ChildItem -Path . -Include *.jpg,*.jpeg,*.png,*.gif,*.bmp,*.tiff,*.webp | Sort-Object Name | ForEach-Object {
    $extension = $_.Extension
    $newName = "BBS-P-{0:D2}{1}" -f $i, $extension
    Rename-Item $_ -NewName $newName
    $i++
}
