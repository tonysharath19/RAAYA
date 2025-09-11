$i = 1
Get-ChildItem -Path . -Filter *.jpg | Sort-Object Name | ForEach-Object {
    $newName = "CORP-DISP-{0:D2}.jpg" -f $i
    Rename-Item $_ -NewName $newName
    $i++
}
